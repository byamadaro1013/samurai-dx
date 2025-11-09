"use client";

import {
  HEADER_NAV,
  JOIN_US_BUTTON,
  VercelAnalyticsContactButtonClick,
} from "@/const";
import Link from "next/link";
import React from "react";
import { track } from "@vercel/analytics";
import Image from "next/image";

const Header = () => {
  const handleContactClick = () => {
    track(VercelAnalyticsContactButtonClick);
    // TODO: Add contact form modal or navigation
  };

  return (
    <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-[#161616] py-1.5 pl-40 pr-5 md:hidden">
      <Link href="/">
        <Image
          src="/assets/images/logo/logo.svg"
          alt="SamurAI DX Logo"
          width={103}
          height={58}
        />
      </Link>
      <div className="flex items-center gap-14">
        {/* Navigation Links */}
        <ul className="flex items-center justify-center gap-10">
          {HEADER_NAV.map((nav, index) => (
            <li
              key={nav.label}
              className=""
              style={{
                left: `${index === 0 ? 0 : index === 1 ? 98 : index === 2 ? 185 : index === 3 ? 292 : 385}px`,
                width: `${index === 0 ? 58 : index === 1 ? 47 : index === 2 ? 67 : index === 3 ? 53 : 91}px`,
              }}
            >
              <Link href={nav.href}>
                <p className="whitespace-pre text-nowrap text-center font-['Brown',sans-serif] text-[20px] font-normal not-italic leading-[1.2] text-white/50 transition-colors hover:text-white/70">
                  {nav.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {/* JOIN US Button */}
        <button
          onClick={handleContactClick}
          className="flex flex-col items-center justify-center gap-[4px] whitespace-pre text-nowrap border border-solid border-white px-[40px] py-[8px] font-['A-OTF_A1Gothic_StdN',sans-serif] not-italic transition-colors hover:bg-white/10"
        >
          <p className="relative shrink-0 text-[35px] leading-none text-white/85">
            {JOIN_US_BUTTON.mainText}
          </p>
          <p className="relative shrink-0 text-[13px] leading-[13px] text-white/50">
            {JOIN_US_BUTTON.subText}
          </p>
        </button>
      </div>
    </header>
  );
};

export default Header;
