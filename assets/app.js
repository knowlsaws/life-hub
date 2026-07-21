(function(){
var ICON={
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
 schedule:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
 anime:'<rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 2l4 5 4-5"/>',
 tv:'<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8"/>',
 movies:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18"/>',
 meal:'<path d="M4 3v8a3 3 0 0 0 6 0V3M7 3v18M17 3c-1.5 0-2 3-2 6s.5 5 2 5 2-2 2-5-.5-6-2-6zM17 14v7"/>',
 news:'<path d="M4 5h13v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM17 8h3v10a2 2 0 0 1-2 2M7 9h7M7 13h5"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 photos:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v6M21.5 12h-6M12 21.5v-6M2.5 12h6"/>',
 grid:'<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 link:'<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
 cam:'<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 7l1.5-3h5L16 7"/>',
 claude:'<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5 11 15l4.5-5.5"/>',
 github:'<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.4 4.6-4.6 4.9.3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/>',
 line:'<path d="M12 4c-4.9 0-9 3.2-9 7.2 0 3.6 3.3 6.6 7.7 7.1.4 0 .6.2.6.6l-.2 1.6c-.1.5.3.7.8.4 3.9-2 6.1-4.1 7.3-6a6.7 6.7 0 0 0 1.8-4.5C21 7.2 16.9 4 12 4z"/>',
 back:'<path d="M15 6l-6 6 6 6"/>',
 fwd:'<path d="M9 6l6 6-6 6"/>',
 home:'<path d="M3 11l9-8 9 8M6 10v10h12V10"/>',
 refresh:'<path d="M20.5 11a8.5 8.5 0 1 0-2.2 6.3M20.5 4.5V11h-6.5"/>',
 trash:'<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>'
};
function ic(k,c){return '<svg class="'+(c||'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">'+(ICON[k]||'')+'</svg>'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function pad(n){return n<10?'0'+n:''+n}
function fD(d){return d.getFullYear()+'/'+pad(d.getMonth()+1)+'/'+pad(d.getDate())}
function fDT(d){return fD(d)+' '+pad(d.getHours())+':'+pad(d.getMinutes())}

var SEC=[{k:'mail',n:'メール'},{k:'schedule',n:'予定'},{k:'anime',n:'アニメ'},{k:'tv',n:'ドラマ'},
  {k:'movies',n:'映画'},{k:'meal',n:'食事'},{k:'news',n:'ニュース'},{k:'search',n:'検索'}];
function sn(k){for(var i=0;i<SEC.length;i++)if(SEC[i].k===k)return SEC[i].n;return k}

var TODAY=new Date();  // 実際の今日。予定の60日表示とトップの日付に使う
/* 祝日は life-content から配信される（vault の holidays.md ＋ 公開API）。
 * ここに直書きすると期間外が抜けるため、既定は空にしておく。 */
var HOL={};
var WK=['日','月','火','水','木','金','土'];
/* 天気は Open-Meteo（APIキー不要・無料・バックエンド不要）から取る。
 * 現在地は端末の位置情報。許可されない場合は天気を出さない。
 * 予報は 16 日先までなので、それ以降の日付には表示しない。 */
var WX_CODE={0:'☀️',1:'🌤',2:'⛅',3:'☁️',45:'🌫',48:'🌫',51:'🌦',53:'🌦',55:'🌦',
  61:'🌧',63:'🌧',65:'🌧',71:'🌨',73:'🌨',75:'🌨',80:'🌦',81:'🌧',82:'🌧',95:'⛈',96:'⛈',99:'⛈'};
var FORECAST={};       // 'YYYY/MM/DD' -> {icon, max, pop}
var FORECAST_STATE='';  // '' | 'asking' | 'ok' | 'denied' | 'error'

function wxs(d){
  var f=FORECAST[d];
  return f?(f.icon+' '+Math.round(f.max)+'° ☂'+f.pop+'%'):'';
}
function loadForecast(){
  if(FORECAST_STATE)return;
  if(!navigator.geolocation){FORECAST_STATE='denied';return}
  FORECAST_STATE='asking';
  navigator.geolocation.getCurrentPosition(function(pos){
    var u='https://api.open-meteo.com/v1/forecast?latitude='+pos.coords.latitude.toFixed(3)+
      '&longitude='+pos.coords.longitude.toFixed(3)+
      '&daily=weather_code,temperature_2m_max,precipitation_probability_max'+
      '&timezone=Asia%2FTokyo&forecast_days=16';
    fetch(u).then(function(r){return r.json()}).then(function(j){
      var t=(j.daily||{}).time||[];
      t.forEach(function(day,i){
        FORECAST[day.replace(/-/g,'/')]={
          icon:WX_CODE[j.daily.weather_code[i]]||'·',
          max:j.daily.temperature_2m_max[i],
          pop:j.daily.precipitation_probability_max[i]
        };
      });
      FORECAST_STATE='ok';render();
    }).catch(function(){FORECAST_STATE='error'});
  },function(){FORECAST_STATE='denied';render()},{timeout:8000,maximumAge:3600000});
}
function dayLabel(d){var ds=fD(d);return ds+' ('+WK[d.getDay()]+')'+(HOL[ds]?' '+HOL[ds]:'')}


/* データ源。PAT 未設定なら demo-data.js のサンプル、設定済みなら
 * private リポジトリ life-content の .web/*.json を読み込んだ結果が入る。 */
var D=[], EV=[], DEMO_MODE=true;
/* 挨拶文は life-content の .web/greeting.json から配信する。
 * 毎朝パイプラインが最新情報を1つ添えて書き換える想定。 */
var GREETING={text:''};
var MANIFEST={sections:{}};
/* 用語辞書（.web/terms.json）。全メニューの本文で既知の語をリンクにし、
 * タップで解説を出す。検索の一覧には出さない。 */
var TERMS={},TERMRE=null;
function buildTermRe(){
  var keys=Object.keys(TERMS);
  if(!keys.length){TERMRE=null;return}
  // 長い語から先に当てる（「量子ビット」が「量子」に食われないように）
  keys.sort(function(a,b){return b.length-a.length});
  TERMRE=new RegExp('('+keys.map(function(k){
    return k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}).join('|')+')','g');
}
/* esc 済みテキストの中の既知語をリンクに変える。
 * 既に HTML を含む文字列には使わないこと。 */
function linkTerms(escaped){
  if(!TERMRE)return escaped;
  return escaped.replace(TERMRE,function(m){
    return '<button class="tlink" data-term="'+m+'">'+m+'</button>';
  });
}
/* ユーザー編集値（既読・視聴ステータス・各話チェック・自己評価/メモ）は
 * .web/state.json に分離する。パイプラインはこのファイルを読むだけで書かない。
 * こうすることでパイプラインはセクションJSONを自由に再生成できる。 */
var STATE={},stateTimer=null;
function stateKey(x){return x.id||(x.s+'|'+x.t)}
// publish_works.py の STATUS_CODES / BADGE と対になっている。片方だけ変えないこと。
var ST_CODES=['upcoming','available','watching','done'];
var ST_BADGE={upcoming:['配信予定',''],available:['配信中',''],watching:['視聴中','g'],done:['視聴済み','']};
function kvGet(d,k){var r=(d.kv||[]).filter(function(p){return p[0]===k})[0];return r?r[1]:''}
// publish_works.py の next_air と同じ規則。まだ配信されていない最初の話を返す。
function isoToday(){var t=TODAY;return t.getFullYear()+'-'+pad(t.getMonth()+1)+'-'+pad(t.getDate())}
function nextAir(eps){
  var iso=isoToday();
  for(var i=0;i<eps.length;i++){
    var e=eps[i];
    if(e.air&&e.air>iso){
      var m=/^\d{4}-\d{2}-\d{2}T(\d{2}:\d{2})/.exec(e.at||'');
      return e.air.replace(/-/g,'/')+(m?' '+m[1]:'')+'（'+e.n+'）';
    }
  }
  return '';
}
function kvSet(d,k,v){(d.kv||[]).forEach(function(p){if(p[0]===k)p[1]=v})}
function applyUserState(){
  D.forEach(function(x){
    var st=STATE[stateKey(x)];if(!st)return;
    if(st.read){x.nw=0;if(x.s==='mail')x.unread=0}
    if(st.myRate!=null)x.myRate=st.myRate;
    if(st.myNote!=null)x.myNote=st.myNote;
    // セクション JSON はパイプラインが作った時点の値なので、ユーザーが変えた
    // ステータス・各話チェックはここで全て当て直す。x.st だけ直していた頃は
    // 一覧のバッジ（tag/cls）と詳細のセレクト（statusI）が元に戻って見えた。
    if(st.st){
      x.st=st.st;
      var b=ST_BADGE[st.st];if(b){x.tag=b[0];x.cls=b[1]}
      var i=ST_CODES.indexOf(st.st);
      if(i>-1&&x.d&&x.d.status){
        x.d.statusI=i;
        kvSet(x.d,'ステータス',x.d.status[i]);
      }
    }
    if(st.eps&&x.d&&x.d.eps){
      x.d.eps.forEach(function(e){if(st.eps[e.n]!==undefined)e.on=!!st.eps[e.n]});
      var n=x.d.eps.filter(function(e){return e.on}).length,
          tot=x.d.prog?x.d.prog[1]:0;
      if(x.d.prog)x.d.prog[0]=n;
      kvSet(x.d,'進捗',tot?n+' / '+tot+' 話':n+' 話 視聴済み');
      // 一覧の補足行も publish_works.py と同じ組み立てにする
      // （次回配信 → 次に見る話 → 配信サービス の優先順）
      var nx=x.d.eps.filter(function(e){return !e.on})[0];
      if(!nx)x.nw=0;              // 未視聴が無いなら新着ドットも消す
      var na=nextAir(x.d.eps),head;
      if(na)head='次回 '+na;
      else if(nx)head=nx.n+(nx.t?'「'+nx.t+'」':'');
      else head=kvGet(x.d,'配信').split('（')[0]||String(x.m||'').split(' · ')[0];
      x.m=head+' · '+(tot?n+'/'+tot+'話':'視聴 '+n+'話');
    }
  });
}
function touchState(x,patch){
  var k=stateKey(x),cur=STATE[k]||{};
  for(var p in patch)cur[p]=patch[p];
  STATE[k]=cur;
  if(!GH.hasToken())return;
  clearTimeout(stateTimer);
  stateTimer=setTimeout(function(){
    GH.putFile('.web/state.json',JSON.stringify(STATE,null,1)+'\n',
               'state: ユーザー編集を保存 [skip ci]')
      .catch(function(){setSync('保存失敗',false)});
  },1200);
}

var app=document.getElementById('app'),scroll=document.getElementById('scroll'),det=document.getElementById('det'),
 dBody=document.getElementById('dBody'),dSec=document.getElementById('dSec'),q=document.getElementById('q'),
 clr=document.getElementById('clr'),tagsug=document.getElementById('tagsug'),brand=document.getElementById('brand'),
 mask=document.getElementById('mask'),sheet=document.getElementById('sheet'),
 actzone=document.getElementById('actzone'),bottombar=document.getElementById('bottombar'),
 dTrash=document.getElementById('dTrash'),dEdit=document.getElementById('dEdit'),
 dDone=document.getElementById('dDone');
var view='home',query='',queryRaw='',mailRead=false,seg={},curTag='',curDet=null;
/* この画面で開いて既読にしたメール。未読フィルタ中でも消さずに残す。 */
var sessionRead={};
var hist=[{view:'home',tag:'',det:null}],hpos=0,navLock=false;
function curState(){return {view:view,tag:curTag,det:curDet}}
function pushHist(){
  if(navLock)return;
  hist=hist.slice(0,hpos+1);hist.push(curState());hpos=hist.length-1;
  /* 詳細を開く経路は render() を通らないので、ここで下バーを更新しないと
     「戻る」が無効のまま押せなくなる。 */
  renderBottom();
}
function applyState(s){
  if(!s)return;
  navLock=true;
  try{
    view=s.view;curTag=s.tag;curDet=s.det;
    q.value='';query='';queryRaw='';clr.style.display='none';tagsug.style.display='none';
    render();
    if(s.det==null)hideDetail();
    else if(typeof s.det==='number')showDetail(s.det);
    else showEvent(s.det.ev);
  }finally{
    // ここで戻し損ねると pushHist() が無効化され、以降ずっと「戻る」が効かなくなる
    navLock=false;
  }
  renderBottom();
}
function histBack(){if(hpos>0){hpos--;applyState(hist[hpos])}}
function histFwd(){if(hpos<hist.length-1){hpos++;applyState(hist[hpos])}}

function tagCounts(scope){
  var m={};
  D.forEach(function(x){
    if(scope&&x.s!==scope)return;
    (x.tags||[]).forEach(function(t){m[t]=(m[t]||0)+1});
  });
  return Object.keys(m).map(function(k){return[k,m[k]]}).sort(function(a,b){return b[1]-a[1]||a[0].localeCompare(b[0])});
}
function match(x){
  if(!query)return true;
  return (x.t+' '+x.m+' '+(x.tags||[]).join(' ')).toLowerCase().indexOf(query)>-1;
}
function evOrder(e){return e.allday?0:(e.type==='task'?1:2)}
function byTimeDesc(a,b){return a.time<b.time?1:(a.time>b.time?-1:0)}
function byRateDesc(a,b){return (b.rate||0)-(a.rate||0)}
function sortItems(items,sec){
  if(sec==='anime'||sec==='tv'||sec==='movies')return items.sort(byRateDesc);
  if(sec==='mail'||sec==='news'||sec==='search')return items.sort(byTimeDesc);
  return items;
}

function setBrand(){
  if(view==='home')brand.innerHTML='<span class="w">LIFE</span><span class="s">hub</span>';
  else if(view==='tag')brand.innerHTML='<span class="sect">タグ: '+esc(curTag)+'</span>';
  else brand.innerHTML='<span class="sect">'+esc(sn(view))+'</span>';
  q.placeholder = view==='home' ? '全ツールを横断して検索' : (view==='tag'?'このタグ内を検索':sn(view)+'の中を検索');
}

function badges(x){
  if(x.badges)return x.badges.map(function(b){return '<span class="tag '+(b[1]||'')+'">'+esc(b[0])+'</span>'}).join('');
  return x.tag?'<span class="tag '+x.cls+'">'+esc(x.tag)+'</span>':'';
}
function rowHTML(x,i){
  return '<button class="row" data-i="'+i+'">'+(x.nw?'<span class="nd"></span>':'')+
   '<span class="l"><span class="t">'+esc(x.t)+'</span><span class="m">'+esc(x.m)+'</span></span>'+
   '<span class="r">'+badges(x)+'<span class="time">'+esc(x.time)+'</span></span></button>';
}
function posterHTML(x,i){
  var img=(x.d||{}).img;
  // 画像が取れない作品もあるので、失敗したら頭文字に戻す
  var po=img?('<span class="po"><img src="'+esc(img)+'" alt="" loading="lazy" '+
      'onerror="this.remove()"><span class="po-f">'+esc(x.d.poster||x.t.charAt(0))+'</span></span>')
    :('<span class="po">'+esc(x.d.poster||x.t.charAt(0))+'</span>');
  return '<button class="pc" data-i="'+i+'">'+(x.nw?'<span class="dot"></span>':'')+po+
   '<span class="pl"><span class="pt">'+esc(x.t)+'</span><span class="pm">'+esc(x.m)+'</span>'+
   '<span class="pr">'+(x.rate?'<span class="star">★ '+x.rate.toFixed(1)+'</span>':'<span class="star">★ —</span>')+
   badges(x)+'<span class="time">'+esc(x.time)+'</span></span></span></button>';
}

function render(){
  setBrand();
  var r={act:'',body:''};
  if(view==='home')r.body=renderHome();
  else if(view==='tag')r.body=renderTag();
  else if(view==='schedule')r=renderSchedule();
  else if(view==='anime'||view==='tv'||view==='movies')r=renderWorks(view);
  else if(view==='mail')r=renderMail();
  else if(view==='meal')r=renderMeal();
  else if(view==='news')r=renderNews();
  else if(view==='search')r=renderSearch();
  actzone.innerHTML=r.act||'';
  scroll.innerHTML=(r.body||'')+'<div class="footn">GitHub のみで完結 · manifest 監視 3秒</div>';
  renderBottom();
  renderMenu();
  bind();
}

function renderHome(){
  if(query){
    var h='',any=false;
    SEC.forEach(function(s){
      var items=sortItems(D.filter(function(x){return x.s===s.k&&match(x)}),s.k);
      if(!items.length)return;any=true;
      h+='<div class="sechead">'+ic(s.k)+'<span class="n">'+s.n+'</span><span class="c">'+items.length+' 件</span></div><div class="list">'+
        items.map(function(x){return rowHTML(x,D.indexOf(x))}).join('')+'</div>';
    });
    if(!any)h+='<div class="empty">「'+esc(queryRaw)+'」に一致する項目はありません</div>';
    h+='<button class="ask" id="askRow">'+ic('search')+'「'+esc(queryRaw)+'」を調査する — 検索パイプラインに送信</button>';
    return h;
  }
  var ur=D.filter(function(x){return x.s==='mail'&&x.unread}).length;
  var h='<div class="greet"><div class="h">'+esc(GREETING.text||'')+'</div>'+
    '<div class="d">'+dayLabel(TODAY)+'</div></div>';
  // 今日の予定・タスクを実データから拾う（DAY → TASK → 時間順）
  var td=fD(TODAY);
  var todays=EV.filter(function(e){return e.d===td}).sort(function(a,b){
    var o=evOrder(a)-evOrder(b);return o||(a.time||'').localeCompare(b.time||'');
  });
  var over=EV.filter(function(e){return e.type==='task'&&!e.done&&e.d<td});
  h+='<div class="hero"><div class="ht"><span class="l">今日</span>'+
    (ur?'<span class="tag e">未読 '+ur+'</span>':'')+'</div>';
  todays.slice(0,4).forEach(function(e){
    h+='<div class="hr"><span class="t">'+(e.allday?'DAY':(e.type==='task'?'TASK':esc(e.time)))+'</span>'+
      '<span class="m">'+(e.rep?'<span class="rep">⟳</span> ':'')+esc(e.n)+'</span>'+
      '<span class="g">'+esc(e.place||e.who||'')+'</span></div>';
  });
  if(over.length)
    h+='<div class="hr"><span class="t">⚠️</span><span class="m">期限切れのタスク '+over.length+'件</span>'+
       '<span class="g">要対応</span></div>';
  if(ur)h+='<div class="hr"><span class="t">—</span><span class="m">未読メール '+ur+'件</span>'+
    '<span class="g">要確認</span></div>';
  if(!todays.length&&!over.length&&!ur)
    h+='<div class="hr"><span class="t">—</span><span class="m">今日の予定はありません</span><span class="g"></span></div>';
  h+='</div>';
  h+='<div class="sechead"><span class="n">セクション</span><span class="c">manifest 監視中</span></div><div class="grid">';
  // タイルの件数と最終更新も実データから出す（固定文言を残さない）
  /* タイルの文言はセクションごとに意味のある指標を出す。
   * 総件数だけだと「メール6件」が未読数に見えてしまう。 */
  function secStat(k){
    var xs=D.filter(function(x){return x.s===k&&!x.gone});
    var upd=((MANIFEST.sections||{})[k]||{}).updated||'';
    var nw=newCount(k);
    if(k==='mail'){
      var un=D.filter(function(x){return x.s==='mail'&&x.unread}).length;
      return [(un?'未読 '+un+' 件':'未読なし')+' · 全'+xs.length, upd||'—'];
    }
    if(k==='schedule'){
      var c=EV.filter(function(e){return e.d===td&&!e.done}).length;
      var ov=EV.filter(function(e){return e.type==='task'&&!e.done&&e.d<td}).length;
      var nx=EV.filter(function(e){return e.d===td&&e.type!=='task'&&e.time&&e.time!=='—'})[0];
      return ['今日 '+c+'件'+(nx?' · 次 '+nx.time:'')+(ov?' · 期限切れ '+ov:''),
              EV.length+' 件登録'];
    }
    if(k==='meal'){
      var kc=0;
      D.forEach(function(x){
        if(x.s!=='meal')return;
        var e=((x.d||{}).kv||[]).filter(function(r){return r[0]==='エネルギー'})[0];
        if(e&&String(x.time).slice(0,10)===td)kc+=parseFloat(String(e[1]).replace(/[^0-9.]/g,''))||0;
      });
      return [kc?('今日 '+kc.toLocaleString()+' kcal'):'今日の記録なし', upd||'—'];
    }
    if(k==='anime'||k==='tv'||k==='movies'){
      var w=xs.filter(function(x){return x.st==='watching'}).length;
      var up=xs.filter(function(x){return x.st==='upcoming'}).length;
      return [(w?'視聴中 '+w+' · ':'')+'配信予定 '+up+' · 全'+xs.length, upd||'—'];
    }
    if(k==='news'){
      var st=xs.filter(function(x){return x.story}).length;
      return [(nw?'新着 '+nw+' · ':'')+'追跡中 '+st+' · 全'+xs.length, upd||'—'];
    }
    return [xs.length+' 件'+(nw?' · 新着 '+nw:''), upd||'—'];
  }
  SEC.forEach(function(s){
    var m=secStat(s.k);
    h+='<button class="tile" data-sec="'+s.k+'">'+(newCount(s.k)?'<span class="dot"></span>':'')+
      '<span class="tp">'+ic(s.k,'ico')+'</span><span class="nm">'+s.n+'</span>'+
      '<span class="mt">'+m[0]+'</span><span class="ft">'+m[1]+'</span></button>';
  });
  h+='</div>';
  // 実際に確認できるのは GitHub の同期状態だけ。Claude Code と LINE は
  // サイトから状態を取得する術が無いので、状態表示は載せない。
  var gh=GH.hasToken()?((MANIFEST.generated||'—')):'未接続';
  h+='<div class="sechead"><span class="n">接続</span></div><div class="conn">'+
   '<button class="cr" id="photoRow">'+ic('photos')+'<span class="cn">Google フォト</span>'+
     '<span class="cs">タップでアプリ起動</span></button>'+
   '<button class="cr" id="ghRow">'+ic('github')+'<span class="cn">GitHub</span>'+
     (GH.state.online?'<span class="sd"></span>':'')+
     '<span class="cs">'+esc(gh)+'</span></button></div>';
  return h;
}

function renderTag(){
  var items=D.filter(function(x){return (x.tags||[]).indexOf(curTag)>-1&&match(x)});
  var h='<div class="sechead"><span class="n">このタグの項目</span><span class="c">'+items.length+' 件</span></div>';
  if(!items.length)return h+'<div class="empty">該当なし</div>';
  var by={};items.forEach(function(x){(by[x.s]=by[x.s]||[]).push(x)});
  SEC.forEach(function(s){
    if(!by[s.k])return;
    var list=sortItems(by[s.k],s.k);
    h+='<div class="sechead">'+ic(s.k)+'<span class="n">'+s.n+'</span><span class="c">'+list.length+' 件</span></div><div class="list">'+
      list.map(function(x){return rowHTML(x,D.indexOf(x))}).join('')+'</div>';
  });
  return h;
}

function renderMail(){
  var items=sortItems(D.filter(function(x){
    return x.s==='mail'&&match(x)&&(mailRead||x.unread||sessionRead[stateKey(x)]);
  }),'mail');
  var unread=D.filter(function(x){return x.s==='mail'&&x.unread}).length;
  var act='<div class="segs"><button class="seg '+(mailRead?'':'on')+'" data-mail="0">未読のみ '+unread+'</button>'+
    '<button class="seg '+(mailRead?'on':'')+'" data-mail="1">既読も表示</button></div>';
  var h='<div class="list">'+(items.length?items.map(function(x){return rowHTML(x,D.indexOf(x))}).join(''):'')+'</div>';
  if(!items.length)h+='<div class="empty">該当するメールはありません</div>';
  return {act:act,body:h};
}

function renderWorks(k){
  var STS=[['all','すべて'],['upcoming','配信予定'],['available','配信中'],['watching','視聴中'],['done','視聴済']];
  var cur=seg[k]||'all';
  var act='<div class="segs">'+STS.map(function(s){
    return '<button class="seg '+(cur===s[0]?'on':'')+'" data-seg="'+k+':'+s[0]+'">'+s[1]+'</button>'}).join('')+'</div>';
  var h='';
  var items=sortItems(D.filter(function(x){return x.s===k&&!x.gone&&match(x)&&(cur==='all'||x.st===cur)}),k);
  var gone=D.filter(function(x){return x.s===k&&x.gone});
  h+='<div class="list">'+items.map(function(x){return posterHTML(x,D.indexOf(x))}).join('')+'</div>';
  if(!items.length)h+='<div class="empty">このステータスの作品はありません</div>';
  if(gone.length&&cur==='all')h+='<div class="card" style="margin-top:12px"><h4>配信終了による自動削除</h4>'+
    gone.map(function(x){return '<div class="kv"><span class="k">'+esc(x.t)+'</span><span class="v">'+esc(x.time)+'</span></div>'}).join('')+
    '<div class="kv"><span class="k">判定</span><span class="v">3サービスすべてで配信終了</span></div></div>';
  h+='<div class="footn" style="padding-top:14px">U-NEXT / Netflix / Prime Video · 今期以降を全件収集</div>';
  return {act:act,body:h};
}

function renderSchedule(){
  var act='<div class="actbar"><button class="act" data-form="event">'+ic('plus')+'予定</button>'+
    '<button class="act" data-form="task">'+ic('plus')+'タスク</button>'+
    '<button class="act" data-form="recurring">'+ic('plus')+'定期</button></div>';
  var h='';
  var today=fD(TODAY);

  /* 期限切れの未完了タスクは 62 日の表示範囲より前にあるため、
   * そのままだと一覧に出ない。見落とすと困るので先頭にまとめる。 */
  var over=EV.filter(function(e){
    return e.type==='task'&&!e.done&&e.d<today&&
      (!query||(e.n+' '+(e.place||'')+' '+(e.who||'')).toLowerCase().indexOf(query)>-1);
  }).sort(function(a,b){return a.d<b.d?1:-1});
  if(over.length){
    h+='<div class="sechead"><span class="n" style="color:var(--ember)">期限切れ</span>'+
       '<span class="c">'+over.length+' 件</span></div><div class="list">'+
      over.map(function(e){
        var days=Math.round((new Date(today.replace(/\//g,'-'))-new Date(e.d.replace(/\//g,'-')))/864e5);
        return '<div class="day over"><div class="ev">'+
          '<button class="e1" data-ev="'+e.id+'">'+
          '<span class="et" style="color:var(--ember)">'+e.d.slice(5)+'</span>'+
          '<span class="tick" data-done="'+e.id+'" role="button" aria-label="完了にする"></span>'+
          '<span class="en">'+esc(e.n)+'</span>'+
          '<span class="ew" style="color:var(--ember)">'+days+'日超過</span></button></div></div>';
      }).join('')+'</div>';
  }

  var d=new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate());
  var out='',shown=0;
  for(var i=0;i<62;i++){
    var ds=fD(d),dow=d.getDay(),hol=HOL[ds];
    var evs=EV.filter(function(e){return e.d===ds});
    if(query){
      var hit=(ds+' '+(hol||'')+' '+evs.map(function(e){return e.n+' '+(e.who||'')+' '+(e.place||'')}).join(' ')).toLowerCase().indexOf(query)>-1;
      if(!hit){d.setDate(d.getDate()+1);continue}
    }
    shown++;
    evs.sort(function(a,b){
      var o=evOrder(a)-evOrder(b);if(o)return o;
      return (a.time||'').localeCompare(b.time||'');
    });
    var cls='day'+(i===0?' today':'')+(hol?' hd':(dow===0?' sun':(dow===6?' sat':'')));
    out+='<div class="'+cls+'"><div class="dh" data-addday="'+ds+'">'+
      '<span class="dd">'+ds+'</span><span class="dw">('+WK[dow]+')</span>'+
      (hol?'<span class="hol">'+hol+'</span>':'')+
      '<span class="wx">'+wxs(ds)+'</span></div>';
    if(evs.length){
      out+='<div class="ev">'+evs.map(function(e){
        var mark=e.failed?'<span class="ew" style="color:var(--ember)">送信失敗</span>'
                :(e.pending?'<span class="ew">送信中…</span>':'');
        var chk=e.type==='task'
          ? '<span class="tick'+(e.done?' on':'')+'" data-done="'+e.id+'" role="button" '+
            'aria-label="完了を切り替え"></span>' : '';
        return '<button class="e1'+(e.done?' done':'')+'" data-ev="'+e.id+'"><span class="et">'+
          (e.allday?'DAY':(e.type==='task'?(e.done?'済':'TASK'):e.time))+'</span>'+
          chk+'<span class="en">'+(e.rep?'<span class="rep">⟳</span> ':'')+esc(e.n)+'</span>'+
          (mark||'<span class="ew">'+esc(e.who&&e.who!=='—'?e.who:(e.over?'期限超過':''))+'</span>')+'</button>'}).join('')+'</div>';
    }
    out+='</div>';
    d.setDate(d.getDate()+1);
  }
  h+='<div class="sechead"><span class="n">今日から2ヶ月</span><span class="c">'+shown+' 日</span></div>'+
     '<div class="list">'+out+'</div>';
  return {act:act,body:h};
}

function renderMeal(){
  var items=D.filter(function(x){return x.s==='meal'&&match(x)});
  var act='<div class="actbar"><button class="act" data-form="meal">'+ic('plus')+'食事を記録</button>'+
    '<button class="act" data-form="photo">'+ic('cam')+'写真で登録</button></div>';
  // 当日の摂取は記録から積む。目標は PROFILE 由来の値が無いので出さない。
  var kcal=0,cnt=0;
  D.forEach(function(x){
    if(x.s!=='meal'||x.id==='meal-weight')return;
    if(String(x.time).slice(0,10)!==td)return;
    var e=((x.d||{}).kv||[]).filter(function(r){return r[0]==='エネルギー'})[0];
    if(e){kcal+=parseFloat(String(e[1]).replace(/[^0-9.]/g,''))||0;cnt++}
  });
  var wItem=D.filter(function(x){return x.id==='meal-weight'})[0];
  var h='<div class="card"><h4>本日の摂取</h4>'+
    '<div class="kv"><span class="k">合計</span><span class="v">'+
      (cnt?kcal.toLocaleString()+' kcal（'+cnt+'食）':'記録なし')+'</span></div>'+
    (wItem?'<div class="kv"><span class="k">最新の体重</span><span class="v">'+
      esc(((wItem.d||{}).kv||[]).filter(function(r){return r[0]==='体重'}).map(function(r){return r[1]})[0]||'—')+
      '</span></div>':'')+'</div>';
  if(wItem&&(wItem.d||{}).series)
    h+='<div class="card"><h4>体重推移</h4>'+spark(wItem.d.series)+'</div>';
  h+='<div class="sechead"><span class="n">直近の記録</span><span class="c">'+items.length+' 件</span></div>'+
    '<div class="list">'+items.map(function(x){return rowHTML(x,D.indexOf(x))}).join('')+'</div>';
  return {act:act,body:h};
}
/* 体重の折れ線。データはパイプラインが渡した実測値のみを描く。
 * 予測線は出さない（根拠のある予測値を持っていないため）。 */
function spark(series){
  series=series||[];
  if(series.length<2)
    return '<p class="prose" style="color:var(--dim);font-size:12px">'+
      (series.length?'記録が1件だけなのでグラフは表示できません。':'体重の記録がありません。')+'</p>';
  var vs=series.map(function(p){return p[1]});
  var mx=Math.max.apply(null,vs),mn=Math.min.apply(null,vs),W=330,H=76;
  if(mx===mn){mx+=0.5;mn-=0.5}
  var pts=series.map(function(p,i){
    return (i/(series.length-1)*W).toFixed(1)+','+(H-(p[1]-mn)/(mx-mn)*H).toFixed(1)}).join(' ');
  var first=series[0],last=series[series.length-1];
  var diff=(last[1]-first[1]).toFixed(1);
  return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:76px" role="img" aria-label="体重推移">'+
    '<polyline points="'+pts+'" fill="none" stroke="#CFA45C" stroke-width="1.6"/></svg>'+
    '<div class="kv" style="border-top:0;padding-top:6px"><span class="k">'+
    esc(first[0])+' 〜 '+esc(last[0])+'（'+series.length+'件）</span>'+
    '<span class="v">'+last[1].toFixed(1)+' kg（'+(diff>0?'+':'')+diff+'）</span></div>';
}

function renderNews(){
  var CATS=[['all','すべて'],['must','読むべき'],['topic','興味のある'],['trend','トレンド'],['story','追跡中']];
  var cur=seg.news||'all';
  var act='<div class="segs">'+CATS.map(function(c){
    return '<button class="seg '+(cur===c[0]?'on':'')+'" data-seg="news:'+c[0]+'">'+c[1]+'</button>'}).join('')+'</div>';
  var items=sortItems(D.filter(function(x){return x.s==='news'&&match(x)&&
    (cur==='all'||(cur==='story'?x.story:x.cat===cur))}),'news');
  var h='<div class="list">'+items.map(function(x){return rowHTML(x,D.indexOf(x))}).join('')+'</div>';
  if(!items.length)h+='<div class="empty">該当するニュースはありません</div>';
  var stories=D.filter(function(x){return x.s==='news'&&x.story}).length;
  var updated=((MANIFEST.sections||{}).news||{}).updated||'—';
  h+='<div class="card" style="margin-top:12px"><h4>ニュースの状況</h4>'+
    '<div class="kv"><span class="k">追跡中のストーリー</span><span class="v">'+stories+' 件</span></div>'+
    '<div class="kv"><span class="k">掲載</span><span class="v">'+
      D.filter(function(x){return x.s==='news'}).length+' 件</span></div>'+
    '<div class="kv"><span class="k">最終更新</span><span class="v">'+esc(updated)+'</span></div></div>';
  return {act:act,body:h};
}

function renderSearch(){
  var items=sortItems(D.filter(function(x){return x.s==='search'&&match(x)}),'search');
  var act='<div class="actbar"><button class="act" data-form="research">'+ic('plus')+'調べてほしい内容を登録</button></div>';
  var h='<div class="sechead"><span class="n">解説ページ</span><span class="c">'+items.length+' 件</span></div>'+
    '<div class="list">'+items.map(function(x){return rowHTML(x,D.indexOf(x))}).join('')+'</div>';
  var nTerms=Object.keys(TERMS).length;
  h+='<div class="card" style="margin-top:12px"><h4>用語辞書</h4>'+
    '<div class="kv"><span class="k">登録語数</span><span class="v">'+nTerms+' 語</span></div>'+
    '<div class="kv"><span class="k">使い方</span><span class="v">本文中の語をタップ</span></div></div>';
  return {act:act,body:h};
}

// ---- detail
function isWork(s){return s==='anime'||s==='tv'||s==='movies'}
function bodyHead(s){return s==='mail'?'AI 要約':s==='meal'?'AI アドバイス':isWork(s)?'あらすじ':'解説'}
function openDetail(i){curDet=i;pushHist();showDetail(i)}
function showDetail(i){
  var x=D[i],d=x.d||{};
  if(x.s==='mail'){if(x.unread)sessionRead[stateKey(x)]=1;x.unread=0}
  if(x.nw){x.nw=0;touchState(x,{read:1})}
  dSec.textContent=sn(x.s);
  dTrash.style.display='none';dEdit.style.display='none';dDone.style.display='none';
  var h='';
  if(d.poster)h+='<div style="display:flex;gap:13px;margin-bottom:12px">'+
    '<span class="po" style="width:74px;height:106px;font-size:26px">'+
    (d.img?'<img src="'+esc(d.img)+'" alt="" loading="lazy" onerror="this.remove()">':'')+
    '<span class="po-f">'+esc(d.poster)+'</span></span>'+
    '<span style="flex:1;min-width:0"><h1 class="dtitle" style="font-size:17px">'+esc(x.t)+'</h1>'+
    '<div class="dsub" style="margin-bottom:6px">'+esc(d.sub||'')+'</div>'+
    (x.rate?'<span class="star">★ '+x.rate.toFixed(1)+'</span>':'')+'</span></div>';
  else{
    h+='<h1 class="dtitle">'+esc(x.t)+'</h1>';
    if(d.sub)h+='<div class="dsub">'+esc(d.sub)+'</div>';
  }
  if(x.tags)h+='<div class="chips">'+x.tags.map(function(t){return '<span class="tag n" data-tag="'+esc(t)+'">'+esc(t)+'</span>'}).join('')+'</div>';
  if(x.s==='mail')h+='<div class="actbar"><button class="act" data-form="task">'+ic('plus')+'タスクを登録</button>'+
    '<button class="act" data-form="event">'+ic('plus')+'予定を登録</button></div>';
  if(d.status){
    h+='<div class="card"><h4>ステータス</h4><select id="stSel">'+d.status.map(function(o,n){
      return '<option'+(n===d.statusI?' selected':'')+'>'+esc(o)+'</option>'}).join('')+'</select>';
    if(d.prog){var pc=Math.round(d.prog[0]/d.prog[1]*100);
      h+='<div class="kv" style="border-top:0;padding-top:11px"><span class="k">進捗</span><span class="v" id="pgT">'+d.prog[0]+' / '+d.prog[1]+' 話</span></div>'+
        '<div class="bar"><i id="pgB" style="width:'+pc+'%"></i></div>'+
        '<div id="autoNote" style="font-size:10.5px;color:var(--gold);margin-top:8px"></div>'}
    h+='</div>';
  }
  if(d.kv)h+='<div class="card"><h4>詳細</h4>'+d.kv.map(function(r){
    return '<div class="kv"><span class="k">'+esc(r[0])+'</span><span class="v">'+esc(r[1])+'</span></div>'}).join('')+'</div>';
  if(d.graph)h+='<div class="card"><h4>体重推移</h4>'+spark(d.series)+'</div>';
  if(d.fig)h+='<div class="card"><h4>図解</h4><div class="fig">解説用の図（AI生成）</div>'+
    '<div class="kv" style="border-top:0"><span class="k">形式</span><span class="v">初心者向け · 画像付き</span></div></div>';
  if(d.body)h+='<div class="card"><h4>'+bodyHead(x.s)+'</h4><p class="prose">'+linkTerms(esc(d.body))+'</p></div>';
  if(d.cast)h+='<div class="card"><h4>キャスト（役名 / 声優）</h4>'+d.cast.map(function(c){
    return '<div class="kv"><span class="k">'+esc(c[1])+'</span><span class="v">'+esc(c[0])+'</span></div>'}).join('')+'</div>';
  if(d.eps)h+='<div class="card"><h4>各話</h4>'+d.eps.map(function(e,n){
    return '<div class="chk'+(e.on?' on':'')+'" data-n="'+n+'"><span class="box">✓</span>'+
      '<span class="lb">'+esc(e.n)+'　'+esc(e.t)+'</span></div>'}).join('')+'</div>';
  if(d.nut)h+='<div class="card"><h4>栄養素（34種のうち抜粋 / 目安比）</h4><div class="nut">'+d.nut.map(function(r){
    return '<div><span>'+esc(r[0])+'</span><b>'+esc(r[1])+'</b></div>'}).join('')+'</div></div>';
  if(d.links){
    // 見出しはセクションで意味が変わる（メール=登録先、ニュース/検索=出典）
    var lt=d.linksTitle||(x.s==='mail'?'登録された予定 / タスク':'出典');
    h+='<div class="card"><h4>'+esc(lt)+'</h4>'+d.links.map(function(l){
      var isUrl=/^https?:\/\//.test(l.to||'');
      var sub=isUrl?String(l.to).replace(/^https?:\/\//,''):esc(l.to||'');
      var open=isUrl?'<a class="lnk" href="'+esc(l.to)+'" target="_blank" rel="noopener">'
             :(l.ev?'<button class="lnk" data-goev="'+esc(l.ev)+'">':'<div class="lnk">');
      var close=isUrl?'</a>':(l.ev?'</button>':'</div>');
      return open+ic('link')+'<span class="lnk-b"><span class="lnk-t">'+esc(l.t)+'</span>'+
        (sub?'<span class="lnk-s">'+esc(sub)+'</span>':'')+'</span>'+close}).join('')+'</div>';
  }
  if(d.terms)h+='<div class="card"><h4>用語辞書</h4><div class="chips" style="margin:0">'+
    d.terms.map(function(t){
      return TERMS[t]?'<button class="tag g" data-term="'+esc(t)+'">'+esc(t)+'</button>'
                     :'<span class="tag">'+esc(t)+'</span>'}).join('')+'</div></div>';
  if(d.tl)h+='<div class="card"><h4>続報（最新が上）</h4><div class="tl">'+d.tl.map(function(t){
    return '<div class="it"><div class="tt">'+esc(t.t)+'</div><div class="tm">'+esc(t.m)+'</div></div>'}).join('')+'</div>'+
    '<div class="lnk" style="border-top:1px solid var(--line);color:var(--dim)">この話題は不要 — 別のニュースで補充</div></div>';
  if(d.raw)h+='<div class="card"><h4>メール本文</h4><div class="mail-body">'+esc(d.raw)+'</div></div>';
  if(isWork(x.s)){
    var mr=x.myRate||0;
    h+='<div class="card"><h4>自己評価とメモ</h4><div class="stars" id="myStars">'+
      [1,2,3,4,5].map(function(v){return '<span data-star="'+v+'"'+(v<=mr?' class="on"':'')+'>★</span>'}).join('')+'</div>'+
      '<div class="kv" style="border-top:0;padding-top:2px"><span class="k">自己評価</span>'+
      '<span class="v" id="myRateV">'+(mr?mr+' / 5':'未設定')+'</span></div>'+
      '<label class="fl">感想・メモ</label>'+
      '<textarea id="myNote" rows="3" placeholder="自動更新で消えない自分用のメモ">'+esc(x.myNote||'')+'</textarea></div>';
  }
  dBody.innerHTML=h;dBody.scrollTop=0;
  det.classList.add('show');det.setAttribute('aria-hidden','false');

  dBody.querySelectorAll('.chk').forEach(function(el){
    el.onclick=function(){
      el.classList.toggle('on');
      if(d.eps){
        var m={};dBody.querySelectorAll('.chk').forEach(function(c,ci){
          if(d.eps[ci])m[d.eps[ci].n]=c.classList.contains('on');
        });
        touchState(x,{eps:m});
      }
      var pgT=document.getElementById('pgT'),pgB=document.getElementById('pgB');
      if(pgT&&d.prog){
        var done=dBody.querySelectorAll('.chk.on').length;
        var base=d.prog[0]-d.eps.filter(function(z){return z.on}).length;
        var v=Math.max(0,Math.min(d.prog[1],base+done));
        pgT.textContent=v+' / '+d.prog[1]+' 話';pgB.style.width=Math.round(v/d.prog[1]*100)+'%';
        var sel=document.getElementById('stSel'),nt=document.getElementById('autoNote');
        if(sel&&nt){
          if(v>=d.prog[1]){sel.value='✅ 視聴済み';x.st='done';x.tag='視聴済み';x.cls='';x.nw=0;
            touchState(x,{st:'done'});
            nt.textContent='全話チェック完了 → ステータスを「視聴済み」に自動変更しました';}
          else nt.textContent='';
        }
      }
    };
  });
  dBody.querySelectorAll('[data-form]').forEach(function(el){
    el.onclick=function(){openForm(el.getAttribute('data-form'))};
  });
  bindTermLinks();
  dBody.querySelectorAll('[data-goev]').forEach(function(el){
    el.onclick=function(){
      var id=el.getAttribute('data-goev');
      if(findEv(id)){view='schedule';curTag='';openEvent(id)}
      else go('schedule');   // まだ予定側に無い場合は一覧へ逃がす
    };
  });
  dBody.querySelectorAll('[data-tag]').forEach(function(el){
    el.onclick=function(){goTag(el.getAttribute('data-tag'))};
  });
  var stSel=document.getElementById('stSel');
  if(stSel&&d.status)stSel.onchange=function(){
    var i2=d.status.indexOf(stSel.value);
    if(i2<0)return;
    var codes=['upcoming','available','watching','done'];
    x.st=codes[i2]||x.st;x.tag=d.status[i2].replace(/^\S+\s/,'');
    touchState(x,{st:x.st});
  };
  var stars=document.getElementById('myStars');
  if(stars)stars.querySelectorAll('[data-star]').forEach(function(el){
    el.onclick=function(){
      var v=+el.getAttribute('data-star');x.myRate=v;
      stars.querySelectorAll('[data-star]').forEach(function(z){
        z.classList.toggle('on',+z.getAttribute('data-star')<=v)});
      document.getElementById('myRateV').textContent=v+' / 5';
      touchState(x,{myRate:v});
    };
  });
  var note=document.getElementById('myNote');
  if(note)note.addEventListener('input',function(){
    x.myNote=note.value;touchState(x,{myNote:note.value});
  });
}
/* 用語の解説。検索の一覧には出さず、リンクからだけ開く。 */
function showTerm(name){
  var t=TERMS[name];if(!t)return;
  dSec.textContent='用語';
  dTrash.style.display='none';dEdit.style.display='none';
  var h='<h1 class="dtitle">'+esc(t.t)+'</h1>';
  h+='<div class="dsub">'+esc(t.category||'用語')+
     (t.aliases&&t.aliases.length?' · '+esc(t.aliases.join(' / ')):'')+'</div>';
  if(t.one)h+='<div class="card"><h4>一言でいうと</h4><p class="prose">'+linkTerms(esc(t.one))+'</p></div>';
  if(t.body)h+='<div class="card"><h4>解説</h4><p class="prose">'+linkTerms(esc(t.body))+'</p></div>';
  if(t.related&&t.related.length)
    h+='<div class="card"><h4>関連する用語</h4><div class="chips" style="margin:0">'+
      t.related.map(function(r){
        return TERMS[r]?'<button class="tag g" data-term="'+esc(r)+'">'+esc(r)+'</button>'
                       :'<span class="tag">'+esc(r)+'</span>'}).join('')+'</div></div>';
  dBody.innerHTML=h;dBody.scrollTop=0;
  det.classList.add('show');det.setAttribute('aria-hidden','false');
  bindTermLinks();
}
function openTerm(name){curDet={term:name};pushHist();showTerm(name)}
function bindTermLinks(){
  dBody.querySelectorAll('[data-term]').forEach(function(el){
    el.onclick=function(ev){ev.stopPropagation();openTerm(el.getAttribute('data-term'))};
  });
}
function hideDetail(){det.classList.remove('show');det.setAttribute('aria-hidden','true');
  dTrash.style.display='none';dEdit.style.display='none';dDone.style.display='none'}
document.getElementById('backBtn').onclick=histBack;

// ---- forms
var DISHES=['牛丼@すき家','トースト@自宅','サラダ@自宅','カレー@自宅','ラーメン@一蘭','味噌汁@自宅','コーヒー@自宅','唐揚げ弁当@ほっともっと'];
var FORMS={
 event:{h:'予定を登録',s:'AI が移動方法・天気・周辺スポットを自動で付加します',
   f:[['予定名','text',''],['日付','date',''],
      ['時間','timeall',''],['場所','place',''],
      ['一緒に遊ぶ人','text',''],['繰り返し','select','なし|毎日|毎週|毎月|毎年']]},
 task:{h:'タスクを登録',s:'締切だけのシンプル登録',f:[['タスク名','text',''],['締切','date','']]},
 recurring:{h:'定期予定を登録',s:'誕生日は「(◯歳)」、記念日は「(◯年)」を基準日から自動で付けます',
   f:[['分類','select','予定|タスク|誕生日|記念日'],['予定名','text',''],
      ['日付','date',''],['時間','timeall',''],['場所','place',''],
      ['一緒に遊ぶ人','text',''],['繰り返し','select','毎年|毎月|毎週']]},
 meal:{h:'食事を記録',s:'複数の食事をまとめて登録できます。体重は未入力なら変化なし',multi:1},
 photo:{h:'写真で登録',s:'画像をアップロードすると AI が料理・食材・栄養素を解析します',
   f:[['画像','file',''],['メモ（任意）','text','すき家で昼食']]},
 research:{h:'調べてほしい内容を登録',s:'初心者向けに画像付きで解説し、用語ページも自動生成します',
   f:[['調べたい内容','text','量子コンピュータ']]}
};
var placeTimer=null;
function confirmDelete(name,onYes){
  sheet.innerHTML='<h3>削除しますか</h3><div class="sh">'+esc(name)+'</div>'+
    '<p class="prose" style="color:var(--dim);font-size:12.5px;margin-top:4px">'+
    'この操作は取り消せません。life-content からも削除されます。</p>'+
    '<button class="danger" id="cfYes" style="margin-top:14px">削除する</button>'+
    '<button class="btn sec" id="cfNo">キャンセル</button>';
  mask.classList.add('show');sheet.scrollTop=0;
  document.getElementById('cfNo').onclick=function(){mask.classList.remove('show')};
  document.getElementById('cfYes').onclick=function(){mask.classList.remove('show');onYes()};
}
function autoc(input,sug,list){
  function upd(){
    var v=input.value.trim().toLowerCase();
    var f=list.filter(function(p){return !v||p.toLowerCase().indexOf(v)>-1}).slice(0,6);
    sug.innerHTML=f.map(function(p){return '<span class="tag" data-v="'+esc(p)+'">'+esc(p)+'</span>'}).join('');
    [].forEach.call(sug.querySelectorAll('[data-v]'),function(el){
      el.onclick=function(){input.value=el.getAttribute('data-v');upd()}});
  }
  input.addEventListener('input',upd);upd();
}
function mealRowHTML(n){
  return '<div class="card" style="margin-top:9px"><h4>食事 '+n+'</h4>'+
    '<label class="fl">料理 / 食材</label><input type="text" class="dishIn" data-k="料理" placeholder="入力して候補から選択" autocomplete="off">'+
    '<div class="sug dishSug"></div>'+
    '<label class="fl">個数 / 量</label><input type="text" data-k="量" placeholder="1杯（並）"></div>';
}
function openForm(k,prefill,opts){
  var F=FORMS[k];if(!F)return;
  prefill=prefill||{};opts=opts||{};
  var h='<h3>'+esc(F.h)+'</h3><div class="sh">'+esc(F.s)+'</div>';
  if(F.multi){
    h+='<div id="mealRows">'+mealRowHTML(1)+'</div>'+
      '<button class="btn sec" id="addRow">＋ 食事をもう1件追加</button>'+
      '<label class="fl">体重（任意・未入力なら変化なし）</label><input type="text" data-k="体重" placeholder="62.4">';
  }else{
    F.f.forEach(function(f){
      h+='<label class="fl">'+esc(f[0])+'</label>';
      var dk=' data-k="'+esc(f[0])+'"';
      var pv=prefill[f[0]]!==undefined?String(prefill[f[0]]):'';
      var va=pv?' value="'+esc(pv)+'"':'';
      if(f[1]==='select')h+='<select'+dk+'>'+f[2].split('|').map(function(o){
        return '<option'+(o===pv?' selected':'')+'>'+esc(o)+'</option>'}).join('')+'</select>';
      else if(f[1]==='timeall')h+='<div class="cbrow"><input type="time" id="timeIn" data-k="時間" value="'+
        esc(prefill['時間']||'00:00')+'" style="flex:1">'+
        '<label><input type="checkbox" id="alldayCb" data-k="終日"'+(prefill['終日']?' checked':'')+'> 終日</label></div>';
      else if(f[1]==='place')h+='<input type="text" id="placeIn" data-k="場所"'+va+' placeholder="'+esc(f[2])+'" autocomplete="off">'+
        '<div class="plist" id="placeSug" style="display:none"></div>';
      else if(f[1]==='file')h+='<div class="fig" style="height:88px">画像をアップロード</div>';
      else h+='<input type="'+f[1]+'"'+dk+va+' placeholder="'+esc(f[2])+'">';
    });
  }
  h+='<button class="btn" id="fSubmit">'+(opts.editId?'変更を保存':'登録して GitHub に送信')+
     '</button><button class="btn sec" id="fCancel">キャンセル</button>';
  sheet.innerHTML=h;mask.classList.add('show');sheet.scrollTop=0;

  var cb=document.getElementById('alldayCb'),ti=document.getElementById('timeIn');
  if(cb&&ti){
    cb.addEventListener('change',function(){ti.disabled=cb.checked;if(cb.checked)ti.value=''});
    if(cb.checked){ti.disabled=true;ti.value=''}
  }
  var pi=document.getElementById('placeIn');
  if(pi){
    var ps=document.getElementById('placeSug');
    var hideP=function(){ps.innerHTML='';ps.style.display='none'};
    var showP=function(list,offline){
      if(!list.length)return hideP();
      ps.style.display='flex';
      ps.innerHTML=list.map(function(p){
        return '<button type="button" data-p="'+esc(p[0])+'"><span class="pn">'+esc(p[0])+'</span>'+
          '<span class="pa">'+esc(p[1])+'</span></button>'}).join('')+
        (offline?'<button type="button" disabled><span class="pa">オフライン候補を表示中</span></button>':'');
      [].forEach.call(ps.querySelectorAll('[data-p]'),function(el){
        el.onclick=function(){pi.value=el.getAttribute('data-p');hideP()}});
    };
    pi.addEventListener('input',function(){
      var v=pi.value.trim();
      clearTimeout(placeTimer);
      if(!v)return hideP();
      ps.style.display='flex';
      ps.innerHTML='<button type="button" disabled><span class="pa">検索中…</span></button>';
      placeTimer=setTimeout(function(){Places.search(v,showP)},700);
    });
  }
  function wireDishes(){
    [].forEach.call(sheet.querySelectorAll('.dishIn'),function(inp){
      if(inp.dataset.w)return;inp.dataset.w='1';
      autoc(inp,inp.parentNode.querySelector('.dishSug'),DISHES);
    });
  }
  wireDishes();
  var ar=document.getElementById('addRow');
  if(ar)ar.onclick=function(){
    var rows=document.getElementById('mealRows');
    rows.insertAdjacentHTML('beforeend',mealRowHTML(rows.children.length+1));
    wireDishes();
  };
  document.getElementById('fCancel').onclick=function(){mask.classList.remove('show')};
  document.getElementById('fSubmit').onclick=function(){
    var btn=this,payload={};
    sheet.querySelectorAll('[data-k]').forEach(function(el){
      var key=el.getAttribute('data-k');
      var v=el.type==='checkbox'?el.checked:el.value;
      if(v===''||v===false)return;
      if(payload[key]===undefined)payload[key]=v;
      else{if(!Array.isArray(payload[key]))payload[key]=[payload[key]];payload[key].push(v)}
    });
    if(!GH.hasToken()){
      btn.textContent='デモモードです — 右上から接続設定を行ってください';
      setTimeout(function(){mask.classList.remove('show');btn.textContent='登録して GitHub に送信'},1800);
      return;
    }
    // 先に画面へ反映して閉じ、GitHub への送信は裏で行う。
    // 反映まで待たされると操作が重く感じるため。
    var local=localEvent(k,payload);
    mask.classList.remove('show');
    if(opts.editId){
      // 編集は既存を差し替える。id は保ったまま。
      payload.id=opts.editId;
      EV.forEach(function(e){
        if(e.id!==opts.editId||!local)return;
        e.n=local.n;e.d=local.d;e.time=local.time;e.place=local.place;
        e.who=local.who;e.allday=local.allday;e.rep=local.rep;e.pending=1;e.failed=0;
      });
      local=EV.filter(function(e){return e.id===opts.editId})[0]||null;
      render();
    }else if(local){EV.push(local);render();}
    GH.pushInbox(opts.editId?'update':k,payload).then(function(){
      if(local){local.pending=0;render();}
      setSync('送信しました',true);
    }).catch(function(e){
      if(local){local.failed=1;render();}
      setSync('送信失敗',false);
      notify('登録の送信に失敗しました（'+e.message+'）。通信を確認して再登録してください。',true);
    });
  };
}
mask.onclick=function(e){if(e.target===mask)mask.classList.remove('show')};

// ---- binding
function bind(){
  [actzone,scroll].forEach(function(root){
    root.querySelectorAll('[data-i]').forEach(function(el){el.onclick=function(){openDetail(+el.getAttribute('data-i'))}});
    root.querySelectorAll('[data-sec]').forEach(function(el){el.onclick=function(){go(el.getAttribute('data-sec'))}});
    root.querySelectorAll('[data-seg]').forEach(function(el){el.onclick=function(){
      var p=el.getAttribute('data-seg').split(':');seg[p[0]]=p[1];render()}});
    root.querySelectorAll('[data-mail]').forEach(function(el){el.onclick=function(){
      mailRead=el.getAttribute('data-mail')==='1';
      if(mailRead)sessionRead={};
      render()}});
    root.querySelectorAll('[data-form]').forEach(function(el){el.onclick=function(){
      var kind=el.getAttribute('data-form');
      // 予定一覧の上部から作った場合は当日を初期値にする
      var pre=kind==='event'?{'日付':fD(TODAY).replace(/\//g,'-')}
             :kind==='task'?{'締切':fD(TODAY).replace(/\//g,'-')}:null;
      // 定期の日付は「基準日」（誕生日なら生年月日）なので当日を入れない
      openForm(kind,pre);
    }});
    root.querySelectorAll('[data-ev]').forEach(function(el){el.onclick=function(){openEvent(el.getAttribute('data-ev'))}});
    root.querySelectorAll('[data-done]').forEach(function(el){
      el.onclick=function(ev){ev.stopPropagation();toggleDone(el.getAttribute('data-done'))};
    });
    root.querySelectorAll('[data-addday]').forEach(function(el){el.onclick=function(){
      openForm('event',{'日付':el.getAttribute('data-addday').replace(/\//g,'-')})}});
  });
  var p=document.getElementById('photoRow');if(p)p.onclick=openPhotos;
  var g=document.getElementById('ghRow');if(g)g.onclick=openSettings;
  var a=document.getElementById('askRow');if(a)a.onclick=function(){a.textContent='送信しました — Actions が調査を開始します';a.style.borderStyle='solid'};
}

/* 下バーは一度だけ組み立て、以降は有効/無効の切り替えだけにする。
 * 毎回 innerHTML を作り直すと、3秒ごとの同期描画とタップが重なったときに
 * 押した要素そのものが消えて操作が空振りする。 */
var bbBuilt=false;
function renderBottom(){
  if(!bbBuilt){
    bottombar.innerHTML=
      '<button class="bb" id="bbBack" aria-label="1つ前に戻る">'+ic('back')+'</button>'+
      '<button class="bb" id="bbHome" aria-label="ダッシュボードへ">'+ic('home')+'</button>'+
      '<button class="bb acc" id="bbAdd" aria-label="登録ショートカット">'+ic('plus')+'</button>'+
      '<button class="bb" id="bbRef" aria-label="GitHubと同期して更新">'+ic('refresh')+'</button>'+
      '<button class="bb" id="bbFwd" aria-label="1つ先へ進む">'+ic('fwd')+'</button>';
    document.getElementById('bbBack').onclick=histBack;
    document.getElementById('bbFwd').onclick=histFwd;
    document.getElementById('bbHome').onclick=function(){go('home')};
    document.getElementById('bbAdd').onclick=openAddMenu;
    document.getElementById('bbRef').onclick=doRefresh;
    bbBuilt=true;
  }
  document.getElementById('bbBack').disabled=!(hpos>0);
  document.getElementById('bbFwd').disabled=!(hpos<hist.length-1);
}

/* 送信前に画面へ出す仮の予定。GitHub 側の採番前なので id は一時的なもの。
 * 次の同期でサーバー側の正データに置き換わる。 */
function localEvent(kind,p){
  // 定期は基準日から各年に展開する必要があり、サイト側では正しく作れない。
  // サーバー処理を待って次の同期で反映する。
  if(kind!=='event'&&kind!=='task')return null;
  var name=(p['予定名']||p['タスク名']||'').trim();
  var raw=(p['締切']||p['日付']||'').trim();
  var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  if(!name||!m)return null;
  var allday=p['終日']===true||p['終日']==='true';
  var t=(p['時間']||'').trim();
  var rep=(p['繰り返し']||'').trim();
  return {id:'local-'+Date.now(),d:m[1]+'/'+m[2]+'/'+m[3],n:name,
    type:kind==='task'?'task':'event',
    time:(kind==='task'||allday||!/^\d{1,2}:\d{2}$/.test(t))?'—':t,
    place:(p['場所']||'').trim(),who:(p['一緒に遊ぶ人']||'').trim(),
    allday:allday?1:0,rep:(rep&&rep!=='なし')?rep:'',src:'web',pending:1};
}

/* タスクの完了/未完了。画面を先に変え、vault への反映は裏で行う。 */
function toggleDone(id){
  var e=findEv(id);
  if(!e)return;
  var want=!e.done;
  if(want)e.done=1;else delete e.done;
  render();
  if(det.classList.contains('show')&&curDet&&curDet.ev===id)showEvent(id);
  if(!GH.hasToken()||String(id).indexOf('local-')===0)return;
  GH.pushInbox('done',{id:id,done:want}).then(function(){
    setSync(want?'完了にしました':'未完了に戻しました',true);
  }).catch(function(err){
    if(want)delete e.done;else e.done=1;
    render();
    notify('完了状態の送信に失敗しました（'+err.message+'）。',true);
  });
}

function openAddMenu(){
  var opts=[['event','予定を登録'],['task','タスクを登録'],['recurring','定期予定を登録'],['meal','食事を記録'],
            ['photo','写真で登録'],['research','調べてほしい内容を登録']];
  sheet.innerHTML='<h3>登録</h3><div class="sh">どこからでも登録できます</div>'+
    opts.map(function(o){return '<button class="act" style="width:100%;margin-top:8px;justify-content:flex-start" data-open="'+o[0]+'">'+ic('plus')+esc(o[1])+'</button>'}).join('')+
    '<button class="btn sec" id="fCancel">キャンセル</button>';
  mask.classList.add('show');sheet.scrollTop=0;
  sheet.querySelectorAll('[data-open]').forEach(function(el){
    el.onclick=function(){openForm(el.getAttribute('data-open'))}});
  document.getElementById('fCancel').onclick=function(){mask.classList.remove('show')};
}
function doRefresh(){
  var b=document.getElementById('bbRef');
  b.disabled=true;setSync('同期中…',false);
  if(!GH.hasToken()){useDemo();b.disabled=false;return}
  loadAll().then(function(){setSync('同期済み',true)})
    .catch(function(e){setSync('エラー',false)})
    .then(function(){document.getElementById('bbRef').disabled=false});
}
function findEv(id){for(var j=0;j<EV.length;j++)if(EV[j].id===id)return EV[j];return null}
function openEvent(id){curDet={ev:id};pushHist();showEvent(id)}
function showEvent(id){
  var e=findEv(id);
  if(!e){hideDetail();return}
  var ds=e.d,dt=new Date(ds.replace(/\//g,'-')),hol=HOL[ds];
  var isTask=e.type==='task';
  dSec.textContent=isTask?'タスク':'予定';
  dTrash.style.display='grid';dEdit.style.display='grid';
  dDone.style.display=isTask?'grid':'none';
  dDone.className='ib'+(e.done?' on':'');
  dDone.setAttribute('aria-label',e.done?'未完了に戻す':'完了にする');
  var h='<h1 class="dtitle">'+(e.rep?'<span class="rep">⟳</span> ':'')+esc(e.n)+'</h1>';
  h+='<div class="dsub">'+ds+' ('+WK[dt.getDay()]+')'+(hol?' '+hol:'')+'</div>';
  h+='<div class="card"><h4>詳細</h4>'+
    '<div class="kv"><span class="k">種別</span><span class="v">'+(isTask?'タスク':'予定')+'</span></div>'+
    (isTask
      ? '<div class="kv"><span class="k">締切</span><span class="v">'+ds+'</span></div>'+
        '<div class="kv"><span class="k">状態</span><span class="v">'+
          (e.done?'✅ 完了':(e.over?'⚠️ 期限超過':'未完了'))+'</span></div>'
      : '<div class="kv"><span class="k">日時</span><span class="v">'+(e.allday?ds+' DAY（終日）':ds+' '+esc(e.time))+'</span></div>'+
        '<div class="kv"><span class="k">場所</span><span class="v">'+esc(e.place||'—')+'</span></div>'+
        '<div class="kv"><span class="k">一緒に遊ぶ人</span><span class="v">'+esc(e.who||'—')+'</span></div>'+
        (e.rep?'<div class="kv"><span class="k">繰り返し</span><span class="v">⟳ '+esc(e.rep)+'</span></div>':''))+
    (e.src?'<div class="kv"><span class="k">出典</span><span class="v">'+esc(e.src)+'</span></div>':'')+'</div>';

  if(e.mail){
    var mi=D.filter(function(x){return x.s==='mail'&&x.t===e.mail})[0];
    h+='<div class="card"><h4>元になったメール</h4>'+
      (mi?'<button class="lnk" data-gomail="'+D.indexOf(mi)+'">':'<div class="lnk">')+
      ic('mail')+'<span class="lnk-b"><span class="lnk-t">'+esc(e.mail)+'</span>'+
      (mi?'<span class="lnk-s">'+esc(mi.time)+'</span>':
          '<span class="lnk-s">このメールは一覧に残っていません</span>')+'</span>'+
      (mi?'</button>':'</div>')+'</div>';
  }

  /* 場所に基づく解析はパイプラインが生成して予定に持たせている。
   * サイト側で作文はしない（実在しない情報を出さないため）。 */
  if(e.ai&&e.ai.length){
    e.ai.forEach(function(sec){
      h+='<div class="card"><h4>'+esc(sec.h)+'</h4><p class="prose">'+linkTerms(esc(sec.b))+'</p></div>';
    });
  }else if(!isTask&&e.place&&e.place!=='—'){
    h+='<div class="card"><h4>場所の情報</h4><p class="prose" style="color:var(--dim)">'+
      esc(e.place)+' の天気・アクセス・周辺情報はまだ生成されていません。'+
      '毎朝の自動更新で追記されます。</p></div>';
  }
  dBody.innerHTML=h;dBody.scrollTop=0;det.classList.add('show');det.setAttribute('aria-hidden','false');
  dBody.querySelectorAll('[data-gomail]').forEach(function(el){
    el.onclick=function(){view='mail';curTag='';openDetail(+el.getAttribute('data-gomail'))};
  });
  dTrash.onclick=function(){
    confirmDelete(e.n,function(){
      // 画面から先に消し、GitHub へは裏で削除を送る。
      // ローカルだけ消しても次の同期で復活してしまうため。
      for(var j=0;j<EV.length;j++){if(EV[j].id===id){EV.splice(j,1);break}}
      histBack();
      if(GH.hasToken()&&String(id).indexOf('local-')!==0){
        GH.pushInbox('delete',{id:id,name:e.n}).then(function(){
          setSync('削除しました',true);
        }).catch(function(err){
          EV.push(e);render();
          notify('削除の送信に失敗しました（'+err.message+'）。もう一度お試しください。',true);
        });
      }
    });
  };
  dDone.onclick=function(){toggleDone(id)};
  dEdit.onclick=function(){
    openForm(e.type==='task'?'task':'event',
      e.type==='task'?{'タスク名':e.n,'締切':e.d.replace(/\//g,'-')}
                     :{'予定名':e.n,'日付':e.d.replace(/\//g,'-'),
                       '時間':(e.time&&e.time!=='—')?e.time:'',
                       '終日':!!e.allday,'場所':e.place||'','一緒に遊ぶ人':e.who||'',
                       '繰り返し':e.rep||'なし'},
      {editId:id});
  };
}

function openPhotos(){
  var t=Date.now(),f=document.createElement('iframe');
  f.style.display='none';f.src='googlephotos://';document.body.appendChild(f);
  setTimeout(function(){document.body.removeChild(f);
    if(Date.now()-t<1800)window.location.href='https://photos.google.com'},1200);
}

function go(v){view=v;curTag='';curDet=null;q.value='';query='';queryRaw='';clr.style.display='none';
  tagsug.style.display='none';pushHist();hideDetail();render();scroll.scrollTop=0;closeD()}
function goTag(t){curTag=t;view='tag';curDet=null;q.value='';query='';queryRaw='';clr.style.display='none';
  tagsug.style.display='none';pushHist();hideDetail();render();scroll.scrollTop=0;closeD()}

document.getElementById('menuBtn').onclick=openD;
function openD(){app.classList.add('open')}
function closeD(){app.classList.remove('open')}
document.getElementById('scrim').onclick=closeD;
function newCount(k){return D.filter(function(x){return x.s===k&&x.nw}).length}
function renderMenu(){
  var mh='<div class="mg">表示</div><button class="mi'+(view==='home'?' on':'')+'" data-f="home">'+
    ic('grid')+'ダッシュボード</button><div class="mg">セクション</div>';
  SEC.forEach(function(s){
    var c=newCount(s.k);
    mh+='<button class="mi'+(view===s.k?' on':'')+'" data-f="'+s.k+'">'+ic(s.k)+esc(s.n)+
      (c?'<span class="ct">'+c+'</span>':'')+'</button>';
  });
  mh+='<div class="mg">アプリ</div><button class="mi" id="miPhotos">'+ic('photos')+'Google フォト</button>';
  var menuEl=document.getElementById('menu');
  menuEl.innerHTML=mh;
  menuEl.querySelectorAll('.mi[data-f]').forEach(function(el){
    el.onclick=function(){go(el.getAttribute('data-f'))};
  });
  document.getElementById('miPhotos').onclick=function(){closeD();openPhotos()};
}

// search + tag suggestions
function showSug(){
  var list=tagCounts(view==='home'||view==='tag'?null:view).slice(0,16);
  if(!list.length){tagsug.style.display='none';return}
  tagsug.innerHTML='<div class="h">タグ候補（多い順）</div><div class="wrap">'+list.map(function(t){
    return '<span class="tag" data-tag="'+esc(t[0])+'">'+esc(t[0])+' <span style="color:var(--faint)">'+t[1]+'</span></span>'}).join('')+'</div>';
  tagsug.style.display='block';
  tagsug.querySelectorAll('[data-tag]').forEach(function(el){
    el.onclick=function(){q.blur();goTag(el.getAttribute('data-tag'))};
  });
}
q.addEventListener('focus',function(){if(!q.value)showSug()});
q.addEventListener('input',function(){
  queryRaw=q.value.trim();query=queryRaw.toLowerCase();
  clr.style.display=query?'block':'none';
  if(query)tagsug.style.display='none';else showSug();
  render();
});
clr.onclick=function(){q.value='';query='';queryRaw='';clr.style.display='none';render();showSug();q.focus()};
document.addEventListener('click',function(e){
  if(!e.target.closest('.sw'))tagsug.style.display='none';
});

// swipe
var sx=0,sy=0,tr=false,edge=false;
app.addEventListener('touchstart',function(e){var t=e.touches[0];sx=t.clientX;sy=t.clientY;tr=true;edge=sx<32},{passive:true});
app.addEventListener('touchmove',function(e){
  if(!tr)return;var t=e.touches[0],dx=t.clientX-sx,dy=t.clientY-sy;
  if(Math.abs(dx)<Math.abs(dy))return;
  if(det.classList.contains('show')){if(edge&&dx>60){histBack();tr=false}return}
  if(edge&&dx>44&&!app.classList.contains('open')){openD();tr=false}
  if(app.classList.contains('open')&&dx<-44){closeD();tr=false}
},{passive:true});
app.addEventListener('touchend',function(){tr=false});


/* ---- データ同期 ---------------------------------------------------------
 * .web/manifest.json だけを 3 秒間隔で監視し、sha が変わったときだけ
 * セクション JSON を取り直す。1 ファイルなら 1,200 req/h 程度で、
 * 認証済みの上限 5,000 req/h に十分収まる。
 */
var SECKEYS=['mail','schedule','anime','tv','movies','meal','news','search'];

function setSync(txt,ok){
  document.getElementById('syncTxt').textContent=txt;
  document.getElementById('pulse').style.background=ok?'var(--ok)':'var(--faint)';
}
function useDemo(){
  D=DEMO.items.slice();EV=DEMO.events.slice();DEMO_MODE=true;
  TERMS=DEMO.terms||{};buildTermRe();
  if(DEMO.holidays)HOL=DEMO.holidays;
  GREETING={text:'デモモードです。右上の接続設定からトークンを登録すると、あなたのデータが表示されます。'};
  setSync('デモ',false);render();
  if(noticeEl)noticeEl.hidden=true;
}
function loadAll(){
  return Promise.all(SECKEYS.map(function(k){
    return GH.getJSON('.web/'+k+'.json').catch(function(){return null});
  })).then(function(res){
    var items=[],events=[];
    res.forEach(function(j,i){
      if(!j)return;
      var k=SECKEYS[i];
      (j.items||[]).forEach(function(it){it.s=it.s||k;items.push(it)});
      (j.events||[]).forEach(function(ev){events.push(ev)});
    });
    D=items;EV=events;DEMO_MODE=false;
    return Promise.all([
      GH.getJSON('.web/greeting.json').catch(function(){return null}),
      GH.getJSON('.web/state.json').catch(function(){return null}),
      GH.getJSON('.web/terms.json').catch(function(){return null}),
      GH.getJSON('.web/holidays.json').catch(function(){return null})
    ]);
  }).then(function(res){
    if(res[0]&&res[0].text)GREETING=res[0];
    STATE=res[1]||{};
    TERMS=res[2]||{};buildTermRe();
    if(res[3])HOL=res[3];
    applyUserState();
    render();updateNotice();
  });
}
var syncing=false;
function sync(){
  if(!GH.hasToken()||syncing)return Promise.resolve();
  syncing=true;
  return GH.checkManifest().then(function(r){
    if(r.manifest)MANIFEST=r.manifest;
    return r.changed?loadAll():null;
  }).then(function(){
    setSync('同期済み',true);
  }).catch(function(e){
    setSync(e.message.indexOf('401')>-1?'認証エラー':'未接続',false);
  }).then(function(){
    /* 期限切れで同期が落ちている時こそ通知が要るので、成否にかかわらず評価する */
    syncing=false;updateNotice();
  });
}

function openSettings(){
  var st=GH.state;
  sheet.innerHTML='<h3>接続設定</h3><div class="sh">データは private リポジトリから直接読み込みます</div>'+
    '<label class="fl">データリポジトリ</label>'+
    '<input type="text" id="setRepo" value="'+esc(st.repo)+'" placeholder="knowlsaws/life-content">'+
    '<label class="fl">アクセストークン（fine-grained PAT）</label>'+
    '<input type="password" id="setTok" placeholder="'+(st.token?'保存済み（変更するときだけ入力）':'github_pat_...')+'">'+
    '<p class="prose" style="font-size:11.5px;color:var(--faint);margin-top:10px">'+
    '対象リポジトリを life-content のみに限定し、Contents を Read and write にしてください。'+
    'トークンはこの端末のブラウザにだけ保存され、どこにも送信されません。</p>'+
    '<div class="card" style="margin-top:12px"><h4>状態</h4>'+
    '<div class="kv"><span class="k">接続</span><span class="v">'+(st.online?'オンライン':(st.token?'未接続':'デモモード'))+'</span></div>'+
    (st.lastError?'<div class="kv"><span class="k">直近のエラー</span><span class="v">'+esc(st.lastError)+'</span></div>':'')+
    '</div>'+
    '<button class="btn" id="setSave">保存して接続</button>'+
    (st.token?'<button class="btn sec" id="setClear">トークンを削除してデモに戻す</button>':'')+
    '<button class="btn sec" id="fCancel">閉じる</button>';
  mask.classList.add('show');sheet.scrollTop=0;
  document.getElementById('fCancel').onclick=function(){mask.classList.remove('show')};
  document.getElementById('setSave').onclick=function(){
    var btn=this;
    GH.setRepo(document.getElementById('setRepo').value);
    var t=document.getElementById('setTok').value;
    if(t)GH.setToken(t);
    if(!GH.hasToken()){btn.textContent='トークンを入力してください';return}
    btn.disabled=true;btn.textContent='接続中…';
    GH.checkManifest().then(function(){
      return loadAll();
    }).then(function(){
      setSync('同期済み',true);mask.classList.remove('show');
    }).catch(function(e){
      btn.disabled=false;btn.textContent='接続失敗: '+e.message;
    });
  };
  var clearBtn=document.getElementById('setClear');
  if(clearBtn)clearBtn.onclick=function(){
    GH.setToken('');mask.classList.remove('show');useDemo();
  };
}

/* ---- トークン期限の通知 -------------------------------------------------
 * fine-grained PAT は既定 90 日で失効する。切れると同期が止まって気付きにくいので、
 * 残り 14 日を切ったら上部に常時表示する。
 */
var noticeEl=document.getElementById('notice');
function fmtDay(d){return d.getFullYear()+'/'+pad(d.getMonth()+1)+'/'+pad(d.getDate())}
var noticeSticky=false;
function notify(msg,crit){
  if(!noticeEl)return;
  // 3秒ごとの同期が updateNotice() で書き換えてしまうため、
  // 明示的に閉じるまで残す印を立てる
  noticeSticky=true;
  noticeEl.className='notice'+(crit?' crit':'');
  noticeEl.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" '+
    'stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/></svg>'+
    '<span>'+esc(msg)+'</span><span class="nx" id="noticeX" role="button" aria-label="閉じる">×</span>';
  noticeEl.hidden=false;
  noticeEl.onclick=function(){noticeSticky=false;noticeEl.hidden=true;updateNotice()};
}
function updateNotice(){
  if(!noticeEl||noticeSticky)return;
  if(!GH.hasToken()){noticeEl.hidden=true;return}
  var left=GH.daysLeft(),exp=GH.expiryDate();
  if(left===null||left>14){noticeEl.hidden=true;return}
  if(localStorage.getItem('lifehub.noticeDismissed')===String(left)){noticeEl.hidden=true;return}
  noticeEl.className='notice'+(left<=3?' crit':'');
  noticeEl.innerHTML=
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">'+
    '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/></svg>'+
    '<span>'+(left<=0
      ? 'アクセストークンが失効しました。再発行して接続設定から登録してください。'
      : 'アクセストークンがあと <b>'+left+'日</b>で失効します（'+fmtDay(exp)+'）。'+
        (GH.expiryIsExact()?'':'※保存日からの推定')+'<br>タップで接続設定を開きます。')+'</span>'+
    '<span class="nx" id="noticeX" role="button" aria-label="閉じる">×</span>';
  noticeEl.hidden=false;
  noticeEl.onclick=function(ev){
    if(ev.target.id==='noticeX'){
      localStorage.setItem('lifehub.noticeDismissed',String(left));
      noticeEl.hidden=true;return;
    }
    openSettings();
  };
}
document.getElementById('syncBtn').onclick=openSettings;

if(GH.hasToken()){
  setSync('接続中…',false);
  D=[];EV=[];render();
  updateNotice();
  sync();
}else{
  useDemo();
}
loadForecast();
setInterval(sync,3000);
})();
