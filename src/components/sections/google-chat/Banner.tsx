import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <section>
      <Image
        src="/assets/images/google-chat/banner.png"
        alt="打ち合わせをする弁護士のイメージ"
        width={1440}
        height={435}
        className="h-auto w-full"
      />
    </section>
  );
};

export default Banner;
