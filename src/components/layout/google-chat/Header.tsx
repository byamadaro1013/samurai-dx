"use client";

import {
  CONSULT_BUTTON,
  DOCUMENT_BUTTON,
  VercelAnalyticsConsultButtonClick,
  VercelAnalyticsDocumentButtonClick,
} from "@/const/google-chat";
import Link from "next/link";
import React from "react";
import { track } from "@vercel/analytics";

const Header = () => {
  const handleConsultClick = () => {
    track(VercelAnalyticsConsultButtonClick);
  };

  const handleDocumentClick = () => {
    track(VercelAnalyticsDocumentButtonClick);
  };

  return (
    <header className="sticky top-0 z-50 flex h-[80px] w-full items-center justify-between border-b border-solid border-[#e6eef8] bg-white px-[120px] md:px-5">
      {/* Brand */}
      <Link href="/google-chat">
        <div className="flex flex-col gap-[2px] font-semibold">
          <p className="text-[11px] leading-[1.2] text-[#5b6b82]">
            法律事務所特化
          </p>
          <p className="text-[17px] leading-[1.2] text-[#061225]">
            Google Chat 導入支援
          </p>
        </div>
      </Link>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4">
        <Link href={CONSULT_BUTTON.href}>
          <button
            onClick={handleConsultClick}
            className="flex h-12 w-[180px] items-center justify-center rounded-lg bg-gradient-to-r from-[#c8b68b] to-[#a2853f] transition-opacity hover:opacity-80 md:w-[130px]"
          >
            <p className="text-center text-[14px] font-semibold leading-[1.2] tracking-[1.2px] text-white">
              {CONSULT_BUTTON.text}
            </p>
          </button>
        </Link>
        <Link href={DOCUMENT_BUTTON.href} className="md:hidden">
          <button
            onClick={handleDocumentClick}
            className="flex h-12 w-[180px] items-center justify-center rounded-lg border border-solid border-[#00235d] bg-[#00235d] transition-opacity hover:opacity-80"
          >
            <p className="text-center text-[14px] font-semibold leading-[1.2] tracking-[1.2px] text-white">
              {DOCUMENT_BUTTON.text}
            </p>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
