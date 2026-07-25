/* life-hub — 近くのスポット検索（現在地 + Overpass API / OpenStreetMap）
 *
 * APIキー不要・無料・バックエンド不要のため「GitHub のみで完結」の方針を崩さない。
 * 現在地は端末の位置情報（天気と同じ仕組み）。POI は OpenStreetMap の
 * Overpass API をブラウザから直接呼び、ミラーを順に試す。
 * 位置情報はこの端末でのみ使い、どこにも保存・送信しない（検索座標を除く）。
 */
window.Nearby = (function () {
  /* 全球データを持つミラーを先に。overpass-api.de 本家は 2025 年以降
   * ボット対策で機械的なリクエストに 406 を返すことがあるため後ろに回す。
   * z / lz4 は本家の個別サーバー（本家はこの2台に振り分けている）。
   * openstreetmap.jp はブラウザから CORS で使えないため入れない（実機で確認）。 */
  var MIRRORS = [
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.private.coffee/api/interpreter',
    'https://z.overpass-api.de/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter',
    'https://overpass-api.de/api/interpreter'
  ];
  var LS_MIRROR = 'lifehub.nbMirror';   // 直近で成功したミラー（次回はここから試す）
  /* サーバーに要求する最大件数。Overpass の件数制限は距離順ではなく ID/タイル順で
   * 打ち切られるため、少ないと「最寄りが欠ける」。大きめに取り、選別は手元で行う。 */
  var OUT_LIMIT = 300;

  /* カテゴリー定義。q は Overpass のタグフィルタ（node/way 両方に適用）。
   * r は初期半径(m)。0件に近いときは自動で3倍(上限50km)に広げて1回だけ再検索する。
   * noname は無名でも載せる（トイレ・駐車場は名前が無いのが普通）。 */
  /* フィルタは正規表現ではなく完全一致の集合にする。Overpass はタグの完全一致に
   * インデックスが効くため、混雑したサーバーでも処理が速く queue 落ちしにくい。 */
  var CATS = [
    { k: 'rest',  n: 'レストラン',       e: '🍽',  r: 1500,
      q: ['["amenity"="restaurant"]', '["amenity"="fast_food"]', '["amenity"="food_court"]'] },
    { k: 'cafe',  n: 'カフェ',           e: '☕',  r: 1500,
      q: ['["amenity"="cafe"]', '["amenity"="ice_cream"]'] },
    { k: 'conv',  n: 'コンビニ',         e: '🏪',  r: 1200,
      q: ['["shop"="convenience"]'] },
    { k: 'fuel',  n: 'ガソリンスタンド', e: '⛽',  r: 3000,
      q: ['["amenity"="fuel"]'] },
    { k: 'wc',    n: 'トイレ',           e: '🚻',  r: 1000, noname: 1,
      q: ['["amenity"="toilets"]'] },
    { k: 'eki',   n: '道の駅',           e: '🛣',  r: 20000,
      /* 道の駅は「name に道の駅」を正とし、SA/PA(highway=services/rest_area)も拾う。
       * 「道の駅◯◯前」のバス停・信号・横断歩道などは highway/public_transport タグを
       * 持つので、名前検索側からはそれらを丸ごと除外する（SA/PA は後ろの2つが拾う）。 */
      q: ['["name"~"道の駅"]["highway"!~"."]["public_transport"!~"."]',
          '["highway"="rest_area"]', '["highway"="services"]'] },
    { k: 'super', n: 'スーパー',         e: '🛒',  r: 2000,
      q: ['["shop"="supermarket"]'] },
    { k: 'drug',  n: 'ドラッグストア',   e: '💊',  r: 2000,
      q: ['["amenity"="pharmacy"]', '["shop"="chemist"]', '["shop"="drugstore"]'] },
    { k: 'park',  n: '駐車場',           e: '🅿️', r: 1200, noname: 1,
      q: ['["amenity"="parking"]["access"!~"^(private|no)$"]'] },
    { k: 'atm',   n: 'ATM・銀行',        e: '🏧',  r: 1500,
      q: ['["amenity"="atm"]', '["amenity"="bank"]'] },
    { k: 'hosp',  n: '病院',             e: '🏥',  r: 3000,
      q: ['["amenity"="hospital"]', '["amenity"="clinic"]', '["amenity"="doctors"]'] },
    { k: 'bath',  n: '温泉・銭湯',       e: '♨️', r: 10000,
      q: ['["amenity"="public_bath"]'] }
  ];

  /* phase: idle | locating | loading | ok | error
   * expanded: 0件に近く、半径を自動で広げて再検索した結果かどうか
   * errorDetail: ミラーごとの失敗理由（画面に小さく出して原因調査に使う） */
  var state = { phase: 'idle', cat: '', items: [], radius: 0, expanded: false,
                error: '', errorDetail: '', loc: null, locAt: 0 };
  var cache = {}, seq = 0, warming = false;

  function catByKey(k) {
    for (var i = 0; i < CATS.length; i++) if (CATS[i].k === k) return CATS[i];
    return null;
  }

  // ---- 現在地 -------------------------------------------------------------
  function getLoc(force) {
    return new Promise(function (res, rej) {
      if (!force && state.loc && Date.now() - state.locAt < 120000) return res(state.loc);
      if (!navigator.geolocation) return rej(new Error('この端末では位置情報を利用できません'));
      navigator.geolocation.getCurrentPosition(function (p) {
        state.loc = { lat: p.coords.latitude, lng: p.coords.longitude, acc: p.coords.accuracy || 0 };
        state.locAt = Date.now();
        res(state.loc);
      }, function (e) {
        rej(new Error(e && e.code === 1
          ? '位置情報が許可されていません。ブラウザの設定でこのサイトの位置情報を許可してください。'
          : '現在地を取得できませんでした。電波状況を確認して再試行してください。'));
      }, { enableHighAccuracy: true, timeout: 10000, maximumAge: force ? 0 : 60000 });
    });
  }

  /* 画面を開いた時に裏で現在地だけ温めておく（1タップ目を速くする）。
   * ただし許可ダイアログは「画面を開いただけ」では出さない — 既に許可済みの
   * ときだけ動く。Permissions API が無い環境では最初のタップまで何もしない。
   * 失敗しても黙っておき、実際の検索時に改めてエラーを出す。 */
  function warm(onUpdate) {
    if (warming || state.loc) return;
    if (!(navigator.permissions && navigator.permissions.query)) return;
    warming = true;
    try {
      navigator.permissions.query({ name: 'geolocation' }).then(function (st) {
        if (st.state !== 'granted') { warming = false; return; }
        getLoc(false).then(function () { warming = false; onUpdate && onUpdate(); },
                           function () { warming = false; });
      }, function () { warming = false; });
    } catch (e) { warming = false; }
  }

  // ---- Overpass -----------------------------------------------------------
  /* クエリは短いので GET（共有リンクと同じ形式）で送る。POST よりも
   * 「人が使う形」に近く、本家のボット対策フィルタに弾かれにくい。
   * Accept は CORS セーフリストのヘッダなのでプリフライトも発生しない。 */
  function get(url, q, ms) {
    var ctl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    /* タイムアウトは AbortController の有無に依存させない（無い環境で無限に
     * 待たないよう、reject する側のタイマーを常に持つ）。abort は後片付け。 */
    return new Promise(function (resolve, reject) {
      var t = setTimeout(function () {
        var e = new Error('timeout'); e.name = 'AbortError';
        reject(e);
        if (ctl) ctl.abort();
      }, ms);
      fetch(url + '?data=' + encodeURIComponent(q), {
        headers: { Accept: 'application/json' },
        signal: ctl ? ctl.signal : undefined
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json().catch(function () { throw new Error('不正な応答'); });
      }).then(function (j) {
        clearTimeout(t);
        /* Overpass はサーバー側の timeout / メモリ超過でも HTTP 200 + remark で
         * 返すことがある。成功扱いにすると「0件」に化けるので失敗として次へ。 */
        if (j && j.remark && /timed out|error/i.test(String(j.remark)))
          throw new Error('サーバー側エラー');
        resolve(j);
      }).catch(function (e) { clearTimeout(t); reject(e); });
    });
  }
  /* 失敗理由を「どのサーバーが・なぜ」まで残す。エラーカードに出すことで、
   * 手元で再現できない環境でもスクリーンショットから原因を特定できる。 */
  function failReason(e) {
    if (e && e.name === 'AbortError') return 'タイムアウト';
    if (e && /^HTTP \d+$/.test(e.message || '')) return e.message;
    if (e && (e.message === '不正な応答' || e.message === 'サーバー側エラー')) return e.message;
    return '接続エラー';
  }
  /* 公開サーバーは混雑でキュー待ちが長いことがある（実機で 504 / 14秒超を確認）。
   * 順番待ちだけだと遅いので「ヘッジ」する: 6秒応答が無ければ次のミラーも
   * 並行で撃ち、最初に成功した応答を採用する。成功したミラーは記憶して
   * 次回は最初に試す。全ミラー失敗のときだけエラーにする。 */
  function overpass(q) {
    var order = MIRRORS.slice();
    try {
      var g = localStorage.getItem(LS_MIRROR);
      var gi = order.indexOf(g);
      if (gi > 0) { order.splice(gi, 1); order.unshift(g); }
    } catch (e) {}
    return new Promise(function (resolve, reject) {
      var started = 0, failed = 0, done = false, fails = [], timers = [];
      function fire() {
        if (done || started >= order.length) return;
        var url = order[started++];
        if (started < order.length) timers.push(setTimeout(fire, 6000));
        get(url, q, 28000).then(function (j) {
          if (done) return;
          done = true;
          timers.forEach(clearTimeout);
          try { localStorage.setItem(LS_MIRROR, url); } catch (e) {}
          resolve(j);
        }, function (e) {
          if (done) return;
          failed++;
          fails.push(url.replace(/^https:\/\//, '').split('/')[0] + ': ' + failReason(e));
          if (failed >= order.length) {
            done = true;
            timers.forEach(clearTimeout);
            var err = new Error('検索サーバーに接続できませんでした。時間をおいて再試行してください。');
            err.detail = fails.join(' · ');
            reject(err);
          } else fire();   // 待ち時間より早く失敗が確定したら、すぐ次を撃つ
        });
      }
      fire();
    });
  }
  function buildQuery(cat, loc, r) {
    var ll = r + ',' + loc.lat.toFixed(5) + ',' + loc.lng.toFixed(5);
    /* nwr で node / way / relation を全部拾う（道の駅・病院・モールは
     * relation で描かれていることがある）。out center が代表点を返す。 */
    var lines = cat.q.map(function (f) {
      return 'nwr' + f + '(around:' + ll + ');';
    }).join('');
    /* timeout はサーバー側のキュー待ちを見込んで長めにする（混雑時対策）。
     * qt はタイル順ソート（ID 順より軽い）。上限は「打ち切りをほぼ起こさない」
     * ために大きめに取る。距離順の選別はクライアント側で行う。 */
    return '[out:json][timeout:25];(' + lines + ');out center qt ' + OUT_LIMIT + ';';
  }

  // ---- 整形 ---------------------------------------------------------------
  function hav(a, b, c, d) {
    var R = 6371000, p = Math.PI / 180;
    var s = Math.sin((c - a) * p / 2), u = Math.sin((d - b) * p / 2);
    var h = s * s + Math.cos(a * p) * Math.cos(c * p) * u * u;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function fmtDist(m) {
    if (m < 1000) return Math.round(m) + ' m';
    return (m < 10000 ? (m / 1000).toFixed(1) : String(Math.round(m / 1000))) + ' km';
  }

  var SUB_A = { restaurant: 'レストラン', fast_food: 'ファストフード', food_court: 'フードコート',
    cafe: 'カフェ', ice_cream: 'アイスクリーム', fuel: 'ガソリンスタンド', toilets: 'トイレ',
    pharmacy: '薬局', parking: '駐車場', atm: 'ATM', bank: '銀行', hospital: '病院',
    clinic: 'クリニック', doctors: '診療所', public_bath: '銭湯・温泉' };
  var SUB_S = { convenience: 'コンビニ', supermarket: 'スーパー', chemist: 'ドラッグストア', drugstore: 'ドラッグストア' };
  var SUB_H = { rest_area: 'パーキングエリア', services: 'サービスエリア' };
  function subtype(t, cat) {
    if (/道の駅/.test(t.name || '')) return '道の駅';
    return SUB_A[t.amenity] || SUB_S[t.shop] || SUB_H[t.highway] || cat.n;
  }

  var CU = { japanese: '和食', ramen: 'ラーメン', sushi: '寿司', soba: 'そば', udon: 'うどん',
    curry: 'カレー', italian: 'イタリアン', french: 'フレンチ', chinese: '中華', korean: '韓国料理',
    indian: 'インド料理', thai: 'タイ料理', pizza: 'ピザ', burger: 'ハンバーガー', chicken: 'チキン',
    seafood: '海鮮', steak_house: 'ステーキ', barbecue: '焼肉', grill: 'グリル', coffee_shop: 'コーヒー',
    sandwich: 'サンドイッチ', ice_cream: 'アイスクリーム', bakery: 'ベーカリー', noodle: '麺類',
    teppanyaki: '鉄板焼き', tempura: '天ぷら', tonkatsu: 'とんかつ', yakitori: '焼き鳥',
    izakaya: '居酒屋', okonomiyaki: 'お好み焼き', takoyaki: 'たこ焼き', donburi: '丼もの',
    vegetarian: 'ベジタリアン', mexican: 'メキシカン', spanish: 'スペイン料理', vietnamese: 'ベトナム料理',
    american: 'アメリカン', dessert: 'デザート', cake: 'ケーキ', pancake: 'パンケーキ',
    tea: 'お茶・紅茶', bubble_tea: 'タピオカ' };
  function cuisineJa(s) {
    if (!s) return '';
    return String(s).split(';').map(function (v) {
      v = v.trim();
      return CU[v] || v.replace(/_/g, ' ');
    }).slice(0, 3).join(' / ');
  }

  function hoursJa(s) {
    if (!s) return '';
    if (/^24\s*\/\s*7$/.test(s)) return '24時間営業';
    var M = { Mo: '月', Tu: '火', We: '水', Th: '木', Fr: '金', Sa: '土', Su: '日', PH: '祝', SH: '学休' };
    return s.replace(/\b(Mo|Tu|We|Th|Fr|Sa|Su|PH|SH)\b/g, function (m) { return M[m]; })
            .replace(/\b(off|closed)\b/g, '休')
            .replace(/;\s*/g, ' / ');
  }

  /* 日本の住所タグを「大 → 小」で自然につなぐ */
  function addr(t) {
    t = t || {};
    if (t['addr:full']) return t['addr:full'];
    var num = [t['addr:block_number'], t['addr:housenumber']].filter(Boolean).join('-');
    return [t['addr:province'] || t['addr:state'], t['addr:county'], t['addr:city'],
            t['addr:suburb'] || t['addr:quarter'] || t['addr:neighbourhood'], num]
           .filter(Boolean).join('');
  }

  function normalize(el, cat, loc) {
    var t = el.tags || {};
    var la = el.lat != null ? el.lat : (el.center && el.center.lat);
    var lo = el.lon != null ? el.lon : (el.center && el.center.lon);
    if (la == null || lo == null) return null;
    var name = t.name || t['name:ja'] || '';
    var brand = t['brand:ja'] || t.brand || t.operator || '';
    // 名前もブランドも無い項目は情報にならないので出さない（トイレ等は除く）
    if (!name && !brand && !cat.noname) return null;
    var sub = subtype(t, cat);
    return {
      id: el.type + '/' + el.id,
      name: name,
      title: name || brand || sub,
      brand: brand,
      sub: sub,
      lat: la, lng: lo,
      dist: hav(loc.lat, loc.lng, la, lo),
      tags: t,
      line2: [sub,
              (brand && name && brand !== name) ? brand : '',
              cuisineJa(t.cuisine),
              hoursJa(t.opening_hours)].filter(Boolean).join(' · ')
    };
  }

  /* node と way の二重登録などの重複を、同名かつ150m以内で1つにまとめる。
   * seen は OSM の name をそのままキーにするため、'constructor' などの名前で
   * 継承プロパティを踏まないよう prototype の無いオブジェクトを使う。 */
  function dedupe(items) {
    var out = [], seen = Object.create(null);
    items.forEach(function (it) {
      if (it.name) {
        var arr = seen[it.name] || (seen[it.name] = []);
        for (var i = 0; i < arr.length; i++)
          if (hav(arr[i].lat, arr[i].lng, it.lat, it.lng) < 150) return;
        arr.push(it);
      }
      out.push(it);
    });
    return out;
  }

  // ---- 検索本体 -----------------------------------------------------------
  function runSearch(cat, loc, r, expanded, shrunk) {
    return overpass(buildQuery(cat, loc, r)).then(function (j) {
      var els = j.elements || [];
      function toItems(arr) {
        return dedupe(arr.map(function (el) { return normalize(el, cat, loc); })
          .filter(Boolean)
          .sort(function (a, b) { return a.dist - b.dist; })).slice(0, 40);
      }
      var items = toItems(els);
      /* 上限いっぱい返ってきたら打ち切りの可能性が高い（打ち切りは距離順ではない
       * ため最寄りが欠けうる）。半径を半分に絞って取り直す（最大2回・下限500m）。
       * 密集地の縁（海沿い・公園際など）では絞ると逆に減ることがあるので、
       * その場合は打ち切りありでも元の結果を残す。拡大後の打ち切りにも適用する。 */
      if (els.length >= OUT_LIMIT && (shrunk || 0) < 2 && r >= 1000) {
        return runSearch(cat, loc, Math.round(r / 2), expanded, (shrunk || 0) + 1)
          .then(function (res2) {
            /* 絞った結果が実用件数（3件以上）ならそちらを採用する — 絞った半径内は
             * 完全なので「近い順」が正確。ほぼ空振り（密集地の縁に立っている等）なら、
             * 打ち切りの可能性ありでも元の結果を残す方が役に立つ。 */
            return res2.items.length >= 3 ? res2
                 : { items: items, radius: r, expanded: !!expanded };
          });
      }
      if (items.length < 3 && !expanded && !shrunk) {
        var r2 = Math.min(r * 3, 50000);
        if (r2 > r) return runSearch(cat, loc, r2, true, 0).then(function (res2) {
          /* 半径を広げたのに減った（サーバー側の揺らぎ等）なら元の結果を残す */
          return res2.items.length > items.length ? res2
               : { items: items, radius: r, expanded: false };
        });
      }
      return { items: items, radius: r, expanded: !!expanded };
    });
  }

  /* カテゴリーをワンタップ → 現在地取得 → 検索。onUpdate は状態が変わるたびに呼ぶ。 */
  function select(key, onUpdate) {
    var cat = catByKey(key);
    if (!cat) return;
    var my = ++seq;
    state.cat = key;
    state.error = ''; state.errorDetail = '';
    state.phase = (state.loc && Date.now() - state.locAt < 120000) ? 'loading' : 'locating';
    if (onUpdate) onUpdate();
    getLoc(false).then(function (loc) {
      if (my !== seq) return;
      var ck = key + '|' + loc.lat.toFixed(3) + ',' + loc.lng.toFixed(3);
      var c = cache[ck];
      if (c && Date.now() - c.at < 600000) {
        state.items = c.items; state.radius = c.radius; state.expanded = c.expanded; state.phase = 'ok';
        if (onUpdate) onUpdate();
        return;
      }
      state.phase = 'loading';
      if (onUpdate) onUpdate();
      return runSearch(cat, loc, cat.r, false, 0).then(function (res) {
        if (my !== seq) return;
        cache[ck] = { items: res.items, radius: res.radius, expanded: res.expanded, at: Date.now() };
        state.items = res.items; state.radius = res.radius; state.expanded = res.expanded; state.phase = 'ok';
        if (onUpdate) onUpdate();
      });
    }).catch(function (e) {
      if (my !== seq) return;
      state.phase = 'error';
      state.error = (e && e.message) || 'エラーが発生しました';
      state.errorDetail = (e && e.detail) || '';
      if (onUpdate) onUpdate();
    });
  }

  /* 現在地を取り直してから、選択中のカテゴリーを再検索する */
  function relocate(onUpdate) {
    var my = ++seq;
    state.phase = 'locating';
    state.error = ''; state.errorDetail = '';
    if (onUpdate) onUpdate();
    getLoc(true).then(function () {
      if (my !== seq) return;
      if (state.cat) select(state.cat, onUpdate);
      else { state.phase = 'idle'; if (onUpdate) onUpdate(); }
    }).catch(function (e) {
      if (my !== seq) return;
      state.phase = 'error';
      state.error = (e && e.message) || 'エラーが発生しました';
      state.errorDetail = (e && e.detail) || '';
      if (onUpdate) onUpdate();
    });
  }

  function retry(onUpdate) {
    if (state.cat) select(state.cat, onUpdate);
    else { state.phase = 'idle'; if (onUpdate) onUpdate(); }
  }

  // ---- Google クチコミ（任意・APIキー設定時のみ） ---------------------------
  /* Places API (New) の Text Search 1回で、OSM の名前＋座標から Google 側の
   * 場所を引き当て、評価・クチコミ・営業状況を取る。キーはこの端末の
   * localStorage にだけ保存し、Google 以外には送らない。 */
  var LS_GKEY = 'lifehub.gmapsKey';
  var gCache = {};
  function hasGoogleKey() { try { return !!localStorage.getItem(LS_GKEY); } catch (e) { return false; } }
  function setGoogleKey(k) {
    try {
      if (k) localStorage.setItem(LS_GKEY, k);
      else localStorage.removeItem(LS_GKEY);
    } catch (e) {}
    gCache = {};
  }
  function googlePlace(it) {
    /* 名称が無い場所（トイレ・駐車場など）は「トイレ」等の一般語で検索する
     * ことになり、別の施設が引き当たってしまう。照合しない（null = 該当なし）。 */
    if (!it.name) return Promise.resolve(null);
    var key = '';
    try { key = localStorage.getItem(LS_GKEY) || ''; } catch (e) {}
    if (!key) return Promise.reject(new Error('APIキーが未設定です'));
    var c = gCache[it.id];
    if (c && Date.now() - c.at < 600000) return Promise.resolve(c.place);
    var ctl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    return new Promise(function (resolve, reject) {
      var t = setTimeout(function () {
        reject(new Error('タイムアウト'));
        if (ctl) ctl.abort();
      }, 12000);
      fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.rating,' +
            'places.userRatingCount,places.reviews,places.currentOpeningHours.openNow,places.googleMapsUri'
        },
        body: JSON.stringify({
          textQuery: it.name || it.title,
          languageCode: 'ja',
          pageSize: 1,
          locationBias: { circle: { center: { latitude: it.lat, longitude: it.lng }, radius: 250 } }
        }),
        signal: ctl ? ctl.signal : undefined
      }).then(function (r) {
        if (r.ok) return r.json();
        /* 失敗時は本文 {error:{status,message}} を読み、実際の理由を添える */
        return r.json().catch(function () { return null; }).then(function (j) {
          var det = (j && j.error && (j.error.message || j.error.status)) || '';
          var msg;
          if (r.status === 429) msg = 'リクエスト上限に達しました（HTTP 429）。時間をおいてお試しください';
          else if (r.status === 400 || r.status === 403)
            msg = 'APIキーが無効か、Places API (New) が有効化されていません（HTTP ' + r.status +
                  (det ? ' · ' + det.slice(0, 120) : '') + '）';
          else msg = 'HTTP ' + r.status + (det ? '（' + det.slice(0, 120) + '）' : '');
          throw new Error(msg);
        });
      }).then(function (j) {
        clearTimeout(t);
        var p = (j.places && j.places[0]) || null;
        /* locationBias はあくまで“優先”で、圏外の結果も返りうる。座標を突き合わせ、
         * 300m 超離れた候補は別の場所とみなして採用しない（誤表示防止）。 */
        if (p && p.location &&
            hav(it.lat, it.lng, p.location.latitude, p.location.longitude) > 300) p = null;
        gCache[it.id] = { place: p, at: Date.now() };
        resolve(p);
      }).catch(function (e) { clearTimeout(t); reject(e); });
    });
  }

  // ---- Google マップ連携 ---------------------------------------------------
  /* 名前 + 座標で検索すると、Google 側でその場所の店舗ページに解決される。
   * 名前が無い場所は座標ピンで開く。 */
  function gmaps(it) {
    var ll = it.lat.toFixed(6) + ',' + it.lng.toFixed(6);
    return 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(it.name ? it.name + ' ' + ll : ll);
  }
  function gmapsDir(it) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent(it.lat.toFixed(6) + ',' + it.lng.toFixed(6));
  }

  return {
    CATS: CATS, state: state,
    select: select, relocate: relocate, retry: retry, warm: warm,
    fmtDist: fmtDist, gmaps: gmaps, gmapsDir: gmapsDir,
    addr: addr, hoursJa: hoursJa, cuisineJa: cuisineJa,
    hasGoogleKey: hasGoogleKey, setGoogleKey: setGoogleKey, googlePlace: googlePlace
  };
})();
