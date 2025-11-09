import About from "@/components/sections/About";
import Company from "@/components/sections/Company";
import Issue from "@/components/sections/Issue";
import Kv from "@/components/sections/Kv";
import Member from "@/components/sections/Member";
import Service from "@/components/sections/Service";

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
