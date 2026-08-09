import React from "react";
import { PATTERNS } from "@/const/google-chat";

const Pattern = () => {
  return (
    <section className="flex flex-col items-center gap-9 bg-[#f7faff] px-[120px] py-20 md:px-5">
      <div className="flex w-[860px] flex-col items-center gap-3 md:w-full">
        <p className="text-[12px] font-bold uppercase leading-[1.2] text-[#14699a]">
          解決策パターン
        </p>
        <h2 className="text-center text-[32px] font-medium leading-[1.6] text-[#061225] md:text-[24px]">
          現状に応じて、
          <br />
          乗り換え型と新規有効化型の2パターンで支援します。
        </h2>
      </div>

      <div className="flex w-[1200px] items-start gap-5 md:w-full md:flex-col">
        {PATTERNS.map((pattern) => (
          <div
            key={pattern.title}
            className="flex w-[590px] flex-col gap-4 rounded-2xl border border-solid border-[#dce8f6] bg-white p-[26px] drop-shadow-[0px_12px_14px_rgba(10,37,64,0.07)] md:w-full"
          >
            <p className="text-[24px] font-bold leading-none text-[#061225] md:text-[19px]">
              {pattern.title}
            </p>
            <p className="text-[16px] font-medium leading-[1.6] text-[#5b6b82]">
              {pattern.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pattern;
