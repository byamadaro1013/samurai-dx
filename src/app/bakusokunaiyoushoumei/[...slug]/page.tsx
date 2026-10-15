import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/bakusoku/Footer";
import { Header } from "@/components/bakusoku/Header";
import { PurchaseButton } from "@/components/bakusoku/PurchaseProvider";
import {
  formatArticleDate,
  getArticle,
  getArticles,
} from "@/const/bakusoku/articles";
import "../articles.css";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: `${article.title} | バクソク内容証明`,
    description: article.description || undefined,
    keywords: article.keywords,
    alternates: { canonical: article.href },
    // 下書きはプレビューでしか出ないが、念のため検索に載せない
    ...(article.draft && { robots: { index: false, follow: false } }),
    openGraph: {
      type: "article",
      url: article.href,
      title: article.title,
      description: article.description || undefined,
      publishedTime: article.date ?? undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return (
    <>
      <Header />
      <main id="main" className="article-shell">
        <article className="article-container container">
          <Link className="article-back" href="/bakusokunaiyoushoumei/articles">
            ← 記事一覧
          </Link>
          {article.draft && (
            <p className="article-draft-banner">
              下書き（{article.status || "status未設定"}
              ）：本番には表示されません。公開するときは status
              を「公開」にしてください。
            </p>
          )}
          {article.date && (
            <time className="article-date" dateTime={article.date}>
              {formatArticleDate(article.date)}
            </time>
          )}
          <h1 className="article-title">{article.title}</h1>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
          <aside className="article-cta">
            <p>e内容証明の入力を、バクソクに。</p>
            <PurchaseButton className="button button-red">
              購入する
            </PurchaseButton>
            <Link href="/bakusokunaiyoushoumei">製品ページを見る</Link>
          </aside>
        </article>
      </main>
      <Footer />
    </>
  );
}
