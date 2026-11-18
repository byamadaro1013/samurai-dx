// SEO Rank Watch の共通処理。data/seo/*.json の読み書きと日付計算。
import fs from "node:fs";
import path from "node:path";

export const DATA_DIR = "data/seo";

export function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) args[key] = true;
    else {
      args[key] = next;
      i++;
    }
  }
  return args;
}

export function dataPath(repo, name) {
  return path.join(path.resolve(repo), DATA_DIR, name);
}

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

// 日付はすべて日本時間の YYYY-MM-DD で扱う
export function todayJst(now = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(
    now
  );
}

export function addDays(date, days) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// 全角スペースや大文字小文字の違いで同じクエリを取りこぼさないようにする
export function normalizeQuery(query) {
  return query.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}

export function normalizePath(urlOrPath) {
  const pathname = urlOrPath.startsWith("http")
    ? new URL(urlOrPath).pathname
    : urlOrPath;
  const decoded = decodeURI(pathname);
  return decoded.length > 1 ? decoded.replace(/\/+$/, "") : decoded;
}

export function round1(value) {
  return value == null ? null : Math.round(value * 10) / 10;
}

// rank-history.json は追記専用。既存の行は書き換えず、同じ日・同じ取得元・同じ期間の行は重複させない
export function appendHistory(repo, newEntries) {
  const file = dataPath(repo, "rank-history.json");
  const history = readJson(file);
  const key = (e) =>
    [e.date, e.source, e.periodDays ?? "", e.keyword].join("|");
  const existing = new Set(history.entries.map(key));
  const added = newEntries.filter((e) => !existing.has(key(e)));
  history.entries.push(...added);
  writeJson(file, history);
  return { added: added.length, skipped: newEntries.length - added.length };
}

export function latestBefore(history, keyword, date, filter = () => true) {
  return history.entries
    .filter((e) => e.keyword === keyword && e.date < date && filter(e))
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];
}
