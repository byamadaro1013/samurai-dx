#!/usr/bin/env node
// コミット前のチェック。
// - rank-history.json の既存行が書き換えられていないか(HEAD の内容が先頭にそのまま残っているか)
// - improvement-log.json の status と日付が正しい形か
// - observing のキーワードが nextReviewDate 前に再改善されていないか
//
//   node .claude/skills/seo-rank-watch/scripts/check_data.mjs --repo .
import { execFileSync } from "node:child_process";
import path from "node:path";
import { DATA_DIR, dataPath, parseArgs, readJson } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const repo = path.resolve(args.repo ?? process.cwd());
const errors = [];

const history = readJson(dataPath(repo, "rank-history.json"));
let committed = null;
try {
  committed = JSON.parse(
    execFileSync("git", ["show", `HEAD:${DATA_DIR}/rank-history.json`], {
      cwd: repo,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
  );
} catch {
  // まだコミットされていなければ比較しない
}
if (committed) {
  committed.entries.forEach((entry, i) => {
    if (JSON.stringify(entry) !== JSON.stringify(history.entries[i]))
      errors.push(`rank-history.json の ${i} 行目が書き換えられています`);
  });
}

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const statuses = new Set(["active", "observing", "achieved"]);
const log = readJson(dataPath(repo, "improvement-log.json"));
const seen = new Set();
for (const entry of log.entries) {
  const label = entry.keyword ?? "(keyword なし)";
  if (seen.has(entry.keyword))
    errors.push(`improvement-log.json に ${label} が重複しています`);
  seen.add(entry.keyword);
  if (!statuses.has(entry.status))
    errors.push(`${label}: status は active / observing / achieved のどれか`);
  if (
    entry.status === "observing" &&
    !datePattern.test(entry.nextReviewDate ?? "")
  )
    errors.push(
      `${label}: observing には nextReviewDate (YYYY-MM-DD) が必要です`
    );
  const actions = entry.actions ?? [];
  for (const a of actions)
    if (!datePattern.test(a.date ?? ""))
      errors.push(`${label}: actions の date が YYYY-MM-DD ではありません`);
  // 観察期間中(前回の改善から7日未満)に次の改善が入っていないか
  for (let i = 1; i < actions.length; i++) {
    const gap =
      (new Date(actions[i].date) - new Date(actions[i - 1].date)) / 86400000;
    if (gap < 7)
      errors.push(
        `${label}: ${actions[i - 1].date} の改善から7日経たずに ${actions[i].date} に再改善しています`
      );
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("data/seo のチェックOK");
