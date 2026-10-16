import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// 記事は src/content/bakusoku/articles/*.md に置く。一覧はファイル名順。
// URLは先頭の設定にある slug で決まる:
//   slug: /bakusokunaiyoushoumei/error/yohaku → /bakusokunaiyoushoumei/error/yohaku
// status が「公開」以外の記事は下書き扱いで、本番には出さない
// (ローカル開発とVercelのプレビューでは表示する)。
const articlesDir = path.join(process.cwd(), "src/content/bakusoku/articles");
export const articlesBasePath = "/bakusokunaiyoushoumei";
const segmentPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const publishedStatus = "公開";

export type ArticleMeta = {
  slug: string[];
  href: string;
  title: string;
  description: string;
  keywords: string[];
  date: string | null;
  // 本文の「最終確認日:YYYY年M月D日」。構造化データの更新日に使う
  checkedDate: string | null;
  status: string;
  draft: boolean;
};

export type ArticleFaq = { question: string; answer: string };

export type Article = ArticleMeta & {
  html: string;
  // 本文に「監修:」の行があるか。構造化データの reviewedBy に使う
  reviewed: boolean;
  // 「## よくある質問」の **Q. …** と A. … の組。FAQPage の構造化データに使う
  faqs: ArticleFaq[];
};

type Parsed = { meta: ArticleMeta; body: string };

function showDrafts(): boolean {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.VERCEL_ENV === "preview"
  );
}

function parse(file: string, source: string): Parsed {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match)
    throw new Error(
      `${file}: 先頭に --- で囲んだ slug や title の設定が必要です`
    );
  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (pair) fields[pair[1]] = pair[2].replace(/^["']|["']$/g, "").trim();
  }
  if (!fields.title) throw new Error(`${file}: title がありません`);
  const slugPath = (fields.slug ?? "").replace(/\/+$/, "");
  if (!slugPath.startsWith(`${articlesBasePath}/`))
    throw new Error(`${file}: slug は ${articlesBasePath}/ で始めてください`);
  const slug = slugPath.slice(articlesBasePath.length + 1).split("/");
  if (!slug.every((segment) => segmentPattern.test(segment)))
    throw new Error(
      `${file}: slug は半角英小文字・数字・ハイフンにしてください`
    );
  if (fields.date && !/^\d{4}-\d{2}-\d{2}$/.test(fields.date))
    throw new Error(`${file}: date は YYYY-MM-DD 形式で書いてください`);
  const status = fields.status ?? "";
  const keywords = [
    fields.main_keyword,
    ...(fields.sub_keywords ?? "").split("/"),
  ]
    .map((keyword) => keyword?.trim())
    .filter((keyword): keyword is string => Boolean(keyword));
  // 本文先頭の「# タイトル」はページ側で表示するので除く。編集メモのHTMLコメントも出さない。
  const checked = match[2].match(
    /最終確認日[:：]\s*(\d{4})年(\d{1,2})月(\d{1,2})日/
  );
  const checkedDate = checked
    ? `${checked[1]}-${checked[2].padStart(2, "0")}-${checked[3].padStart(2, "0")}`
    : null;
  const body = match[2]
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^\s*#\s+[^\n]*\n/, "");
  return {
    meta: {
      slug,
      href: `${articlesBasePath}/${slug.join("/")}`,
      title: fields.title,
      description: fields.description ?? "",
      keywords,
      date: fields.date || null,
      checkedDate,
      status,
      draft: status !== publishedStatus,
    },
    body,
  };
}

function readAll(): Parsed[] {
  if (!fs.existsSync(articlesDir)) return [];
  const articles = fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) =>
      parse(file, fs.readFileSync(path.join(articlesDir, file), "utf8"))
    );
  const seen = new Set<string>();
  for (const { meta } of articles) {
    if (seen.has(meta.href))
      throw new Error(`slug が重複しています: ${meta.href}`);
    seen.add(meta.href);
  }
  return showDrafts() ? articles : articles.filter(({ meta }) => !meta.draft);
}

export function getArticles(): ArticleMeta[] {
  return readAll().map((article) => article.meta);
}

export function getArticle(slug: string[]): Article | null {
  const href = `${articlesBasePath}/${slug.join("/")}`;
  const found = readAll().find((article) => article.meta.href === href);
  if (!found) return null;
  return {
    ...found.meta,
    html: marked.parse(found.body, { async: false }),
    reviewed: /^監修[:：]/m.test(found.body),
    faqs: extractFaqs(found.body),
  };
}

// 構造化データ用の素の文。リンクは文字だけ残し、強調と【推測】などの編集用の注記は外す
function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/【[^】]*】/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractFaqs(body: string): ArticleFaq[] {
  const section = body.match(
    /^##\s+よくある質問\s*$([\s\S]*?)(?=^##\s|(?![\s\S]))/m
  );
  if (!section) return [];
  const faqs: ArticleFaq[] = [];
  const pattern =
    /^\*\*Q\.\s*(.+?)\*\*\s*\r?\nA\.\s*([\s\S]*?)(?=\r?\n\s*\r?\n|(?![\s\S]))/gm;
  for (const [, question, answer] of section[1].matchAll(pattern)) {
    faqs.push({ question: plainText(question), answer: plainText(answer) });
  }
  return faqs;
}

export function formatArticleDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}
