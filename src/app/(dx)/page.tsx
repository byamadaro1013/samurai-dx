import About from "@/components/sections/dx/About";
import Company from "@/components/sections/dx/Company";
import Issue from "@/components/sections/dx/Issue";
import Kv from "@/components/sections/dx/Kv";
import Member from "@/components/sections/dx/Member";
import Service from "@/components/sections/dx/Service";

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
