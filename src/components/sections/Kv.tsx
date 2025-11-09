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
          src="/assets/images/kv.png"
          alt="SamurAI DX Key Visual"
          width={1920}
          height={1080}
          className="h-auto w-full"
          priority
        />
      </div>

      {/* Mobile KV */}
      <div className="relative hidden w-full md:block">
        <Image
          src="/assets/images/kv_sp.png"
          alt="SamurAI DX Key Visual"
          width={750}
          height={1334}
          className="h-auto w-full"
          priority
        />
      </div>
    </section>
  );
};

export default Kv;
