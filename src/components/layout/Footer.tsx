import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative flex h-[31.25rem] w-full flex-col items-center justify-center bg-[#000000]">
      {/* Logo */}
      <div className="relative mb-8 h-[11.063rem] w-[20rem]">
        <Image
          src="/assets/images/logo/logo.svg"
          alt="SamurAI DX Logo"
          fill
          className="object-contain"
        />
      </div>

      {/* Copyright */}
      <p className="whitespace-pre text-center font-['Brown',sans-serif] text-[1rem] font-normal not-italic leading-[1.538] text-white/85">
        Copyright©2025 SamurAI DX All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
