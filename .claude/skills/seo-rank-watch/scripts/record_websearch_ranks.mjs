#!/usr/bin/env node
// WebSearch で確かめた概算順位を data/seo/rank-history.json に追記する。
// GSC が使えないとき、または当日の順位を見たいときだけ使う。GSC の値が正。
//
//   node .claude/skills/seo-rank-watch/scripts/record_websearch_ranks.mjs --repo . --file ranks.json
//
// ranks.json の形:
//   [{ "keyword": "...", "rank": 3, "page": "/bakusokunaiyoushoumei/...", "note": "..." }]
//   圏外や見つからないときは rank: null。page は見つかった自サイトのページ(なければ null)。
import fs from "node:fs";
import {
  appendHistory,
  dataPath,
  normalizePath,
  parseArgs,
  readJson,
  todayJst,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const repo = args.repo ?? process.cwd();
if (!args.file) {
  console.error("--file に順位のJSONを指定してください");
  process.exit(1);
}
const input = JSON.parse(fs.readFileSync(args.file, "utf8"));
const watch = readJson(dataPath(repo, "watchwords.json"));
const targets = new Map(watch.keywords.map((w) => [w.keyword, w.targetPath]));

const today = todayJst();
const entries = input.map((r) => {
  if (!targets.has(r.keyword))
    throw new Error(`watchwords.json にないキーワードです: ${r.keyword}`);
  if (r.rank !== null && !(Number.isFinite(r.rank) && r.rank >= 1))
    throw new Error(`rank は1以上の数値か null にしてください: ${r.keyword}`);
  return {
    date: today,
    source: "websearch",
    keyword: r.keyword,
    targetPath: targets.get(r.keyword),
    page: r.page ? normalizePath(r.page) : null,
    rank: r.rank,
    ...(r.note ? { note: r.note } : {}),
  };
});
const { added, skipped } = appendHistory(repo, entries);
console.log(
  `rank-history.json に ${added} 件追記 (重複スキップ ${skipped} 件)`
);
