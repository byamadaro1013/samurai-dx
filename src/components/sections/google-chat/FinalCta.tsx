"use client";

import React from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import {
  CONSULT_BUTTON,
  DOCUMENT_BUTTON,
  VercelAnalyticsConsultButtonClick,
  VercelAnalyticsDocumentButtonClick,
} from "@/const/google-chat";

const FinalCta = () => {
  const handleConsultClick = () => {
    track(VercelAnalyticsConsultButtonClick);
  };

  const handleDocumentClick = () => {
    track(VercelAnalyticsDocumentButtonClick);
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center gap-7 bg-[radial-gradient(ellipse_100%_100%_at_center,#1a3443_0%,#0e2836_50%,#031b29_100%)] px-[120px] py-20 md:px-5"
    >
      <div className="flex w-[1200px] flex-col rounded-[22px] p-8 drop-shadow-[0px_16px_20px_rgba(0,0,0,0.15)] md:w-full md:p-4">
        <div className="flex flex-col gap-3.5">
          <h2 className="text-[32px] font-medium leading-[1.6] text-white md:text-[20px]">
            「Slack・Chatworkが高い」
            <br />
            「Gmailだけでチャットがない」
            <br />
            ——どちらもご相談ください。
          </h2>
          <p className="text-[16px] font-medium leading-[1.6] text-[#b8c7dd] md:text-[14px]">
            現在の利用ツール／人数／毎月のチャット費用／希望時期／確認したい点をお知らせいただければ、
            <br className="md:hidden" />
            初回相談で最適な方針と概算（＆削減できるコスト）をご提示します。
          </p>
          <div className="flex items-center gap-3 md:flex-col md:items-stretch">
            <Link href={CONSULT_BUTTON.href}>
              <button
                onClick={handleConsultClick}
                className="flex h-[50px] w-[399px] items-center justify-center rounded-lg bg-gradient-to-r from-[#c8b68b] to-[#a2853f] px-5 transition-opacity hover:opacity-80 md:w-full"
              >
                <p className="text-[15px] font-bold leading-[1.2] text-white">
                  {CONSULT_BUTTON.text}
                </p>
              </button>
            </Link>
            <Link href={DOCUMENT_BUTTON.href}>
              <button
                onClick={handleDocumentClick}
                className="flex h-[50px] w-[399px] items-center justify-center rounded-lg bg-[linear-gradient(166deg,#114e70_33.6%,#f9ddc6_100%)] px-5 transition-opacity hover:opacity-80 md:w-full"
              >
                <p className="text-[15px] font-bold leading-[1.2] text-[#d9ecff]">
                  {DOCUMENT_BUTTON.text}
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex h-[60px] w-full items-center justify-center border-t border-solid border-white">
        <p className="font-zen-kaku text-[12px] font-bold leading-[1.5] text-white">
          © 2026 ORGAI Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default FinalCta;
