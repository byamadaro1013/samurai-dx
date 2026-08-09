"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FAQ_DATA } from "@/const/google-chat";

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string[];
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col rounded-2xl drop-shadow-[0px_0px_12.5px_rgba(0,0,0,0.15)]">
      {/* Question */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`border border-solid border-white bg-[radial-gradient(ellipse_100%_200%_at_center,#1a3443_0%,#0e2836_50%,#031b29_100%)] px-8 py-4 text-left md:px-5 ${
          isOpen ? "rounded-t-[10px]" : "rounded-[10px]"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white">
            <p className="font-din text-[32px] font-bold leading-[1.6] tracking-[1.6px]">
              Q.
            </p>
            <p className="font-noto-jp text-[16px] leading-[1.7]">
              {question}
            </p>
          </div>
          {isOpen ? (
            <Image
              src="/assets/images/google-chat/icons/minus_circle.svg"
              alt=""
              width={32}
              height={32}
              className="shrink-0"
            />
          ) : (
            <span className="relative size-8 shrink-0 rounded-full bg-white">
              <span className="absolute left-1/2 top-1/2 h-[2.3px] w-[13.7px] -translate-x-1/2 -translate-y-1/2 bg-[#0e2836]" />
              <span className="absolute left-1/2 top-1/2 h-[13.7px] w-[2.3px] -translate-x-1/2 -translate-y-1/2 bg-[#0e2836]" />
            </span>
          )}
        </div>
      </button>

      {/* Answer */}
      {isOpen && (
        <div className="rounded-b-[10px] border-x border-b border-solid border-black bg-white px-8 py-4 md:px-5">
          <div className="flex items-center gap-4 text-black">
            <p className="font-din text-[32px] font-bold leading-[1.6] tracking-[1.6px]">
              A.
            </p>
            <p className="font-noto-jp flex-1 text-[14px] leading-[1.8] tracking-[0.42px]">
              {answer.map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  return (
    <section
      id="faq"
      className="flex flex-col items-center gap-9 bg-[#f7faff] px-[120px] py-20 md:px-5"
    >
      <div className="flex w-[860px] flex-col items-center gap-3 md:w-full">
        <p className="text-[12px] font-bold uppercase leading-[1.2] text-[#14699a]">
          よくあるご質問
        </p>
        <h2 className="text-center text-[32px] font-medium leading-[1.6] text-[#061225] md:text-[24px]">
          追加料金、移行、守秘義務、LINE連携まで
          <br />
          よくある不安に回答します。
        </h2>
      </div>

      <div className="flex w-[1200px] flex-col gap-6 md:w-full">
        {FAQ_DATA.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

export default Faq;
