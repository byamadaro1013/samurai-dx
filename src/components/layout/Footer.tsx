import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative flex w-full flex-col items-center justify-center bg-[#000000] py-36 md:pb-20 md:pt-10">
      {/* Logo */}
      <Image
        src="/assets/images/logo/logo.svg"
        alt="SamurAI DX Logo"
        width={320}
        height={177}
        className="mb-3 h-auto w-80 md:mb-2 md:w-36"
      />
      <p className="whitespace-pre text-center font-['Brown',sans-serif] text-xs font-normal not-italic leading-[1.538] text-white/85 md:text-[.625rem]">
        Copyright©2025 SamurAI DX All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
