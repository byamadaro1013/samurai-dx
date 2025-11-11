import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative flex w-full flex-col items-center justify-center bg-[#2BA1DB] pb-40 pt-48 md:pb-20 md:pt-10">
      {/* Logo */}
      <Image
        src="/assets/images/leasur/logo/logo_white.svg"
        alt="Leasur Logo"
        width={348}
        height={100}
        className="mb-3 h-auto w-[348px] md:mb-2 md:w-36"
      />
      <p className="whitespace-pre text-center font-['Brown',sans-serif] text-xs font-normal not-italic leading-[1.538] text-white/85 md:text-[.625rem]">
        Copyright©2025 SamurAI DX All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
