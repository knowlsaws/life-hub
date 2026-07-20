/* life-hub — GitHub API クライアント
 *
 * データは private リポジトリ life-content にあり、このコード自体は一切データを持たない。
 * 認証はユーザー自身が発行した fine-grained PAT をブラウザの localStorage に保存して使う。
 * 静的ホスティングではサーバー側に秘密を置けないため、単一ユーザー運用前提の割り切り。
 * PAT は「life-content リポジトリのみ / Contents: Read and write」に絞ること。
 */
window.GH = (function () {
  var LS_TOKEN = 'lifehub.token',
      LS_REPO  = 'lifehub.repo',
      API      = 'https://api.github.com';

  var state = {
    token: localStorage.getItem(LS_TOKEN) || '',
    repo:  localStorage.getItem(LS_REPO) || 'knowlsaws/life-content',
    online: false,
    lastError: '',
    lastSync: null
  };

  function setToken(t) {
    state.token = (t || '').trim();
    if (state.token) localStorage.setItem(LS_TOKEN, state.token);
    else localStorage.removeItem(LS_TOKEN);
  }
  function setRepo(r) {
    state.repo = (r || '').trim();
    localStorage.setItem(LS_REPO, state.repo);
  }
  function hasToken() { return !!state.token; }

  /* UTF-8 セーフな base64。btoa は Latin-1 しか扱えないためバイト列を経由する。 */
  function b64encode(str) {
    var bytes = new TextEncoder().encode(str), bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function b64decode(b64) {
    var bin = atob(String(b64).replace(/\s/g, ''));
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function headers() {
    return {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Authorization': 'Bearer ' + state.token
    };
  }

  function req(path, opts) {
    opts = opts || {};
    opts.headers = headers();
    return fetch(API + path, opts).then(function (r) {
      if (r.status === 401) throw new Error('トークンが無効です（401）');
      if (r.status === 403) throw new Error('権限またはレート制限（403）');
      if (r.status === 404) { var e = new Error('見つかりません（404）'); e.notFound = true; throw e; }
      if (!r.ok) throw new Error('GitHub API エラー ' + r.status);
      return r.json();
    });
  }

  function contentsPath(path) {
    return '/repos/' + state.repo + '/contents/' + path.split('/').map(encodeURIComponent).join('/');
  }

  /* ファイル取得。{ text, sha } を返す。存在しなければ null。 */
  function getFile(path) {
    return req(contentsPath(path) + '?ref=HEAD')
      .then(function (j) { return { text: b64decode(j.content), sha: j.sha }; })
      .catch(function (e) { if (e.notFound) return null; throw e; });
  }

  function getJSON(path) {
    return getFile(path).then(function (f) {
      if (!f) return null;
      try { return JSON.parse(f.text); }
      catch (e) { throw new Error(path + ' の JSON が壊れています'); }
    });
  }

  /* ファイル書き込み（新規・更新どちらも）。既存があれば sha を渡して上書きする。 */
  function putFile(path, text, message) {
    return getFile(path).then(function (cur) {
      var body = {
        message: message || ('update ' + path),
        content: b64encode(text)
      };
      if (cur) body.sha = cur.sha;
      return req(contentsPath(path), { method: 'PUT', body: JSON.stringify(body) });
    });
  }

  /* Web からの入力を .web/inbox/ に置く。既存の push トリガー Actions がこれで発火する。 */
  function pushInbox(kind, payload) {
    var now = new Date();
    function p(n) { return n < 10 ? '0' + n : '' + n; }
    var stamp = now.getFullYear() + p(now.getMonth() + 1) + p(now.getDate()) + '-' +
                p(now.getHours()) + p(now.getMinutes()) + p(now.getSeconds());
    var path = '.web/inbox/' + stamp + '-' + kind + '.json';
    var doc = { kind: kind, created: stamp, payload: payload };
    return putFile(path, JSON.stringify(doc, null, 2) + '\n', 'inbox: ' + kind)
      .then(function () { return path; });
  }

  /* manifest の sha だけを見て変更を検知する。1ファイルなので 3 秒間隔でも
   * 1,200 req/h 程度に収まり、認証枠 5,000 req/h に余裕がある。 */
  var lastManifestSha = null;
  function checkManifest() {
    return req(contentsPath('.web/manifest.json') + '?ref=HEAD').then(function (j) {
      var changed = lastManifestSha !== null && lastManifestSha !== j.sha;
      var first = lastManifestSha === null;
      lastManifestSha = j.sha;
      state.online = true;
      state.lastError = '';
      state.lastSync = new Date();
      return { changed: changed || first, sha: j.sha, manifest: JSON.parse(b64decode(j.content)) };
    }).catch(function (e) {
      state.online = false;
      state.lastError = e.message;
      throw e;
    });
  }

  function rateLimit() { return req('/rate_limit'); }

  return {
    state: state,
    setToken: setToken, setRepo: setRepo, hasToken: hasToken,
    getFile: getFile, getJSON: getJSON, putFile: putFile,
    pushInbox: pushInbox, checkManifest: checkManifest, rateLimit: rateLimit
  };
})();
