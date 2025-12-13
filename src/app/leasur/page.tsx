import Kv from "@/components/sections/leasur/Kv";
import Issue from "@/components/sections/leasur/Issue";
import About from "@/components/sections/leasur/About";
import Service from "@/components/sections/leasur/Service";
import Leasure from "@/components/sections/leasur/Leasure";
import Faq from "@/components/sections/leasur/Faq";
import LeasureMin from "@/components/sections/leasur/LeasureMin";
import Appendix from "@/components/sections/leasur/Appendix";
import Company from "@/components/sections/leasur/Company";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "リーソル - 法律専門家のための総合文書エディタ | AIで法的文書の作成効率バク上げ",
  description: "法律専門家のための総合文書エディタ「リーソル」。文書の体裁調整、条項参照の確認、表記の統一といったノンコア業務を効率化し、本来注力すべき案件の戦略や法的分析に集中できる環境を実現。Microsoft Wordプラグインなので現行フローを維持したまま業務効率を爆上げする7つの機能を提供します。",
  openGraph: {
    images: ["/assets/images/leasur/og-image.png"],
  },
};

export default function Leasur() {
  return (
    <main>
      <Kv />
      <div className="bg-[url('/assets/images/leasur/issue_bg.png')] bg-cover bg-center bg-no-repeat">
        <Issue />
        <About />
      </div>
      <Service />
      <Leasure />
      <Faq />
      <LeasureMin />
      <Appendix />
      <Company />
    </main>
  );
}
