"use client";

import {
  HEADER_NAV,
  APPLY_BUTTON,
  DOWNLOAD_BUTTON,
  VercelAnalyticsApplyButtonClick,
  VercelAnalyticsDownloadButtonClick,
} from "@/const/leasur";
import Link from "next/link";
import React from "react";
import { track } from "@vercel/analytics";
import Image from "next/image";

const Header = () => {
  const handleApplyClick = () => {
    track(VercelAnalyticsApplyButtonClick);
  };

  const handleDownloadClick = () => {
    track(VercelAnalyticsDownloadButtonClick);
  };

  return (
    <header className="fixed left-0 top-0 z-50 flex h-[80px] w-full items-center justify-between bg-white px-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.25)] md:hidden">
      {/* Logo */}
      <Link href="/leasur">
        <h1 className="whitespace-pre font-['kateru_font_ver1.0',sans-serif] text-[40px] font-normal not-italic leading-[28px] tracking-[3.2px] text-[#2ba1db]">
          LESOL
        </h1>
      </Link>

      {/* Navigation and Buttons Container */}
      <div className="flex items-center gap-[60px]">
        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center gap-[50px]">
            {HEADER_NAV.map((nav) => (
              <li key={nav.label}>
                <Link href={nav.href}>
                  <p className="whitespace-pre text-center font-['A_P-OTF_A1Gothic_StdN:M',sans-serif] text-[18px] font-normal not-italic leading-[28px] text-[rgba(0,0,0,0.85)] transition-colors hover:text-[#2ba1db]">
                    {nav.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-[14px]">
          {/* Apply Button */}
          <Link href={APPLY_BUTTON.href}>
            <button
              onClick={handleApplyClick}
              className="flex h-[43px] items-center justify-center gap-[10px] whitespace-pre rounded-[2px] bg-[#2ba1db] px-[16px] py-[8px] transition-colors hover:bg-[#2490c4]"
            >
              <p className="font-['A_P-OTF_A1Gothic_StdN:M',sans-serif] text-[16px] font-normal not-italic leading-[28px] text-white">
                {APPLY_BUTTON.text}
              </p>
              <Image
                src="/assets/images/leasur/arrow-icon.svg"
                alt=""
                width={20}
                height={20}
                className="shrink-0"
              />
            </button>
          </Link>

          {/* Download Button */}
          <Link href={DOWNLOAD_BUTTON.href}>
            <button
              onClick={handleDownloadClick}
              className="flex h-[43px] w-[147.28px] items-center justify-center gap-[10px] whitespace-pre rounded-[2px] bg-[#2ba1db] px-[16px] py-[8px] transition-colors hover:bg-[#2490c4]"
            >
              <p className="font-['A_P-OTF_A1Gothic_StdN:M',sans-serif] text-[16px] font-normal not-italic leading-[28px] text-white">
                {DOWNLOAD_BUTTON.text}
              </p>
              <Image
                src="/assets/images/leasur/download-icon.svg"
                alt=""
                width={15}
                height={19}
                className="shrink-0"
              />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
