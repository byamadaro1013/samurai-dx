import Kv from "@/components/sections/leasur/Kv";
import Issue from "@/components/sections/leasur/Issue";
import About from "@/components/sections/leasur/About";
import Service from "@/components/sections/leasur/Service";

export default function Leasur() {
  return (
    <main>
      <Kv />
      <div className="bg-[url('/assets/images/leasur/issue_bg.png')] bg-cover bg-center bg-no-repeat">
        <Issue />
        <About />
      </div>
      <Service />
    </main>
  );
}
