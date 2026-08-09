import React from "react";
import { FLOW_STEPS } from "@/const/google-chat";

const Flow = () => {
  return (
    <section className="flex flex-col items-center gap-9 bg-[#f7faff] px-[120px] py-20 md:px-5">
      <div className="flex w-[860px] flex-col items-center gap-3 md:w-full">
        <p className="text-[12px] font-bold uppercase leading-[1.2] text-[#115b86]">
          導入の流れ
        </p>
        <h2 className="text-center text-[32px] font-medium leading-[1.6] text-black md:text-[24px]">
          現状確認から公開・解約まで、6ステップで導入します。
        </h2>
      </div>

      <div className="grid w-[1200px] grid-cols-3 gap-4 md:w-full md:grid-cols-1">
        {FLOW_STEPS.map((step) => (
          <div
            key={step.number}
            className={`flex min-h-[168px] flex-col gap-2.5 rounded-2xl p-[18px] md:min-h-0 ${
              step.isAccent
                ? "border border-solid border-[#14699a] bg-[#14699a]"
                : "bg-white"
            }`}
          >
            <div
              className={`flex w-9 flex-col items-center font-helvetica font-bold ${
                step.isAccent ? "text-white" : "text-[#115b86]"
              }`}
            >
              <p className="w-full text-[16px] leading-none">step</p>
              <p className="w-full text-[32px] leading-none">{step.number}</p>
            </div>
            <p
              className={`text-[24px] font-bold leading-[1.6] md:text-[20px] ${
                step.isAccent ? "text-white" : "text-[#115b86]"
              }`}
            >
              {step.title}
            </p>
            <p
              className={`text-[16px] font-medium leading-[1.6] ${
                step.isAccent ? "text-white" : "text-black"
              }`}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Flow;
