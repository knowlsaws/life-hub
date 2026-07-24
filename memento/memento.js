/* MEMENTO — 有限性の認識装置
 *
 * 人生の暦（週の格子）・残数（人と会える推定回数）・一行日記（n年前の今日）。
 * データはこの端末の localStorage に置き、ハブと同じ PAT（assets/github.js）が
 * あれば private の life-content `.web/memento.json` へも同期する。
 * 単一ユーザー前提。競合は「新しい updated が勝ち・日記は和集合」で解く。
 * 日記の削除は空文字の墓標として残し、統合で復活しないようにする。
 * 仕様の背景と変更の作法は memento/EVOLUTION.md を正とする。
 */
(function () {
  var LS_KEY = 'memento.data',
      PATH   = '.web/memento.json',
      WK     = 604800000,
      VER    = 1;

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmt(n) { return Number(n).toLocaleString('ja-JP'); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function roman(n) {
    var t = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']], s = '';
    for (var i = 0; i < t.length; i++) while (n >= t[i][0]) { s += t[i][1]; n -= t[i][0]; }
    return s || 'I';
  }

  /* ── データ ──────────────────────────────── */

  function empty() {
    return { version: VER, birth: '', horizon: 80, people: [], diary: {},
             created: ymd(new Date()), updated: '' };
  }

  function migrate(d) {
    if (!d || typeof d !== 'object') return null;
    if (!d.version) d.version = 1;
    if (!d.horizon || d.horizon < 40 || d.horizon > 110) d.horizon = 80;
    if (!Array.isArray(d.people)) d.people = [];
    if (!d.diary || typeof d.diary !== 'object') d.diary = {};
    return d;
  }

  /* 統合則: スカラーと人の一覧は updated が新しい側が丸ごと勝つ
   * （消した人が別端末から蘇らないため）。日記だけは和集合を取る
   * （どの端末で書いた一行も失わないため）。 */
  function merge(a, b) {
    if (!a) return b;
    if (!b) return a;
    var newer = (a.updated || '') >= (b.updated || '') ? a : b,
        older = newer === a ? b : a,
        m = JSON.parse(JSON.stringify(newer)),
        od = older.diary || {};
    m.diary = m.diary || {};
    for (var k in od) if (!(k in m.diary)) m.diary[k] = od[k];
    return m;
  }

  function stable(d) {
    return JSON.stringify({ b: d.birth, h: d.horizon, p: d.people, d: d.diary });
  }

  var doc = null;
  try { doc = migrate(JSON.parse(localStorage.getItem(LS_KEY))); } catch (e) { doc = null; }

  /* ── 同期 ────────────────────────────────── */

  var dirty = false, pushTimer = null;

  function setSync(on) {
    var el = $('syncState');
    el.textContent = on ? '● 同期' : '○ この端末のみ';
    el.classList.toggle('on', !!on);
  }

  function persist() {
    doc.updated = new Date().toISOString();
    localStorage.setItem(LS_KEY, JSON.stringify(doc));
    dirty = true;
    if (window.GH && GH.hasToken()) {
      clearTimeout(pushTimer);
      pushTimer = setTimeout(pushNow, 2000);
    }
  }

  function pushNow() {
    if (!dirty || !window.GH || !GH.hasToken()) return;
    dirty = false;
    GH.putFile(PATH, JSON.stringify(doc, null, 2) + '\n', 'memento: ' + ymd(new Date()))
      .then(function () { setSync(true); })
      .catch(function () { dirty = true; setSync(false); });
  }

  function initSync() {
    if (!window.GH || !GH.hasToken()) { setSync(false); return; }
    GH.getJSON(PATH).then(function (remote) {
      remote = migrate(remote);
      if (remote) {
        var before = doc ? stable(doc) : null,
            merged = merge(doc, remote);
        doc = merged;
        localStorage.setItem(LS_KEY, JSON.stringify(doc));
        if (stable(merged) !== stable(remote)) { dirty = true; pushNow(); }
        if (before === null || stable(merged) !== before) route();
      } else if (doc) {
        dirty = true; pushNow();
      }
      setSync(true);
    }).catch(function () { setSync(false); });
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { clearTimeout(pushTimer); pushNow(); }
  });

  /* ── 人生の暦 ────────────────────────────── */

  function weekStats() {
    var b = new Date(doc.birth + 'T00:00:00'), now = new Date();
    var years = now.getFullYear() - b.getFullYear();
    var bd = new Date(b); bd.setFullYear(b.getFullYear() + years);
    if (bd > now) { years--; bd.setFullYear(b.getFullYear() + years); }
    var into = Math.max(0, Math.min(51, Math.floor((now - bd) / WK)));
    var filled = years * 52 + into;
    var total = doc.horizon * 52;
    return { filled: Math.min(filled, total - 1), total: total };
  }

  var entered = false;

  function drawCal(p) {
    var c = $('cal'), ctx = c.getContext('2d'),
        dpr = window.devicePixelRatio || 1,
        w = c.parentNode.clientWidth;
    if (!w) return;
    var cols = 52, rows = doc.horizon,
        cellX = w / cols,
        cellY = Math.max(5, Math.min(7.2, cellX * 0.66)),
        h = Math.ceil(rows * cellY);
    c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    c.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var s = weekStats(), shown = Math.floor(s.filled * p);
    for (var i = 0; i < s.total; i++) {
      var lived = i < shown,
          x = (i % cols) * cellX + cellX / 2,
          y = ((i / cols) | 0) * cellY + cellY / 2;
      ctx.beginPath();
      ctx.arc(x, y, lived ? 1.7 : 1.05, 0, 6.2832);
      ctx.fillStyle = lived ? 'rgba(203,195,178,.5)' : 'rgba(236,234,227,.07)';
      ctx.fill();
    }
    if (p >= 1) {
      var dot = $('nowDot');
      dot.style.left = ((s.filled % cols) * cellX + cellX / 2) + 'px';
      dot.style.top  = (((s.filled / cols) | 0) * cellY + cellY / 2) + 'px';
      dot.hidden = false;
    }
    return s;
  }

  function enterCal() {
    var t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / 1500);
      drawCal(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(step);
      else entered = true;
    }
    requestAnimationFrame(step);
  }

  function renderCalCap() {
    var s = weekStats();
    $('wkNow').textContent = fmt(s.filled + 1);
    $('wkAll').textContent = fmt(s.total);
    $('wkPct').textContent = (s.filled / s.total * 100).toFixed(1) + '%';
  }

  var rsTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(rsTimer);
    rsTimer = setTimeout(function () { if (entered) drawCal(1); }, 160);
  });

  /* ── 残数 ────────────────────────────────── */

  function curAge(p) { return new Date().getFullYear() - p.birthYear; }
  function remaining(p) { return Math.max(0, p.until - curAge(p)) * p.perYear; }

  function renderRows() {
    var el = $('rows'), ps = doc.people;
    if (!ps.length) {
      el.innerHTML = '<div class="empty">まだ誰もいません。<br>会える回数は、思っているより少ない。</div>';
      return;
    }
    el.innerHTML = ps.map(function (p, i) {
      var r = remaining(p);
      return '<div class="row" data-i="' + i + '"><div class="who">' + esc(p.name) +
        '<span class="meta">年 ' + fmt(p.perYear) + ' 回 · ' + fmt(p.until) + ' 歳までと見て</span></div>' +
        '<div class="num' + (r <= 20 ? ' low' : '') + '">' + fmt(r) +
        '<span class="unit">回</span></div></div>';
    }).join('');
    el.querySelectorAll('.row').forEach(function (row) {
      row.onclick = function () { openForm(+row.getAttribute('data-i')); };
    });
  }

  var editIdx = -1;

  function openForm(i) {
    editIdx = i;
    var p = i >= 0 ? doc.people[i] : null;
    $('fName').value = p ? p.name : '';
    $('fAge').value = p ? curAge(p) : '';
    $('fFreq').value = p ? p.perYear : '';
    $('fUntil').value = p ? p.until : '';
    $('fDel').hidden = i < 0;
    $('pForm').hidden = false;
    $('addRow').hidden = true;
    $('fName').focus();
  }

  function closeForm() {
    $('pForm').hidden = true;
    $('addRow').hidden = false;
    editIdx = -1;
  }

  $('addRow').onclick = function () { openForm(-1); };
  $('fCancel').onclick = closeForm;

  $('fSave').onclick = function () {
    var name = $('fName').value.trim(),
        age = parseInt($('fAge').value, 10),
        freq = parseInt($('fFreq').value, 10),
        until = parseInt($('fUntil').value, 10) || 85;
    if (!name || isNaN(age) || age < 0 || age > 120 || isNaN(freq) || freq < 1) {
      $('fName').focus(); return;
    }
    var p = { id: editIdx >= 0 ? doc.people[editIdx].id : 'p' + Date.now().toString(36),
              name: name, birthYear: new Date().getFullYear() - age,
              perYear: freq, until: Math.min(120, Math.max(age, until)) };
    if (editIdx >= 0) doc.people[editIdx] = p; else doc.people.push(p);
    persist(); closeForm(); renderRows();
  };

  $('fDel').onclick = function () {
    if (editIdx < 0) return;
    doc.people.splice(editIdx, 1);
    persist(); closeForm(); renderRows();
  };

  /* ── 今日 ────────────────────────────────── */

  var todayKey = ymd(new Date());

  function fmtJa(d) {
    var w = ['日', '月', '火', '水', '木', '金', '土'];
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ' +
           w[d.getDay()] + '曜日';
  }

  function renderToday() {
    $('todayDate').textContent = fmtJa(new Date());
    $('diary').value = doc.diary[todayKey] || '';
    renderPast();
  }

  function renderPast() {
    var box = $('pastBox'), now = new Date(), items = [];
    for (var back = 1; back <= 90; back++) {
      var dt = new Date(now.getFullYear() - back, now.getMonth(), now.getDate()),
          t = doc.diary[ymd(dt)];
      if (t) items.push({ y: dt.getFullYear(), t: t });
    }
    if (items.length) {
      box.innerHTML = '<div class="pasth">あの年の今日</div>' + items.map(function (e) {
        return '<div class="past"><span class="y">' + e.y + '</span><span class="t">' +
               esc(e.t) + '</span></div>';
      }).join('');
      return;
    }
    var n = 0;
    for (var k in doc.diary) if (doc.diary[k]) n++;
    box.innerHTML = '<div class="seed">' + (n
      ? '記録 ' + fmt(n) + ' 日。一年後のあなたが、この行を読み返します。'
      : 'ここに書いた一行は、来年の今日、あなたの前に現れます。') + '</div>';
  }

  $('diary').addEventListener('change', function () {
    var v = this.value.trim();
    if (!v && !(todayKey in doc.diary)) return;
    doc.diary[todayKey] = v;   /* 空にした一行は墓標として残す */
    persist(); renderPast();
    var dot = $('savedDot');
    dot.classList.add('on');
    setTimeout(function () { dot.classList.remove('on'); }, 1600);
  });
  $('diary').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') this.blur();
  });

  /* ── 設定 ────────────────────────────────── */

  $('cfgBtn').onclick = function () {
    var s = $('settings');
    s.hidden = !s.hidden;
    if (!s.hidden) {
      $('sBirth').value = doc.birth;
      $('sHorizon').value = doc.horizon;
      s.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  $('sBirth').addEventListener('change', function () {
    var d = new Date(this.value + 'T00:00:00');
    if (isNaN(d) || d > new Date()) { this.value = doc.birth; return; }
    doc.birth = this.value;
    persist(); drawCal(1); renderCalCap();
  });

  $('sHorizon').addEventListener('change', function () {
    var v = parseInt(this.value, 10);
    if (isNaN(v)) { this.value = doc.horizon; return; }
    doc.horizon = Math.min(110, Math.max(40, v));
    this.value = doc.horizon;
    persist(); drawCal(1); renderCalCap();
  });

  $('sExport').onclick = function () {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(doc, null, 2) + '\n'],
      { type: 'application/json' }));
    a.download = 'memento-' + todayKey.replace(/-/g, '') + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  $('sImport').onclick = function () { $('importFile').click(); };
  $('importFile').addEventListener('change', function () {
    var f = this.files[0]; this.value = '';
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      var j = null;
      try { j = migrate(JSON.parse(rd.result)); } catch (e) { j = null; }
      if (!j || !j.birth) { alert('読めない書き出しファイルです。'); return; }
      doc = merge(doc, j);
      persist(); route();
    };
    rd.readAsText(f);
  });

  /* ── 起動 ────────────────────────────────── */

  function renderAll() {
    $('verTag').textContent = roman(doc.version);
    renderCalCap();
    renderRows();
    renderToday();
    if (!entered) enterCal(); else drawCal(1);
  }

  function route() {
    var has = doc && doc.birth;
    $('gate').hidden = !!has;
    $('main').hidden = !has;
    if (has) renderAll();
  }

  $('gateGo').onclick = function () {
    var v = $('gateBirth').value,
        d = new Date(v + 'T00:00:00');
    if (!v || isNaN(d) || d > new Date() || d.getFullYear() < 1900) return;
    if (!doc) doc = empty();
    doc.birth = v;
    persist(); route();
  };

  route();
  initSync();
})();
