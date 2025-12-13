import About from "@/components/sections/dx/About";
import Company from "@/components/sections/dx/Company";
import Issue from "@/components/sections/dx/Issue";
import Kv from "@/components/sections/dx/Kv";
import Member from "@/components/sections/dx/Member";
import Service from "@/components/sections/dx/Service";
import { SITE_URL } from "@/const";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "株式会社SamurAI DX - 士業界のデジタル変革パートナー",
  description: "弁護士、司法書士、行政書士、税理士等の士業界全体のデジタル変革を支援する専門会社。リーガルテックプロダクト「リーソル」と士業向け受託開発サービスで、文書作成業務の非効率性や業務プロセスのアナログ依存を解決し、業務効率化を実現します。",
  openGraph: {
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function Home() {
  return (
    <main>
      <Kv />
      <About />
      <Issue />
      <Service />
      <Member />
      <Company />
    </main>
  );
}
