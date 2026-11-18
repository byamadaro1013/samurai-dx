import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/bakusoku/Footer";
import { Header } from "@/components/bakusoku/Header";
import { JsonLd } from "@/components/bakusoku/JsonLd";
import { PurchaseButton } from "@/components/bakusoku/PurchaseProvider";
import {
  type Article,
  articlesBasePath,
  formatArticleDate,
  getArticle,
  getArticles,
} from "@/const/bakusoku/articles";
import {
  absoluteUrl,
  companyHref,
  ogImage,
  openGraphBase,
  product,
  publisherJsonLd,
  supervisor,
  supervisorHref,
  supervisorJsonLd,
} from "@/const/bakusoku/site";
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
      ...openGraphBase,
      type: "article",
      url: article.href,
      title: article.title,
      description: article.description || undefined,
      publishedTime: article.date ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description || undefined,
      images: [ogImage.url],
    },
  };
}

// パンくず: 製品トップ → (親の記事があれば親) → この記事
function breadcrumbJsonLd(article: Article) {
  const byHref = new Map(getArticles().map((a) => [a.href, a.title]));
  const items: { name: string; href: string }[] = [
    { name: product.name, href: articlesBasePath },
  ];
  for (let i = 1; i < article.slug.length; i++) {
    const href = `${articlesBasePath}/${article.slug.slice(0, i).join("/")}`;
    const title = byHref.get(href);
    if (title) items.push({ name: title, href });
  }
  items.push({ name: article.title, href: article.href });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

function articleJsonLd(article: Article) {
  const published = article.date ?? article.checkedDate;
  const modified = article.checkedDate ?? article.date;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description || undefined,
    image: [absoluteUrl(ogImage.url)],
    mainEntityOfPage: absoluteUrl(article.href),
    ...(published && { datePublished: published }),
    ...(modified && { dateModified: modified }),
    author: publisherJsonLd,
    publisher: publisherJsonLd,
    ...(article.reviewed && { reviewedBy: supervisorJsonLd() }),
    inLanguage: "ja",
  };
}

function faqJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(article)} />
      <JsonLd data={articleJsonLd(article)} />
      {article.faqs.length > 0 && <JsonLd data={faqJsonLd(article)} />}
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
          <aside className="article-about" aria-label="この記事について">
            <p>
              運営：<Link href={companyHref}>{publisherJsonLd.name}</Link>
              {article.reviewed && (
                <>
                  {" "}
                  / 監修：
                  <Link href={supervisorHref}>
                    {supervisor.name} {supervisor.jobTitle}
                  </Link>
                </>
              )}
            </p>
          </aside>
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
