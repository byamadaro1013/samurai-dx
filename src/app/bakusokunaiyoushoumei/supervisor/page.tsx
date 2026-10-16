import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/bakusoku/Footer";
import { Header } from "@/components/bakusoku/Header";
import { JsonLd } from "@/components/bakusoku/JsonLd";
import { articlesBasePath } from "@/const/bakusoku/articles";
import {
  companyHref,
  openGraphBase,
  publisherName,
  supervisor,
  supervisorHref,
  supervisorJsonLd,
} from "@/const/bakusoku/site";
import "../articles.css";

const title = `監修者 ${supervisor.name}（${supervisor.jobTitle}） | バクソク内容証明`;
const description = `バクソク内容証明の記事を監修している${supervisor.name}${supervisor.jobTitle}（${supervisor.barAssociation}）のプロフィールです。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: supervisorHref },
  openGraph: {
    ...openGraphBase,
    type: "profile",
    url: supervisorHref,
    title,
    description,
  },
};

export default function SupervisorPage() {
  const rows: [string, string | null][] = [
    ["氏名", supervisor.name],
    ["資格", supervisor.jobTitle],
    ["所属弁護士会", supervisor.barAssociation],
    ["弁護士登録", supervisor.registeredOn],
    ["登録番号", supervisor.registrationNumber],
    ["所属事務所", supervisor.lawFirm],
    ["学歴", supervisor.alumniOf],
  ];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: supervisorJsonLd(),
        }}
      />
      <Header />
      <main id="main" className="article-shell">
        <article className="article-container container">
          <p className="section-eyebrow">SUPERVISOR</p>
          <h1 className="article-title">
            監修者 {supervisor.name}（{supervisor.jobTitle}）
          </h1>
          <div className="article-body">
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
            <h2>経歴</h2>
            <p>{supervisor.bio}</p>
            <h2>監修している内容</h2>
            <p>
              <Link href={articlesBasePath}>バクソク内容証明</Link>
              のサイトに掲載しているe内容証明の解説記事について、法律に関わる記述を確認しています。e内容証明の画面や操作手順は、日本郵便の公開資料と運営会社の確認に基づいています。各記事の最終確認日は、記事の冒頭に記載しています。
            </p>
            <h2>運営会社との関係</h2>
            <p>
              {supervisor.name}は、バクソク内容証明を提供する
              <Link href={companyHref}>{publisherName}</Link>
              の共同創業者・代表者です。
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
