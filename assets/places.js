/* life-hub — 住所検索（OpenStreetMap Nominatim）
 *
 * APIキー不要・無料・バックエンド不要のため「GitHub のみで完結」の方針を崩さない。
 * 利用規約により 1 リクエスト/秒まで。呼び出し側で 700ms デバウンスすること。
 * 通信できない環境では FALLBACK に切り替わる。
 */
window.Places = (function () {
  var cache = {}, seq = 0;

  var FALLBACK = [
    ['五稜郭公園', '北海道 函館市'],
    ['函館駅', '北海道 函館市'],
    ['東京駅', '東京都 千代田区'],
    ['新橋駅', '東京都 港区'],
    ['自宅', '']
  ];

  function localSearch(q) {
    var v = q.toLowerCase();
    return FALLBACK.filter(function (p) {
      return (p[0] + ' ' + p[1]).toLowerCase().indexOf(v) > -1;
    }).slice(0, 5);
  }

  /* Nominatim の display_name は「小 → 大」で、郵便番号や
   * 「渡島総合振興局」「北海道地方」などの行政区分が混ざる。
   * それらを落として日本語として自然な「大 → 小」に並べ替える。 */
  function fmtAddr(o) {
    var parts = (o.display_name || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    parts.shift();
    parts = parts.filter(function (p) {
      return !/^\d{3}-?\d{4}$/.test(p) && p !== '日本' && !/(総合振興局|振興局|地方)$/.test(p);
    });
    return parts.reverse().slice(0, 4).join(' ');
  }

  function search(q, cb) {
    if (cache[q]) return cb(cache[q], false);
    var mine = ++seq;
    var url = 'https://nominatim.openstreetmap.org/search?format=jsonv2&limit=8' +
              '&countrycodes=jp&accept-language=ja&q=' + encodeURIComponent(q);
    fetch(url, { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (mine !== seq) return;
        var seen = {}, out = [];
        j.forEach(function (o) {
          var nm = (o.name && o.name.trim()) || (o.display_name || '').split(',')[0];
          var addr = fmtAddr(o);
          if (!nm || !addr) return;
          var key = nm + '|' + addr;
          if (seen[key]) return;
          seen[key] = 1;
          out.push([nm, addr]);
        });
        out = out.slice(0, 5);
        cache[q] = out;
        cb(out, false);
      })
      .catch(function () { if (mine === seq) cb(localSearch(q), true); });
  }

  return { search: search };
})();
