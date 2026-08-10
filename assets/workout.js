/* life-hub — 筋トレ（ダンベルのみ）
 *
 * 目標: HUNTER×HUNTER のヒソカ（187cm / 91kg）の体格に、176cm で近づく。
 * メニューの設計根拠は下の SOURCES（ACSM 2026 ポジションスタンド / 厚労省ガイド 2023）。
 *
 * 図は SVG で描く。対象の筋肉を赤く塗り、動きは SMIL で往復させる
 * （CSS の transform-box に依存しないので iOS Safari でも確実に動く）。
 * 「動きを減らす」設定の端末ではアニメーションを付けない。
 */
window.Workout = (function () {
  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  // ---- 体格の目標 ---------------------------------------------------------
  var HISOKA = { h: 187, w: 91 };
  /* 身長 me(cm) でヒソカと同じ体格に見える体重。
   * ・BMI 一致 … 体格指数をそろえる（w ∝ 身長²）
   * ・相似形   … 体の比率をそのまま縮小する（w ∝ 身長³）
   * 見た目の「シルエット」は相似形、数値上の厚みは BMI 一致に近い。
   * どちらか一方が正解ではないので、両方出して幅で示す。 */
  function targets(me) {
    var r = me / HISOKA.h;
    var bmi = HISOKA.w / Math.pow(HISOKA.h / 100, 2);
    return {
      bmi: bmi,
      sameBmi: HISOKA.w * r * r,
      similar: HISOKA.w * r * r * r,
      // 体脂肪率 10% 想定の除脂肪体重（＝実際に増やす筋肉の量）
      leanAt: function (w) { return w * 0.9; }
    };
  }

  // ---- 筋肉の図 -----------------------------------------------------------
  /* 右半身だけ定義し、左は反転して使う（sym:1 は中央にある筋肉で反転しない）。
   * 名前は表示にも使う。 */
  var M = {
    // 前面
    chest:    { n: '大胸筋',   v: 'front', d: 'M104,71 C117,69 130,74 136,84 C131,99 118,106 104,102 Z' },
    delt_f:   { n: '三角筋前部', v: 'front', d: 'M133,64 C144,66 151,75 151,87 L137,84 C136,75 134,68 133,64 Z' },
    biceps:   { n: '上腕二頭筋', v: 'front', d: 'M140,90 L151,93 L149,128 L139,125 Z' },
    forearm:  { n: '前腕',     v: 'front', d: 'M138,146 L149,149 L147,193 L137,190 Z' },
    abs:      { n: '腹直筋',   v: 'front', sym: 1, d: 'M88,108 L112,108 L110,170 L90,170 Z' },
    oblique:  { n: '腹斜筋',   v: 'front', d: 'M113,112 L125,118 L121,162 L112,158 Z' },
    quads:    { n: '大腿四頭筋', v: 'front', d: 'M104,210 L123,210 L119,288 L106,288 Z' },
    tibialis: { n: '前脛骨筋', v: 'front', d: 'M108,304 L118,304 L115,368 L108,368 Z' },
    // 背面
    traps:    { n: '僧帽筋',   v: 'back', sym: 1, d: 'M84,58 L116,58 L129,82 L100,97 L71,82 Z' },
    lats:     { n: '広背筋',   v: 'back', d: 'M102,98 L129,86 L135,122 L118,152 L102,142 Z' },
    delt_r:   { n: '三角筋後部', v: 'back', d: 'M133,64 C144,66 151,75 151,87 L137,84 C136,75 134,68 133,64 Z' },
    triceps:  { n: '上腕三頭筋', v: 'back', d: 'M140,90 L151,93 L149,128 L139,125 Z' },
    forearm_b:{ n: '前腕',     v: 'back', d: 'M138,146 L149,149 L147,193 L137,190 Z' },
    erector:  { n: '脊柱起立筋', v: 'back', sym: 1, d: 'M92,100 L108,100 L106,176 L94,176 Z' },
    glutes:   { n: '大殿筋',   v: 'back', d: 'M102,180 L127,180 L125,213 L102,213 Z' },
    hams:     { n: 'ハムストリング', v: 'back', d: 'M104,215 L123,215 L119,290 L106,290 Z' },
    calves:   { n: 'ふくらはぎ', v: 'back', d: 'M106,300 L120,300 L116,362 L108,362 Z' }
  };
  function mName(id) { return (M[id] || {}).n || id; }

  /* 体のシルエット（筋肉を乗せる下地）。前後で共通。 */
  var SILHOUETTE =
    '<circle cx="100" cy="28" r="18"/>' +
    '<path d="M92,44 h16 v11 h-16 Z"/>' +
    '<path d="M100,53 C119,53 133,60 141,73 L136,122 L130,152 L127,184 L73,184 L70,152 L64,122 L59,73 C67,60 81,53 100,53 Z"/>' +
    '<path d="M74,182 L126,182 L124,208 L76,208 Z"/>' +
    // 脚（左右）
    '<path d="M103,206 L125,206 L120,296 L105,296 Z"/>' +
    '<path d="M97,206 L75,206 L80,296 L95,296 Z"/>' +
    '<path d="M106,298 L120,298 L117,390 L107,390 Z"/>' +
    '<path d="M94,298 L80,298 L83,390 L93,390 Z"/>' +
    // 腕（左右）
    '<path d="M139,70 L153,77 L150,140 L137,137 Z"/>' +
    '<path d="M61,70 L47,77 L50,140 L63,137 Z"/>' +
    '<path d="M137,142 L150,145 L147,199 L136,196 Z"/>' +
    '<path d="M63,142 L50,145 L53,199 L64,196 Z"/>';

  /* 対象の筋肉を赤く塗った人体図。primary=濃い赤、secondary=薄い赤。 */
  function bodySVG(view, primary, secondary) {
    primary = primary || []; secondary = secondary || [];
    var parts = '';
    Object.keys(M).forEach(function (id) {
      var m = M[id];
      if (m.v !== view) return;
      var lv = primary.indexOf(id) > -1 ? 1 : (secondary.indexOf(id) > -1 ? 2 : 0);
      if (!lv) return;
      var cls = lv === 1 ? 'm1' : 'm2';
      parts += '<path class="' + cls + '" d="' + m.d + '"/>';
      if (!m.sym) parts += '<path class="' + cls + '" d="' + m.d + '" transform="translate(200,0) scale(-1,1)"/>';
    });
    return '<svg class="bodysvg" viewBox="0 0 200 430" role="img" aria-label="' +
      (view === 'front' ? '前から見た体' : '後ろから見た体') + 'の図。' +
      primary.map(mName).join('・') + 'が赤く表示されています">' +
      '<g class="silh">' + SILHOUETTE + '</g>' + parts +
      '<text class="vlab" x="100" y="424" text-anchor="middle">' +
      (view === 'front' ? '前面' : '背面') + '</text></svg>';
  }

  // ---- 動きのアニメーション ------------------------------------------------
  /* 棒人間の関節を SMIL で往復させる。kind ごとに動かす部位と角度を決める。
   * dur は 1 往復の秒数。 */
  function anim(attr, from, to, dur) {
    if (reduceMotion) return '';
    return '<animateTransform attributeName="transform" type="' + attr[0] +
      '" values="' + from + ';' + to + ';' + from + '" dur="' + dur +
      's" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" ' +
      'keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>';
  }
  /* 棒人間: 頭・胴・上腕・前腕・太もも・すね。関節ごとに <g> を入れ子にして
   * 回転させる（肩を回すと肘から先も一緒に動く）。 */
  function figure(inner) {
    return '<svg class="animsvg" viewBox="0 0 160 200" role="img" aria-label="動作のアニメーション">' +
      '<line class="grd" x1="10" y1="188" x2="150" y2="188"/>' + inner + '</svg>';
  }
  function dumbbell(x, y) {
    return '<g class="db"><rect x="' + (x - 9) + '" y="' + (y - 2) + '" width="18" height="4" rx="2"/>' +
      '<rect x="' + (x - 12) + '" y="' + (y - 6) + '" width="5" height="12" rx="2"/>' +
      '<rect x="' + (x + 7) + '" y="' + (y - 6) + '" width="5" height="12" rx="2"/></g>';
  }
  var MOVES = {
    // 肘を曲げる（カール）
    curl: function () {
      return figure(
        '<circle class="hd" cx="80" cy="26" r="11"/>' +
        '<line class="bd" x1="80" y1="37" x2="80" y2="104"/>' +
        '<line class="bd" x1="80" y1="104" x2="68" y2="160"/><line class="bd" x1="80" y1="104" x2="92" y2="160"/>' +
        '<line class="bd" x1="68" y1="160" x2="66" y2="186"/><line class="bd" x1="92" y1="160" x2="94" y2="186"/>' +
        '<line class="bd" x1="80" y1="48" x2="98" y2="86"/>' +
        '<g>' + anim('rotate', '0 98 86', '-125 98 86', 3) +
        '<line class="bd" x1="98" y1="86" x2="98" y2="124"/>' + dumbbell(98, 126) + '</g>');
    },
    // 頭上に押し上げる（ショルダープレス）
    press: function () {
      return figure(
        '<circle class="hd" cx="80" cy="30" r="11"/>' +
        '<line class="bd" x1="80" y1="41" x2="80" y2="106"/>' +
        '<line class="bd" x1="80" y1="106" x2="68" y2="160"/><line class="bd" x1="80" y1="106" x2="92" y2="160"/>' +
        '<line class="bd" x1="68" y1="160" x2="66" y2="186"/><line class="bd" x1="92" y1="160" x2="94" y2="186"/>' +
        '<g>' + anim('translate', '0 0', '0 -30', 3) +
        '<line class="bd" x1="80" y1="52" x2="104" y2="52"/><line class="bd" x1="104" y1="52" x2="104" y2="34"/>' +
        '<line class="bd" x1="80" y1="52" x2="56" y2="52"/><line class="bd" x1="56" y1="52" x2="56" y2="34"/>' +
        dumbbell(104, 30) + dumbbell(56, 30) + '</g>');
    },
    // 胸の前で押す（ベンチプレス・仰向け）
    bench: function () {
      return figure(
        '<circle class="hd" cx="34" cy="120" r="10"/>' +
        '<line class="bd" x1="44" y1="120" x2="104" y2="120"/>' +
        '<line class="bd" x1="104" y1="120" x2="126" y2="140"/><line class="bd" x1="126" y1="140" x2="126" y2="170"/>' +
        '<rect class="bench" x="30" y="130" width="100" height="8" rx="3"/>' +
        '<g>' + anim('translate', '0 0', '0 -34', 3) +
        '<line class="bd" x1="70" y1="120" x2="70" y2="86"/><line class="bd" x1="94" y1="120" x2="94" y2="86"/>' +
        dumbbell(70, 82) + dumbbell(94, 82) + '</g>');
    },
    // 引く（ロウ）
    row: function () {
      return figure(
        '<circle class="hd" cx="52" cy="58" r="11"/>' +
        '<line class="bd" x1="62" y1="64" x2="104" y2="96"/>' +
        '<line class="bd" x1="104" y1="96" x2="100" y2="150"/><line class="bd" x1="100" y1="150" x2="104" y2="186"/>' +
        '<g>' + anim('translate', '0 0', '0 -34', 3) +
        '<line class="bd" x1="86" y1="84" x2="86" y2="132"/>' + dumbbell(86, 136) + '</g>');
    },
    // 横に上げる（サイドレイズ）
    raise: function () {
      return figure(
        '<circle class="hd" cx="80" cy="26" r="11"/>' +
        '<line class="bd" x1="80" y1="37" x2="80" y2="104"/>' +
        '<line class="bd" x1="80" y1="104" x2="68" y2="160"/><line class="bd" x1="80" y1="104" x2="92" y2="160"/>' +
        '<line class="bd" x1="68" y1="160" x2="66" y2="186"/><line class="bd" x1="92" y1="160" x2="94" y2="186"/>' +
        '<g>' + anim('rotate', '0 80 50', '-78 80 50', 3.4) +
        '<line class="bd" x1="80" y1="50" x2="80" y2="96"/>' + dumbbell(80, 100) + '</g>' +
        '<g>' + anim('rotate', '0 80 50', '78 80 50', 3.4) +
        '<line class="bd" x1="80" y1="50" x2="80" y2="96"/>' + dumbbell(80, 100) + '</g>');
    },
    // しゃがむ（スクワット・ランジ）
    squat: function () {
      return figure(
        '<g>' + anim('translate', '0 0', '0 26', 3.4) +
        '<circle class="hd" cx="80" cy="26" r="11"/>' +
        '<line class="bd" x1="80" y1="37" x2="80" y2="100"/>' +
        '<line class="bd" x1="80" y1="52" x2="62" y2="96"/><line class="bd" x1="80" y1="52" x2="98" y2="96"/>' +
        dumbbell(62, 100) + dumbbell(98, 100) + '</g>' +
        '<line class="bd" x1="80" y1="100" x2="62" y2="146"/><line class="bd" x1="80" y1="100" x2="98" y2="146"/>' +
        '<line class="bd" x1="62" y1="146" x2="66" y2="186"/><line class="bd" x1="98" y1="146" x2="94" y2="186"/>');
    },
    // 股関節を折る（ルーマニアンデッドリフト）
    hinge: function () {
      return figure(
        '<g>' + anim('rotate', '0 80 104', '-62 80 104', 3.6) +
        '<circle class="hd" cx="80" cy="30" r="11"/>' +
        '<line class="bd" x1="80" y1="41" x2="80" y2="104"/>' +
        '<line class="bd" x1="80" y1="54" x2="80" y2="96"/>' + dumbbell(80, 100) + '</g>' +
        '<line class="bd" x1="80" y1="104" x2="70" y2="150"/><line class="bd" x1="80" y1="104" x2="90" y2="150"/>' +
        '<line class="bd" x1="70" y1="150" x2="70" y2="186"/><line class="bd" x1="90" y1="150" x2="90" y2="186"/>');
    },
    // 腕を開く（フライ）
    fly: function () {
      return figure(
        '<circle class="hd" cx="34" cy="120" r="10"/>' +
        '<line class="bd" x1="44" y1="120" x2="104" y2="120"/>' +
        '<line class="bd" x1="104" y1="120" x2="126" y2="140"/><line class="bd" x1="126" y1="140" x2="126" y2="170"/>' +
        '<rect class="bench" x="30" y="130" width="100" height="8" rx="3"/>' +
        '<g>' + anim('rotate', '0 82 120', '-46 82 120', 3.4) +
        '<line class="bd" x1="82" y1="120" x2="82" y2="80"/>' + dumbbell(82, 76) + '</g>' +
        '<g>' + anim('rotate', '0 82 120', '46 82 120', 3.4) +
        '<line class="bd" x1="82" y1="120" x2="82" y2="80"/>' + dumbbell(82, 76) + '</g>');
    },
    // 肘を伸ばす（トライセプスエクステンション）
    ext: function () {
      return figure(
        '<circle class="hd" cx="80" cy="30" r="11"/>' +
        '<line class="bd" x1="80" y1="41" x2="80" y2="106"/>' +
        '<line class="bd" x1="80" y1="106" x2="68" y2="160"/><line class="bd" x1="80" y1="106" x2="92" y2="160"/>' +
        '<line class="bd" x1="68" y1="160" x2="66" y2="186"/><line class="bd" x1="92" y1="160" x2="94" y2="186"/>' +
        '<line class="bd" x1="80" y1="52" x2="80" y2="22"/>' +
        '<g>' + anim('rotate', '0 80 22', '110 80 22', 3) +
        '<line class="bd" x1="80" y1="22" x2="80" y2="52"/>' + dumbbell(80, 56) + '</g>');
    }
  };
  function moveSVG(kind) { return (MOVES[kind] || MOVES.curl)(); }

  // ---- メニュー -----------------------------------------------------------
  /* ダンベルだけで全身を鍛えられる 12 種目。回数はヒソカ体型（筋肥大）狙いの
   * 8〜12 回を基本にしつつ、ACSM 2026 のとおり「限界の 2〜3 回手前」で止める。 */
  var PARTS = [
    { k: 'chest', n: '胸', e: '🫀' },
    { k: 'back', n: '背中', e: '🔙' },
    { k: 'shoulder', n: '肩', e: '🎯' },
    { k: 'arm', n: '腕', e: '💪' },
    { k: 'leg', n: '脚', e: '🦵' },
    { k: 'core', n: '体幹', e: '🧱' }
  ];
  var EX = [
    { id: 'db-press', part: 'chest', n: 'ダンベルベンチプレス', move: 'bench',
      p: ['chest'], s: ['delt_f', 'triceps'],
      sets: '3〜4セット × 8〜12回', rest: '2分',
      how: ['ベンチ（無ければ床）に仰向けになり、ダンベルを胸の横で構える',
            '肩甲骨を寄せて胸を張り、肘は体幹から45〜60度に開く',
            '胸の真上へ弧を描くように押し上げる。肘は伸ばし切らない',
            '2〜3秒かけて胸の横まで下ろす'],
      tip: '床で行う場合は肘が床で止まるので、初心者でも安全に効かせやすい。',
      warn: '肩がすくむ・肘が90度より開くと肩を痛めやすい。' },
    { id: 'db-fly', part: 'chest', n: 'ダンベルフライ', move: 'fly',
      p: ['chest'], s: ['delt_f'],
      sets: '3セット × 10〜15回', rest: '90秒',
      how: ['仰向けで、ダンベルを胸の上に構える（手のひらは向かい合わせ）',
            '肘を軽く曲げたまま、弧を描いて腕を左右に開く',
            '胸の伸びを感じたら、同じ軌道で閉じる'],
      tip: 'プレスの後に行うと、胸の外側までしっかり刺激が入る。',
      warn: '重すぎると肩関節に負担が集中する。プレスより軽い重量で。' },
    { id: 'db-row', part: 'back', n: 'ワンハンドローイング', move: 'row',
      p: ['lats'], s: ['traps', 'biceps', 'delt_r'],
      sets: '3〜4セット × 8〜12回（左右）', rest: '90秒',
      how: ['ベンチや椅子に片手・片膝をつき、背中を床と平行に近づける',
            '反対の手でダンベルを持ち、腕を真下に伸ばす',
            '肘を後ろへ引き、みぞおちの横まで引き上げる',
            'ゆっくり戻し、背中が丸まらない範囲で下ろす'],
      tip: '「腕で引く」ではなく「肘で引く」と広背筋に入りやすい。',
      warn: '腰を反りすぎない。背中は常にまっすぐ。' },
    { id: 'db-rdl', part: 'back', n: 'ルーマニアンデッドリフト', move: 'hinge',
      p: ['hams', 'glutes'], s: ['erector', 'lats'],
      sets: '3セット × 8〜12回', rest: '2分',
      how: ['ダンベルを体の前で持ち、足は腰幅',
            '膝を軽く曲げたまま、股関節を後ろに引いて上体を倒す',
            'もも裏が伸びたら、お尻を締めて立ち上がる'],
      tip: '「膝を曲げる」のではなく「お尻を後ろへ引く」動き。',
      warn: '背中が丸まると腰を痛める。丸まる手前が可動域の限界。' },
    { id: 'db-pullover', part: 'back', n: 'ダンベルプルオーバー', move: 'fly',
      p: ['lats'], s: ['chest', 'triceps'],
      sets: '3セット × 10〜15回', rest: '90秒',
      how: ['仰向けで両手で1個のダンベルを持ち、胸の上に構える',
            '肘を軽く曲げたまま、頭の後ろへ弧を描いて下ろす',
            '脇の下の伸びを感じたら、同じ軌道で戻す'],
      tip: '肋骨まわりが広がり、上半身に厚みが出やすい種目。',
      warn: '無理に深く下ろすと肩を痛める。伸びを感じる範囲で止める。' },
    { id: 'db-shoulder', part: 'shoulder', n: 'ショルダープレス', move: 'press',
      p: ['delt_f'], s: ['triceps', 'traps'],
      sets: '3〜4セット × 8〜12回', rest: '2分',
      how: ['座って背筋を伸ばし、ダンベルを肩の高さで構える',
            '肘を軽く前に向け、頭上へ押し上げる',
            '耳の横を通る軌道でゆっくり下ろす'],
      tip: '立って行うより座った方が、反動を使わず肩に効かせられる。',
      warn: '腰が反るのは重すぎるサイン。腹圧を入れて固定する。' },
    { id: 'db-lateral', part: 'shoulder', n: 'サイドレイズ', move: 'raise',
      p: ['delt_f'], s: ['traps'],
      sets: '3セット × 12〜20回', rest: '60秒',
      how: ['ダンベルを体の横に持ち、肘を少し曲げる',
            '小指側から持ち上げるイメージで、肩の高さまで真横に上げる',
            '3秒かけて下ろす'],
      tip: '肩幅（＝逆三角形のシルエット）を作る種目。軽い重量で回数を稼ぐ。',
      warn: '反動で上げると僧帽筋に逃げる。肩より高く上げない。' },
    { id: 'db-rear', part: 'shoulder', n: 'リアレイズ', move: 'fly',
      p: ['delt_r'], s: ['traps', 'lats'],
      sets: '3セット × 12〜20回', rest: '60秒',
      how: ['上体を前に倒し、ダンベルを下に構える',
            '肘を軽く曲げたまま、後方へ弧を描いて開く',
            '肩甲骨を寄せすぎず、肩の後ろで動かす'],
      tip: '猫背の改善にも効く。プレス系で前ばかり鍛えると肩を痛めやすい。',
      warn: '重すぎると背中で引いてしまう。軽い重量で丁寧に。' },
    { id: 'db-curl', part: 'arm', n: 'ダンベルカール', move: 'curl',
      p: ['biceps'], s: ['forearm'],
      sets: '3セット × 8〜12回', rest: '90秒',
      how: ['ダンベルを体の横に持ち、肘を体側に固定する',
            '肘の位置を動かさずに、手のひらを上に返しながら曲げる',
            '3秒かけて下ろし、下で伸ばし切る'],
      tip: '下ろす動作をゆっくりにするほど効く。',
      warn: '肘が前に出ると負荷が逃げる。体を振らない。' },
    { id: 'db-tri', part: 'arm', n: 'トライセプスエクステンション', move: 'ext',
      p: ['triceps'], s: [],
      sets: '3セット × 10〜15回', rest: '90秒',
      how: ['両手で1個のダンベルを持ち、頭の上に構える',
            '肘の位置を固定したまま、頭の後ろへ下ろす',
            '肘を伸ばして戻す'],
      tip: '腕の太さの3分の2は三頭筋。腕を太くするならここが本命。',
      warn: '肘が開くと負荷が逃げる。肘は前に向けたまま。' },
    { id: 'db-squat', part: 'leg', n: 'ゴブレットスクワット', move: 'squat',
      p: ['quads'], s: ['glutes', 'abs'],
      sets: '3〜4セット × 8〜15回', rest: '2分',
      how: ['ダンベル1個を胸の前で縦に持つ',
            '足は肩幅、つま先はやや外向き',
            '胸を張ったまま、太ももが床と平行になるまでしゃがむ',
            'かかとで床を押して立ち上がる'],
      tip: '全身の中で最も大きい筋肉。体重を増やすなら外せない。',
      warn: '膝を内に入れない。かかとが浮くなら足幅を見直す。' },
    { id: 'db-lunge', part: 'leg', n: 'ブルガリアンスクワット', move: 'squat',
      p: ['quads', 'glutes'], s: ['hams', 'abs'],
      sets: '3セット × 8〜12回（左右）', rest: '90秒',
      how: ['後ろ足の甲を椅子やベンチに乗せる',
            'ダンベルを両手に持ち、前足に体重を乗せる',
            '前ももとお尻が伸びるまで沈み、押し戻す'],
      tip: '片脚ずつなので軽いダンベルでも十分に追い込める。',
      warn: 'ふらつくときは壁に手を添えて。まず自重で練習する。' },
    { id: 'db-plank', part: 'core', n: 'ダンベルプランクロウ', move: 'row',
      p: ['abs', 'oblique'], s: ['lats', 'erector'],
      sets: '3セット × 8〜10回（左右）', rest: '60秒',
      how: ['ダンベルを両手に持ち、腕立て伏せの姿勢をとる',
            '腰をひねらないよう固定したまま、片手を引き上げる',
            'ゆっくり戻し、反対側も同様に'],
      tip: '腹筋と背中を同時に使う。腰が振れないよう足幅を広めに。',
      warn: '腰が反る・お尻が上がるならダンベルを置いて自重から。' },
    { id: 'db-side', part: 'core', n: 'サイドベンド', move: 'curl',
      p: ['oblique'], s: ['abs', 'erector'],
      sets: '3セット × 12〜20回（左右）', rest: '60秒',
      how: ['片手にダンベルを持ち、まっすぐ立つ',
            '体を真横にゆっくり倒す（前後に傾けない）',
            '脇腹を締めて元に戻す'],
      tip: 'くびれというより、胴を厚くして体重を増やす方向に効く。',
      warn: '重すぎると腰を痛める。可動域を優先する。' }
  ];

  /* 週の組み方。ACSM 2026 の「各筋群を週2回以上・週あたり10セット以上」を
   * 満たすように、上半身/下半身を交互に週4回で回す。 */
  var PLAN = [
    { d: '月', n: '上半身プッシュ', ex: ['db-press', 'db-fly', 'db-shoulder', 'db-lateral', 'db-tri'] },
    { d: '火', n: '下半身 + 体幹', ex: ['db-squat', 'db-rdl', 'db-lunge', 'db-plank'] },
    { d: '水', n: '休養', ex: [] },
    { d: '木', n: '上半身プル', ex: ['db-row', 'db-pullover', 'db-rear', 'db-curl'] },
    { d: '金', n: '下半身 + 体幹', ex: ['db-squat', 'db-lunge', 'db-side', 'db-plank'] },
    { d: '土', n: '弱点補強（自由）', ex: ['db-lateral', 'db-curl', 'db-tri'] },
    { d: '日', n: '休養', ex: [] }
  ];

  var SOURCES = [
    { t: 'ACSM 2026 ポジションスタンド（137のレビューを統合）', to: 'https://acsm.org/resistance-training-guidelines-update-2026/' },
    { t: '同・原著（Medicine & Science in Sports & Exercise / PubMed）', to: 'https://pubmed.ncbi.nlm.nih.gov/41843416/' },
    { t: '厚生労働省 健康づくりのための身体活動・運動ガイド2023（筋トレ情報シート）', to: 'https://kennet.mhlw.go.jp/information/information/exercise/s-00-005.html' },
    { t: '同ガイド 本文（PDF）', to: 'https://www.mhlw.go.jp/content/001194020.pdf' }
  ];

  /* ガイドラインの要点（メニューの根拠として画面に出す） */
  var RULES = [
    ['頻度', '各筋群を週2回以上（ACSM 2026）。厚労省ガイドも週2〜3日を推奨'],
    ['量', '筋肥大は1筋群あたり週10セット以上が目安（ACSM 2026）'],
    ['回数', '効果と総量が同じなら回数の幅は結果を左右しない。8〜12回は続けやすい目安'],
    ['追い込み', '限界まで追い込む必要はない。あと2〜3回できる所で止めても効果は同じ'],
    ['伸ばし方', '重量か回数を少しずつ増やす（漸進性過負荷・厚労省ガイド）'],
    ['続け方', '完璧な計画より、数ヶ月〜数年続けることが結果を決める（ACSM 2026）']
  ];

  /* 表示する面は筋肉から自動で決める（手で指定するとズレるため）。
   * 主働筋が前後にまたがる種目は、両面とも返す。 */
  function viewsFor(e) {
    var vs = [];
    (e.p || []).concat(e.s || []).forEach(function (id) {
      var m = M[id]; if (!m) return;
      // 主働筋は必ず見せる。補助筋だけの面は増やさない
      if ((e.p || []).indexOf(id) > -1 && vs.indexOf(m.v) < 0) vs.push(m.v);
    });
    if (!vs.length) vs = ['front'];
    return vs;
  }
  function byPart(k) { return EX.filter(function (e) { return e.part === k; }); }
  function find(id) { for (var i = 0; i < EX.length; i++) if (EX[i].id === id) return EX[i]; return null; }

  return {
    HISOKA: HISOKA, targets: targets, PARTS: PARTS, EX: EX, PLAN: PLAN,
    SOURCES: SOURCES, RULES: RULES,
    bodySVG: bodySVG, moveSVG: moveSVG, mName: mName, byPart: byPart, find: find,
    viewsFor: viewsFor
  };
})();
