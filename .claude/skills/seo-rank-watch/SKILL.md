---
name: seo-rank-watch
description: バクソク内容証明(/bakusokunaiyoushoumei)のGoogle検索順位を測り、1位を狙えるキーワードを1つだけ改善して7日間観察するループを1回分実行する。定期タスクや「SEO Rank Watchを回して」と頼まれたときに使う。
---

# SEO Rank Watch

対象サイトの Google 検索順位を継続的に改善する。
1位を取れそうなキーワードを見つけ、検索ニーズに答える改善を1つ行い、7日間観察する。これを1位になるまで繰り返す。

「測定 → 1位に近いワードを1つ選ぶ → 検索意図を調べる → 改善 → 7日観察 → 実測で判定」

## このリポジトリでの対象

- サイト: https://www.samuraidx.co.jp/bakusokunaiyoushoumei 配下
- LP: `src/app/bakusokunaiyoushoumei/page.tsx`(title / description は同じフォルダの `layout.tsx` と `page.tsx` の metadata)
- 記事: `src/content/bakusoku/articles/*.md`。先頭の `slug` が URL、`title` / `description` がメタ情報。`status: 公開` 以外は本番に出ない下書き
- 共通の設定: `src/const/bakusoku/site.ts`、記事の読み込み: `src/const/bakusoku/articles.ts`

本番に出ていないページ(ファイルがない、または記事の status が「公開」でない)は改善対象にしない。順位の記録だけ続ける。

## データ

すべて `data/seo/` にあり、変更は Git にコミットする。

- `watchwords.json` — キーワード / 対象ページ(`targetPath`)/ 優先度(`high` `medium` `low`)。GSC のプロパティ(`gscProperty`)もここ
- `rank-history.json` — 順位履歴。**追記専用**。過去の行は絶対に書き換えない。スクリプト経由でだけ追記する
- `improvement-log.json` — キーワードごとの改善履歴 / status / 次回レビュー日

status:

- `active` — 改善候補(improvement-log にまだないキーワードも active 扱い)
- `observing` — 改善後7日間の観察中
- `achieved` — 1位達成。監視のみ

improvement-log.json の1キーワード分の形:

```json
{
  "keyword": "...",
  "targetPath": "/bakusokunaiyoushoumei/...",
  "status": "observing",
  "nextReviewDate": "YYYY-MM-DD(改善日+7日)",
  "actions": [
    {
      "date": "YYYY-MM-DD",
      "rankAtAction": 4.2,
      "method": "title-description | intro | faq | content | internal-link | data | new-page",
      "needs": "誰が・何を知りたくて検索しているか",
      "gap": "上位ページと比べて足りなかったもの",
      "done": "実際に行った改善",
      "commit": "コミットの短いハッシュ(あれば)"
    }
  ],
  "reviews": [
    {
      "date": "YYYY-MM-DD",
      "rank7d": 2.8,
      "result": "achieved | improved | no_effect",
      "note": "判定の根拠"
    }
  ]
}
```

日付はすべて日本時間の YYYY-MM-DD。

## Workflow

以下、`<REPO>` はリポジトリのルート(通常 `.`)。

### 1. 順位を測る

原則として Google Search Console(GSC)を使う。

```bash
node .claude/skills/seo-rank-watch/scripts/fetch_gsc_ranks.mjs --repo <REPO> --append
```

GSC の平均順位・impressions・clicks を取得し、前回からの順位変動を確認する。未登録で20位以内のクエリも一緒に表示される。

認証情報は環境変数で受け取る(`GSC_SERVICE_ACCOUNT_JSON` にキーの JSON または base64、もしくは `GOOGLE_APPLICATION_CREDENTIALS` にキーファイルのパス)。`GSC_SITE_URL` があれば `gscProperty` より優先する。スクリプトが終了コード 2 で「認証情報がありません」と言ったら GSC は使えない。fetch がプロキシで失敗するときは `NODE_USE_ENV_PROXY=1` を付けて再実行する。

GSC が使えない場合や当日の順位を確認したい場合のみ WebSearch を使う。WebSearch の順位は概算であり、GSC を正とする。WebSearch の結果は日本の検索結果とずれることがあるので、自サイトが見つからなくても圏外と断定しない。記録はスクリプトで追記する:

```bash
# ranks.json: [{ "keyword": "...", "rank": 3 または null, "page": "/bakusokunaiyoushoumei/..." または null, "note": "..." }]
node .claude/skills/seo-rank-watch/scripts/record_websearch_ranks.mjs --repo <REPO> --file ranks.json
```

ranks.json は一時ファイルなのでリポジトリの外(スクラッチ領域)に置く。

`rank: null` + impressions 0 は未インデックスとは限らない。必要なら WebSearch(`site:` 検索など)で確認する。

### 2. 7日経過した改善をレビューする

improvement-log.json で `status: observing` かつ `nextReviewDate <= 今日` のキーワードを確認する。
改善効果を見るときは28日平均ではなく7日の GSC を使う。

```bash
node .claude/skills/seo-rank-watch/scripts/fetch_gsc_ranks.mjs --repo <REPO> --days 7 --append
```

- 1位 → `achieved`
- 改善したが1位未達 → `active`
- 効果なし → `active`。次回は前回と違う改善方法(`method`)を使う

判定結果を improvement-log.json の `reviews` に記録し、status を更新する。GSC が使えず7日の実測がないときは判定を保留し、observing のまま翌日以降に回す(WebSearch の概算だけで判定しない)。

### 3. 今日改善するキーワードを1つ選ぶ

`observing` と `achieved` は除外する。本番に出ていないページも除外する。
以下の順で1キーワードだけ選ぶ。

1. 2〜10位 + impressions あり — 1位に近いものを優先
2. 11〜20位 + impressions が多い
3. 改善したが1位未達 / 効果なし
4. 高優先度の `rank: null`
5. GSC で見つかった有望な未登録クエリ(選んだら watchwords.json に追加する)

候補がなければ、順位チェックとレポートだけで終了する。改善するために無理やり対象を作らない。

### 4. 検索ニーズを分析する

改善前に必ず、

- 「誰が・何を知りたくて検索しているか」を1〜2文で定義する
- WebSearch で現在の上位1〜3ページを確認する
- 上位ページと対象ページを比較する
- 検索ニーズに対して不足している情報をギャップとして特定する

SEO のために文章量を増やすのではなく、検索ユーザーが欲しい情報を追加する。

### 5. 1つのキーワードを改善する

ギャップに応じて必要なものだけ実装する。例:

- title / description / intro / FAQ 改善
- 不足コンテンツの追加
- 記事、詳細ページへの内部リンク
- 不足している実データの追加

内部リンクは SEO 目的だけでなく、検索ユーザーの「次に知りたい・やりたいこと」へ誘導する。
1回の実行で改善するキーワードは必ず1つだけ。
記事の内容に事実(手順、エラー文言、料金など)を足すときは出典を確認し、確認できないことは書かない。記事末尾の「最終確認日」を更新する。
noindex 変更、ページの新規作成・削除、URL 変更、大きなページ構造変更は勝手に適用せず、提案として報告し承認を得る。

変更後は `npx tsc --noEmit` と `npm run lint` を通す(依存が未インストールなら `npm ci`)。

### 6. 改善を記録して7日待つ

improvement-log.json の該当キーワードに `actions` を1件追加し、`status: observing`、`nextReviewDate: 今日+7日` にする。
observing のキーワードは nextReviewDate まで絶対に再改善しない。

コミット前に必ずチェックする:

```bash
node .claude/skills/seo-rank-watch/scripts/check_data.mjs --repo <REPO>
```

data/seo/\*.json とページの変更をコミットする。コミットメッセージは英語で、何のキーワードのために何を変えたかを書く。

## Report

最後に簡潔に報告する。

- 前回から大きく上昇 / 下降したキーワード
- 今回行った効果判定
- 今日選んだキーワードと選定理由
- 推測した検索ニーズ
- 実際に行った改善
- observing 中のキーワードと nextReviewDate
- 測定に使ったもの(GSC / WebSearch)と、GSC が使えなかった場合はその理由

順位改善を予測で断定しない。何を変更したかを報告し、効果は次回の実測で判断する。

## Guardrails

- Google の検索結果を独自スクリプトでスクレイピングしない。GSC または WebSearch を使う
- 1回につき改善は1キーワードだけ
- observing の7日間クールダウンを厳守
- rank-history.json の過去データを書き換えない
- 認証キーや秘密情報を出力・コミットしない(`.env*` はコミットしない)
- noindex や大きな構造変更は承認なしで適用しない
- 改善効果を断定しない
- 改善対象がなければ何もしない
