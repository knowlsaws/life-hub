/* life-hub — 近くのスポット検索（現在地 + Overpass API / OpenStreetMap）
 *
 * APIキー不要・無料・バックエンド不要のため「GitHub のみで完結」の方針を崩さない。
 * 現在地は端末の位置情報（天気と同じ仕組み）。POI は OpenStreetMap の
 * Overpass API をブラウザから直接呼び、ミラーを順に試す。
 * 位置情報はこの端末でのみ使い、どこにも保存・送信しない（検索座標を除く）。
 */
window.Nearby = (function () {
  /* 全球データを持つミラーを先に。overpass-api.de 本家は 2025 年以降
   * ボット対策で機械的なリクエストに 406 を返すことがあるため最後に回す。
   * openstreetmap.jp は日本コミュニティ運営（低遅延だが対象は日本中心）。 */
  var MIRRORS = [
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.private.coffee/api/interpreter',
    'https://overpass.openstreetmap.jp/api/interpreter',
    'https://overpass-api.de/api/interpreter'
  ];

  /* カテゴリー定義。q は Overpass のタグフィルタ（node/way 両方に適用）。
   * r は初期半径(m)。0件に近いときは自動で3倍(上限50km)に広げて1回だけ再検索する。
   * noname は無名でも載せる（トイレ・駐車場は名前が無いのが普通）。 */
  var CATS = [
    { k: 'rest',  n: 'レストラン',       e: '🍽',  r: 1500,
      q: ['["amenity"~"^(restaurant|fast_food|food_court)$"]'] },
    { k: 'cafe',  n: 'カフェ',           e: '☕',  r: 1500,
      q: ['["amenity"~"^(cafe|ice_cream)$"]'] },
    { k: 'conv',  n: 'コンビニ',         e: '🏪',  r: 1200,
      q: ['["shop"="convenience"]'] },
    { k: 'fuel',  n: 'ガソリンスタンド', e: '⛽',  r: 3000,
      q: ['["amenity"="fuel"]'] },
    { k: 'wc',    n: 'トイレ',           e: '🚻',  r: 1000, noname: 1,
      q: ['["amenity"="toilets"]'] },
    { k: 'eki',   n: '道の駅',           e: '🛣',  r: 20000,
      /* 道の駅は「name に道の駅」を正とし、SA/PA(highway=services/rest_area)も拾う。
       * バス停の「道の駅前」などは除外する。 */
      q: ['["name"~"道の駅"]["highway"!~"^(bus_stop|platform)$"]["public_transport"!~"."]',
          '["highway"~"^(rest_area|services)$"]'] },
    { k: 'super', n: 'スーパー',         e: '🛒',  r: 2000,
      q: ['["shop"="supermarket"]'] },
    { k: 'drug',  n: 'ドラッグストア',   e: '💊',  r: 2000,
      q: ['["amenity"="pharmacy"]', '["shop"~"^(chemist|drugstore)$"]'] },
    { k: 'park',  n: '駐車場',           e: '🅿️', r: 1200, noname: 1,
      q: ['["amenity"="parking"]["access"!~"^(private|no)$"]'] },
    { k: 'atm',   n: 'ATM・銀行',        e: '🏧',  r: 1500,
      q: ['["amenity"~"^(atm|bank)$"]'] },
    { k: 'hosp',  n: '病院',             e: '🏥',  r: 3000,
      q: ['["amenity"~"^(hospital|clinic|doctors)$"]'] },
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
   * 失敗しても黙っておき、実際の検索時に改めてエラーを出す。 */
  function warm(onUpdate) {
    if (warming || state.loc) return;
    warming = true;
    getLoc(false).then(function () { warming = false; onUpdate && onUpdate(); },
                       function () { warming = false; });
  }

  // ---- Overpass -----------------------------------------------------------
  /* クエリは短いので GET（共有リンクと同じ形式）で送る。POST よりも
   * 「人が使う形」に近く、本家のボット対策フィルタに弾かれにくい。
   * Accept は CORS セーフリストのヘッダなのでプリフライトも発生しない。 */
  function get(url, q, ms) {
    var ctl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var t = ctl ? setTimeout(function () { ctl.abort(); }, ms) : null;
    return fetch(url + '?data=' + encodeURIComponent(q), {
      headers: { Accept: 'application/json' },
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json().catch(function () { throw new Error('不正な応答'); });
    }).then(function (j) { if (t) clearTimeout(t); return j; },
            function (e) { if (t) clearTimeout(t); throw e; });
  }
  /* 失敗理由を「どのサーバーが・なぜ」まで残す。エラーカードに出すことで、
   * 手元で再現できない環境でもスクリーンショットから原因を特定できる。 */
  function failReason(e) {
    if (e && e.name === 'AbortError') return 'タイムアウト';
    if (e && /^HTTP \d+$/.test(e.message || '')) return e.message;
    if (e && e.message === '不正な応答') return e.message;
    return '接続エラー';
  }
  function overpass(q) {
    var i = 0, fails = [];
    function next() {
      if (i >= MIRRORS.length) {
        var err = new Error('検索サーバーに接続できませんでした。時間をおいて再試行してください。');
        err.detail = fails.join(' · ');
        return Promise.reject(err);
      }
      var url = MIRRORS[i++];
      return get(url, q, 14000).catch(function (e) {
        fails.push(url.replace(/^https:\/\//, '').split('/')[0] + ': ' + failReason(e));
        return next();
      });
    }
    return next();
  }
  function buildQuery(cat, loc, r) {
    var ll = r + ',' + loc.lat.toFixed(5) + ',' + loc.lng.toFixed(5);
    var lines = cat.q.map(function (f) {
      return 'node' + f + '(around:' + ll + ');way' + f + '(around:' + ll + ');';
    }).join('');
    return '[out:json][timeout:12];(' + lines + ');out center 80;';
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

  /* node と way の二重登録などの重複を、同名かつ150m以内で1つにまとめる */
  function dedupe(items) {
    var out = [], seen = {};
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
  function runSearch(cat, loc, r, expanded) {
    return overpass(buildQuery(cat, loc, r)).then(function (j) {
      var items = (j.elements || []).map(function (el) { return normalize(el, cat, loc); })
        .filter(Boolean)
        .sort(function (a, b) { return a.dist - b.dist; });
      items = dedupe(items).slice(0, 40);
      if (items.length < 3 && !expanded) {
        var r2 = Math.min(r * 3, 50000);
        if (r2 > r) return runSearch(cat, loc, r2, true);
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
      return runSearch(cat, loc, cat.r, false).then(function (res) {
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
    addr: addr, hoursJa: hoursJa, cuisineJa: cuisineJa
  };
})();
