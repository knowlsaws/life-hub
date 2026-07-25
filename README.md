# life-hub

全パイプライン（メール / 予定 / アニメ / ドラマ / 映画 / 食事 / ニュース / 検索）を
1 つにまとめた GitHub Pages のサイト本体。

**このリポジトリはコードしか持たない。** 表示されるデータはすべて private リポジトリ
[life-content](https://github.com/knowlsaws/life-content) にあり、閲覧者のブラウザが
所有者の PAT で直接取得する。public だが、トークンなしでは 1 件も中身が見えない。

## なぜ public なのか

GitHub Free では private リポジトリから Pages を公開できない（private Pages は Pro 以上）。
そこで **コード = public / データ = private** に分けた。公開されるのは HTML・CSS・JS だけ。

## 構成

```
index.html
assets/
├── app.css        画面スタイル（ダーク・モノトーン）
├── github.js      GitHub API クライアント（PAT・取得・書き込み・manifest 監視）
├── places.js      住所検索（OpenStreetMap Nominatim）
├── nearby.js      近くのスポット検索（現在地 + Overpass API）
├── demo-data.js   PAT 未設定時のサンプル。実データは含めない
└── app.js         画面本体（ルーティング・履歴・各セクションの描画）
memento/
├── index.html     MEMENTO — 有限性の認識装置（人生の暦・残数・一行日記）
├── memento.css
├── memento.js
└── EVOLUTION.md   進化の憲法。目的・原則・変更の作法・変更履歴
```

## 使い方

1. Pages を有効化する（Settings → Pages → Source: `main` / root）
2. サイトを開き、右上の接続バッジから **接続設定** を開く
3. データリポジトリに `knowlsaws/life-content`、fine-grained PAT を入力して保存

PAT は **life-content のみ・Contents: Read and write** に絞ること。
トークンはその端末の localStorage にだけ保存され、外部には送信されない。
未設定のあいだはサンプルデータのデモモードで動く。

## 同期

`.web/manifest.json` の blob sha だけを 3 秒間隔で監視し、変化したときだけ
各セクションの JSON を取り直す。1 ファイルなら約 1,200 req/h で、
認証済みの上限 5,000 req/h に収まる。

画面からの登録は `.web/inbox/` へのコミットになり、life-content 側の
push トリガーの Actions がそれを処理する。

## MEMENTO

`/memento/` は独立した一枚のページ。人生を週の格子で見せる暦、
大切な人と会える残り回数の推定、一行日記と「あの年の今日」を表示する。

- 認証はハブと同じ（`assets/github.js` を同一オリジンで再利用）。追加設定は不要
- データは localStorage `memento.data` が正で、PAT があれば life-content の
  `.web/memento.json` へも同期する
- `.github/workflows/memento-evolution.yml` が四半期ごとに「進化レビュー」Issue を
  起票する。Issue に答えて Claude に渡すと、`memento/EVOLUTION.md` の憲法に従って
  app 自身が改修される。詳細は同ファイルを参照

## 近くのスポット

メニューの「近くのスポット」は、現在地の周辺からレストラン・カフェ・コンビニ・
ガソリンスタンド・トイレ・道の駅（SA/PA 含む）・スーパー・ドラッグストア・駐車場・
ATM/銀行・病院・温泉/銭湯をカテゴリーのワンタップで検索し、近い順に表示する。

- 行をタップすると詳細（住所・営業時間・電話・ジャンルなど）、右のピンで
  Google マップが直接開く。詳細画面には検索と経路案内のボタンがある
- 0件に近いときは半径を自動で3倍（上限 50km）に広げて一度だけ再検索する
- 結果は同一地点(約100m格子)×カテゴリーで10分間キャッシュする
- 位置情報は端末内でのみ使用し、検索座標が Overpass API に送られる以外は
  どこにも保存・送信されない

## 外部依存

いずれも APIキー不要・無料で、ブラウザから直接呼ぶ（バックエンド不要）。

- 住所検索: [Nominatim](https://nominatim.openstreetmap.org)。利用規約に従い
  700ms デバウンスし、結果をキャッシュ。通信できない環境では内蔵候補にフォールバック
- 近くのスポット: Overpass API（OpenStreetMap）。ミラー4系統
  （kumi.systems / private.coffee / openstreetmap.jp / overpass-api.de）へ順に
  フォールバック。本家 overpass-api.de はボット対策の 406 を返すことがあるため最後
- 天気: [Open-Meteo](https://open-meteo.com)。現在地から16日先までの予報を予定に表示
