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

  // ---- 3D 風の人体イラスト -------------------------------------------------
  /* 灰色のマネキンを、パーツごとに筒状のグラデーションで塗って立体的に見せる。
   * 効く筋肉だけを赤いグラデーション＋発光で浮かせる（塗りの定義は index.html）。
   *
   * 骨格は <g> の入れ子。関節ごとに「移動する外側の <g>」と「回す内側の <g>」に
   * 分け、内側だけを SMIL の animateTransform で往復させる。
   * （transform 属性を直接アニメーションさせると移動が消えるため必ず分ける。
   *   CSS の transform-box に依存しないので iOS Safari でも確実に動く。） */

  // 骨格の寸法（骨盤の中心が原点。上が -y）
  var G = {
    shX: 31, shY: -66, uArm: 40, fArm: 36,   // 肩の位置 / 上腕 / 前腕
    hipX: 13, hipY: 14, thigh: 46, shin: 44, // 股関節 / 太もも / すね
    neck: -78, headY: -101, headR: 13
  };

  /* 筋肉の名前と、体のどこ（seg）のどちら側（v）に見えるか。
   * 図は下の A（筋肉ひとつずつの形）で描き、ここの id と結びつけて赤くする。 */
  var M = {
    // 前面
    chest:    { n: '大胸筋',      v: 'front', seg: 'torso' },
    delt_f:   { n: '三角筋前部',  v: 'front', seg: 'arm' },
    biceps:   { n: '上腕二頭筋',  v: 'front', seg: 'arm' },
    forearm:  { n: '前腕',        v: 'front', seg: 'fore' },
    abs:      { n: '腹直筋',      v: 'front', seg: 'torso' },
    oblique:  { n: '腹斜筋',      v: 'front', seg: 'torso' },
    quads:    { n: '大腿四頭筋',  v: 'front', seg: 'thigh' },
    tibialis: { n: '前脛骨筋',    v: 'front', seg: 'shin' },
    // 背面
    traps:    { n: '僧帽筋',      v: 'back',  seg: 'torso' },
    lats:     { n: '広背筋',      v: 'back',  seg: 'torso' },
    delt_r:   { n: '三角筋後部',  v: 'back',  seg: 'arm' },
    triceps:  { n: '上腕三頭筋',  v: 'back',  seg: 'arm' },
    forearm_b:{ n: '前腕',        v: 'back',  seg: 'fore' },
    erector:  { n: '脊柱起立筋',  v: 'back',  seg: 'torso' },
    glutes:   { n: '大殿筋',      v: 'back',  seg: 'pelvis' },
    hams:     { n: 'ハムストリング', v: 'back', seg: 'thigh' },
    calves:   { n: 'ふくらはぎ',  v: 'back',  seg: 'shin' }
  };
  function mName(id) { return (M[id] || {}).n || id; }

  /* 見えている筋肉を 1 つずつ描くための形。パーツごとのローカル座標。
   * id …… 効く筋肉として赤くできるもの（M の見出し）。無いものは陰影用の筋肉。
   * sym:1 … 体の中心にあるので左右に複製しない。
   * 右半身だけ書き、左は scale(-1,1) で複製する（光の向きも入れ替える）。 */
  var A = {
    torso: {
      front: [
        // 首
        { d: 'M2,-89 C5,-84 7,-80 8,-76 L2,-76 C1.5,-81 1.8,-85 2,-89 Z' },
        // 僧帽筋（首から肩へ落ちる線）
        { id: 'traps', d: 'M5,-85 C15,-83 25,-78 33,-69 C25,-71 14,-73 5,-73 Z' },
        // 大胸筋（鎖骨部 / 胸肋部）
        { id: 'chest', d: 'M3,-73 C13,-76 24,-73 32,-66 C24,-63.5 13,-62.5 4,-63.5 Z',
          f: 'M7,-71 C15,-72 23,-70 29,-66.5' },
        { id: 'chest', d: 'M3,-62.5 C13,-61.5 24,-63 31.5,-65 C30,-55 20,-45 5,-46.5 ' +
          'C4,-52 3,-58 3,-62.5 Z',
          f: 'M6,-59 C14,-57.5 22,-57 28.5,-59.5 M6,-53 C13,-51.5 20,-51 26,-54 ' +
             'M6,-48 C11,-47 16,-47 21,-49' },
        // 広背筋（脇の下から見える縁）
        { id: 'lats', d: 'M27,-62 C32,-56 33.5,-49 31.5,-41 L27.5,-43.5 C28.5,-51 28.5,-57 27,-62 Z',
          f: 'M28.5,-58 C30.5,-53 31,-48 30,-44' },
        // 前鋸筋（肋骨の上のギザギザ）
        { d: 'M14,-46 C19,-47 24,-46 27,-44 C24,-42 19,-42 14.5,-43 Z' },
        { d: 'M13.5,-40.5 C18.5,-41.5 23,-40.5 26,-38.5 C23,-36.5 18,-36.5 14,-37.5 Z' },
        { d: 'M13,-35 C18,-36 22,-35 25,-33 C22,-31 17.5,-31 13.5,-32 Z' },
        // 腹直筋（左右 4 段）
        { id: 'abs', d: 'M1.5,-45 C5,-46.5 10,-45.5 12,-43.5 L11.8,-37.5 C8,-36 4,-36 1.5,-36.8 Z' },
        { id: 'abs', d: 'M1.5,-35.5 C5,-36.5 9.5,-36 11.8,-34.8 L11.5,-28 C8,-26.5 4,-26.5 1.5,-27.3 Z' },
        { id: 'abs', d: 'M1.5,-26 C5,-27 9.5,-26.5 11.5,-25.3 L11,-18.5 C8,-17 4,-17 1.5,-17.8 Z' },
        { id: 'abs', d: 'M1.5,-16.5 C5,-17.5 9,-17 11,-15.8 L10,-4.5 C7,-2 4,-2 1.5,-3.5 Z' },
        // 腹斜筋
        { id: 'oblique', d: 'M13,-43 C20,-41 24.5,-35 25,-27 C25,-17 21,-9 16,-3.5 L12.8,-8 ' +
          'C14,-20 14,-31 13,-43 Z',
          f: 'M15,-38 C20,-33 22.5,-26 22,-16 M14,-28 C18,-24 20,-19 19.5,-12' }
      ],
      back: [
        // 僧帽筋（上部の傾斜 / 中下部のひし形）
        { id: 'traps', d: 'M4,-87 C14,-84 25,-79 33,-70 C24,-67 13,-64.5 4,-63 Z' },
        { id: 'traps', sym: 1, d: 'M0,-71 C9,-69 16.5,-62 19,-54 C13,-45 6,-38 0,-33.5 ' +
          'C-6,-38 -13,-45 -19,-54 C-16.5,-62 -9,-69 0,-71 Z',
          f: 'M0,-68 L0,-36 M2,-67 C8,-63 13,-58 16,-54 M-2,-67 C-8,-63 -13,-58 -16,-54 ' +
             'M2,-45 C7,-49 12,-53 16,-55 M-2,-45 C-7,-49 -12,-53 -16,-55' },
        // 棘下筋・大円筋（肩甲骨まわり）
        { d: 'M9,-68 C17,-67 23,-63 24,-58.5 C19,-56.5 12,-58 8,-62 Z' },
        { d: 'M13,-62 C20.5,-60 25.5,-56.5 26,-52.5 C22,-50.5 16,-52.5 12.5,-56.5 Z' },
        // 広背筋（背中の翼）
        { id: 'lats', d: 'M7,-57 C18,-55 28,-49.5 32,-42 C31,-32 24,-25 13,-19 L6,-23 ' +
          'C9,-35 9,-47 7,-57 Z',
          f: 'M9,-51 C17,-47 24,-42 29,-38 M9,-42 C16,-38 22,-33 26,-29 ' +
             'M8.5,-33 C14,-30 19,-26 22,-23' },
        // 脊柱起立筋（背骨の両脇）
        { id: 'erector', d: 'M2,-42 C6,-44 9.5,-41 9.5,-34 L8.5,-8 C5,-4.5 2,-4.5 2,-8.5 Z',
          f: 'M5.5,-38 L5,-10' }
      ]
    },
    arm: {
      front: [
        { id: 'delt_f', d: 'M-9,-7 C-4,-12.5 2,-10.5 3,1 C1,7 -5,8 -8.5,4 Z' },
        { id: 'delt_f', d: 'M2,-10.5 C7.5,-11.5 11,-5 11,3 C10,10 4,11 2,5 Z',
          f: 'M4.5,-9 C6,-4 6.5,2 5.5,8 M7.5,-8 C9,-4 9.5,1 9,6' },
        { id: 'biceps', d: 'M-6.5,9 C-2,6 2,8 3,16 C3,26 2,32 1,37 C-2,37 -6.5,30 -6.5,20 Z',
          f: 'M-2.5,12 C-1,20 -1,28 -1.5,35' },
        { id: 'biceps', d: 'M3,11 C6.5,10 7.5,15 7.5,21 C7.5,29 5.5,34 3.5,37 L1.8,37 ' +
          'C2.6,30 3,20 3,11 Z' },
        { d: 'M5,25 C8.5,26 9.5,30 9.5,34 L7.5,39 L4.5,38 Z' }
      ],
      back: [
        { id: 'delt_r', d: 'M-9,-7 C-4,-12.5 2,-10.5 3,1 C1,7 -5,8 -8.5,4 Z' },
        { id: 'delt_r', d: 'M2,-10.5 C7.5,-11.5 11,-5 11,3 C10,10 4,11 2,5 Z',
          f: 'M4.5,-9 C6,-4 6.5,2 5.5,8 M7.5,-8 C9,-4 9.5,1 9,6' },
        { id: 'triceps', d: 'M-6.5,8 C-2,5 1,8 2,18 C2,28 1,33 0,37 C-3,37 -6.5,30 -6.5,20 Z',
          f: 'M-2.5,11 C-1.5,20 -1.5,28 -2,35' },
        { id: 'triceps', d: 'M2,10 C6.5,9 8,15 8,22 C8,30 6,34.5 4,37 L2,37 C2.8,30 2,20 2,10 Z' }
      ]
    },
    fore: {
      front: [
        { id: 'forearm', d: 'M-5.5,4 C-1.5,2 2,5 2.5,12 C2.5,21 1.5,27 0.5,32 ' +
          'C-2.5,32 -5.5,26 -5.5,16 Z' },
        { id: 'forearm', d: 'M2,3 C5.5,3.5 6.5,9 6.5,15 C6.5,23 4.5,28 2.5,32 L1,32 ' +
          'C1.8,24 2,14 2,3 Z' }
      ],
      back: [
        { id: 'forearm_b', d: 'M-5.5,4 C-1.5,2 2,5 2.5,12 C2.5,21 1.5,27 0.5,32 ' +
          'C-2.5,32 -5.5,26 -5.5,16 Z' },
        { id: 'forearm_b', d: 'M2,3 C5.5,3.5 6.5,9 6.5,15 C6.5,23 4.5,28 2.5,32 L1,32 ' +
          'C1.8,24 2,14 2,3 Z' }
      ]
    },
    thigh: {
      front: [
        // 内転筋（内もも）
        { d: 'M-9,5 C-6,3.5 -4.5,9 -4.5,15 L-6.5,26 L-9,21 Z' },
        // 大腿直筋（真ん中）
        { id: 'quads', d: 'M-3.5,4 C0.5,2 4,4.5 4.5,14 C4.5,28 3.5,38 2.5,45 L-1.5,45 ' +
          'C-2.5,34 -3.5,18 -3.5,4 Z',
          f: 'M0.5,8 C1.5,20 1.5,33 1,43' },
        // 外側広筋
        { id: 'quads', d: 'M4,5 C8,6.5 9.5,14 9.5,22 C9.5,32 7.5,40 5.5,45 L3.5,45 ' +
          'C4.5,32 5,18 4,5 Z' },
        // 内側広筋（膝の内側のふくらみ）
        { id: 'quads', d: 'M-8,19 C-4.5,21 -3,29 -4,39 C-5,45 -8,46 -9,41 C-9,33 -8.5,25 -8,19 Z' }
      ],
      back: [
        { d: 'M-9,4 C-6,3 -4.5,8 -4.5,14 L-6.5,25 L-9,20 Z' },
        // 大腿二頭筋（外側）
        { id: 'hams', d: 'M3,5 C7,6.5 9,14 9,24 C9,34 7,40.5 5,44 L3,44 C4,30 4,16 3,5 Z',
          f: 'M5.5,9 C6.5,20 6.5,32 5.5,42' },
        // 半腱様筋・半膜様筋（内側）
        { id: 'hams', d: 'M-8,5 C-4,4 -2,10 -2,20 C-2,32 -4,40 -5.5,44 L-8,44 ' +
          'C-9,30 -9,16 -8,5 Z' }
      ]
    },
    shin: {
      front: [
        { id: 'tibialis', d: 'M-4.5,4 C-0.5,2 2.5,6 2.5,14 C2.5,25 1.5,32 0.5,37 L-2.5,36 ' +
          'C-4.5,28 -4.5,14 -4.5,4 Z' },
        { d: 'M3,6 C5.5,7 6,12 5.5,18 L4,28 L2.5,26 C3,18 3,12 3,6 Z' }
      ],
      back: [
        // 腓腹筋（内側頭・外側頭）
        { id: 'calves', d: 'M-6.5,3 C-3,1 -0.5,5 -0.5,14 C-0.5,22 -2.5,28 -4,32 ' +
          'C-6,29 -7,20 -6.5,3 Z' },
        { id: 'calves', d: 'M0.5,3 C4.5,2 6.5,6 6.5,14 C6.5,22 4.5,28 3,32 L1.5,32 ' +
          'C1.5,22 0.5,12 0.5,3 Z',
          f: 'M3.5,6 C4.5,13 4.5,22 3.5,29' },
        // ヒラメ筋（アキレス腱へ）
        { id: 'calves', sym: 1, d: 'M-4,27 C-1,29 1,29 4,27 L2.5,38 L-2.5,38 Z' }
      ]
    },
    pelvis: {
      front: [
        { d: 'M2,-5 C10,-7 17,-2 19,6 C17,13 11,17 3,15 Z' },
        { d: 'M1,10 C4,12 7,16 8,21 L2,21 Z' }
      ],
      back: [
        // 中殿筋 / 大殿筋
        { id: 'glutes', d: 'M13,-7 C19,-8 22.5,-3 22.5,3 C19.5,1.5 15,-2 13,-7 Z' },
        { id: 'glutes', d: 'M2,-3 C11,-6 20,0.5 22,9 C21,17 13,21 4,19 C2.5,12 2,4 2,-3 Z',
          f: 'M5,-1 C11,2 16,7 19,12 M4,6 C8,9 12,13 14,17' }
      ]
    }
  };

  // ---- 図を組み立てる道具 --------------------------------------------------
  function r2(n) { return Math.round(n * 100) / 100; }
  function pair(v) { return (v && v.length === 2) ? v : [v, v]; }        // 角度を [開始,終了] に揃える
  function neg(v) { v = pair(v); return [-v[0], -v[1]]; }
  function add(a, b) { a = pair(a); b = pair(b); return [a[0] + b[0], a[1] + b[1]]; }
  function moves(v) { v = pair(v); return v[0] !== v[1]; }

  var EASE = 'calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"';
  /* 内側の <g> を回す。角度が [開始,終了] なら往復アニメーション。 */
  function rotG(ang, dur, inner) {
    var a = pair(ang);
    if (!moves(a) || reduceMotion) return '<g transform="rotate(' + r2(a[0]) + ')">' + inner + '</g>';
    return '<g><animateTransform attributeName="transform" type="rotate" values="' +
      r2(a[0]) + ';' + r2(a[1]) + ';' + r2(a[0]) + '" dur="' + dur +
      's" repeatCount="indefinite" ' + EASE + '/>' + inner + '</g>';
  }
  /* 上下に動かす（しゃがむ動作など）。 */
  function movG(dy, dur, inner) {
    var y = pair(dy);
    if (!moves(y) || reduceMotion) return '<g transform="translate(0,' + r2(y[0]) + ')">' + inner + '</g>';
    return '<g><animateTransform attributeName="transform" type="translate" values="0 ' +
      r2(y[0]) + ';0 ' + r2(y[1]) + ';0 ' + r2(y[0]) + '" dur="' + dur +
      's" repeatCount="indefinite" ' + EASE + '/>' + inner + '</g>';
  }
  /* 関節: 外側の <g> で位置（と左右反転）を決め、内側の <g> だけを回す。 */
  function joint(x, y, mirror, ang, dur, inner) {
    return '<g transform="translate(' + r2(x) + ',' + r2(y) + ')' + (mirror ? ' scale(-1,1)' : '') +
      '">' + rotG(ang, dur, inner) + '</g>';
  }

  /* 先細りの筒（腕・脚）。両端を丸め、付け根には関節の球を重ねて継ぎ目を隠す。 */
  function taper(len, w0, w1) {
    var a = w0 / 2, b = w1 / 2, k = b * 1.3;
    return 'M' + (-a) + ',0 C' + (-a - 1.5) + ',' + r2(len * .42) + ' ' + (-b - 1.2) + ',' + r2(len * .72) +
      ' ' + (-b) + ',' + len + ' C' + (-b) + ',' + r2(len + k) + ' ' + b + ',' + r2(len + k) + ' ' + b + ',' + len +
      ' C' + (b + 1.2) + ',' + r2(len * .72) + ' ' + (a + 1.5) + ',' + r2(len * .42) + ' ' + a + ',0 Z';
  }
  function limb(len, w0, w1) {
    return '<ellipse class="sk" cx="0" cy="0" rx="' + r2(w0 / 2) + '" ry="' + r2(w0 / 2 * .92) + '"/>' +
      '<path class="sk" d="' + taper(len, w0, w1) + '"/>';
  }
  function sk(d) { return '<path class="sk" d="' + d + '"/>'; }

  /* そのパーツに見えている筋肉を全部描く。効く筋肉だけ赤くして光らせる。
   * lv: 1=主に効く（発光）/ 2=補助。mir はパーツ自体が反転しているか（光の向き用）。 */
  function musc(seg, view, lv, glow, mir) {
    var list = (A[seg] || {})[view] || [], o = '';
    for (var i = 0; i < list.length; i++) {
      var s = list[i], l = s.id ? lv(s.id) : 0;
      o += one(s, l, glow, !!mir);
      if (!s.sym) o += one(s, l, glow, !mir, 1);
    }
    return o;
  }
  /* 筋肉ひとつ。flip なら左半身として反転して描く。
   * 反転すると光も裏返るので、塗りは左右で別のグラデーションを使う。 */
  function one(s, l, glow, right, flip) {
    var g = (l === 1 || l === 2 ? 'wgRed' : 'wgMus') + (right ? 'R' : '');
    var t = flip ? ' transform="scale(-1,1)"' : '';
    // 効く筋肉はぼかして「にじみ」にする（添付写真と同じ見え方。輪郭は出さない）
    var f = l === 1 ? ' filter="url(#wgGlow)"' : l === 2 ? ' filter="url(#wgGlow2)"' : '';
    return '<path class="' + (l === 1 ? 'm1' : l === 2 ? 'm2' : 'mm') + '" d="' + s.d +
      '" fill="url(#' + g + ')"' + t + f + '/>' +
      // 筋繊維の流れ（赤くにじんだ所には引かない）
      (s.f && !l ? '<path class="fb" d="' + s.f + '"' + t + '/>' : '');
  }

  // ---- 体のパーツ -----------------------------------------------------------
  var TORSO = 'M-19,-78 C-27,-77 -33,-72 -34,-63 C-35,-53 -31,-44 -27,-36 ' +
    'C-23,-29 -20,-25 -19,-18 C-19,-10 -20,-5 -21,0 L21,0 ' +
    'C20,-5 19,-10 19,-18 C20,-25 23,-29 27,-36 C31,-44 35,-53 34,-63 ' +
    'C33,-72 27,-77 19,-78 Z';
  var PELVIS = 'M-21,-6 C-23,4 -21,14 -16,20 C-10,23 -5,21 0,15 ' +
    'C5,21 10,23 16,20 C21,14 23,4 21,-6 Z';
  var IRON =
    '<rect x="-13" y="-2.6" width="26" height="5.2" rx="2.6"/>' +
    '<rect x="-19" y="-8" width="7" height="16" rx="3"/>' +
    '<rect x="12" y="-8" width="7" height="16" rx="3"/>';
  function dumbbell(rot, dur, vert) {
    return rotG(vert ? add(rot, 90) : rot, dur, '<g class="ir">' + IRON + '</g>');
  }

  /* 頭。首の胸鎖乳突筋と顎の陰で、のっぺりした球にならないようにする。 */
  function head(view) {
    var y = G.headY, r = G.headR;
    return '<path class="sk" d="M-8.5,-74 C-8.5,-80 -8,-86 -7.5,-90 L7.5,-90 C8,-86 8.5,-80 8.5,-74 Z"/>' +
      '<path class="mm" fill="url(#wgMus)" d="M-6.5,-76 C-6,-82 -5.5,-86 -5,-89 L-1,-89 ' +
      'C-1.5,-85 -2,-80 -2.5,-76 Z"/>' +
      '<path class="mm" fill="url(#wgMusR)" d="M6.5,-76 C6,-82 5.5,-86 5,-89 L1,-89 ' +
      'C1.5,-85 2,-80 2.5,-76 Z"/>' +
      // 頭は卵形＋顎（のっぺりした球にしない）
      '<path class="hd" d="M0,' + (y - r - 1) + ' C' + (r - 1) + ',' + (y - r - 1) + ' ' +
        (r + 0.5) + ',' + (y - r + 6) + ' ' + (r + 0.5) + ',' + (y - 1) +
        ' C' + (r + 0.5) + ',' + (y + 6) + ' ' + (r - 4) + ',' + (y + r - 2) + ' 0,' + (y + r - 1) +
        ' C' + (4 - r) + ',' + (y + r - 2) + ' ' + (-r - 0.5) + ',' + (y + 6) + ' ' +
        (-r - 0.5) + ',' + (y - 1) +
        ' C' + (-r - 0.5) + ',' + (y - r + 6) + ' ' + (1 - r) + ',' + (y - r - 1) + ' 0,' + (y - r - 1) + ' Z"/>' +
      (view === 'back' ? '<path class="ln" d="M0,' + (y + r - 4) + ' L0,' + (y - r + 6) + '"/>' : '');
  }
  /* 胴。下地を敷いてから筋肉を 1 つずつ乗せ、最後に溝の線で締める。 */
  function torso(view, lv, glow, sx) {
    return '<g transform="scale(' + sx + ',1)">' + sk(TORSO) + musc('torso', view, lv, glow) +
      (view === 'front'
        ? '<path class="ln" d="M0,-72 L0,-48 M0,-45 L0,-4"/>'
        : '<path class="ln" d="M0,-72 L0,-2"/>') +
      '</g>';
  }
  function arm(side, sh, el, dur, view, lv, glow, hold, base, sx) {
    var cancel = side > 0 ? neg(add(add(base, sh), el)) : add(base, neg(add(sh, el)));
    var mir = side < 0;
    var h0 = G.fArm;
    var hand = '<path class="sk" d="M-4.6,' + (h0 + 1) + ' C-1,' + (h0 - 1.5) + ' 3,' + (h0 - 1) +
      ' 4.6,' + (h0 + 2) + ' C5.6,' + (h0 + 5) + ' 5,' + (h0 + 9) + ' 2.5,' + (h0 + 10.5) +
      ' C0,' + (h0 + 11.5) + ' -3,' + (h0 + 10) + ' -4.4,' + (h0 + 7) +
      ' C-5.4,' + (h0 + 4.5) + ' -5.4,' + (h0 + 2.5) + ' -4.6,' + (h0 + 1) + ' Z"/>' +
      '<path class="mm" fill="url(#wgMus' + (mir ? 'R' : '') + ')" d="M-3.6,' + (h0 + 2) +
      ' C0,' + (h0 + 0.5) + ' 2.6,' + (h0 + 1) + ' 3.6,' + (h0 + 3.5) +
      ' C4,' + (h0 + 6.5) + ' 3,' + (h0 + 9) + ' 1,' + (h0 + 9.5) +
      ' C-1.5,' + (h0 + 9.5) + ' -3.4,' + (h0 + 7) + ' -3.6,' + (h0 + 2) + ' Z"/>' +
      '<path class="ln" d="M-4.2,' + (h0 + 4) + ' C-2.5,' + (h0 + 3) + ' -1.5,' + (h0 + 4) +
      ' -1.2,' + (h0 + 6) + '"/>' +
      (hold ? '<g transform="translate(0,' + (G.fArm + 5) + ')">' + dumbbell(cancel, dur) + '</g>' : '');
    var fore = joint(0, G.uArm, 0, el, dur,
      limb(G.fArm, 11.5, 8.5) + musc('fore', view, lv, glow, mir) + hand);
    return joint(side * G.shX * sx, G.shY, side < 0, sh, dur,
      limb(G.uArm, 15, 11.5) + musc('arm', view, lv, glow, mir) + fore);
  }
  function leg(side, hip, knee, fore, dur, view, lv, glow, sx) {
    var th = G.thigh * fore, mir = side < 0;
    return joint(side * G.hipX * sx, G.hipY, side < 0, hip, dur,
      '<ellipse class="sk" cx="0" cy="0" rx="10.5" ry="10"/>' +
      '<g transform="scale(1,' + fore + ')">' + sk(taper(G.thigh, 21, 14)) +
        musc('thigh', view, lv, glow, mir) + '</g>' +
      joint(0, th, 0, knee, dur,
        limb(G.shin, 14, 9.5) +
        // 膝の皿
        '<ellipse class="mm" fill="url(#wgMus' + (mir ? 'R' : '') + ')" cx="0" cy="3" rx="5.4" ry="4.6"/>' +
        musc('shin', view, lv, glow, mir) +
        '<path class="sk" d="M-5,' + (G.shin - 2) + ' C-6.5,' + (G.shin + 4) + ' -3,' + (G.shin + 8.5) +
        ' 3,' + (G.shin + 8.5) + ' L11.5,' + (G.shin + 8.5) + ' C14.5,' + (G.shin + 8) + ' 14.5,' + (G.shin + 1.5) +
        ' 10,' + G.shin + ' Z"/>' +
        '<path class="mm" fill="url(#wgMus' + (mir ? 'R' : '') + ')" d="M-3.5,' + (G.shin + 1) +
        ' C-4.5,' + (G.shin + 4.5) + ' -2,' + (G.shin + 7.5) + ' 3,' + (G.shin + 7.5) +
        ' L10.5,' + (G.shin + 7.5) + ' C12.5,' + (G.shin + 7) + ' 12.5,' + (G.shin + 3) +
        ' 9,' + (G.shin + 2) + ' Z"/>' +
        '<path class="ln" d="M6,' + (G.shin + 7.5) + ' L6.4,' + (G.shin + 4.5) +
        ' M8.6,' + (G.shin + 7.5) + ' L9,' + (G.shin + 5) + '"/>'));
  }

  // ---- 姿勢 ---------------------------------------------------------------
  /* 角度の向き: 手足はまっすぐ下が 0、時計回りが + （画面右腕は - で外に開く）。
   * armL / legL の角度は左右反転した内側での値なので、左右対称なら armR と同じ値。
   * hold: 手に持つダンベル。mid = 両手で 1 個（体の中心に描く）。 */
  var STAND = { sh: -8, el: -4, hip: 6, knee: -6 };
  var POSE = {
    press: { dur: 3, at: [120, 154], sc: .93, prop: 'seat', floor: 244,
      armR: { sh: [-100, -164], el: [-76, -14] }, hold: 'both',
      legR: { hip: 4, knee: -4, fore: .5 } },
    curl: { dur: 2.8, at: [120, 140],
      armR: { sh: 6, el: [0, -125] }, hold: 'both', legR: STAND },
    raise: { dur: 3.2, at: [120, 142], sc: .88, floor: 242,
      armR: { sh: [-8, -78], el: -14 }, hold: 'both', legR: STAND },
    ext: { dur: 2.8, at: [120, 154], sc: .93, prop: 'seat', floor: 244,
      armR: { sh: -178, el: [136, 8] }, hold: 'both',
      legR: { hip: 4, knee: -4, fore: .5 } },
    /* 横向き・寝た姿勢では左右の手足が同じ向きに動くので、
     * 反転している分だけ armL / legL の角度を逆にする。 */
    bench: { dur: 3, at: [124, 148], rot: -90, sc: .95, prop: 'flat', side: .72, floor: 258,
      armR: { sh: [-54, -88], el: [-40, -4] }, armL: { sh: [54, 88], el: [40, 4] }, hold: 'both',
      legR: { hip: 56, knee: 34 }, legL: { hip: -64, knee: -26 } },
    fly: { dur: 3.4, at: [124, 148], rot: -90, sc: .95, prop: 'flat', side: .72, floor: 258,
      armR: { sh: [-90, -36], el: -16 }, armL: { sh: [90, 36], el: 16 }, hold: 'both',
      legR: { hip: 56, knee: 34 }, legL: { hip: -64, knee: -26 } },
    // プルオーバーは頭の向こう側へ弧を描くので、フライとは別の動き
    pullover: { dur: 3.4, at: [136, 148], rot: -90, sc: .88, prop: 'flat', side: .72, floor: 256,
      armR: { sh: [-92, -136], el: -10 }, armL: { sh: [92, 136], el: 10 }, hold: 'both',
      legR: { hip: 56, knee: 34 }, legL: { hip: -64, knee: -26 } },
    // プランクロウ: 腕立ての姿勢で片手ずつ引く
    plank: { dur: 3.2, at: [102, 184], rot: -68, sc: .88, side: .72, floor: 242,
      armR: { sh: [68, 44], el: [0, -76] }, hold: 'right', armL: { sh: -68, el: 0 },
      legR: { hip: 0, knee: 0 }, legL: { hip: -6, knee: 6 } },
    // 前かがみになる種目は、横から見た姿（side）にしないと動きが分からない
    row: { dur: 3, at: [150, 120], spine: -62, prop: 'row', side: .5, floor: 240,
      armR: { sh: [62, 40], el: [4, -78] }, hold: 'right', armL: { sh: -62, el: 0 },
      legR: { hip: 8, knee: -8 }, legL: { hip: -4, knee: 4 } },
    squat: { dur: 3.4, at: [120, 138], dy: [0, 18], floor: 248,
      armR: { sh: -10, el: 150 }, hold: 'chest',
      legR: { hip: [22, 52], knee: [-22, -78] } },
    hinge: { dur: 3.6, at: [128, 136], spine: [0, -64], side: .5,
      armR: { sh: [-6, 58], el: -2 }, armL: { sh: [6, -58], el: 2 }, hold: 'both',
      legR: { hip: 6, knee: -12 }, legL: { hip: -6, knee: 12 } }
  };

  /* ベンチ・椅子。体と同じ原点（骨盤）・同じ倍率で描くので、
   * ポーズの大きさを変えても道具が体からずれない（回転だけは掛けない）。 */
  var PROPS = {
    seat: // 背もたれ（少し後ろに倒れた板。体の陰に収まる幅にする）
      '<path d="M-13,-98 C-13,-102 -9,-104 -4,-104 L15,-104 C21,-104 24,-101 24,-96 ' +
      'L27,12 C27,18 24,21 19,21 L-9,21 C-14,21 -17,18 -17,12 Z"/>' +
      // 座面
      '<rect x="-32" y="16" width="64" height="14" rx="6"/>' +
      // 支柱と足
      '<rect x="-5" y="28" width="11" height="60" rx="4"/>' +
      '<rect x="-28" y="86" width="58" height="8" rx="4"/>' +
      '<rect x="17" y="26" width="9" height="62" rx="4"/>',
    flat: '<rect x="-117" y="28.5" width="195" height="18" rx="7"/>' +
      '<rect x="-100" y="46.5" width="13" height="66" rx="5"/>' +
      '<rect x="50" y="46.5" width="13" height="66" rx="5"/>',
    row: '<rect x="-128" y="70" width="98" height="14" rx="5"/>' +
      '<rect x="-118" y="84" width="10" height="32" rx="4"/>' +
      '<rect x="-50" y="84" width="10" height="32" rx="4"/>'
  };

  /* 体を 1 体組み立てる。pose の角度どおりに関節を並べ、効く筋肉を赤くする。
   * side があるときは横向き（胴を side 倍に縮め、奥側の手足を暗く落とす）。 */
  function build(pose, view, lv, glow, label) {
    var dur = pose.dur || 3, sp = pose.spine || 0, sx = pose.side || 1;
    var aR = pose.armR || { sh: STAND.sh, el: STAND.el };
    var aL = pose.armL || aR;
    var lR = pose.legR || STAND, lL = pose.legL || lR;
    var base = add(pose.rot || 0, sp);
    var hold = pose.hold || 'none';
    var far = pose.side ? 'far' : 'nr';
    var body =
      '<g class="' + far + '">' + leg(-1, lL.hip, lL.knee, lL.fore || 1, dur, view, lv, glow, sx) + '</g>' +
      leg(1, lR.hip, lR.knee, lR.fore || 1, dur, view, lv, glow, sx) +
      '<g transform="translate(0,2) scale(' + sx + ',1)">' + sk(PELVIS) + musc('pelvis', view, lv, glow) + '</g>' +
      rotG(sp, dur,
        '<g class="' + far + '">' +
          arm(-1, aL.sh, aL.el, dur, view, lv, glow, hold === 'both' || hold === 'left', base, sx) + '</g>' +
        torso(view, lv, glow, sx) + head(view) +
        arm(1, aR.sh, aR.el, dur, view, lv, glow, hold === 'both' || hold === 'right', base, sx) +
        // 胸の前で 1 個持つ（ゴブレットスクワット）
        (hold === 'chest' ? '<g transform="translate(0,-52)">' + dumbbell(neg(base), dur, 1) + '</g>' : ''));
    // 両手で 1 個持つ種目は、手の高さを計算してダンベルを中心に置く
    if (hold === 'mid') {
      var s = pair(aR.sh), e = pair(aR.el), y = [0, 0];
      for (var i = 0; i < 2; i++) {
        y[i] = G.shY + G.uArm * Math.cos(s[i] * Math.PI / 180) +
          (G.fArm + 5) * Math.cos((s[i] + e[i]) * Math.PI / 180);
      }
      body += movG(y, dur, '<g transform="rotate(' + (pose.midV ? 90 : 0) + ')" class="ir">' + IRON + '</g>');
    }
    var sc = pose.sc || 1, at = pose.at || [120, 140];
    return (PROPS[pose.prop]
        ? '<g class="bn" transform="translate(' + at[0] + ',' + at[1] + ') scale(' + sc + ')">' +
          PROPS[pose.prop] + '</g>'
        : '') +
      '<g transform="translate(' + at[0] + ',' + at[1] + ')' +
      (pose.rot ? ' rotate(' + pose.rot + ')' : '') + (sc !== 1 ? ' scale(' + sc + ')' : '') + '">' +
      movG(pose.dy || 0, dur, body) + '</g>' +
      (label ? '<text class="lab" x="120" y="292" text-anchor="middle">' + label + '</text>' : '');
  }

  function levels(primary, secondary) {
    primary = primary || []; secondary = secondary || [];
    return function (id) {
      return primary.indexOf(id) > -1 ? 1 : (secondary.indexOf(id) > -1 ? 2 : 0);
    };
  }
  function svg(cls, aria, inner, floor) {
    return '<svg class="w3 ' + cls + '" viewBox="0 0 240 300" role="img" aria-label="' + aria + '">' +
      '<rect x="0" y="0" width="240" height="300" fill="url(#wgBg)"/>' +
      (floor ? '<ellipse cx="120" cy="' + floor + '" rx="78" ry="12" fill="url(#wgFloor)"/>' : '') +
      inner + '</svg>';
  }

  /* 効く場所の図（立ち姿・前面/背面）。primary=濃い赤、secondary=薄い赤。 */
  function bodySVG(view, primary, secondary, glow) {
    var lv = levels(primary, secondary);
    return svg('bodysvg', (view === 'front' ? '前から見た体' : '後ろから見た体') + 'の図。' +
      (primary || []).map(mName).join('・') + 'が赤く光っています',
      build({ dur: 3, at: [120, 140], legR: STAND, armR: { sh: STAND.sh, el: STAND.el } },
        view, lv, glow !== 0, view === 'front' ? '前面' : '背面'), 252);
  }
  /* 動きの図。同じ人体を種目の姿勢にして動かし、効く筋肉を赤く光らせる。 */
  function moveSVG(kind, primary, secondary, view, glow) {
    var p = POSE[kind] || POSE.curl;
    view = view === 'back' ? 'back' : 'front';
    return svg('animsvg', '動作のアニメーション。' + (primary || []).map(mName).join('・') + 'が赤く光っています',
      build(p, view, levels(primary, secondary), glow !== 0, '動き'), p.floor || 252);
  }

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
    { id: 'db-pullover', part: 'back', n: 'ダンベルプルオーバー', move: 'pullover',
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
      how: ['両手にダンベルを持ち、頭の上に構える',
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
    { id: 'db-plank', part: 'core', n: 'ダンベルプランクロウ', move: 'plank',
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
