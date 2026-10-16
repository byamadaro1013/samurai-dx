import type { Metadata } from "next";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Footer } from "@/components/bakusoku/Footer";
import { Header } from "@/components/bakusoku/Header";
import {
  company,
  companyHref,
  openGraphBase,
  organizationSameAs,
  product,
  supervisorHref,
} from "@/const/bakusoku/site";
import "../articles.css";

const title = "運営会社 | バクソク内容証明";
const description = `バクソク内容証明を提供する${company.name}の会社概要です。所在地、代表者、連絡先、提供しているサービスを掲載しています。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: companyHref },
  openGraph: {
    ...openGraphBase,
    type: "website",
    url: companyHref,
    title,
    description,
  },
};

export default function CompanyPage() {
  const rows: [string, ReactNode][] = [
    ["会社名", company.name],
    ["所在地", company.address],
    ["設立", company.founded],
    ["代表者", company.representative],
    [
      "連絡先",
      <a key="email" href={`mailto:${company.email}`}>
        {company.email}
      </a>,
    ],
    [
      "提供サービス",
      <Fragment key="service">
        <Link href="/bakusokunaiyoushoumei">{product.name}</Link>
        （e内容証明の入力支援アプリ）
      </Fragment>,
    ],
    [
      "公式サイト・SNS",
      <Fragment key="links">
        <a href="https://www.samuraidx.co.jp/">www.samuraidx.co.jp</a>
        {organizationSameAs.map((url) => (
          <span key={url}>
            {" / "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url.replace(/^https:\/\//, "")}
            </a>
          </span>
        ))}
      </Fragment>,
    ],
  ];
  return (
    <>
      <Header />
      <main id="main" className="article-shell">
        <article className="article-container container">
          <p className="section-eyebrow">COMPANY</p>
          <h1 className="article-title">運営会社</h1>
          <div className="article-body">
            <p>
              {product.name}は、{company.name}
              が開発・販売しています。記事の内容は、弁護士の監修を受けて公開しています（
              <Link href={supervisorHref}>監修者について</Link>）。
            </p>
            <table>
              <tbody>
                {rows
                  .filter(([, value]) => Boolean(value))
                  .map(([label, value]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p>
              {product.name}
              は日本郵便株式会社およびe内容証明サービスとの提携・協力関係はありません。
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
