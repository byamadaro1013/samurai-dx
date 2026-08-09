import React from "react";
import Image from "next/image";
import { RISKS } from "@/const/google-chat";

const Urgency = () => {
  return (
    <section className="flex flex-col items-center gap-8 bg-white px-[120px] py-20 md:px-5">
      <div className="flex w-[860px] flex-col items-center gap-3 md:w-full">
        <h2 className="text-center text-[32px] font-medium leading-[1.6] text-[#061225] md:text-[24px]">
          なぜ、今やるべきなのか？
        </h2>
        <p className="text-center text-[14px] font-bold leading-[1.2] text-[#14699a]">
          払わなくていいチャット料金を、毎月払い続けていませんか？
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-[24px] font-medium leading-[1.6] text-[#061225] md:text-[20px]">
          このまま放置すると…
        </p>
        <div className="flex w-[870px] flex-col gap-2.5 rounded-2xl border border-solid border-[#dce8f6] bg-[#f9fbff] p-5 md:w-full">
          {RISKS.map((risk) => (
            <div key={risk} className="flex items-center gap-2.5 md:items-start">
              <Image
                src="/assets/images/google-chat/icons/triangle_alert.svg"
                alt=""
                width={18}
                height={18}
                className="shrink-0 md:mt-1"
              />
              <p className="flex-1 text-[16px] font-medium leading-[1.6] text-[#061225]">
                {risk}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Urgency;
