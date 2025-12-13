"use client";

import {
  HEADER_NAV,
  JOIN_US_BUTTON,
  VercelAnalyticsContactButtonClick,
} from "@/const/dx";
import Link from "next/link";
import React, { useState } from "react";
import { track } from "@vercel/analytics";
import Image from "next/image";
import MobileNav from "./MobileNav";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleContactClick = () => {
    track(VercelAnalyticsContactButtonClick);
    // TODO: Add contact form modal or navigation
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-background-dark py-1.5 pl-40 pr-5 md:hidden">
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
            {HEADER_NAV.map((nav) => (
              <li key={nav.label} className="">
                <Link href={nav.href}>
                  <p className="whitespace-pre text-nowrap text-center font-['Brown',sans-serif] text-[20px] font-normal not-italic leading-[1.2] text-white/50 transition-colors hover:text-white/70">
                    {nav.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {/* External Links */}
          <div className="flex items-center gap-4">
            {/* 激安AI顧問 Button */}
            <Link
              href="/leasur"
              className="flex items-center justify-center rounded-sm bg-white px-4 py-2"
            >
              <Image
                src="/assets/images/leasur/logo/logo_main.svg"
                alt="激安AI顧問"
                width={136}
                height={32}
                className="h-auto w-28"
              />
            </Link>

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
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed left-0 top-0 z-50 hidden w-full items-center justify-between bg-background-dark px-6 py-2 md:flex">
        <Link href="/">
          <Image
            src="/assets/images/logo/logo.svg"
            alt="SamurAI DX Logo"
            width={103}
            height={58}
            className="h-auto w-[103px]"
          />
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="flex size-11 items-center justify-center transition-opacity hover:opacity-70"
          aria-label="メニューを開く"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
};

export default Header;
