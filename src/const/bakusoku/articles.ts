import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// 記事は src/content/bakusoku/articles/<slug>.md に置く。
// ファイル名(拡張子なし)がURLになる: /bakusokunaiyoushoumei/articles/<slug>
const articlesDir = path.join(process.cwd(), "src/content/bakusoku/articles");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export type Article = ArticleMeta & { html: string };

type Parsed = { meta: ArticleMeta; draft: boolean; body: string };

function parse(slug: string, source: string): Parsed {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match)
    throw new Error(
      `${slug}.md: 先頭に --- で囲んだ title などの設定が必要です`
    );
  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (pair) fields[pair[1]] = pair[2].replace(/^["']|["']$/g, "").trim();
  }
  if (!fields.title) throw new Error(`${slug}.md: title がありません`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date ?? ""))
    throw new Error(`${slug}.md: date は YYYY-MM-DD 形式で書いてください`);
  return {
    meta: {
      slug,
      title: fields.title,
      description: fields.description ?? "",
      date: fields.date,
    },
    draft: fields.draft === "true",
    body: match[2],
  };
}

function readAll(): Parsed[] {
  if (!fs.existsSync(articlesDir)) return [];
  const showDrafts = process.env.NODE_ENV !== "production";
  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.slice(0, -3);
      if (!slugPattern.test(slug))
        throw new Error(
          `${file}: ファイル名は半角英小文字・数字・ハイフンにしてください`
        );
      return parse(slug, fs.readFileSync(path.join(articlesDir, file), "utf8"));
    })
    .filter((article) => showDrafts || !article.draft)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getArticles(): ArticleMeta[] {
  return readAll().map((article) => article.meta);
}

export function getArticle(slug: string): Article | null {
  const found = readAll().find((article) => article.meta.slug === slug);
  if (!found) return null;
  return { ...found.meta, html: marked.parse(found.body, { async: false }) };
}

export function formatArticleDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}
