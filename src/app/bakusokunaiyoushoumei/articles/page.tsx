import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/bakusoku/Footer";
import { Header } from "@/components/bakusoku/Header";
import { formatArticleDate, getArticles } from "@/const/bakusoku/articles";
import { openGraphBase } from "@/const/bakusoku/site";
import "../articles.css";

export const metadata: Metadata = {
  title: "記事一覧 | バクソク内容証明",
  description:
    "e内容証明の入力や内容証明の業務効率化について、バクソク内容証明がお届けする記事の一覧です。",
  alternates: { canonical: "/bakusokunaiyoushoumei/articles" },
  openGraph: {
    ...openGraphBase,
    type: "website",
    url: "/bakusokunaiyoushoumei/articles",
    title: "記事一覧 | バクソク内容証明",
  },
};

export default function ArticlesPage() {
  const articles = getArticles();
  return (
    <>
      <Header />
      <main id="main" className="article-shell">
        <div className="article-container container">
          <p className="section-eyebrow">ARTICLES</p>
          <h1 className="article-list-title">記事一覧</h1>
          {articles.length === 0 ? (
            <p className="article-empty">記事は準備中です。</p>
          ) : (
            <ul className="article-list">
              {articles.map((article) => (
                <li key={article.href}>
                  <Link href={article.href}>
                    {article.date && (
                      <time dateTime={article.date}>
                        {formatArticleDate(article.date)}
                      </time>
                    )}
                    <h2>
                      {article.draft && (
                        <span className="article-draft-tag">下書き</span>
                      )}
                      {article.title}
                    </h2>
                    {article.description && <p>{article.description}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
