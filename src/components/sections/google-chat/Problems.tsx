import React from "react";
import Image from "next/image";
import { PROBLEMS } from "@/const/google-chat";

const Problems = () => {
  return (
    <section className="flex flex-col items-center gap-10 bg-white px-[120px] py-20 md:px-5">
      <div className="flex w-[900px] flex-col items-center gap-3 md:w-full">
        <p className="font-zen-kaku text-[14px] font-medium leading-[1.5] text-[#14699a]">
          こんなお悩み、ありませんか？
        </p>
        <h2 className="text-center text-[32px] font-medium leading-[1.4] text-[#061225] md:text-[24px]">
          チャットの固定費、連絡手段、属人化。
          <br />
          法律事務所で起こりやすい3つの課題
        </h2>
      </div>

      <div className="flex w-[1200px] items-start gap-5 md:w-full md:flex-col">
        {PROBLEMS.map((problem) => (
          <div
            key={problem.title}
            className="flex min-h-[216px] w-[386px] flex-col gap-3.5 rounded-2xl bg-[#e4e4e4] p-6 drop-shadow-[0px_10px_12px_rgba(10,37,64,0.05)] md:min-h-0 md:w-full"
          >
            <p className="text-[18px] font-medium leading-[1.6] text-[#363636]">
              {problem.title}
            </p>
            <p className="text-[15px] font-medium leading-[1.6] text-[#363636]">
              {problem.description}
            </p>
          </div>
        ))}
      </div>

      <Image
        src="/assets/images/google-chat/man.png"
        alt="パソコンの前で悩む男性のイラスト"
        width={290}
        height={213}
        className="h-auto"
      />
    </section>
  );
};

export default Problems;
