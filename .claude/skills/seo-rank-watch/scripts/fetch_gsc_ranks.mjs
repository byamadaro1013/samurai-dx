#!/usr/bin/env node
// Google Search Console から watchwords.json のキーワードの平均順位・表示回数・クリック数を取得する。
//
//   node .claude/skills/seo-rank-watch/scripts/fetch_gsc_ranks.mjs --repo . [--days 28] [--append] [--json]
//
// --days     集計期間(日)。既定 28。改善の効果判定には 7 を使う
// --append   結果を data/seo/rank-history.json に追記する(既存行は書き換えない)
// --discover 未登録の有望クエリを何件表示するか。既定 10
// --json     人向けの表ではなく JSON で出力する
//
// 認証(どちらか):
//   GSC_SERVICE_ACCOUNT_JSON       サービスアカウントキーの JSON 文字列、またはその base64
//   GOOGLE_APPLICATION_CREDENTIALS キーファイルのパス
// プロパティ: GSC_SITE_URL があればそれを、なければ watchwords.json の gscProperty を使う
//   例: "sc-domain:samuraidx.co.jp" や "https://www.samuraidx.co.jp/"
//
// キーの中身やアクセストークンは絶対に出力しない。
import crypto from "node:crypto";
import fs from "node:fs";
import {
  addDays,
  appendHistory,
  dataPath,
  latestBefore,
  normalizePath,
  normalizeQuery,
  parseArgs,
  readJson,
  round1,
  todayJst,
} from "./lib.mjs";

// GSC のデータは2〜3日遅れて確定するので、終了日は今日の3日前にする
const GSC_LAG_DAYS = 3;

function loadServiceAccount() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (raw) {
    const text = raw.trim().startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    return JSON.parse(text);
  }
  const file = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (file && fs.existsSync(file))
    return JSON.parse(fs.readFileSync(file, "utf8"));
  return null;
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsigned)
    .sign(sa.private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  const body = await res.json();
  if (!res.ok)
    throw new Error(
      `アクセストークンを取得できませんでした (${res.status} ${body.error ?? ""})`
    );
  return body.access_token;
}

async function queryGsc(token, property, request) {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(request),
  });
  const body = await res.json();
  if (!res.ok)
    throw new Error(
      `Search Console API エラー (${res.status}): ${body.error?.message ?? "不明"}。サービスアカウントがプロパティ ${property} のユーザーに追加されているか確認してください`
    );
  return body.rows ?? [];
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repo = args.repo ?? process.cwd();
  const days = Number(args.days ?? 28);
  const discoverLimit = Number(args.discover ?? 10);
  if (!Number.isInteger(days) || days < 1)
    throw new Error("--days は1以上の整数にしてください");

  const watch = readJson(dataPath(repo, "watchwords.json"));
  const property = process.env.GSC_SITE_URL ?? watch.gscProperty;
  const sa = loadServiceAccount();
  if (!sa) {
    console.error(
      "GSCの認証情報がありません(GSC_SERVICE_ACCOUNT_JSON または GOOGLE_APPLICATION_CREDENTIALS)。WebSearch で概算順位を確認してください。"
    );
    process.exit(2);
  }

  const today = todayJst();
  const endDate = addDays(today, -GSC_LAG_DAYS);
  const startDate = addDays(endDate, -(days - 1));
  const token = await getAccessToken(sa);
  const rows = await queryGsc(token, property, {
    startDate,
    endDate,
    dimensions: ["query", "page"],
    rowLimit: 25000,
    dimensionFilterGroups: [
      {
        filters: [
          {
            dimension: "page",
            operator: "contains",
            expression: watch.pathPrefix,
          },
        ],
      },
    ],
  });

  const parsed = rows.map((row) => ({
    query: normalizeQuery(row.keys[0]),
    rawQuery: row.keys[0],
    page: normalizePath(row.keys[1]),
    position: row.position,
    impressions: row.impressions,
    clicks: row.clicks,
  }));

  const history = readJson(dataPath(repo, "rank-history.json"));
  const results = watch.keywords.map((w) => {
    const target = normalizePath(w.targetPath);
    const matches = parsed.filter((r) => r.query === normalizeQuery(w.keyword));
    // 対象ページの行を優先し、なければ一番上にいる別ページの行を使う
    const hit =
      matches.find((r) => r.page === target) ??
      [...matches].sort((a, b) => a.position - b.position)[0];
    const prev = latestBefore(
      history,
      w.keyword,
      today,
      (e) => e.source === "gsc" && e.periodDays === days
    );
    const rank = hit ? round1(hit.position) : null;
    return {
      date: today,
      source: "gsc",
      periodDays: days,
      startDate,
      endDate,
      keyword: w.keyword,
      targetPath: w.targetPath,
      page: hit?.page ?? null,
      rank,
      impressions: hit?.impressions ?? 0,
      clicks: hit?.clicks ?? 0,
      previousRank: prev?.rank ?? null,
      previousDate: prev?.date ?? null,
      change:
        rank != null && prev?.rank != null ? round1(prev.rank - rank) : null,
    };
  });

  const registered = new Set(
    watch.keywords.map((w) => normalizeQuery(w.keyword))
  );
  const byQuery = new Map();
  for (const r of parsed) {
    if (registered.has(r.query)) continue;
    const cur = byQuery.get(r.query);
    if (!cur || r.position < cur.rank)
      byQuery.set(r.query, {
        query: r.rawQuery,
        page: r.page,
        rank: round1(r.position),
        impressions: (cur?.impressions ?? 0) + r.impressions,
        clicks: (cur?.clicks ?? 0) + r.clicks,
      });
    else {
      cur.impressions += r.impressions;
      cur.clicks += r.clicks;
    }
  }
  const discovered = [...byQuery.values()]
    .filter((q) => q.rank <= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, discoverLimit);

  let appended = null;
  if (args.append) {
    appended = appendHistory(
      repo,
      // 前回比は表示用なので履歴には保存しない
      results.map(({ previousRank, previousDate, change, ...entry }) => entry)
    );
  }

  if (args.json) {
    console.log(
      JSON.stringify(
        { property, startDate, endDate, results, discovered, appended },
        null,
        2
      )
    );
    return;
  }
  console.log(`GSC ${property}  ${startDate}〜${endDate} (${days}日)`);
  console.table(
    results.map((r) => ({
      keyword: r.keyword,
      rank: r.rank,
      prev: r.previousRank,
      change: r.change,
      impressions: r.impressions,
      clicks: r.clicks,
      page: r.page === r.targetPath ? "(対象)" : r.page,
    }))
  );
  if (discovered.length) {
    console.log("未登録で20位以内のクエリ(表示回数順)");
    console.table(discovered);
  }
  if (appended)
    console.log(
      `rank-history.json に ${appended.added} 件追記 (重複スキップ ${appended.skipped} 件)`
    );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
