import Kv from "@/components/sections/google-chat/Kv";
import Intro from "@/components/sections/google-chat/Intro";
import Problems from "@/components/sections/google-chat/Problems";
import SolutionIntro from "@/components/sections/google-chat/SolutionIntro";
import Overview from "@/components/sections/google-chat/Overview";
import Pattern from "@/components/sections/google-chat/Pattern";
import Banner from "@/components/sections/google-chat/Banner";
import Deliverables from "@/components/sections/google-chat/Deliverables";
import Flow from "@/components/sections/google-chat/Flow";
import Why from "@/components/sections/google-chat/Why";
import Pricing from "@/components/sections/google-chat/Pricing";
import Urgency from "@/components/sections/google-chat/Urgency";
import Faq from "@/components/sections/google-chat/Faq";
import FinalCta from "@/components/sections/google-chat/FinalCta";

export default function GoogleChat() {
  return (
    <main className="pt-[80px]">
      <Kv />
      <Intro />
      <Problems />
      <SolutionIntro />
      <Overview />
      <Pattern />
      <Banner />
      <Deliverables />
      <Flow />
      <Why />
      <Pricing />
      <Urgency />
      <Faq />
      <FinalCta />
    </main>
  );
}
