(function(){
var ICON={
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
 schedule:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
 anime:'<rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 2l4 5 4-5"/>',
 tv:'<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8"/>',
 movies:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18"/>',
 meal:'<path d="M4 3v8a3 3 0 0 0 6 0V3M7 3v18M17 3c-1.5 0-2 3-2 6s.5 5 2 5 2-2 2-5-.5-6-2-6zM17 14v7"/>',
 essentials:'<path d="M6 8h12l1 12H5L6 8z"/><path d="M9 11V6a3 3 0 0 1 6 0v5"/>',
 supra:'<path d="M3 15v-2.5L5.5 8H15l4 4.5h2V15"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/><path d="M9.3 16.5h5.4M3 15h2.7M18.3 15H21"/>',
 travel:'<path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M3 12h18M12 7v13"/>',
 money:'<circle cx="12" cy="12" r="9"/><path d="M8.5 7.5 12 12l3.5-4.5M12 12v5M9.5 13.5h5M9.5 15.8h5"/>',
 fashion:'<path d="M9 3.5 12 6l3-2.5 5 2.6-1.8 4.2-1.7-.7V20H7.5v-10.4l-1.7.7L4 6.1z"/>',
 workout:'<path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/>',
 news:'<path d="M4 5h13v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM17 8h3v10a2 2 0 0 1-2 2M7 9h7M7 13h5"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 photos:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v6M21.5 12h-6M12 21.5v-6M2.5 12h6"/>',
 memento:'<path d="M6 3h12M6 21h12M8 3v3.5c0 2 1.5 3.5 4 5.5 2.5-2 4-3.5 4-5.5V3M8 21v-3.5c0-2 1.5-3.5 4-5.5 2.5 2 4 3.5 4 5.5V21"/>',
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
 trash:'<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
 pin:'<path d="M12 21s-6.8-5.4-6.8-10.9a6.8 6.8 0 0 1 13.6 0C18.8 15.6 12 21 12 21z"/><circle cx="12" cy="10" r="2.5"/>'
};
function ic(k,c){return '<svg class="'+(c||'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">'+(ICON[k]||'')+'</svg>'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function pad(n){return n<10?'0'+n:''+n}
function fD(d){return d.getFullYear()+'/'+pad(d.getMonth()+1)+'/'+pad(d.getDate())}
function fDT(d){return fD(d)+' '+pad(d.getHours())+':'+pad(d.getMinutes())}

var SEC=[{k:'mail',n:'メール'},{k:'schedule',n:'予定'},{k:'anime',n:'アニメ'},{k:'tv',n:'ドラマ'},
  {k:'movies',n:'映画'},{k:'meal',n:'食事'},{k:'essentials',n:'必需品'},{k:'supra',n:'スープラ'},
  {k:'fashion',n:'ファッション'},{k:'workout',n:'筋トレ'},{k:'travel',n:'旅行'},{k:'money',n:'収支'},{k:'news',n:'ニュース'},{k:'search',n:'検索'}];
function sn(k){if(k==='nearby')return '近くのスポット';for(var i=0;i<SEC.length;i++)if(SEC[i].k===k)return SEC[i].n;return k}

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
/* 収支記録表。ユーザー入力のデータなので state.json と同じく
 * .web/money.json をサイトが直接読み書きする（パイプライン不要・即時反映）。
 * entries: {id,type:'income'|'expense'|'saving',name,amount,day(毎月の日付)}
 * balance: {amount,asOf} 現在の貯金残高 */
var MONEY={entries:[],balance:null},moneyTimer=null;
var MONEY_TYPE={'給料・収入':'income','支払い':'expense','貯金':'saving'};
var MONEY_JA={income:'収入',expense:'支払い',saving:'貯金'};
function fmtYen(n){return (n<0?'−':'')+Math.abs(Math.round(n)).toLocaleString()+'円'}
/* 収入は緑の +、支払いは赤の −、貯金は金色。ひと目で区別できるようにする */
function fmtYenTy(ty,n){
  var col=ty==='income'?'var(--ok)':ty==='expense'?'var(--ember)':'var(--gold)';
  var sign=ty==='income'?'+':ty==='expense'?'−':'';
  return '<b style="color:'+col+';font-weight:600">'+sign+fmtYen(n)+'</b>';
}
/* 毎月 day 日の次の到来日。月末超え（31日→2月等）は月末に丸める。
 * from（'YYYY/MM'・任意）が先の月なら、その月の初回を返す */
function nextPayDate(day,from){
  function mk(y,m){var last=new Date(y,m+1,0).getDate();return new Date(y,m,Math.min(day,last))}
  var d=mk(TODAY.getFullYear(),TODAY.getMonth());
  if(d<new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate()))
    d=mk(TODAY.getFullYear(),TODAY.getMonth()+1);
  if(from&&/^\d{4}\/\d{2}$/.test(from)){
    var fd=mk(+from.slice(0,4),+from.slice(5,7)-1);
    if(fd>d)d=fd;
  }
  return d;
}
/* 定期エントリが ym（'YYYY/MM'）の月に有効か。from/to は任意の期間設定 */
function moneyActive(e,ym){return !(e.from&&ym<e.from)&&!(e.to&&ym>e.to)}
function moneyMonthly(){
  // 期間内の毎月の定期に加え、単発（rep:'once'）は日付が今月のものだけ算入する
  var t={income:0,expense:0,saving:0};
  var ym=TODAY.getFullYear()+'/'+pad(TODAY.getMonth()+1);
  MONEY.entries.forEach(function(e){
    var amt=+e.amount||0;
    if(e.rep==='once'){
      if(String(e.date||'').slice(0,7)===ym)t[e.type]+=amt;
    }else if(moneyActive(e,ym)){
      t[e.type]+=amt;
    }
  });
  t.left=t.income-t.expense-t.saving;
  return t;
}
/* entries を一覧・検索・詳細で使えるよう D の項目に落とす */
function buildMoneyItems(){
  D=D.filter(function(x){return x.s!=='money'});
  MONEY.entries.forEach(function(e){
    var once=e.rep==='once',ended=0,ds;
    if(once)ds=String(e.date||'');
    else{
      var nd=nextPayDate(e.day,e.from);
      var nym=nd.getFullYear()+'/'+pad(nd.getMonth()+1);
      if(e.to&&nym>e.to){
        // 期間が終わった定期は、終了月の最後の支払日を出して「終了」扱いにする
        ended=1;
        var ty=+e.to.slice(0,4),tm=+e.to.slice(5,7)-1;
        var tl=new Date(ty,tm+1,0).getDate();
        nd=new Date(ty,tm,Math.min(e.day,tl));
      }
      ds=fD(nd);
    }
    if(!ds)return;
    var ja=MONEY_JA[e.type]||e.type;
    var when=once?'単発 · '+ds.slice(5):'毎月'+e.day+'日';
    var per=e.from&&e.to?e.from+' 〜 '+e.to:(e.from?e.from+' から':(e.to?e.to+' まで':''));
    D.push({s:'money',t:e.name,
      m:when+' · '+fmtYen(e.amount)+' · '+ja,
      time:ds+' 00:00',due:ds,once:once?1:0,ended:ended,id:'money-'+e.id,
      ty:e.type,amt:+e.amount||0,when:when,
      tag:ended?ja+'（終了）':(once?ja+'（単発）':ja),
      cls:e.type==='income'?'ok':(e.type==='expense'?'e':'g'),
      tags:['money','収支',ja,e.name],
      d:{sub:once?'収支記録 · 単発':'収支記録 · 毎月'+e.day+'日',
         kv:[['種別',ja+(once?'（単発）':(ended?'（終了）':''))],['金額',fmtYen(e.amount)],
             once?['日付',ds]:['毎月の日付',e.day+'日']]
           .concat(per?[['期間',per]]:[])
           .concat([once?['区分','1回だけ']:[ended?'最終':'次回',ds]])}});
  });
}
function saveMoney(){
  try{localStorage.setItem('lifehub.money',JSON.stringify(MONEY))}catch(e){}
  if(!GH.hasToken())return;
  clearTimeout(moneyTimer);
  moneyTimer=setTimeout(function(){
    GH.putFile('.web/money.json',JSON.stringify(MONEY,null,1)+'\n','money: 収支を保存 [skip ci]')
      .then(function(){setSync('保存しました',true)})
      .catch(function(){setSync('保存失敗',false);
        notify('収支の保存に失敗しました。通信を確認してもう一度操作してください。',true)});
  },800);
}
/* ---- 旅行 ---------------------------------------------------------------
 * 旅ごとに「0日目・1日目…」の年表を持つ。日程はユーザーが自分で足すデータなので、
 * 収支と同じく .web/travel.json をサイトが直接読み書きする（パイプライン不要・即時反映）。
 * 予定を 1 件登録すると inbox にも同じ内容を置き、AI が天気・おすすめ観光スポット・
 * 移動時間・評価を ai として書き足す。
 * AI の追記を消さないよう、保存の直前に必ずリモートの ai を取り込んでから上書きする。
 *
 * trips: [{id,name,dest,days:['2026/09/08',…],
 *          items:[{id,day,s:'18:00',e:'23:00',t:'函館→札幌移動',note,ai:{…}}]}]
 * 日付は日ごとに持つ（連続とは限らないため。例: 0日目 9/8 → 1日目 9/10） */
var TRAVEL={trips:[]},travelTimer=null;
function tripBy(id){var r=null;TRAVEL.trips.forEach(function(t){if(String(t.id)===String(id))r=t});return r}
function tripItemBy(tp,iid){var r=null;(tp&&tp.items||[]).forEach(function(i){if(String(i.id)===String(iid))r=i});return r}
function tripDate(tp,i){return (tp.days||[])[i]||''}
/* 「0日目（9月8日 火曜日）」 */
function tripDayLabel(tp,i){
  var ds=tripDate(tp,i);
  if(!ds)return i+'日目';
  var d=new Date(String(ds).replace(/\//g,'-')+'T00:00:00');
  if(isNaN(d))return i+'日目';
  return i+'日目（'+(d.getMonth()+1)+'月'+d.getDate()+'日 '+WK[d.getDay()]+'曜日）';
}
function tripPeriod(tp){
  var ds=(tp.days||[]).filter(Boolean);
  if(!ds.length)return '日程未定';
  return ds[0]+' 〜 '+ds[ds.length-1]+'（'+ds.length+'日間）';
}
function tripTime(it){
  var a=String(it.s||'').trim(),b=String(it.e||'').trim();
  return a&&b?a+'–'+b:(a||b||'');
}
function tripItemCount(tp){return (tp.items||[]).length}
/* 旅の始まりまでの日数。過ぎていれば負。日程が無ければ null */
function tripDaysLeft(tp){
  var ds=(tp.days||[]).filter(Boolean);
  if(!ds.length)return null;
  var td=new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate());
  return Math.round((new Date(ds[0].replace(/\//g,'-')+'T00:00:00')-td)/864e5);
}
/* 一覧・検索・詳細で使えるよう D の項目に落とす */
function buildTravelItems(){
  D=D.filter(function(x){return x.s!=='travel'});
  TRAVEL.trips.forEach(function(tp){
    var left=tripDaysLeft(tp);
    D.push({s:'travel',t:tp.name,m:tripPeriod(tp)+' · 予定 '+tripItemCount(tp)+' 件',
      time:((tp.days||[])[0]||fD(TODAY))+' 00:00',id:'trip-'+tp.id,trip:tp.id,
      tag:left===null?'':(left>0?'あと'+left+'日':(left===0?'今日から':'終了')),
      cls:left===0?'e':(left>0?'g':''),
      tags:['travel','旅行',tp.name].concat(tp.dest?[tp.dest]:[])});
    (tp.items||[]).forEach(function(it){
      var ds=tripDate(tp,it.day);
      D.push({s:'travel',t:it.t,m:tp.name+' · '+tripDayLabel(tp,it.day)+(tripTime(it)?' · '+tripTime(it):''),
        time:(ds||fD(TODAY))+' '+(String(it.s||'00:00').slice(0,5)),
        id:'trip-'+tp.id+'-'+it.id,trip:tp.id,titem:it.id,
        tag:it.ai?'AI 調査済み':'AI が調査中',cls:it.ai?'':'g',
        tags:['travel','旅行',tp.name,it.t]});
    });
  });
}
/* 保存。AI が書いた ai を消さないよう、リモートの内容を取り込んでから上書きする */
function mergeRemoteTravel(remote){
  if(!remote||!remote.trips)return;
  var rt={};
  remote.trips.forEach(function(t){
    var m={};(t.items||[]).forEach(function(i){if(i&&i.ai)m[String(i.id)]=i});
    rt[String(t.id)]=m;
  });
  TRAVEL.trips.forEach(function(t){
    var m=rt[String(t.id)];if(!m)return;
    (t.items||[]).forEach(function(i){
      var r=m[String(i.id)];
      if(r&&r.ai&&!i.ai){i.ai=r.ai;i.aiAt=r.aiAt||'';}
    });
  });
}
function saveTravel(){
  try{localStorage.setItem('lifehub.travel',JSON.stringify(TRAVEL))}catch(e){}
  // 「送れていない編集がある」印。サーバーに届いたら消す。登録直後にアプリを
  // 閉じて保存が死んでも、次に開いたときこの印を見て送り直せる
  try{localStorage.setItem('lifehub.travelDirty','1')}catch(e){}
  if(!GH.hasToken())return;
  clearTimeout(travelTimer);
  travelTimer=setTimeout(function(){putTravel(0)},700);
}
/* 保存の実体。失敗しても諦めず、間隔を空けて 3 回まで押し直す */
function putTravel(attempt){
  GH.getJSON('.web/travel.json').catch(function(){return null}).then(function(remote){
    mergeRemoteTravel(remote);
    return GH.putFile('.web/travel.json',JSON.stringify(TRAVEL,null,1)+'\n','travel: 旅程を保存 [skip ci]');
  }).then(function(){
    try{localStorage.removeItem('lifehub.travelDirty')}catch(e){}
    setSync('保存しました',true);buildTravelItems();
  }).catch(function(){
    if(attempt<3){
      setSync('保存を再試行しています…',false);
      travelTimer=setTimeout(function(){putTravel(attempt+1)},(attempt+1)*4000);
    }else{
      setSync('保存失敗',false);
      notify('旅程の保存に失敗しました。編集は端末に残っているので、次にアプリを開いたとき自動で送り直します。',true);
    }
  });
}
/* 予定 1 件を AI に調べてもらう（天気・観光スポット・移動時間・評価） */
function askTravelAI(tp,it){
  if(!GH.hasToken())return;
  GH.pushInbox('travel',{
    tripId:String(tp.id),itemId:String(it.id),
    '旅行':tp.name,'行き先':tp.dest||'','日付':tripDate(tp,it.day)||'',
    '時間':tripTime(it),'内容':it.t,'メモ':it.note||''
  }).catch(function(){
    notify('AI への依頼を送れませんでした。通信を確認してもう一度保存してください。',true);
  });
}

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
/* 書き込みが GitHub に届く前のリロード/離脱や一時的な失敗でも編集が消えないよう、
 * 端末の localStorage に即キャッシュし、未同期分(PENDING)は再試行で送る。 */
var LS_STATE='lifehub.state',LS_PENDING='lifehub.statePending';
var STATE={},PENDING={},TOUCHED={},stateTimer=null,stateSaving=false,stateFails=0;
/* 必需品のローカル状態。登録した瞬間に「調査中」で一覧に出し（PENDING_ESS）、
 * 削除はサーバー反映まで一覧から隠す（DEL_ESS=墓標）。どちらも端末に保存し、
 * AI 調査済みの本物が届いたら pending を、サーバーから消えたら墓標を自動で外す。 */
var PENDING_ESS=[],DEL_ESS=[];
try{PENDING_ESS=JSON.parse(localStorage.getItem('lifehub.pendingEss')||'[]')||[]}catch(e){}
try{DEL_ESS=JSON.parse(localStorage.getItem('lifehub.delEss')||'[]')||[]}catch(e){}
function persistEss(){
  try{localStorage.setItem('lifehub.pendingEss',JSON.stringify(PENDING_ESS));
      localStorage.setItem('lifehub.delEss',JSON.stringify(DEL_ESS))}catch(e){}
}
function reconcileEssentials(){
  var present={};
  D.forEach(function(x){if(x.s==='essentials'&&x.id)present[x.id]=1});
  // サーバーから消えた墓標は掃除、まだ残っているものは一覧から隠す
  DEL_ESS=DEL_ESS.filter(function(id){return present[id]});
  D=D.filter(function(x){return !(x.s==='essentials'&&DEL_ESS.indexOf(x.id)>-1)});
  // 調査済みの本物が来た pending は外し、まだのものは一覧に出し続ける
  PENDING_ESS=PENDING_ESS.filter(function(p){
    return !D.some(function(x){return x.s==='essentials'&&x.t===p.t});
  });
  PENDING_ESS.forEach(function(p){D.unshift(p)});
  persistEss();
}
/* ニュースの追跡停止。停止 {slug,t,ts,sent} はサーバー反映まで端末にも覚えておき、
 * 同期のたびに「追跡中」バッジやストーリー項目が復活しないようにする。
 * sent=0 は inbox への送信がまだ成功していない印で、同期のたびに自動で再送する */
var STOP_NEWS=[],nsFlushing=false,nsNextTry=0;
var NS_GRACE=3*864e5;    // 消えた観測後もこの期間は残す（古い vault からの再 publish 対策）
var NS_MAX_AGE=30*864e5; // 送信できないまま話題が消えた場合の最終掃除
try{STOP_NEWS=(JSON.parse(localStorage.getItem('lifehub.stopNews')||'[]')||[])
  .filter(function(e){return e&&e.slug})}catch(e){}
function persistNewsStops(){
  try{localStorage.setItem('lifehub.stopNews',JSON.stringify(STOP_NEWS))}catch(e){}
}
function applyNewsStop(slug){
  // ストーリー単体の項目は一覧から消し、朝刊項目は追跡中の印だけ外す
  D=D.filter(function(x){return !(x.s==='news'&&x.id==='news-story-'+slug)});
  D.forEach(function(x){
    if(x.s!=='news'||x.slug!==slug)return;
    x.story=0;
    if(x.badges)x.badges=x.badges.filter(function(b){return b[0]!=='追跡中'});
    if(x.tags)x.tags=x.tags.filter(function(t){return t!=='追跡中'});
  });
}
/* newsOk=false は news.json の取得に失敗した同期。「サーバーから消えた」とは
 * 区別できないので、そのときは墓標を捨てない */
function reconcileNewsStops(newsOk){
  STOP_NEWS=STOP_NEWS.filter(function(e){
    if(Date.now()-(+e.ts||0)>NS_MAX_AGE)return false;
    var present=D.some(function(x){
      return x.s==='news'&&x.story&&(x.slug===e.slug||x.id==='news-story-'+e.slug)});
    if(present)return true;
    if(newsOk===false)return true;
    // 消えた直後は、並行していた古い vault の再 publish で復活し得るため残す。
    // 送信が済んでいないものは、送信できるまで捨てない
    return !e.sent||(Date.now()-(+e.ts||0))<NS_GRACE;
  });
  STOP_NEWS.forEach(function(e){applyNewsStop(e.slug)});
  persistNewsStops();
}
/* 未送信の停止を inbox へ送る。失敗しても墓標は残り、次の同期で再送する */
function flushNewsStops(interactive){
  if(!GH.hasToken()||nsFlushing)return;
  if(!interactive&&Date.now()<nsNextTry)return;
  var pend=STOP_NEWS.filter(function(e){return !e.sent});
  if(!pend.length)return;
  nsFlushing=true;
  var chain=Promise.resolve(),fail=false;
  pend.forEach(function(e){
    chain=chain.then(function(){
      return GH.pushInbox('news-stop',{slug:e.slug,title:e.t||''})
        .then(function(){e.sent=1;persistNewsStops()})
        .catch(function(){fail=true});
    });
  });
  chain.then(function(){
    nsFlushing=false;
    if(fail){
      nsNextTry=Date.now()+60000;
      if(interactive)notify('追跡停止の送信に失敗しました。接続が戻り次第、自動で再送します。',true);
    }else{
      nsNextTry=0;
      if(interactive)setSync('追跡を停止しました',true);
    }
  });
}
function stateKey(x){return x.id||(x.s+'|'+x.t)}

function loadLocalState(){
  try{
    STATE=JSON.parse(localStorage.getItem(LS_STATE)||'{}')||{};
    (JSON.parse(localStorage.getItem(LS_PENDING)||'[]')||[]).forEach(function(k){PENDING[k]=1;TOUCHED[k]=1});
  }catch(e){STATE={}}
}
function persistLocal(){
  try{
    localStorage.setItem(LS_STATE,JSON.stringify(STATE));
    localStorage.setItem(LS_PENDING,JSON.stringify(Object.keys(PENDING)));
  }catch(e){}
}

/* リモート state.json の取り込み。取得失敗(null)なら手元を保持して消さない。
 * この端末で編集したキー(TOUCHED)は常にローカルを優先し、同期の再取得・
 * 書き込み前の read・取得遅延で編集が戻る／消えるのを防ぐ。触っていないキーは
 * リモートに追従する（別端末の更新も反映）。 */
function mergeRemoteState(remote){
  if(!remote)return STATE;
  var out={};
  for(var k in remote)out[k]=remote[k];
  for(var k in TOUCHED)if(STATE[k]!==undefined)out[k]=STATE[k];
  return out;
}

function scheduleStateSave(delay){
  clearTimeout(stateTimer);
  stateTimer=setTimeout(saveState,delay);
}
/* mail.json は当日の処理分だけになったので、もう一覧に無いメールの read 記録は
 * 使われない。放っておくと state.json が日次で単調に太り続ける（いずれ
 * Contents API の 1MB 上限で同期自体が壊れる）ため、同期のたびに間引く。 */
function pruneMailState(){
  if(DEMO_MODE)return;
  var present={};
  D.forEach(function(x){if(x.s==='mail')present[stateKey(x)]=1});
  Object.keys(STATE).forEach(function(k){
    if(k.indexOf('mail-')!==0)return;
    if(present[k]||PENDING[k]||TOUCHED[k])return;
    delete STATE[k];
  });
}
/* 未保存の編集(PENDING)を state.json に書き出す。ページ離脱時にも呼ぶ。
 * 失敗時は編集を握ったままバックオフで再試行し、勝手に諦めない。 */
function saveState(){
  clearTimeout(stateTimer);
  if(!GH.hasToken()||stateSaving)return;
  var writing=Object.keys(PENDING);
  if(!writing.length)return;
  var snap={};writing.forEach(function(k){snap[k]=JSON.stringify(STATE[k])});
  stateSaving=true;
  /* state.json は全量で書くため、そのままだと別端末が書いたキーを丸ごと
   * 消してしまう。書く直前に現物を取り込み直してから保存する
   * （自端末で触ったキーは mergeRemoteState の規則どおりローカル優先）。 */
  GH.getJSON('.web/state.json').catch(function(){return null}).then(function(remote){
    STATE=mergeRemoteState(remote);
    pruneMailState();
    persistLocal();
    return GH.putFile('.web/state.json',JSON.stringify(STATE,null,1)+'\n',
                      'state: ユーザー編集を保存 [skip ci]');
  })
    .then(function(){
      stateSaving=false;stateFails=0;
      // 保存中に再編集されていないキーだけ確定（PENDING から外す）
      writing.forEach(function(k){if(JSON.stringify(STATE[k])===snap[k])delete PENDING[k]});
      persistLocal();
      if(Object.keys(PENDING).length)scheduleStateSave(500);
      else setSync('保存しました',true);
    })
    .catch(function(){
      stateSaving=false;stateFails++;
      setSync(stateFails>=3?'保存できません — 接続と権限を確認':'保存を再試行中…',false);
      scheduleStateSave(Math.min(15000,1000*Math.pow(2,stateFails)));
    });
}
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
  TOUCHED[k]=1;PENDING[k]=1;
  persistLocal();          // 即ローカル保存（リロード/離脱でも消えない）
  scheduleStateSave(1200);
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
    else if(s.det.term)showTerm(s.det.term);
    else if(s.det.nb)showNearbySpot(s.det.nb);
    else if(s.det.wk)showWorkout(s.det.wk);
    else if(s.det.trip&&s.det.ti)showTripItem(s.det.trip,s.det.ti);
    else if(s.det.trip)showTrip(s.det.trip);
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
  if(sec==='mail'||sec==='news'||sec==='search'||sec==='essentials')return items.sort(byTimeDesc);
  return items;
}

function setBrand(){
  if(view==='home')brand.innerHTML='<span class="w">LIFE</span><span class="s">hub</span>';
  else if(view==='tag')brand.innerHTML='<span class="sect">タグ: '+esc(curTag)+'</span>';
  else brand.innerHTML='<span class="sect">'+esc(sn(view))+'</span>';
  q.placeholder = view==='home' ? '全ツールを横断して検索' :
    (view==='tag'?'このタグ内を検索':(view==='nearby'?'例: コンビニ / ファミマ / トイレ':sn(view)+'の中を検索'));
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
  else if(view==='essentials')r=renderEssentials();
  else if(view==='supra')r=renderSupra();
  else if(view==='fashion')r=renderFashion();
  else if(view==='workout')r=renderWorkout();
  else if(view==='travel')r=renderTravel();
  else if(view==='money')r=renderMoney();
  else if(view==='nearby')r=renderNearby();
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
  var h='<div class="greet"><div class="d">'+dayLabel(TODAY)+'</div></div>';
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
    if(k==='travel'){
      if(!TRAVEL.trips.length)return ['まだ旅行がありません','—'];
      var tn=TRAVEL.trips.map(function(tp){return {tp:tp,l:tripDaysLeft(tp)}})
        .filter(function(o){return o.l===null||o.l>=0})
        .sort(function(a,b){return (a.l===null?9e9:a.l)-(b.l===null?9e9:b.l)})[0];
      var tw=TRAVEL.trips.reduce(function(n,tp){return n+tripItemCount(tp)},0);
      return [tn?(esc(tn.tp.name)+(tn.l>0?' まであと '+tn.l+'日':(tn.l===0?' は今日から':''))):
                 '予定した旅は終了しました',
              TRAVEL.trips.length+'件の旅 · 予定 '+tw+' 件'];
    }
    if(k==='money'){
      var mt=moneyMonthly();
      var mtd=fD(TODAY);   // 済んだ単発は「次」に出さない
      var nx2=xs.filter(function(x){return String(x.due)>=mtd})
        .sort(function(a,b){return String(a.due)<String(b.due)?-1:1})[0];
      return [MONEY.entries.length?('月の残り '+fmtYen(mt.left)+(nx2?' · 次 '+esc(nx2.t):'')):'未登録',
              MONEY.balance?('貯金 '+fmtYen(MONEY.balance.amount)):'—'];
    }
    if(k==='workout'){
      var wt=Workout.targets(MY_HEIGHT),wn=latestWeight();
      return ['目標 '+(Math.round(wt.similar*10)/10).toFixed(1)+'〜'+
                (Math.round(wt.sameBmi*10)/10).toFixed(1)+'kg'+
                (wn?' · いま '+wn.w.toFixed(1)+'kg':''),
              'ダンベル '+Workout.EX.length+'種目 · 週4回'];
    }
    if(k==='fashion'){
      var fb=xs.filter(function(x){return x.kind==='brief'})
        .sort(function(a,b){return String(a.time)>String(b.time)?-1:1})[0];
      var ft=xs.filter(function(x){return x.kind==='trend'}).length;
      var fi=xs.filter(function(x){return x.kind==='item'}).length;
      return [xs.length?(fb?esc(fb.m):'トレンド '+ft+' 件'):'未取得',
              xs.length?('トレンド '+ft+' · アイテム '+fi):(upd||'—')];
    }
    if(k==='supra'){
      var pr=xs.filter(function(x){return x.id==='supra-price'})[0];
      var nx=xs.filter(function(x){return String(x.id||'').indexOf('supra-mnt-')===0})
        .sort(function(a,b){return String(a.due||'')<String(b.due||'')?-1:1})[0];
      var lbl=[pr?esc(pr.t):'',nx?'次 '+esc(nx.t):''].filter(Boolean).join(' · ');
      return [lbl||xs.length+' 件', upd||'—'];
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
  h+='<button class="tile" data-sec="nearby">'+
    '<span class="tp">'+ic('pin','ico')+'</span><span class="nm">近くのスポット</span>'+
    '<span class="mt">現在地からワンタップ検索</span>'+
    '<span class="ft">レストラン · コンビニ · GS ほか</span></button>';
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
    '<button class="seg '+(mailRead?'on':'')+'" data-mail="1">既読も表示</button></div>'+
    '<div class="actbar"><button class="act" data-mailall="read">すべて既読にする</button>'+
    '<button class="act" data-mailall="unread">すべて未読に戻す</button></div>';
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

  /* 62日枠より先の単発の予定/タスク。メールから登録された数ヶ月先の解約・締切
   * などが枠外で埋もれないよう、まとめて出す。定期（誕生日等）は3年分に展開され
   * 溢れるので除外する。 */
  var winEnd=new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate());
  winEnd.setDate(winEnd.getDate()+62);
  var winEndStr=fD(winEnd);
  var future=EV.filter(function(e){
    return e.src!=='定期'&&e.d>winEndStr&&
      (!query||(e.n+' '+(e.place||'')+' '+(e.who||'')).toLowerCase().indexOf(query)>-1);
  }).sort(function(a,b){return a.d<b.d?-1:(a.d>b.d?1:0)});
  if(future.length){
    h+='<div class="sechead"><span class="n">この先の予定</span><span class="c">'+future.length+' 件</span></div>'+
      '<div class="list">'+future.map(function(e){
        var chk=e.type==='task'
          ? '<span class="tick'+(e.done?' on':'')+'" data-done="'+e.id+'" role="button" aria-label="完了を切り替え"></span>':'';
        return '<div class="day"><div class="ev"><button class="e1'+(e.done?' done':'')+'" data-ev="'+e.id+'">'+
          '<span class="et">'+e.d.slice(5)+'</span>'+chk+
          '<span class="en">'+(e.rep?'<span class="rep">⟳</span> ':'')+esc(e.n)+'</span>'+
          '<span class="ew">'+esc(e.type==='task'?(e.done?'済':'TASK'):(e.time&&e.time!=='—'?e.time:''))+'</span>'+
          '</button></div></div>';
      }).join('')+'</div>';
  }
  return {act:act,body:h};
}

function renderMeal(){
  var items=D.filter(function(x){return x.s==='meal'&&match(x)});
  var act='<div class="actbar"><button class="act" data-form="meal">'+ic('plus')+'食事を記録</button>'+
    '<button class="act" data-form="photo">'+ic('cam')+'写真で登録</button></div>';
  // 当日の摂取は記録から積む。目標は PROFILE 由来の値が無いので出さない。
  var td=fD(TODAY);  // renderHome のローカル td は別スコープなので、ここで用意する
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
/* 実測値の折れ線（体重・買取相場などで共用）。データはパイプラインが渡した
 * 実測値のみを描く。予測線は出さない（根拠のある予測値を持っていないため）。
 * unit は表示単位（既定 kg）。万円のような整数単位では小数を出さない。 */
function spark(series,unit){
  series=series||[];unit=unit||'kg';
  var intU=(unit==='万円'||unit==='円');
  function fv(v){return intU?String(Math.round(v)):v.toFixed(1)}
  if(series.length<2)
    return '<p class="prose" style="color:var(--dim);font-size:12px">'+
      (series.length?'記録が1件だけなのでグラフは表示できません。':'記録がまだありません。')+'</p>';
  var vs=series.map(function(p){return p[1]});
  var mx=Math.max.apply(null,vs),mn=Math.min.apply(null,vs),W=330,H=76;
  if(mx===mn){mx+=0.5;mn-=0.5}
  var pts=series.map(function(p,i){
    return (i/(series.length-1)*W).toFixed(1)+','+(H-(p[1]-mn)/(mx-mn)*H).toFixed(1)}).join(' ');
  var first=series[0],last=series[series.length-1];
  var diff=last[1]-first[1];
  return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:76px" role="img" aria-label="推移グラフ">'+
    '<polyline points="'+pts+'" fill="none" stroke="#CFA45C" stroke-width="1.6"/></svg>'+
    '<div class="kv" style="border-top:0;padding-top:6px"><span class="k">'+
    esc(first[0])+' 〜 '+esc(last[0])+'（'+series.length+'件）</span>'+
    '<span class="v">'+fv(last[1])+' '+esc(unit)+'（'+(diff>0?'+':'')+fv(diff)+'）</span></div>';
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

/* 人生の必需品リスト。製品名だけ登録すると、値段・消耗頻度・購入場所・類似製品を
 * パイプラインの AI が調べて記入する（.web/essentials.json で配信）。 */
function renderEssentials(){
  var items=sortItems(D.filter(function(x){return x.s==='essentials'&&match(x)}),'essentials');
  var act='<div class="actbar"><button class="act" data-form="essential">'+ic('plus')+'必需品を登録</button></div>';
  var h='<div class="sechead"><span class="n">これまで使ってきたもの</span><span class="c">'+items.length+' 件</span></div>'+
    '<div class="list">'+items.map(function(x){return rowHTML(x,D.indexOf(x))}).join('')+'</div>';
  if(!items.length)h+='<div class="empty">まだ登録がありません。製品名だけ登録すれば、'+
    '値段・消耗頻度・購入場所・類似製品を AI が調べて記入します。</div>';
  return {act:act,body:h};
}

/* スープラ専用メニュー。データはパイプラインが毎朝更新する .web/supra.json。
 * 買取相場（推移グラフ）→ メンテナンススケジュール → ニュース → 早見表 の順。 */
function renderSupra(){
  var all=D.filter(function(x){return x.s==='supra'&&match(x)});
  var price=all.filter(function(x){return x.id==='supra-price'})[0];
  var mnt=all.filter(function(x){return String(x.id||'').indexOf('supra-mnt-')===0});
  var news=all.filter(function(x){return String(x.id||'').indexOf('supra-news-')===0})
    .sort(byTimeDesc);
  var spec=all.filter(function(x){return x.id==='supra-spec'})[0];
  var h='';
  if(!all.length){
    h+='<div class="empty">スープラのデータはまだありません。毎朝の自動更新で、'+
      '買取相場・メンテナンス予定・ニュースがここに届きます。</div>';
    return {act:'',body:h};
  }
  // 買取相場（現在値 + 推移グラフ + AI の見立て）
  if(price){
    var pd=price.d||{};
    h+='<div class="card"><h4>買取相場</h4>'+
      '<div class="kv"><span class="k">'+esc(((pd.kv||[])[0]||[])[1]||price.t)+
      '</span><span class="v">'+esc(price.m)+'</span></div>'+
      (pd.series?spark(pd.series,pd.graphUnit||'万円'):'')+
      (pd.body?'<p class="prose" style="font-size:12.5px;color:var(--dim);margin-top:8px">'+
        esc(pd.body)+'</p>':'')+'</div>';
  }
  // メンテナンス。期日順に並べ、期日はこの端末の今日から計算し直す（日次更新より正確）
  if(mnt.length){
    var td0=fD(TODAY);
    mnt.sort(function(a,b){return String(a.due||'')<String(b.due||'')?-1:1});
    h+='<div class="sechead"><span class="n">メンテナンススケジュール</span>'+
      '<span class="c">'+mnt.length+' 件</span></div><div class="list">'+
      mnt.map(function(x){
        var days=x.due?Math.round((new Date(x.due.replace(/\//g,'-'))-new Date(td0.replace(/\//g,'-')))/864e5):null;
        var badge=days==null?'':(days<0?'<span class="tag e">'+(-days)+'日超過</span>'
          :days<=30?'<span class="tag g">あと'+days+'日</span>'
          :'<span class="tag">あと'+days+'日</span>');
        return '<button class="row" data-i="'+D.indexOf(x)+'">'+
          '<span class="l"><span class="t">'+esc(x.t)+'</span><span class="m">'+esc(x.m)+'</span></span>'+
          '<span class="r">'+badge+'<span class="time">'+esc(x.due||'')+'</span></span></button>';
      }).join('')+'</div>';
  }
  // ニュース
  h+='<div class="sechead"><span class="n">スープラのニュース</span><span class="c">'+
    news.length+' 件</span></div>';
  h+=news.length?'<div class="list">'+news.map(function(x){return rowHTML(x,D.indexOf(x))}).join('')+'</div>'
    :'<div class="empty">直近のニュースはありません</div>';
  // 早見表
  if(spec)h+='<div class="list" style="margin-top:12px">'+rowHTML(spec,D.indexOf(spec))+'</div>';
  return {act:'',body:h};
}

/* ---- ファッション --------------------------------------------------------
 * 毎朝のパイプラインが ZOZOTOWN・WEAR・YouTube 等を横断して集めたトレンド。
 * 今日のまとめ → 今買えるアイテム（画像+購入リンク）→ トレンド → 参考動画。
 */
/* 外部の画像。壊れていたら枠ごと消す。referrerpolicy はホットリンク対策
 * （参照元でブロックするサイトがあるため）。 */
/* 外部の画像。読めなかったときは img を消して、下に敷いた印だけを残す。
   戻り値は [中身, 画像があるか] で、枠側は無いときに .none を付ける。 */
function extImg(u,fb){
  var mark='<span class="ff">'+esc(fb||'👕')+'</span>';
  if(!httpsOnly(u))return [mark+'<span class="fn">写真なし</span>',false];
  return ['<img src="'+esc(u)+'" alt="" loading="lazy" referrerpolicy="no-referrer" '+
    'onerror="this.parentNode.className+=\' none\';this.remove()">'+mark,true];
}
function httpsOnly(u){return /^https:\/\//i.test(String(u||''))?String(u):''}
function fashionCards(list,wide,fb){
  return '<div class="fgrid'+(wide?' wide':'')+'">'+list.map(function(x){
    var to=httpsOnly(x.to),im=extImg(x.thumb,fb);
    return '<div class="fcard"><button class="fc" data-i="'+D.indexOf(x)+'">'+
      '<span class="fimg'+(im[1]?'':' none')+'">'+im[0]+'</span>'+
      '<span class="ft">'+esc(x.t)+'</span><span class="fm">'+esc(x.m)+'</span></button>'+
      (to?'<a class="fgo" href="'+esc(to)+'" target="_blank" rel="noopener">'+
        (wide?'YouTube で見る':'ZOZOTOWN で見る')+'</a>':'')+'</div>';
  }).join('')+'</div>';
}
/* 詳細の kv から値を1つ取り出す（「ブランド」「価格」「分類」） */
function kvOf(x,k){
  var r='';((x.d||{}).kv||[]).forEach(function(p){
    if(p[0]===k&&p[1]&&p[1]!=='—')r=String(p[1])});
  return r;
}
/* カードに出す価格。「¥14,300（税込、通常価格）」のような但し書きは外して
   金額だけにする（狭い枠で途中で切れると読めないため）。全文は詳細に残る。 */
function shortPrice(s){
  var v=String(s||'').replace(/[（(].*$/,'').trim();
  return v||String(s||'');
}
/* 注目アイテムのカード。
   ZOZOTOWN は外部から商品写真を取れない（サーバーからも AI からも遮断される）ので、
   写真の代わりに、分類・価格・ブランド・おすすめ理由を読ませる作りにしている。 */
function itemCards(list){
  return '<div class="igrid">'+list.map(function(x){
    var to=httpsOnly(x.to),cat=kvOf(x,'分類'),brand=kvOf(x,'ブランド'),
        price=kvOf(x,'価格')||x.tag||'',why=String((x.d||{}).body||'');
    var sub=[brand,cat].filter(Boolean).join(' · ');
    return '<div class="icard"><button class="ic" data-i="'+D.indexOf(x)+'">'+
      '<span class="it">'+esc(x.t)+'</span>'+
      (price?'<span class="ipr">'+esc(shortPrice(price))+'</span>':'')+
      (sub?'<span class="ib2">'+esc(sub)+'</span>':'')+
      (why?'<span class="iw">'+esc(why)+'</span>':'')+'</button>'+
      (to?'<a class="fgo" href="'+esc(to)+'" target="_blank" rel="noopener">'+
        'ZOZOTOWN で見る</a>':'')+'</div>';
  }).join('')+'</div>';
}
function renderFashion(){
  var all=D.filter(function(x){return x.s==='fashion'&&match(x)});
  if(!all.length){
    return {act:'',body:'<div class="empty">ファッションのデータはまだありません。'+
      '毎朝の自動更新で、いま来ているトレンド・今買えるアイテム・参考動画がここに届きます。</div>'};
  }
  var of=function(k){return all.filter(function(x){return x.kind===k})};
  var briefs=of('brief').sort(byTimeDesc);
  var trends=of('trend').sort(byTimeDesc);
  var items=of('item'),vids=of('video').sort(byTimeDesc);
  var h='';
  // 今日のまとめ（本文をそのまま読ませる。タップで過去分も見られる）
  if(briefs.length){
    var b=briefs[0],bd=b.d||{};
    h+='<div class="card"><h4>'+esc(b.t)+'</h4>'+
      (bd.body?'<p class="prose">'+linkTerms(esc(bd.body))+'</p>':'')+
      '<button class="lnk" data-i="'+D.indexOf(b)+'" style="border-top:1px solid var(--line);margin-top:8px">'+
      ic('search')+'<span class="lnk-b"><span class="lnk-t">まとめの詳細</span>'+
      '<span class="lnk-s">'+esc(b.time)+'</span></span></button></div>';
  }
  // 今買える注目アイテム
  if(items.length){
    h+='<div class="sechead"><span class="n">今買える注目アイテム</span>'+
      '<span class="c">'+items.length+' 件</span></div>'+itemCards(items);
  }
  // トレンド
  if(trends.length){
    h+='<div class="sechead"><span class="n">いま来ているトレンド</span>'+
      '<span class="c">'+trends.length+' 件</span></div><div class="list">'+
      trends.map(function(x){return rowHTML(x,D.indexOf(x))}).join('')+'</div>';
  }
  // 参考にした動画
  if(vids.length){
    h+='<div class="sechead"><span class="n">参考になる動画</span>'+
      '<span class="c">'+vids.length+' 件</span></div>'+fashionCards(vids,true,'▶');
  }
  // 過去のまとめ
  if(briefs.length>1){
    h+='<div class="sechead"><span class="n">過去のまとめ</span>'+
      '<span class="c">'+(briefs.length-1)+' 件</span></div><div class="list">'+
      briefs.slice(1).map(function(x){return rowHTML(x,D.indexOf(x))}).join('')+'</div>';
  }
  return {act:'',body:h};
}

/* ---- 筋トレ --------------------------------------------------------------
 * ダンベルだけで組んだ部位別メニュー（assets/workout.js）。
 * 目標はヒソカ（187cm/91kg）の体格。人体図で効く場所を赤く出す。
 */
var MY_HEIGHT=176;   // 身長(cm)。目標体重の換算に使う
/* 食事セクションに体重の記録があれば、いちばん新しいものを拾う */
function latestWeight(){
  var best=null;
  D.forEach(function(x){
    if(x.s!=='meal')return;
    var kv=((x.d||{}).kv||[]).filter(function(r){return /体重/.test(r[0])})[0];
    if(!kv)return;
    var v=parseFloat(String(kv[1]).replace(/[^0-9.]/g,''));
    if(!v)return;
    if(!best||String(x.time)>best.time)best={time:String(x.time),w:v};
  });
  return best;
}
function exCard(e){
  return '<button class="exc" data-wk="'+esc(e.id)+'">'+
    '<span class="exv">'+Workout.moveSVG(e.move,e.p,e.s,Workout.viewsFor(e)[0],0)+'</span>'+
    '<span class="exb"><span class="ext">'+esc(e.n)+'</span>'+
    '<span class="exm">'+esc(e.sets)+'</span>'+
    '<span class="exg">'+e.p.map(function(m){
      return '<span class="tag e">'+esc(Workout.mName(m))+'</span>'}).join('')+
    e.s.slice(0,2).map(function(m){
      return '<span class="tag">'+esc(Workout.mName(m))+'</span>'}).join('')+
    '</span></span></button>';
}
function renderWorkout(){
  var t=Workout.targets(MY_HEIGHT),now=latestWeight();
  var lo=Math.round(t.similar*10)/10,hi=Math.round(t.sameBmi*10)/10;
  var h='';
  // 目標の体格
  h+='<div class="card"><h4>目標: ヒソカの体格（'+Workout.HISOKA.h+'cm / '+Workout.HISOKA.w+'kg）</h4>'+
    '<div class="kv"><span class="k">ヒソカの BMI</span><span class="v">'+t.bmi.toFixed(1)+'</span></div>'+
    '<div class="kv"><span class="k">あなたの身長</span><span class="v">'+MY_HEIGHT+' cm</span></div>'+
    '<div class="kv"><span class="k">目標体重</span><span class="v" style="color:var(--gold)">'+
      lo.toFixed(1)+' 〜 '+hi.toFixed(1)+' kg</span></div>'+
    (now?'<div class="kv"><span class="k">いまの体重（'+esc(now.time.slice(0,10))+'）</span><span class="v">'+
      now.w.toFixed(1)+' kg　<b style="color:'+(now.w<lo?'var(--ember)':'var(--ok)')+'">'+
      (now.w<lo?'あと '+(lo-now.w).toFixed(1)+' kg':'範囲内')+'</b></span></div>':'')+
    '<p class="prose" style="font-size:12px;margin-top:8px">'+
    '体の比率をそのまま縮めると <b>'+lo.toFixed(1)+'kg</b>、体格指数（BMI）をそろえると <b>'+hi.toFixed(1)+'kg</b>。'+
    'ヒソカは細身ではなく厚みのある体型なので、この幅の中で<b>体脂肪率10%前後</b>を保ちながら'+
    '増やすのが現実的な着地点です（'+lo.toFixed(1)+'kg なら除脂肪 '+t.leanAt(lo).toFixed(1)+'kg、'+
    hi.toFixed(1)+'kg なら '+t.leanAt(hi).toFixed(1)+'kg）。'+
    '同じ体重でも脂肪で増やすと近づかないので、体重より<b>見た目と筋量</b>を優先してください。</p></div>';
  // 部位別メニュー
  var cur=seg.wkpart||Workout.PARTS[0].k;
  h+='<div class="segs" style="margin-bottom:4px">'+Workout.PARTS.map(function(p){
    return '<button class="seg'+(cur===p.k?' on':'')+'" data-seg="wkpart:'+p.k+'">'+p.e+' '+esc(p.n)+'</button>';
  }).join('')+'</div>';
  var list=Workout.byPart(cur);
  h+='<div class="sechead"><span class="n">'+esc((Workout.PARTS.filter(function(p){return p.k===cur})[0]||{}).n||'')+
    'のメニュー</span><span class="c">'+list.length+' 種目</span></div>'+
    '<div class="exlist">'+list.map(exCard).join('')+'</div>';
  // 週の組み方
  h+='<div class="sechead"><span class="n">週の組み方</span><span class="c">週4回 + 休養3日</span></div>'+
    '<div class="card"><h4>1週間の例</h4>'+Workout.PLAN.map(function(d){
      return '<div class="kv"><span class="k">'+esc(d.d)+'</span><span class="v">'+esc(d.n)+
        (d.ex.length?'<span style="color:var(--faint)"> · '+d.ex.length+'種目</span>':'')+'</span></div>';
    }).join('')+
    '<p class="prose" style="font-size:12px;margin-top:8px">'+
    '各部位が週2回まわってくる組み方です。1回で全部やろうとせず、'+
    'この分割で「続けられる量」を守るほうが結果が出ます。</p></div>';
  // 根拠
  h+='<div class="sechead"><span class="n">メニューの根拠</span><span class="c">公的ガイドライン</span></div>'+
    '<div class="card"><h4>守るべき原則</h4>'+Workout.RULES.map(function(r){
      return '<div class="kv"><span class="k">'+esc(r[0])+'</span><span class="v">'+esc(r[1])+'</span></div>';
    }).join('')+'</div>'+
    '<div class="card"><h4>出典</h4>'+Workout.SOURCES.map(function(s){
      return '<a class="lnk" href="'+esc(s.to)+'" target="_blank" rel="noopener">'+ic('link')+
        '<span class="lnk-b"><span class="lnk-t">'+esc(s.t)+'</span>'+
        '<span class="lnk-s">'+esc(String(s.to).replace(/^https?:\/\//,''))+'</span></span></a>';
    }).join('')+'</div>';
  return {act:'',body:h};
}
/* 旅行の一覧。旅ごとのカードを並べ、タップで年表を開く */
function renderTravel(){
  var act='<div class="actbar"><button class="act" data-form="trip">'+ic('plus')+'旅行を登録</button></div>';
  var trips=TRAVEL.trips.filter(function(tp){
    if(!query)return true;
    var hay=(tp.name+' '+(tp.dest||'')+' '+(tp.items||[]).map(function(i){return i.t}).join(' ')).toLowerCase();
    return hay.indexOf(query)>-1;
  });
  if(!TRAVEL.trips.length)
    return {act:act,body:'<div class="empty">まだ旅行がありません。「旅行を登録」で旅の名前と日程を作ると、'+
      '0日目からの年表ができます。そこに予定を足していくと、天気・おすすめ観光スポット・'+
      '移動時間・評価を AI が調べて書き足します。</div>'};
  if(!trips.length)
    return {act:act,body:'<div class="empty">「'+esc(queryRaw)+'」に一致する旅行はありません</div>'};
  // これからの旅を先に、終わった旅を後ろに
  var sorted=trips.slice().sort(function(a,b){
    var la=tripDaysLeft(a),lb=tripDaysLeft(b);
    if(la===null)return 1;if(lb===null)return -1;
    if(la>=0&&lb<0)return -1;if(la<0&&lb>=0)return 1;
    return la>=0?la-lb:lb-la;
  });
  var h='<div class="sechead"><span class="n">旅行</span><span class="c">'+sorted.length+' 件</span></div>'+
    '<div class="list">'+sorted.map(function(tp){
      var left=tripDaysLeft(tp);
      var badge=left===null?'':(left>0?'<span class="tag g">あと'+left+'日</span>'
        :(left===0?'<span class="tag e">今日から</span>':'<span class="tag">終了</span>'));
      return '<button class="row" data-trip="'+esc(tp.id)+'">'+
        '<span class="l"><span class="t">'+esc(tp.name)+'</span>'+
        '<span class="m">'+esc(tripPeriod(tp))+(tp.dest?' · '+esc(tp.dest):'')+
        ' · 予定 '+tripItemCount(tp)+' 件</span></span>'+
        '<span class="r">'+badge+'</span></button>';
    }).join('')+'</div>';
  return {act:act,body:h};
}
/* 旅の年表。0日目から順に、日ごとの見出しと予定を並べる */
function openTrip(id){curDet={trip:String(id)};pushHist();showTrip(id)}
function showTrip(id){
  var tp=tripBy(id);
  if(!tp){hideDetail();return}
  dSec.textContent='旅行';
  dDone.style.display='none';
  dEdit.style.display='grid';
  dEdit.onclick=function(){
    openForm('trip',{'旅行名':tp.name,'行き先':tp.dest||'',
      '開始日（0日目）':String((tp.days||[])[0]||'').replace(/\//g,'-'),
      '日数':String((tp.days||[]).length||1)},{editId:tp.id});
  };
  dTrash.style.display='grid';
  dTrash.onclick=function(){
    confirmDelete(tp.name+'（予定 '+tripItemCount(tp)+' 件）',function(){
      TRAVEL.trips=TRAVEL.trips.filter(function(t){return String(t.id)!==String(tp.id)});
      saveTravel();buildTravelItems();
      curDet=null;pushHist();hideDetail();go('travel');
    });
  };
  var h='<h1 class="dtitle">'+esc(tp.name)+'</h1>'+
    '<div class="dsub">'+esc(tripPeriod(tp))+(tp.dest?' · '+esc(tp.dest):'')+'</div>';
  var left=tripDaysLeft(tp);
  if(left!==null)h+='<div class="chips"><span class="tag'+(left===0?' e':(left>0?' g':''))+'">'+
    (left>0?'出発まであと '+left+' 日':(left===0?'今日から':'終了した旅'))+'</span>'+
    '<span class="tag">予定 '+tripItemCount(tp)+' 件</span></div>';
  h+='<div class="tl">';
  (tp.days||[]).forEach(function(_,i){
    var items=(tp.items||[]).filter(function(it){return +it.day===i})
      .sort(function(a,b){return String(a.s||'')>String(b.s||'')?1:-1});
    h+='<div class="tday"><span class="n">'+esc(tripDayLabel(tp,i))+'</span>'+
      '<span class="c">'+(items.length?items.length+' 件':'予定なし')+'</span></div>';
    if(items.length)h+='<div class="list">'+items.map(function(it){
      return '<button class="trow" data-ti="'+esc(tp.id)+'|'+esc(it.id)+'">'+
        '<span class="tt">'+esc(tripTime(it)||'—')+'</span>'+
        '<span class="l"><span class="t">'+esc(it.t)+'</span>'+
        (it.note?'<span class="m">'+esc(it.note)+'</span>':'')+'</span>'+
        '<span class="r">'+(it.ai?'':'<span class="tag g">調査中</span>')+'</span></button>';
    }).join('')+'</div>';
    h+='<button class="tadd" data-tadd="'+esc(tp.id)+'|'+i+'">＋ この日に予定を追加</button>';
  });
  h+='</div>';
  h+='<div class="card" style="margin-top:14px"><h4>AI の自動追記について</h4>'+
    '<p class="prose" style="font-size:12.5px">予定を登録すると、その場所の天気・'+
    'おすすめ観光スポット10選・移動時間・評価を AI が調べて、予定の詳細に書き足します。'+
    '数分かかるので、届くまでは「調査中」と表示されます。</p></div>';
  dBody.innerHTML=h;dBody.scrollTop=0;
  det.classList.add('show');det.setAttribute('aria-hidden','false');
  bindDetail();
}
/* 予定 1 件の詳細。AI が調べた情報をここに出す */
function openTripItem(tid,iid){curDet={trip:String(tid),ti:String(iid)};pushHist();showTripItem(tid,iid)}
function showTripItem(tid,iid){
  var tp=tripBy(tid),it=tripItemBy(tp,iid);
  if(!tp||!it){hideDetail();return}
  dSec.textContent='旅行';
  dDone.style.display='none';
  dEdit.style.display='grid';
  dEdit.onclick=function(){
    tripItemForm(tp);
    openForm('tripitem',{'日':tripDayLabel(tp,it.day),'開始時刻':it.s||'','終了時刻':it.e||'',
      '内容':it.t,'メモ（任意）':it.note||''},{editId:tp.id+'|'+it.id});
  };
  dTrash.style.display='grid';
  dTrash.onclick=function(){
    confirmDelete(it.t,function(){
      tp.items=(tp.items||[]).filter(function(x){return String(x.id)!==String(it.id)});
      saveTravel();buildTravelItems();
      curDet={trip:String(tp.id)};pushHist();showTrip(tp.id);
    });
  };
  var ai=it.ai||null;
  var h='<h1 class="dtitle">'+esc(it.t)+'</h1>'+
    '<div class="dsub">'+esc(tp.name)+' · '+esc(tripDayLabel(tp,it.day))+
    (tripTime(it)?' · '+esc(tripTime(it)):'')+'</div>';
  if(it.note)h+='<p class="prose" style="margin-bottom:12px">'+esc(it.note)+'</p>';
  if(!ai){
    h+='<div class="card"><h4>AI が調査中</h4><p class="prose" style="font-size:12.5px">'+
      'この予定の天気・おすすめ観光スポット10選・移動時間・評価を調べています。'+
      '数分で自動的にここに書き足されます（画面はそのままで大丈夫です）。</p>'+
      '<p class="prose" style="font-size:12px;color:var(--dim);margin-top:8px">'+
      'しばらく経っても届かないときは、下のボタンで依頼を送り直せます。</p>'+
      '<button class="btn sec" id="tiRetry" style="margin-top:10px">調査を依頼し直す</button></div>';
  }else{
    var kv=[];
    if(ai.place)kv.push(['場所',ai.place]);
    if(ai.weather)kv.push(['天気',ai.weather]);
    if(ai.access)kv.push(['移動・アクセス',ai.access]);
    if(ai.duration)kv.push(['所要時間',ai.duration]);
    if(ai.rating)kv.push(['評価',ai.rating]);
    if(ai.cost)kv.push(['費用の目安',ai.cost]);
    if(kv.length)h+='<div class="card"><h4>この予定の情報</h4>'+kv.map(function(r){
      return '<div class="kv"><span class="k">'+esc(r[0])+'</span><span class="v">'+esc(r[1])+'</span></div>';
    }).join('')+'</div>';
    var sp=(ai.spots||[]).filter(function(x){return x&&x.n});
    if(sp.length)h+='<div class="sechead"><span class="n">おすすめ観光スポット</span>'+
      '<span class="c">'+sp.length+' 件</span></div><div class="list spots">'+
      sp.map(function(x,i){
        return '<div class="row" style="cursor:default">'+
          '<span class="l"><span class="t">'+(i+1)+'. '+esc(x.n)+'</span>'+
          '<span class="m">'+esc([x.g,x.w].filter(Boolean).join(' · '))+'</span></span>'+
          '<span class="r">'+(x.r?'<span class="star">★ '+esc(x.r)+'</span>':'')+'</span></div>';
      }).join('')+'</div>';
    if(ai.tips)h+='<div class="card" style="margin-top:10px"><h4>ひとこと</h4>'+
      '<p class="prose">'+esc(ai.tips)+'</p></div>';
    if((ai.sources||[]).length)h+='<div class="card"><h4>出典</h4>'+
      ai.sources.filter(function(sx){return sx&&sx.u}).map(function(sx){
        return '<a class="lnk" href="'+esc(httpsOnly(sx.u)||'#')+'" target="_blank" rel="noopener">'+ic('link')+
          '<span class="lnk-b"><span class="lnk-t">'+esc(sx.t||sx.u)+'</span>'+
          '<span class="lnk-s">'+esc(String(sx.u).replace(/^https?:\/\//,''))+'</span></span></a>';
      }).join('')+'</div>';
    if(it.aiAt)h+='<div class="footn" style="text-align:left">AI が調べた日時: '+esc(it.aiAt)+'</div>';
    h+='<button class="btn sec" id="tiRetry" style="margin-top:10px">AI にもう一度調べてもらう</button>';
  }
  dBody.innerHTML=h;dBody.scrollTop=0;
  det.classList.add('show');det.setAttribute('aria-hidden','false');
  bindDetail();
  // 再調査。依頼が途中で消えて「調査中」のまま止まった予定の救済にもなる
  var retry=document.getElementById('tiRetry');
  if(retry)retry.onclick=function(){
    if(!GH.hasToken()){notify('GitHub と連携していないため依頼を送れません。',true);return}
    delete it.ai;delete it.aiAt;
    saveTravel();askTravelAI(tp,it);buildTravelItems();
    showTripItem(tp.id,it.id);
    notify('AI に調査を依頼しました。数分でこのページに追記されます。');
  };
}
/* 詳細パネルの中のボタン（年表の予定・追加）を配線する */
function bindDetail(){
  dBody.querySelectorAll('[data-ti]').forEach(function(el){
    el.onclick=function(){var p=el.getAttribute('data-ti').split('|');openTripItem(p[0],p[1])};
  });
  dBody.querySelectorAll('[data-tadd]').forEach(function(el){
    el.onclick=function(){
      var p=el.getAttribute('data-tadd').split('|'),tp=tripBy(p[0]);
      if(!tp)return;
      tripItemForm(tp);
      openForm('tripitem',{'日':tripDayLabel(tp,+p[1])},{tripId:tp.id});
    };
  });
  dBody.querySelectorAll('[data-trip]').forEach(function(el){
    el.onclick=function(){openTrip(el.getAttribute('data-trip'))};
  });
}
/* 予定フォームの「日」の選択肢を、その旅の日数に合わせて作り直す */
function tripItemForm(tp){
  var opts=(tp.days||[]).map(function(_,i){return tripDayLabel(tp,i)});
  if(!opts.length)opts=['0日目'];
  FORMS.tripitem.f[0][2]=opts.join('|');
}
function openWorkout(id){curDet={wk:id};pushHist();showWorkout(id)}
function showWorkout(id){
  var e=Workout.find(id);
  if(!e){hideDetail();return}
  dSec.textContent='筋トレ';
  dTrash.style.display='none';dEdit.style.display='none';dDone.style.display='none';
  var h='<h1 class="dtitle">'+esc(e.n)+'</h1>'+
    '<div class="dsub">'+esc((Workout.PARTS.filter(function(p){return p.k===e.part})[0]||{}).n||'')+
    ' · ダンベルのみ</div>';
  h+='<div class="chips">'+e.p.map(function(m){
      return '<span class="tag e">'+esc(Workout.mName(m))+'</span>'}).join('')+
    e.s.map(function(m){return '<span class="tag">'+esc(Workout.mName(m))+'</span>'}).join('')+'</div>';
  // 効く場所（赤）と動き
  h+='<div class="card"><h4>効く場所と動き</h4><div class="exv big">'+
    Workout.moveSVG(e.move,e.p,e.s,Workout.viewsFor(e)[0])+
    Workout.viewsFor(e).map(function(v){return Workout.bodySVG(v,e.p,e.s)}).join('')+'</div>'+
    '<div class="kv"><span class="k">主に効く</span><span class="v" style="color:var(--ember)">'+
      esc(e.p.map(Workout.mName).join('・'))+'</span></div>'+
    (e.s.length?'<div class="kv"><span class="k">補助的に効く</span><span class="v">'+
      esc(e.s.map(Workout.mName).join('・'))+'</span></div>':'')+
    '<div class="kv"><span class="k">セット</span><span class="v">'+esc(e.sets)+'</span></div>'+
    '<div class="kv"><span class="k">セット間の休憩</span><span class="v">'+esc(e.rest)+'</span></div></div>';
  h+='<div class="card"><h4>やり方</h4><ol class="steps">'+e.how.map(function(x){
      return '<li>'+esc(x)+'</li>'}).join('')+'</ol></div>';
  h+='<div class="card"><h4>効かせるコツ</h4><p class="prose">'+esc(e.tip)+'</p></div>';
  h+='<div class="card"><h4>注意</h4><p class="prose" style="color:var(--ember)">'+esc(e.warn)+'</p></div>';
  h+='<div class="card"><h4>回数と追い込みの考え方</h4><p class="prose">'+
    'ACSM 2026 のまとめでは、総量と努力度が同じなら回数の幅は結果を大きく変えません。'+
    '限界まで追い込まなくても、<b>あと2〜3回できる所で止めれば十分</b>です。'+
    '週あたり1筋群10セット以上・各部位を週2回が目安になります。</p></div>';
  dBody.innerHTML=h;dBody.scrollTop=0;
  det.classList.add('show');det.setAttribute('aria-hidden','false');
}

/* 収支記録表。今月のサマリー → 貯金の12ヶ月予測 → 支払日/給料日の一覧。 */
function renderMoney(){
  var act='<div class="actbar"><button class="act" data-form="money">'+ic('plus')+'収支を登録</button>'+
    '<button class="act" data-form="moneybal">'+ic('plus')+'貯金残高を設定</button></div>';
  var h='';
  var t=moneyMonthly();
  if(!MONEY.entries.length&&!MONEY.balance){
    h+='<div class="empty">まだ登録がありません。毎月の給料・支払い・貯金と現在の貯金残高を'+
      '登録すると、今後の貯金の見通しと支払日をここで確認できます。</div>';
    return {act:act,body:h};
  }
  // 今月のサマリー（毎月の定期 + 今月の単発）
  h+='<div class="card"><h4>今月のサマリー</h4>'+
    '<div class="kv"><span class="k">収入</span><span class="v">'+fmtYenTy('income',t.income)+'</span></div>'+
    '<div class="kv"><span class="k">支払い</span><span class="v">'+fmtYenTy('expense',t.expense)+'</span></div>'+
    '<div class="kv"><span class="k">貯金</span><span class="v">'+fmtYenTy('saving',t.saving)+'</span></div>'+
    '<div class="kv"><span class="k">自由に使える残り</span><span class="v" style="color:'+
      (t.left<0?'var(--ember)':'var(--gold)')+'">'+fmtYen(t.left)+'</span></div>'+
    (t.left<0?'<p class="prose" style="color:var(--ember);font-size:12px;margin-top:6px">'+
      '毎月の支出が収入を上回っています。</p>':'')+'</div>';
  // 貯金の見通し（現在残高 + 毎月の貯金 × 12ヶ月。単発の貯金は該当月に加算）
  if(MONEY.balance){
    var bal=+MONEY.balance.amount||0,series=[];
    var onceSav={};
    MONEY.entries.forEach(function(e){
      if(e.rep==='once'&&e.type==='saving'){
        var mk=String(e.date||'').slice(0,7);
        onceSav[mk]=(onceSav[mk]||0)+(+e.amount||0);
      }
    });
    var acc=bal;
    for(var i=0;i<=12;i++){
      var md=new Date(TODAY.getFullYear(),TODAY.getMonth()+i,1);
      var ym=md.getFullYear()+'/'+pad(md.getMonth()+1);
      if(i>0){
        // 定期の貯金は、その月に期間内のものだけ積む（開始前・終了後は積まない）
        var rs=0;
        MONEY.entries.forEach(function(e){
          if(e.rep!=='once'&&e.type==='saving'&&moneyActive(e,ym))rs+=+e.amount||0;
        });
        acc+=rs+(onceSav[ym]||0);
      }
      series.push([ym,Math.round(acc/10000)]);
    }
    h+='<div class="card"><h4>貯金の見通し</h4>'+
      '<div class="kv"><span class="k">現在の貯金（'+esc(MONEY.balance.asOf||'')+'時点）</span>'+
      '<span class="v">'+fmtYen(bal)+'</span></div>'+
      (acc>bal?spark(series,'万円')+
        '<div class="kv" style="border-top:0"><span class="k">1年後の見込み</span><span class="v">'+
        fmtYen(acc)+'</span></div>'
       :'<p class="prose" style="color:var(--dim);font-size:12px">毎月の貯金を登録すると'+
        '見通しグラフが表示されます。</p>')+'</div>';
  }else{
    h+='<div class="card"><h4>貯金の見通し</h4><p class="prose" style="color:var(--dim);font-size:12px">'+
      '「貯金残高を設定」で現在の貯金額を登録すると、毎月の貯金額から1年先までの見通しを表示します。</p></div>';
  }
  // 支払日・給料日（これからの分を日付順に、済んだ単発はその後ろに）
  var all=D.filter(function(x){return x.s==='money'&&match(x)});
  var td0=new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate()),tds=fD(td0);
  var rows=all.filter(function(x){return x.due>=tds})
    .sort(function(a,b){return String(a.due)<String(b.due)?-1:1})
    .concat(all.filter(function(x){return x.due<tds})
      .sort(function(a,b){return String(a.due)>String(b.due)?-1:1}));
  h+='<div class="sechead"><span class="n">支払日・給料日</span><span class="c">'+rows.length+' 件</span></div>';
  if(rows.length){
    h+='<div class="list">'+rows.map(function(x){
      var days=Math.round((new Date(x.due.replace(/\//g,'-'))-td0)/864e5);
      var badge=days<0?'<span class="tag">'+(x.ended?'終了':'済')+'</span>'
        :days===0?'<span class="tag e">今日</span>'
        :days<=7?'<span class="tag g">あと'+days+'日</span>'
        :'<span class="tag">あと'+days+'日</span>';
      return '<button class="row" data-i="'+D.indexOf(x)+'">'+
        '<span class="l"><span class="t">'+esc(x.t)+'</span><span class="m">'+esc(x.when)+' · '+
        fmtYenTy(x.ty,x.amt)+' · '+esc(MONEY_JA[x.ty]||x.ty)+'</span></span>'+
        '<span class="r">'+badge+'<span class="time">'+esc(x.due.slice(5))+'</span></span></button>';
    }).join('')+'</div>';
  }else h+='<div class="empty">「収支を登録」から給料・支払い・貯金を登録してください</div>';
  return {act:act,body:h};
}

/* ---- 近くのスポット ------------------------------------------------------
 * 現在地 + Overpass API（assets/nearby.js）。カテゴリーをワンタップで
 * 近い順に表示し、行タップで詳細、ピン/ボタンで Google マップに飛ぶ。
 */
var NB_LIST=[];   // いま画面に出している結果（絞り込み後）。data-nb の添字と対応
var nbIntentTimer=null;   // ブランド語の変化 → 再検索のデバウンス
/* 非同期コールバックが他のセクションを描き直さないようにするガード。
 * 検索中に別画面へ移った場合、そのままにしておけば戻ったとき render される。 */
function nbUpd(){if(view==='nearby')render()}
function renderNearby(){
  var S=Nearby.state,cat=null;
  Nearby.CATS.forEach(function(c){if(c.k===S.cat)cat=c});
  if(S.phase==='idle')Nearby.warm(nbUpd);   // 1タップ目を速くするため位置だけ先に温める
  /* 検索語からカテゴリー/ブランドを推定する（「コンビニ」→カテゴリー起動、
   * 「ファミマ」→コンビニ検索＋ファミリーマート絞り込み）。 */
  var qi=query?Nearby.queryIntent(queryRaw):null;
  // 未検索の状態で語を打ったら、推定したカテゴリーをそのまま検索する
  if(qi&&S.phase==='idle')setTimeout(function(){
    if(view==='nearby'&&Nearby.state.phase==='idle')Nearby.select(qi.cat,nbUpd,qi.filters);
  },0);
  /* 同じカテゴリーでもブランド語が変わったら検索し直す（ローソン→セブン等）。
   * ブランドはサーバー側で半径全域から探すので、手元の絞り込みでは代わりにならない。
   * タイマーはレンダーごとに引き直す（真のデバウンス）— 入力途中の語で
   * 15km の全域検索が無駄に飛ばないよう、手が止まってから発火する */
  var wantSig=qi&&qi.cat===S.cat?(qi.filters||[]).join('|'):'';
  var haveSig=(S.filters||[]).join('|');
  if(S.phase==='ok'&&(qi?qi.cat===S.cat:true)&&wantSig!==haveSig){
    clearTimeout(nbIntentTimer);
    nbIntentTimer=setTimeout(function(){
      var qi2=query?Nearby.queryIntent(queryRaw):null;
      var sig2=qi2&&qi2.cat===Nearby.state.cat?(qi2.filters||[]).join('|'):'';
      if(view==='nearby'&&Nearby.state.phase==='ok'&&
         sig2!==(Nearby.state.filters||[]).join('|'))
        Nearby.select(Nearby.state.cat,nbUpd,qi2&&qi2.cat===Nearby.state.cat?qi2.filters:null);
    },450);
  }
  var act='<div class="nbcats">'+Nearby.CATS.map(function(c){
    return '<button class="seg'+(S.cat===c.k?' on':'')+'" data-nbcat="'+c.k+'">'+c.e+' '+esc(c.n)+'</button>';
  }).join('')+'</div>';
  var h='';
  // 表示中と違うカテゴリーの語なら、そのカテゴリーへの検索ボタンを出す
  if(qi&&qi.cat!==S.cat){
    var qc=null;Nearby.CATS.forEach(function(c){if(c.k===qi.cat)qc=c});
    if(qc)h+='<button class="act" data-nbcat="'+qc.k+'" style="width:100%;margin-bottom:10px;justify-content:flex-start">'+
      qc.e+' 近くの'+esc(qc.n)+'を検索'+(qi.filters?'（'+esc(qi.term)+'）':'')+'</button>';
  }
  if(S.loc){
    var d=new Date(S.locAt);
    h+='<div class="nbloc">現在地 取得済み（精度 ±'+Math.round(S.loc.acc)+'m · '+
      pad(d.getHours())+':'+pad(d.getMinutes())+'）'+
      '<button class="seg" data-nbact="reloc">再取得</button></div>';
  }
  if(S.phase==='idle'){
    h+='<div class="card"><h4>使い方</h4><p class="prose" style="color:var(--dim)">'+
      '上のカテゴリーをタップすると、現在地の周辺を検索して近い順に表示します。\n'+
      '行をタップすると詳細、右のピンで Google マップがそのまま開きます。\n'+
      '詳細画面では Google の評価・クチコミも表示できます（APIキー設定時）。\n'+
      '位置情報はこの端末でのみ使用し、保存されません。</p></div>';
  }else if(S.phase==='locating'){
    h+='<div class="empty">現在地を取得しています…</div>';
  }else if(S.phase==='loading'){
    h+='<div class="empty">'+esc(cat?cat.n:'')+'を検索しています…<br>'+
      '<span style="font-size:10.5px;color:var(--faint)">サーバーが混雑している場合は30秒ほどかかることがあります</span></div>';
  }else if(S.phase==='error'){
    h+='<div class="card"><h4>エラー</h4><p class="prose" style="color:var(--ember)">'+esc(S.error)+'</p>'+
      (S.errorDetail?'<p class="prose" style="color:var(--faint);font-family:var(--mono);font-size:10.5px;margin-top:8px">'+
        esc(S.errorDetail)+'</p>':'')+'</div>'+
      '<button class="btn sec" data-nbact="retry">再試行</button>';
  }else if(S.phase==='ok'){
    NB_LIST=S.items.filter(function(it){
      if(!query)return true;
      if(qi&&qi.cat===S.cat){
        // サーバー側でブランド絞り込み済みなら二重に絞らない（operator や
        // name:en だけで一致した店を手元で取りこぼさない）
        if(qi.filters)return (S.filters&&S.filters.length)?true:Nearby.itemMatches(it,qi.filters);
        return true;   // カテゴリー語（コンビニ等）は絞らず全件
      }
      return Nearby.itemMatches(it,[queryRaw]);   // 表記ゆれに強い通常の絞り込み
    });
    h+='<div class="sechead"><span class="n">'+esc(cat?cat.n:'')+' · 近い順</span>'+
      '<span class="c">'+NB_LIST.length+' 件 · 半径 '+Nearby.fmtDist(S.radius)+
      (S.expanded?'（自動拡大）':'')+(S.partial?'（密集地のため一部）':'')+'</span></div>';
    if(NB_LIST.length){
      h+='<div class="list">'+NB_LIST.map(function(it,i){
        return '<div class="nbwrap"><button class="row nbrow" data-nb="'+i+'">'+
          '<span class="l"><span class="t">'+esc(it.title)+'</span><span class="m">'+esc(it.line2)+'</span></span>'+
          '<span class="r"><span class="time">'+Nearby.fmtDist(it.dist)+'</span></span></button>'+
          '<a class="nbgo" href="'+esc(Nearby.gmaps(it))+'" target="_blank" rel="noopener" '+
          'aria-label="'+esc(it.title)+' を Google マップで開く">'+ic('pin')+'</a></div>';
      }).join('')+'</div>';
    }else{
      h+='<div class="empty">'+(query
        ?'「'+esc(queryRaw)+'」に一致する場所はありません'
        :'この付近には見つかりませんでした（半径 '+Nearby.fmtDist(S.radius)+'）')+'</div>';
    }
    h+='<div class="footn">データ: © OpenStreetMap contributors（Overpass API）</div>';
  }
  return {act:act,body:h};
}
function openNearbySpot(it){curDet={nb:it};pushHist();showNearbySpot(it)}
function showNearbySpot(it){
  var t=it.tags||{};
  dSec.textContent='近くのスポット';
  dTrash.style.display='none';dEdit.style.display='none';dDone.style.display='none';
  var h='<h1 class="dtitle">'+esc(it.title)+'</h1>';
  h+='<div class="dsub">'+esc(it.sub)+' · 現在地から '+Nearby.fmtDist(it.dist)+'</div>';
  var rows=[['カテゴリ',it.sub],['距離','現在地から '+Nearby.fmtDist(it.dist)]];
  var ad=Nearby.addr(t);if(ad)rows.push(['住所',ad]);
  var oh=Nearby.hoursJa(t.opening_hours);if(oh)rows.push(['営業時間',oh]);
  var tel=t.phone||t['contact:phone'];if(tel)rows.push(['電話',tel]);
  if(it.brand&&it.brand!==it.title)rows.push(['ブランド / 運営',it.brand]);
  var cu=Nearby.cuisineJa(t.cuisine);if(cu)rows.push(['ジャンル',cu]);
  if(t.wheelchair)rows.push(['車椅子',{yes:'対応',limited:'一部対応',no:'非対応'}[t.wheelchair]||t.wheelchair]);
  if(t.capacity)rows.push(['収容台数',t.capacity+' 台']);
  if(t.fee)rows.push(['料金',t.fee==='no'?'無料':(t.fee==='yes'?'有料':t.fee)]);
  h+='<div class="card"><h4>詳細</h4>'+rows.map(function(r){
    return '<div class="kv"><span class="k">'+esc(r[0])+'</span><span class="v">'+esc(r[1])+'</span></div>'}).join('')+'</div>';
  // OSM 由来の値なので、http(s) 以外のスキーム（javascript: 等）は載せない
  var web=t.website||t['contact:website'];
  if(web&&!/^https?:\/\//i.test(web))web='';
  if(web)h+='<div class="card"><h4>リンク</h4><a class="lnk" href="'+esc(web)+'" target="_blank" rel="noopener">'+
    ic('link')+'<span class="lnk-b"><span class="lnk-t">公式サイト</span>'+
    '<span class="lnk-s">'+esc(String(web).replace(/^https?:\/\//,''))+'</span></span></a></div>';
  h+='<div class="card" id="gRev" data-for="'+esc(it.id)+'"><h4>Google の評価・クチコミ</h4>'+
    (!it.name
      ?'<p class="prose" style="color:var(--dim)">名称が登録されていない場所のため、クチコミの照合は行いません'+
       '（別の施設の情報を誤って表示しないためです）。</p>'
      :Nearby.hasGoogleKey()
      ?'<p class="prose" style="color:var(--dim)">取得中…</p>'
      :'<p class="prose" style="color:var(--dim)">Google Maps の API キーを設定すると、ここに評価とクチコミを表示します。'+
       '個人利用なら通常は無料枠に収まります。</p>'+
       '<button class="btn sec" id="gKeyBtn" style="margin-top:10px">APIキーを設定</button>')+
    '</div>';
  h+='<a class="btn" id="gmapsBtn" href="'+esc(Nearby.gmaps(it))+'" target="_blank" rel="noopener">Google マップで開く</a>';
  h+='<a class="btn sec" href="'+esc(Nearby.gmapsDir(it))+'" target="_blank" rel="noopener">経路案内（Google マップ）</a>';
  h+='<div class="footn">データ: © OpenStreetMap contributors · 実際の営業状況と異なる場合があります</div>';
  dBody.innerHTML=h;dBody.scrollTop=0;
  det.classList.add('show');det.setAttribute('aria-hidden','false');
  var kb=document.getElementById('gKeyBtn');
  if(kb)kb.onclick=openGoogleKeySheet;
  if(it.name&&Nearby.hasGoogleKey())loadGoogleReviews(it);
}
/* Google のクチコミを詳細カードへ流し込む。取得中に別の詳細へ移った場合は
 * data-for の照合で古い結果を捨てる。 */
function stars(n){return new Array(Math.max(0,Math.round(n))+1).join('★')}
function loadGoogleReviews(it){
  Nearby.googlePlace(it).then(function(p){
    var card=document.getElementById('gRev');
    if(!card||card.getAttribute('data-for')!==it.id)return;
    if(!p){
      card.innerHTML='<h4>Google の評価・クチコミ</h4>'+
        '<p class="prose" style="color:var(--dim)">Google 上で該当する場所が見つかりませんでした。</p>';
      return;
    }
    var h='<h4>Google の評価・クチコミ</h4>';
    h+='<div class="kv"><span class="k">評価</span><span class="v">'+
      (p.rating?'★ '+p.rating.toFixed(1)+'（'+(p.userRatingCount||0).toLocaleString()+'件）':'評価なし')+'</span></div>';
    if(p.currentOpeningHours&&p.currentOpeningHours.openNow!==undefined)
      h+='<div class="kv"><span class="k">現在</span><span class="v">'+
        (p.currentOpeningHours.openNow?'営業中':'営業時間外')+'</span></div>';
    var rvs=p.reviews||[];
    rvs.slice(0,4).forEach(function(rv){
      var name=(rv.authorAttribution&&rv.authorAttribution.displayName)||'匿名';
      var txt=(rv.text&&rv.text.text)||(rv.originalText&&rv.originalText.text)||'';
      // 220字で切るとき、絵文字などのサロゲートペアの途中で割らない
      if(txt.length>220){
        var cut=(txt.charCodeAt(219)&0xFC00)===0xD800?219:220;
        txt=txt.slice(0,cut)+'…';
      }
      h+='<div class="grev"><div class="gh"><span class="gn">'+esc(name)+'</span>'+
        '<span class="gs">'+stars(rv.rating||0)+'</span>'+
        '<span class="gt">'+esc(rv.relativePublishTimeDescription||'')+'</span></div>'+
        (txt?'<div class="gb">'+esc(txt)+'</div>':'')+'</div>';
    });
    if(!rvs.length)h+='<p class="prose" style="color:var(--dim);margin-top:8px">クチコミはまだありません。</p>';
    h+='<div class="kv"><span class="k">提供</span><span class="v">Google</span></div>';
    card.innerHTML=h;
    // Google 側の正確な場所ページが分かったら、開くボタンをそこへ差し替える
    if(p.googleMapsUri&&/^https:\/\//.test(p.googleMapsUri)){
      var gb=document.getElementById('gmapsBtn');
      if(gb)gb.href=p.googleMapsUri;
    }
  }).catch(function(e){
    var card=document.getElementById('gRev');
    if(!card||card.getAttribute('data-for')!==it.id)return;
    card.innerHTML='<h4>Google の評価・クチコミ</h4>'+
      '<p class="prose" style="color:var(--ember)">'+esc((e&&e.message)||'取得に失敗しました')+'</p>'+
      '<button class="btn sec" id="gKeyBtn" style="margin-top:10px">APIキーを設定し直す</button>';
    var kb=document.getElementById('gKeyBtn');
    if(kb)kb.onclick=openGoogleKeySheet;
  });
}
function openGoogleKeySheet(){
  var has=Nearby.hasGoogleKey();
  sheet.innerHTML='<h3>Google クチコミ連携</h3>'+
    '<div class="sh">Places API (New) の API キーをこの端末にだけ保存します</div>'+
    '<label class="fl">Google Maps API キー</label>'+
    '<input type="password" id="gKeyIn" placeholder="'+(has?'保存済み（変更するときだけ入力）':'AIza...')+'">'+
    '<p class="prose" style="font-size:11.5px;color:var(--faint);margin-top:10px">'+
    'Google Cloud で「Places API (New)」を有効化したキーを入力してください。'+
    'キーは HTTP リファラでこのサイトに限定することを推奨します。'+
    'キーはこの端末のブラウザにだけ保存され、Google 以外には送信されません。</p>'+
    '<button class="btn" id="gKeySave">保存</button>'+
    (has?'<button class="btn sec" id="gKeyClear">キーを削除</button>':'')+
    '<button class="btn sec" id="fCancel">閉じる</button>';
  mask.classList.add('show');sheet.scrollTop=0;
  document.getElementById('fCancel').onclick=function(){mask.classList.remove('show')};
  document.getElementById('gKeySave').onclick=function(){
    var v=document.getElementById('gKeyIn').value.trim();
    if(v)Nearby.setGoogleKey(v);
    mask.classList.remove('show');
    if(curDet&&curDet.nb)showNearbySpot(curDet.nb);   // 開いていた詳細に即反映
  };
  var gc=document.getElementById('gKeyClear');
  if(gc)gc.onclick=function(){
    Nearby.setGoogleKey('');mask.classList.remove('show');
    if(curDet&&curDet.nb)showNearbySpot(curDet.nb);
  };
}

// ---- detail
function isWork(s){return s==='anime'||s==='tv'||s==='movies'}
function bodyHead(s){return s==='mail'?'AI 要約':s==='meal'?'AI アドバイス':isWork(s)?'あらすじ':'解説'}
/* ---- 検索の教材ページ ------------------------------------------------------
 * publish_search が Markdown を部品（見出し・段落・表・画像・図・クイズ）に
 * 分解して d.doc に入れてくる。ここではそれを上から順に描くだけで、
 * Markdown の解釈はしない。文中の飾りだけ mdInline で整える。 */

/* エスケープ済みの文にだけ掛ける行内整形。**強調**・`コード`・[表示](https URL)。
 * 先に esc() を通す前提なので、ここで生の HTML が混ざることはない。 */
function mdInline(escaped){
  return linkTerms(escaped
    .replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener" class="dlnk">$1</a>')
    .replace(/\[([^\]]+)\]\([^)]*\)/g,'$1')
    .replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>')
    .replace(/`([^`]+)`/g,'<code>$1</code>'));
}
function docHTML(doc){
  var h='',toc=[],sec=0;
  doc.forEach(function(b){
    if(b.h){sec++;toc.push([sec,b.h]);
      h+='<h2 class="dsec" id="dsec'+sec+'">'+mdInline(esc(b.h))+'</h2>';return}
    if(b.h3){h+='<h3 class="dsub3">'+mdInline(esc(b.h3))+'</h3>';return}
    if(b.p){h+='<p class="prose dp">'+mdInline(esc(b.p))+'</p>';return}
    if(b.ul){h+='<ul class="dlist">'+b.ul.map(function(t){
      return '<li>'+mdInline(esc(t))+'</li>'}).join('')+'</ul>';return}
    if(b.ol){h+='<ol class="dlist">'+b.ol.map(function(t){
      return '<li>'+mdInline(esc(t))+'</li>'}).join('')+'</ol>';return}
    if(b.note){h+='<div class="dnote">'+b.note.map(function(t){
      return '<p>'+mdInline(esc(t))+'</p>'}).join('')+'</div>';return}
    if(b.tbl){h+='<div class="tblwrap"><table class="dtbl"><thead><tr>'+
      b.tbl.h.map(function(c){return '<th>'+mdInline(esc(c))+'</th>'}).join('')+
      '</tr></thead><tbody>'+b.tbl.r.map(function(r){
        return '<tr>'+r.map(function(c){return '<td>'+mdInline(esc(c))+'</td>'}).join('')+'</tr>';
      }).join('')+'</tbody></table></div>';return}
    if(b.img&&httpsOnly(b.img.u)){
      h+='<figure class="dimg"><img src="'+esc(b.img.u)+'" alt="" loading="lazy" '+
        'referrerpolicy="no-referrer" onerror="this.closest(\'figure\').remove()">'+
        '<figcaption>'+esc(b.img.cap||'')+
        (httpsOnly(b.img.cru)?' <a href="'+esc(b.img.cru)+'" target="_blank" rel="noopener">'+
          esc('出典: '+(b.img.crt||'リンク'))+'</a>':'')+
        '</figcaption></figure>';return}
    if(b.mmd){h+='<div class="mmd" data-mmd="'+esc(b.mmd)+'">'+
      '<span class="mmdl">図を描いています…</span></div>';return}
    if(b.code){h+='<pre class="dcode">'+esc(b.code)+'</pre>';return}
    if(b.quiz){h+='<div class="quiz">'+b.quiz.map(function(q,n){
      return '<div class="qz"><div class="qq"><span class="qn">Q'+(n+1)+'</span>'+
        mdInline(esc(q.q))+'</div>'+
        '<button class="qa-btn" type="button">答えを見る</button>'+
        '<div class="qa" hidden>'+mdInline(esc(q.a))+'</div></div>';
    }).join('')+'</div>';return}
  });
  // 目次（見出しが3つ以上あるときだけ。タップでその章へ飛ぶ）
  var tocH=toc.length>=3?'<nav class="dtoc"><span class="tt">目次</span>'+
    toc.map(function(t){return '<button class="ti" data-toc="dsec'+t[0]+'">'+esc(t[1])+'</button>'})
      .join('')+'</nav>':'';
  return '<article class="ddoc">'+tocH+h+'</article>';
}
/* 教材ページの中の操作（目次・クイズ・図）を配線する */
function bindDoc(){
  dBody.querySelectorAll('[data-toc]').forEach(function(el){
    el.onclick=function(){
      var t=document.getElementById(el.getAttribute('data-toc'));
      if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
    };
  });
  dBody.querySelectorAll('.qa-btn').forEach(function(el){
    el.onclick=function(){
      var a=el.nextElementSibling;
      var open=a.hidden;
      a.hidden=!open;
      el.textContent=open?'答えを隠す':'答えを見る';
    };
  });
  renderMermaid();
}
/* mermaid は 3.5MB あるので、図のあるページを開いたときだけ読み込む */
var mmdState='';   // '' → loading → ready / failed
function renderMermaid(){
  var nodes=dBody.querySelectorAll('.mmd[data-mmd]');
  if(!nodes.length)return;
  if(mmdState==='ready')return drawMermaid(nodes);
  if(mmdState==='failed')return mermaidFallback(nodes);
  if(mmdState==='loading')return;   // 読み込み完了時に描かれる
  mmdState='loading';
  var s=document.createElement('script');
  s.src='assets/mermaid.min.js';
  s.onload=function(){
    try{
      window.mermaid.initialize({startOnLoad:false,theme:'dark',securityLevel:'strict',
        themeVariables:{fontFamily:'-apple-system,sans-serif',fontSize:'13px'}});
      mmdState='ready';
      drawMermaid(dBody.querySelectorAll('.mmd[data-mmd]'));
    }catch(e){mmdState='failed';mermaidFallback(dBody.querySelectorAll('.mmd[data-mmd]'))}
  };
  s.onerror=function(){mmdState='failed';mermaidFallback(dBody.querySelectorAll('.mmd[data-mmd]'))};
  document.body.appendChild(s);
}
function drawMermaid(nodes){
  nodes.forEach(function(el,n){
    var code=el.getAttribute('data-mmd');
    el.removeAttribute('data-mmd');
    window.mermaid.render('mmdsvg'+Date.now()+'_'+n,code).then(function(r){
      el.innerHTML=r.svg;
      var svg=el.querySelector('svg');
      if(svg){svg.removeAttribute('height');svg.style.maxWidth='100%'}
    }).catch(function(){
      // 図の文法が壊れていたら、図の代わりに原文を見せる（何も出ないよりまし）
      el.innerHTML='<pre class="dcode">'+esc(code)+'</pre>';
    });
  });
}
function mermaidFallback(nodes){
  nodes.forEach(function(el){
    var code=el.getAttribute('data-mmd');
    if(code==null)return;
    el.removeAttribute('data-mmd');
    el.innerHTML='<pre class="dcode">'+esc(code)+'</pre>';
  });
}
/* 件名の表記ゆれを無視して突き合わせるための正規化。予定側の e.mail は
 * パイプラインが件名を個別ページのファイル名にする過程で記号（: ／ 、|【】など）を
 * 落としたり長さで末尾を切ったりするため、メール一覧の t と完全一致しない。
 * 文字（各種言語）と数字以外を全て除去して比較する。 */
function normSubj(s){return String(s||'').replace(/[^\p{L}\p{N}]/gu,'').toLowerCase()}
/* 2つの件名が同じメールを指すか。記号除去後に一致、または（ファイル名が末尾で
 * 切られる場合に備え）一方が他方の十分に長い先頭一致なら同一とみなす。 */
function sameSubj(a,b){
  a=normSubj(a);b=normSubj(b);
  if(!a||!b)return false;
  if(a===b)return true;
  var lo=a.length<b.length?a:b,hi=a.length<b.length?b:a;
  return lo.length>=12&&hi.indexOf(lo)===0;
}
/* メール詳細の「登録された予定 / タスク」リンクから、実際に登録済みの予定/タスクを
 * 引き当てる。パイプラインのリンクは id を持たないことがあるので、元メール件名
 * （e.mail）と名前（"種別: 名前" の名前部分）で EV から探す。 */
function resolveMailEv(mailItem,l){
  var name=String(l&&l.t||'').replace(/^[^:：]*[:：]\s*/,'').trim();
  var same=EV.filter(function(e){return e.mail&&sameSubj(e.mail,mailItem.t)});
  var hit=same.filter(function(e){return e.n===name})[0]
        ||(same.length===1?same[0]:null)
        ||EV.filter(function(e){return e.n===name})[0];
  return hit?hit.id:'';
}
function openDetail(i){curDet=i;pushHist();showDetail(i)}
function showDetail(i){
  var x=D[i],d=x.d||{};
  // 旅行はホームや検索から来ても年表・予定の画面へ（汎用の詳細では中身が出ない）
  if(x.s==='travel'&&x.trip){
    if(x.titem)showTripItem(x.trip,x.titem);else showTrip(x.trip);
    return;
  }
  if(x.s==='mail'){
    // 既読の永続化を nw に頼らない（一括未読の後など nw=0 でも読了は保存する）
    if(x.unread){sessionRead[stateKey(x)]=1;touchState(x,{read:1})}
    x.unread=0;
  }
  if(x.nw){x.nw=0;touchState(x,{read:1})}
  dSec.textContent=sn(x.s);
  dTrash.style.display='none';dEdit.style.display='none';dDone.style.display='none';
  if(x.s==='essentials'){
    // 必需品は削除できる。一覧から先に消し、削除要求は裏で送る
    dTrash.style.display='grid';
    dTrash.onclick=function(){
      confirmDelete(x.t,function(){
        var isLocal=String(x.id||'').indexOf('ess-local-')===0;
        PENDING_ESS=PENDING_ESS.filter(function(p){return p!==x});
        for(var j=D.length-1;j>=0;j--)if(D[j]===x)D.splice(j,1);
        if(x.id&&!isLocal)DEL_ESS.push(x.id);   // サーバー反映まで一覧から隠す
        persistEss();
        histBack();
        if(GH.hasToken())
          GH.pushInbox('essential-delete',{id:isLocal?'':x.id,'製品名':x.t}).then(function(){
            setSync('削除しました',true);
          }).catch(function(err){
            notify('削除の送信に失敗しました（'+err.message+'）。もう一度お試しください。',true);
          });
      });
    };
  }
  if(x.s==='money'){
    dTrash.style.display='grid';
    dTrash.onclick=function(){
      confirmDelete(x.t,function(){
        var eid=String(x.id||'').replace(/^money-/,'');
        MONEY.entries=MONEY.entries.filter(function(e){return String(e.id)!==eid});
        saveMoney();buildMoneyItems();
        histBack();
      });
    };
    // 期間や金額を後から変えられるように、編集でフォームを開き直す
    var me=null;
    MONEY.entries.forEach(function(e2){if('money-'+e2.id===String(x.id))me=e2});
    if(me){
      dEdit.style.display='grid';
      dEdit.onclick=function(){
        var p={'種別':me.type==='income'?'給料・収入':(me.type==='saving'?'貯金':'支払い'),
               '名前':me.name,'金額（円）':String(me.amount)};
        if(me.rep==='once'){
          p['繰り返し']='単発（1回だけ）';
          p['日付']=String(me.date||'').replace(/\//g,'-');
        }else{
          p['繰り返し']='毎月';
          p['毎月の日付']=me.day===31?'月末':String(me.day);
          if(me.from)p['開始（いつから・任意）']=me.from.replace('/','-');
          if(me.to)p['終了（いつまで・任意）']=me.to.replace('/','-');
        }
        openForm('money',p,{editId:me.id});
      };
    }
  }
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
  // 横長のイメージ写真（ファッションのコーデ・商品・動画サムネ）。
  // 外部画像なので、読めなければ枠ごと消して隙間を残さない
  if(httpsOnly(d.hero))h+='<div class="photo"><img src="'+esc(d.hero)+'" alt="" loading="lazy" '+
    'referrerpolicy="no-referrer" onerror="this.parentNode.remove()"></div>';
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
  if(d.graph)h+='<div class="card"><h4>'+esc(d.graphTitle||'体重推移')+'</h4>'+
    spark(d.series,d.graphUnit)+'</div>';
  if(d.fig&&!d.doc)h+='<div class="card"><h4>図解</h4><div class="fig">解説用の図（AI生成）</div>'+
    '<div class="kv" style="border-top:0"><span class="k">形式</span><span class="v">初心者向け · 画像付き</span></div></div>';
  if(d.body)h+='<div class="card"><h4>'+(d.doc?'3行まとめ':bodyHead(x.s))+'</h4><p class="prose">'+linkTerms(esc(d.body))+'</p></div>';
  // 検索の教材ページ（全文）。要約カードの直後・出典や用語辞書より前に出す
  if(d.doc)h+=docHTML(d.doc);
  if(d.cast)h+='<div class="card"><h4>キャスト（役名 / 声優）</h4>'+d.cast.map(function(c){
    return '<div class="kv"><span class="k">'+esc(c[1])+'</span><span class="v">'+esc(c[0])+'</span></div>'}).join('')+'</div>';
  if(d.eps)h+='<div class="card"><h4>各話</h4>'+d.eps.map(function(e,n){
    return '<div class="chk'+(e.on?' on':'')+'" data-n="'+n+'"><span class="box">✓</span>'+
      '<span class="lb">'+esc(e.n)+'　'+esc(e.t)+'</span></div>'}).join('')+'</div>';
  if(d.nut)h+='<div class="card"><h4>栄養素（34種のうち抜粋 / 目安比）</h4><div class="nut">'+d.nut.map(function(r){
    return '<div><span>'+esc(r[0])+'</span><b>'+esc(r[1])+'</b></div>'}).join('')+'</div></div>';
  // 買える商品のカード（画像 + 名前 + 購入リンク）。関連リンクより先に出す
  if(d.shop&&d.shop.length)h+='<div class="card"><h4>買えるところ</h4>'+d.shop.map(function(s){
    var to=httpsOnly(s.to);
    return '<div class="shop">'+(httpsOnly(s.img)?'<span class="si">'+extImg(s.img,'👕')[0]+'</span>':'')+
      '<span class="sb"><span class="st">'+esc(s.t)+'</span>'+
      (s.m?'<span class="sm">'+esc(s.m)+'</span>':'')+
      (to?'<a class="sgo" href="'+esc(to)+'" target="_blank" rel="noopener">'+
        ic('link')+'ZOZOTOWN で見る</a>':'')+'</span></div>';
  }).join('')+'</div>';
  if(d.links){
    // 見出しはセクションで意味が変わる（メール=登録先、ニュース/検索=出典）
    var lt=d.linksTitle||(x.s==='mail'?'登録された予定 / タスク':'出典');
    h+='<div class="card"><h4>'+esc(lt)+'</h4>'+d.links.map(function(l){
      var isUrl=/^https?:\/\//.test(l.to||'');
      // メールの登録先リンクは id を持たないことがあるので、登録済みの予定/タスクから
      // 実体を引き当てて data-goev で飛べるようにする。引き当てられなくても、メールの
      // 登録先は常にタップ可能にし（data-goev=''）、予定一覧へ逃がす。
      var ev=l.ev||(x.s==='mail'&&!isUrl?resolveMailEv(x,l):'');
      var asBtn=!isUrl&&(ev||x.s==='mail');
      var sub=isUrl?String(l.to).replace(/^https?:\/\//,''):esc(l.to||'');
      var open=isUrl?'<a class="lnk" href="'+esc(l.to)+'" target="_blank" rel="noopener">'
             :(asBtn?'<button class="lnk" data-goev="'+esc(ev)+'">':'<div class="lnk">');
      var close=isUrl?'</a>':(asBtn?'</button>':'</div>');
      return open+ic('link')+'<span class="lnk-b"><span class="lnk-t">'+esc(l.t)+'</span>'+
        (sub?'<span class="lnk-s">'+esc(sub)+'</span>':'')+'</span>'+close}).join('')+'</div>';
  }
  if(d.terms)h+='<div class="card"><h4>用語辞書</h4><div class="chips" style="margin:0">'+
    d.terms.map(function(t){
      return TERMS[t]?'<button class="tag g" data-term="'+esc(t)+'">'+esc(t)+'</button>'
                     :'<span class="tag">'+esc(t)+'</span>'}).join('')+'</div></div>';
  if(d.tl)h+='<div class="card"><h4>続報（最新が上）</h4><div class="tl">'+d.tl.map(function(t){
    return '<div class="it"><div class="tt">'+esc(t.t)+'</div><div class="tm">'+esc(t.m)+'</div></div>'}).join('')+'</div></div>';
  if(d.raw)h+='<div class="card"><h4>メール本文</h4><div class="mail-body">'+esc(d.raw)+'</div></div>';
  // 追跡中のニュースは、ここから続報の自動収集を止められる
  if(x.s==='news'&&x.story&&x.slug)
    h+='<button class="danger" id="newsStopBtn">この話題の追跡を停止</button>';
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
  if(d.doc)bindDoc();

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
  var nsBtn=document.getElementById('newsStopBtn');
  if(nsBtn)nsBtn.onclick=function(){
    sheet.innerHTML='<h3>追跡を停止しますか</h3><div class="sh">'+esc(x.t)+'</div>'+
      '<p class="prose" style="color:var(--dim);font-size:12.5px;margin-top:4px">'+
      '今後この話題の続報は自動収集されません。掲載済みの記事はそのまま残ります。</p>'+
      '<button class="danger" id="cfYes" style="margin-top:14px">追跡を停止する</button>'+
      '<button class="btn sec" id="cfNo">キャンセル</button>';
    mask.classList.add('show');sheet.scrollTop=0;
    document.getElementById('cfNo').onclick=function(){mask.classList.remove('show')};
    document.getElementById('cfYes').onclick=function(){
      mask.classList.remove('show');
      var slug=x.slug;
      if(!STOP_NEWS.some(function(e){return e.slug===slug}))
        STOP_NEWS.push({slug:slug,t:x.t,ts:Date.now(),sent:0});
      applyNewsStop(slug);persistNewsStops();
      histBack();
      flushNewsStops(true);
    };
  };
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
  var t=TERMS[name];if(!t){hideDetail();return}
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
 research:{h:'調べてほしい内容を登録',s:'AI が複数の情報源を深掘りし、図解・実例・クイズつきの教材ページを作ります（30分ほど）',
   f:[['調べたい内容','text','量子コンピュータ']]},
 essential:{h:'必需品を登録',s:'製品名だけで OK。値段・消耗頻度・購入場所・類似製品は AI が調べて記入します',
   f:[['製品名','text','例: ジレット フュージョン 替刃 8個入']]},
 money:{h:'収支を登録',s:'毎月の定期と、単発（1回だけ）の支払い・収入を登録できます',
   f:[['種別','select','給料・収入|支払い|貯金'],['名前','text','家賃'],['金額（円）','text','85000'],
      ['繰り返し','select','毎月|単発（1回だけ）'],
      ['毎月の日付','select','1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|月末'],
      ['開始（いつから・任意）','month','2026-08'],
      ['終了（いつまで・任意）','month','2027-03'],
      ['日付','date','']]},
 trip:{h:'旅行を登録',s:'名前と日程を入れると、0日目からの年表を作ります',
   f:[['旅行名','text','知床旅行'],['行き先','text','知床（北海道）'],
      ['開始日（0日目）','date',''],
      ['日数','select','1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21']]},
 tripitem:{h:'予定を追加',s:'時間と内容だけで OK。天気・おすすめ観光スポット・移動時間・評価は AI が調べて追記します',
   f:[['日','select','0日目'],['開始時刻','time',''],['終了時刻','time',''],
      ['内容','text','ホテルチェックイン（北こぶし知床）'],['メモ（任意）','text','']]},
 moneybal:{h:'貯金残高を設定',s:'現在の貯金額。見通しグラフの起点になります',
   f:[['現在の貯金額（円）','text','1250000']]}
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
/* 写真は端末側で長辺を縮めて JPEG data URL 化してから送る。
 * inbox は GitHub Contents API のコミットなので、原寸のままだと重すぎる。
 * （パイプライン側でも添付時に再縮小するが、まず確実に送れる大きさにする） */
function readImageDownscaled(file,maxEdge,quality){
  return new Promise(function(resolve,reject){
    var fr=new FileReader();
    fr.onerror=function(){reject(new Error('読み込み失敗'))};
    fr.onload=function(){
      var img=new Image();
      img.onerror=function(){reject(new Error('画像を解釈できません'))};
      img.onload=function(){
        var w=img.naturalWidth||img.width,h=img.naturalHeight||img.height;
        var s=Math.min(1,maxEdge/Math.max(w,h||1));
        var cw=Math.max(1,Math.round(w*s)),ch=Math.max(1,Math.round(h*s));
        var cv=document.createElement('canvas');cv.width=cw;cv.height=ch;
        cv.getContext('2d').drawImage(img,0,0,cw,ch);
        try{resolve(cv.toDataURL('image/jpeg',quality))}catch(e){reject(e)}
      };
      img.src=fr.result;
    };
    fr.readAsDataURL(file);
  });
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
  var photoData=[];   // 写真フォームで選ばれた画像（縮小済み data URL）
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
      else if(f[1]==='file')h+='<input type="file" id="photoIn" data-k="画像" accept="image/*" multiple style="width:100%;color:var(--dim);font-size:13px">'+
        '<div class="fig" id="photoPrev" style="height:auto;min-height:72px;margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center">画像を選択してください</div>';
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
  // 収支フォーム: 「毎月」なら毎月の日付、「単発」なら日付だけを見せる
  var repSel=sheet.querySelector('select[data-k="繰り返し"]');
  if(repSel&&k==='money'){
    var repTog=function(){
      var spot=repSel.value!=='毎月';
      [['毎月の日付',!spot],['開始（いつから・任意）',!spot],
       ['終了（いつまで・任意）',!spot],['日付',spot]].forEach(function(p){
        var el=sheet.querySelector('[data-k="'+p[0]+'"]');if(!el)return;
        el.style.display=p[1]?'':'none';
        var lb=el.previousElementSibling;
        if(lb&&lb.classList.contains('fl'))lb.style.display=p[1]?'':'none';
      });
    };
    repSel.addEventListener('change',repTog);repTog();
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
  var photoIn=document.getElementById('photoIn');
  if(photoIn){
    var photoPrev=document.getElementById('photoPrev');
    photoIn.addEventListener('change',function(){
      photoData=[];
      var files=[].slice.call(photoIn.files||[]);
      if(!files.length){photoPrev.textContent='画像を選択してください';return}
      photoPrev.textContent='読み込み中…';
      Promise.all(files.map(function(f){return readImageDownscaled(f,1600,0.82)}))
        .then(function(urls){
          photoData=urls;
          photoPrev.innerHTML=urls.map(function(u){
            return '<img src="'+u+'" alt="" style="height:64px;border-radius:8px">'}).join('');
        })
        .catch(function(){
          photoData=[];
          photoPrev.textContent='画像を読み込めませんでした（JPEG / PNG を選んでください）';
        });
    });
  }
  document.getElementById('fCancel').onclick=function(){mask.classList.remove('show')};
  document.getElementById('fSubmit').onclick=function(){
    var btn=this,payload={};
    function flash(m){btn.textContent=m;setTimeout(function(){
      btn.textContent=opts.editId?'変更を保存':'登録して GitHub に送信'},1600)}
    if(F.multi){
      // 食事フォーム: 各行を1食として meals 配列にまとめ、料理と量の対応を保つ。
      // 体重は食事とは別枠。空行（料理・量とも空）は送らない。
      var meals=[];
      sheet.querySelectorAll('#mealRows .card').forEach(function(card){
        var d1=card.querySelector('[data-k="料理"]'),d2=card.querySelector('[data-k="量"]');
        var dish=(d1?d1.value:'').trim(),amt=(d2?d2.value:'').trim();
        if(!dish&&!amt)return;
        var row={};if(dish)row['料理']=dish;if(amt)row['量']=amt;meals.push(row);
      });
      if(meals.length)payload.meals=meals;
      var wEl=sheet.querySelector('[data-k="体重"]'),wv=wEl?wEl.value.trim():'';
      if(wv)payload['体重']=wv;
      if(!payload.meals&&!payload['体重'])return flash('食材か体重を入力してください');
    }else{
      sheet.querySelectorAll('[data-k]').forEach(function(el){
        if(el.type==='file')return;   // 画像は縮小済みの photoData を使う
        var key=el.getAttribute('data-k');
        var v=el.type==='checkbox'?el.checked:el.value;
        if(v===''||v===false)return;
        if(payload[key]===undefined)payload[key]=v;
        else{if(!Array.isArray(payload[key]))payload[key]=[payload[key]];payload[key].push(v)}
      });
      if(photoData.length)payload['画像']=photoData.slice();
      if(k==='photo'&&!(payload['画像']&&payload['画像'].length))
        return flash('画像を選択してください');
      if(k==='essential'&&!String(payload['製品名']||'').trim())
        return flash('製品名を入力してください');
    }
    if(k==='trip'||k==='tripitem'){
      // 旅行は収支と同じく、サイトが travel.json を直接保存する（即時反映）。
      // 予定だけは AI の調査依頼として inbox にも同じ内容を置く。
      if(k==='trip'){
        var tName=String(payload['旅行名']||'').trim();
        if(!tName)return flash('旅行名を入力してください');
        var tStart=String(payload['開始日（0日目）']||'').trim();
        if(!/^\d{4}-\d{2}-\d{2}$/.test(tStart))return flash('開始日を選んでください');
        var tN=Math.max(1,Math.min(21,parseInt(payload['日数'],10)||1));
        var d0=new Date(tStart+'T00:00:00');
        var days=[];for(var di=0;di<tN;di++)
          days.push(fD(new Date(d0.getFullYear(),d0.getMonth(),d0.getDate()+di)));
        var tp0=opts.editId?tripBy(opts.editId):null;
        if(tp0){
          // 日数を減らしたときは、はみ出した予定を最終日に寄せる（消さない）
          tp0.name=tName;tp0.dest=String(payload['行き先']||'').trim();
          // 既にある日付は保つ（連続でない日程を手で直せるように）
          tp0.days=days.map(function(d,i){return (tp0.days||[])[i]||d});
          (tp0.items||[]).forEach(function(it){if(+it.day>tN-1)it.day=tN-1});
        }else{
          tp0={id:'tp'+Date.now(),name:tName,dest:String(payload['行き先']||'').trim(),
               days:days,items:[]};
          TRAVEL.trips.push(tp0);
        }
        saveTravel();buildTravelItems();
        mask.classList.remove('show');
        curDet={trip:String(tp0.id)};pushHist();showTrip(tp0.id);
        return;
      }
      var tpx=tripBy(opts.tripId||String(opts.editId||'').split('|')[0]);
      if(!tpx)return flash('旅行が見つかりません');
      var iTitle=String(payload['内容']||'').trim();
      if(!iTitle)return flash('内容を入力してください');
      var dayIx=0;
      (tpx.days||[]).forEach(function(_,i){if(tripDayLabel(tpx,i)===payload['日'])dayIx=i});
      var it0=opts.editId?tripItemBy(tpx,String(opts.editId).split('|')[1]):null;
      var changed=!it0||it0.t!==iTitle||it0.day!==dayIx||
        (it0.s||'')!==String(payload['開始時刻']||'')||(it0.e||'')!==String(payload['終了時刻']||'');
      if(!it0){it0={id:'ti'+Date.now()};tpx.items=(tpx.items||[]).concat([it0])}
      it0.day=dayIx;
      it0.s=String(payload['開始時刻']||'').trim();
      it0.e=String(payload['終了時刻']||'').trim();
      it0.t=iTitle;
      it0.note=String(payload['メモ（任意）']||'').trim();
      // 内容や日付が変わったら調べ直す（時刻だけの微調整でも天気が変わるため）
      if(changed){delete it0.ai;delete it0.aiAt;askTravelAI(tpx,it0)}
      saveTravel();buildTravelItems();
      mask.classList.remove('show');
      curDet={trip:String(tpx.id)};pushHist();showTrip(tpx.id);
      return;
    }
    if(k==='money'||k==='moneybal'){
      // 収支は inbox を経由せず、サイトが money.json を直接保存する（即時反映）
      if(k==='money'){
        var mAmt=parseInt(String(payload['金額（円）']||'').replace(/[^0-9]/g,''),10);
        var mName=String(payload['名前']||'').trim();
        if(!mName||!mAmt)return flash('名前と金額を入力してください');
        var entry={type:MONEY_TYPE[payload['種別']]||'expense',name:mName,amount:mAmt};
        if(payload['繰り返し']==='単発（1回だけ）'){
          var mD=String(payload['日付']||'').trim();   // input type=date は YYYY-MM-DD
          if(!/^\d{4}-\d{2}-\d{2}$/.test(mD))return flash('単発の日付を選んでください');
          entry.rep='once';entry.date=mD.replace(/-/g,'/');
        }else{
          entry.day=payload['毎月の日付']==='月末'?31:(parseInt(payload['毎月の日付'],10)||1);
          // いつからいつまで（任意）。input type=month は YYYY-MM
          var mF=String(payload['開始（いつから・任意）']||'').trim();
          var mT=String(payload['終了（いつまで・任意）']||'').trim();
          if(mF&&!/^\d{4}-\d{2}$/.test(mF))return flash('開始は 2026-08 の形式で入力してください');
          if(mT&&!/^\d{4}-\d{2}$/.test(mT))return flash('終了は 2027-03 の形式で入力してください');
          if(mF)entry.from=mF.replace('-','/');
          if(mT)entry.to=mT.replace('-','/');
          if(entry.from&&entry.to&&entry.to<entry.from)
            return flash('終了は開始より後にしてください');
        }
        if(opts.editId){
          entry.id=opts.editId;
          var mIx=-1;
          MONEY.entries.forEach(function(e2,i2){if(String(e2.id)===String(opts.editId))mIx=i2});
          if(mIx>-1)MONEY.entries[mIx]=entry;else MONEY.entries.push(entry);
        }else{
          entry.id='m'+Date.now();
          MONEY.entries.push(entry);
        }
      }else{
        var mBal=parseInt(String(payload['現在の貯金額（円）']||'').replace(/[^0-9]/g,''),10);
        if(isNaN(mBal))return flash('金額を入力してください');
        MONEY.balance={amount:mBal,asOf:fD(TODAY)};
      }
      saveMoney();buildMoneyItems();
      mask.classList.remove('show');go('money');
      return;
    }
    if(!GH.hasToken()){
      btn.textContent='デモモードです — 右上から接続設定を行ってください';
      setTimeout(function(){mask.classList.remove('show');btn.textContent='登録して GitHub に送信'},1800);
      return;
    }
    // 先に画面へ反映して閉じ、GitHub への送信は裏で行う。
    // 反映まで待たされると操作が重く感じるため。
    var local=localEvent(k,payload);
    // 必需品は「調査中」で即座に一覧へ。AI の記入が届いたら自動で置き換わる
    var essPending=null;
    if(k==='essential'&&!opts.editId){
      var essName=String(payload['製品名']).trim();
      essPending={s:'essentials',t:essName,m:'AI が調査中… 数分で記入されます',
        time:fDT(new Date()),tag:'調査中',cls:'g',nw:0,id:'ess-local-'+Date.now(),
        d:{sub:'AI が調査中',
           kv:[['状態','値段・消耗頻度・購入場所・類似製品を調べています']],
           body:'調査が終わると自動でこの項目に記入されます。'}};
      PENDING_ESS.push(essPending);persistEss();
      D.unshift(essPending);
      go('essentials');
    }
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
      if(essPending){
        // 送信できなかった調査中項目は取り下げる（残すと永久に「調査中」のまま）
        PENDING_ESS=PENDING_ESS.filter(function(p){return p!==essPending});
        for(var j=D.length-1;j>=0;j--)if(D[j]===essPending)D.splice(j,1);
        persistEss();render();
      }
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
    root.querySelectorAll('[data-trip]').forEach(function(el){el.onclick=function(){openTrip(el.getAttribute('data-trip'))}});
    root.querySelectorAll('[data-seg]').forEach(function(el){el.onclick=function(){
      var p=el.getAttribute('data-seg').split(':');seg[p[0]]=p[1];render()}});
    root.querySelectorAll('[data-mail]').forEach(function(el){el.onclick=function(){
      mailRead=el.getAttribute('data-mail')==='1';
      if(mailRead)sessionRead={};
      render()}});
    // メールの一括既読/未読。既読は state.json の read:1 として永続化し、
    // 未読に戻すは read を打ち消してパイプライン由来の未読フラグを復活させる
    root.querySelectorAll('[data-mailall]').forEach(function(el){el.onclick=function(){
      var toRead=el.getAttribute('data-mailall')==='read';
      D.forEach(function(x){
        if(x.s!=='mail'||!match(x))return;   // 検索で絞っている間は表示範囲だけ
        if(toRead){
          if(x.unread||x.nw){x.unread=0;x.nw=0;sessionRead[stateKey(x)]=1;touchState(x,{read:1})}
        }else{
          // 新着ドットも戻し（リロード後と同じ見た目）、リモートにしか無い
          // 既読も打ち消せるよう、全件に read:0 を書く
          x.unread=1;x.nw=1;
          touchState(x,{read:0});
        }
      });
      if(!toRead)sessionRead={};
      setSync(toRead?'すべて既読にしました':'すべて未読に戻しました',true);
      render();
    }});
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
    root.querySelectorAll('[data-wk]').forEach(function(el){el.onclick=function(){
      openWorkout(el.getAttribute('data-wk'))}});
    root.querySelectorAll('[data-nbcat]').forEach(function(el){el.onclick=function(){
      var k=el.getAttribute('data-nbcat');
      // 検索語がそのカテゴリーのブランド語なら、ブランド条件付きで検索する
      var qi=view==='nearby'&&query?Nearby.queryIntent(queryRaw):null;
      Nearby.select(k,nbUpd,qi&&qi.cat===k?qi.filters:null)}});
    root.querySelectorAll('[data-nb]').forEach(function(el){el.onclick=function(){
      var it=NB_LIST[+el.getAttribute('data-nb')];if(it)openNearbySpot(it)}});
    root.querySelectorAll('[data-nbact]').forEach(function(el){el.onclick=function(){
      if(el.getAttribute('data-nbact')==='reloc')Nearby.relocate(nbUpd);
      else Nearby.retry(nbUpd)}});
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
            ['photo','写真で登録'],['essential','必需品を登録'],['money','収支を登録'],['research','調べてほしい内容を登録']];
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
    var mi=D.filter(function(x){return x.s==='mail'&&x.t===e.mail})[0]
         ||D.filter(function(x){return x.s==='mail'&&sameSubj(x.t,e.mail)})[0];
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
  mh+='<button class="mi'+(view==='nearby'?' on':'')+'" data-f="nearby">'+ic('pin')+'近くのスポット</button>';
  mh+='<div class="mg">アプリ</div><button class="mi" id="miMemento">'+ic('memento')+'MEMENTO</button>'+
    '<button class="mi" id="miPhotos">'+ic('photos')+'Google フォト</button>';
  var menuEl=document.getElementById('menu');
  menuEl.innerHTML=mh;
  menuEl.querySelectorAll('.mi[data-f]').forEach(function(el){
    el.onclick=function(){go(el.getAttribute('data-f'))};
  });
  document.getElementById('miPhotos').onclick=function(){closeD();openPhotos()};
  document.getElementById('miMemento').onclick=function(){closeD();location.href='memento/'};
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
var SECKEYS=['mail','schedule','anime','tv','movies','meal','essentials','supra','fashion','news','search'];

function setSync(txt,ok){
  document.getElementById('syncTxt').textContent=txt;
  document.getElementById('pulse').style.background=ok?'var(--ok)':'var(--faint)';
}
function useDemo(){
  D=DEMO.items.slice();EV=DEMO.events.slice();DEMO_MODE=true;
  MONEY=JSON.parse(JSON.stringify(DEMO.money||{entries:[],balance:null}));
  TRAVEL=JSON.parse(JSON.stringify(DEMO.travel||{trips:[]}));
  buildMoneyItems();buildTravelItems();
  TERMS=DEMO.terms||{};buildTermRe();
  if(DEMO.holidays)HOL=DEMO.holidays;
  reconcileNewsStops(true);
  GREETING={text:'デモモードです。右上の接続設定からトークンを登録すると、あなたのデータが表示されます。'};
  setSync('デモ',false);render();
  if(noticeEl)noticeEl.hidden=true;
}
function loadAll(){
  var newsOk=false;
  return Promise.all(SECKEYS.map(function(k){
    return GH.getJSON('.web/'+k+'.json').catch(function(){return null});
  })).then(function(res){
    var items=[],events=[];
    res.forEach(function(j,i){
      if(!j)return;
      var k=SECKEYS[i];
      if(k==='news')newsOk=true;   // 取得失敗と「追跡が消えた」を区別するため
      (j.items||[]).forEach(function(it){it.s=it.s||k;items.push(it)});
      (j.events||[]).forEach(function(ev){events.push(ev)});
    });
    D=items;EV=events;DEMO_MODE=false;
    return Promise.all([
      GH.getJSON('.web/greeting.json').catch(function(){return null}),
      GH.getJSON('.web/state.json').catch(function(){return null}),
      GH.getJSON('.web/terms.json').catch(function(){return null}),
      GH.getJSON('.web/holidays.json').catch(function(){return null}),
      GH.getJSON('.web/money.json').catch(function(){return null}),
      GH.getJSON('.web/travel.json').catch(function(){return null})
    ]);
  }).then(function(res){
    if(res[0]&&res[0].text)GREETING=res[0];
    STATE=mergeRemoteState(res[1]);
    pruneMailState();
    persistLocal();
    reconcileEssentials();
    reconcileNewsStops(newsOk);
    TERMS=res[2]||{};buildTermRe();
    if(res[3])HOL=res[3];
    // money.json が取れない間は端末のバックアップで動く（保存失敗の救済）
    if(res[4]&&res[4].entries)MONEY=res[4];
    else{try{MONEY=JSON.parse(localStorage.getItem('lifehub.money')||'null')||MONEY}catch(e){}}
    buildMoneyItems();
    // travel.json はサイトと AI の両方が書く。取れない間は端末の控えで動く。
    // 前回の編集がサーバーに届いていない（dirty の印が残っている）ときは
    // 端末の控えを正とし、リモートの AI 追記だけ取り込んでから送り直す
    var localTravel=null,travelDirty=false;
    try{localTravel=JSON.parse(localStorage.getItem('lifehub.travel')||'null')}catch(e){}
    try{travelDirty=localStorage.getItem('lifehub.travelDirty')==='1'}catch(e){}
    if(travelDirty&&localTravel&&localTravel.trips){
      TRAVEL=localTravel;
      mergeRemoteTravel(res[5]);
      saveTravel();
    }
    else if(res[5]&&res[5].trips)TRAVEL=res[5];
    else if(localTravel&&localTravel.trips)TRAVEL=localTravel;
    buildTravelItems();
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
    flushNewsStops();   // 未送信の追跡停止があれば再送（60秒間隔）
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
  loadLocalState();               // 未同期の編集を端末キャッシュから復元
  setSync('接続中…',false);
  D=[];EV=[];render();
  updateNotice();
  sync();
  if(Object.keys(PENDING).length)scheduleStateSave(2500);  // 前回未送信分を送る
}else{
  useDemo();
}
loadForecast();
setInterval(sync,3000);
/* ページを離れる/バックグラウンドに回る直前に未保存の編集を送り切る。
 * デバウンス待ちのまま閉じても編集が消えないようにする。 */
document.addEventListener('visibilitychange',function(){
  if(document.visibilityState==='hidden')saveState();
});
/* PC・iPad（キーボード付き）向けの操作。スマホの操作は今までどおり。
 *   Esc … 開いているシート／詳細／メニューを1段閉じる
 *   /   … 検索欄へ移動（入力中は素通し）
 * 入力中の Esc はフォーカスを外すだけにして、書きかけを消さない。 */
document.addEventListener('keydown',function(e){
  var t=e.target||{},tag=(t.tagName||'').toLowerCase();
  var typing=tag==='input'||tag==='select'||tag==='textarea'||t.isContentEditable;
  if(e.key==='Escape'){
    /* 検索欄の Esc はブラウザ自身が中身を消す（input type=search の標準動作）。
     * 黙って消えると一覧の絞り込みだけ残ってしまうので、こちらでも消して
     * 画面を描き直す。 */
    if(t===q){q.value='';q.dispatchEvent(new Event('input'));q.blur();return}
    if(typing){t.blur();return}   // 入力中の書きかけは消さない
    if(mask.classList.contains('show')){mask.classList.remove('show');return}
    if(app.classList.contains('open')){closeD();return}
    if(det.classList.contains('show')){histBack();return}
    if(query){q.value='';q.dispatchEvent(new Event('input'));}
    return;
  }
  if(e.key==='/'&&!typing&&!e.metaKey&&!e.ctrlKey&&!mask.classList.contains('show')){
    e.preventDefault();q.focus();q.select();
  }
});
window.addEventListener('pagehide',function(){saveState()});

/* ---- 新しい版の取り込み --------------------------------------------------
 * ホーム画面に追加したアプリは index.html を強くキャッシュするため、
 * 直したはずの見た目が何時間も古いままになることがある。
 * 配信中の index.html を毎回取り直して、読み込み中の版と違えば読み直す。
 * （起動直後と、アプリに戻ってきたときだけ。入力中・画面を開いている最中は待つ） */
var MYVER = (function () {
  var s = document.querySelector('script[src*="app.js"]');
  var m = /[?&]v=([\w.\-]+)/.exec((s && s.getAttribute('src')) || '');
  return m ? m[1] : '';
})();
var updBusy = false;
function busyNow() {
  var t = document.activeElement || {}, tag = (t.tagName || '').toLowerCase();
  return mask.classList.contains('show') || det.classList.contains('show') ||
    app.classList.contains('open') || tag === 'input' || tag === 'textarea' ||
    tag === 'select' || !!t.isContentEditable || !!query;
}
function checkUpdate() {
  if (!MYVER || updBusy || busyNow()) return;
  updBusy = true;
  fetch(location.pathname + '?_upd=' + Date.now(), { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.text() : ''; })
    .then(function (html) {
      var m = /app\.js\?v=([\w.\-]+)/.exec(html || '');
      if (!m || m[1] === MYVER) { updBusy = false; return; }
      // 取り直した先でまた違う版が返るような場合に往復し続けないよう、1回だけ
      if (sessionStorage.getItem('lh_upd') === m[1]) { updBusy = false; return; }
      try { sessionStorage.setItem('lh_upd', m[1]); } catch (e) {}
      saveState();
      location.replace(location.pathname + '?v=' + m[1]);
    })
    .catch(function () { updBusy = false; });
}
setTimeout(checkUpdate, 1500);
document.addEventListener('visibilitychange', function () {
  if (!document.hidden) setTimeout(checkUpdate, 400);
});
})();
