import React from "react";
import Image from "next/image";

const Kv = () => {
  return (
    <section
      id="top"
      className="relative flex flex-col items-center bg-background-dark px-0 py-0"
    >
      {/* Desktop KV */}
      <div className="relative w-full md:hidden">
        <Image
          src="/assets/images/leasur/kv.png"
          alt="Leasur - AIで法的文書の作成効率バク上げ！"
          width={1440}
          height={840}
          className="h-auto w-full"
          priority
        />
      </div>

      {/* Mobile KV */}
      <div className="relative hidden w-full md:block">
        <Image
          src="/assets/images/leasur/kv_sp.png"
          alt="Leasur - AIで法的文書の作成効率バク上げ！"
          width={402}
          height={560}
          className="h-auto w-full"
          priority
        />
      </div>
    </section>
  );
};

export default Kv;
