import Kv from "@/components/sections/leasur/Kv";
import Issue from "@/components/sections/leasur/Issue";
import About from "@/components/sections/leasur/About";

export default function Leasur() {
  return (
    <main>
      <Kv />
      <div className="bg-white bg-[url('/assets/images/leasur/issue_bg.png')] bg-cover bg-center bg-no-repeat">
        <Issue />
        <About />
      </div>
    </main>
  );
}
