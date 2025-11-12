import Kv from "@/components/sections/leasur/Kv";
import Issue from "@/components/sections/leasur/Issue";
import About from "@/components/sections/leasur/About";
import Service from "@/components/sections/leasur/Service";
import Leasure from "@/components/sections/leasur/Leasure";
import Faq from "@/components/sections/leasur/Faq";
import LeasureMin from "@/components/sections/leasur/LeasureMin";
import Appendix from "@/components/sections/leasur/Appendix";
import Company from "@/components/sections/leasur/Company";

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
