import React from "react";
import { PRICING_PLANS, PRICING_NOTE } from "@/const/google-chat";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="flex flex-col items-center gap-9 bg-[#f7faff] px-[120px] py-20 md:px-5"
    >
      <div className="flex w-[860px] flex-col items-center gap-3 md:w-full">
        <p className="text-[12px] font-bold uppercase leading-[1.2] text-[#14699a]">
          料金プラン
        </p>
        <h2 className="text-center text-[32px] font-medium leading-[1.6] text-[#061225] md:text-[24px]">
          作業範囲に応じて選べる3つのプラン
        </h2>
      </div>

      <div className="flex w-[1200px] items-stretch gap-5 md:w-full md:flex-col">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`flex min-h-[480px] w-[380px] flex-col gap-3.5 rounded-2xl border border-solid p-[26px] md:min-h-0 md:w-full ${
              plan.isRecommended
                ? "border-[#214165] bg-[#0e1a33] drop-shadow-[0px_16px_18px_rgba(8,19,34,0.12)]"
                : "border-[#dce8f6] bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`text-[28px] font-bold leading-[1.2] ${
                  plan.name !== "Light" ? "font-inter" : ""
                } ${plan.isRecommended ? "text-white" : "text-[#061225]"}`}
              >
                {plan.name}
              </p>
              {plan.isRecommended && (
                <div className="flex h-7 items-center justify-center rounded-full bg-[linear-gradient(158deg,#114e70_5.3%,#1c73a4_49.1%,#093249_97.4%)] px-2.5">
                  <p className="text-[11px] font-bold leading-[1.2] text-white">
                    おすすめ
                  </p>
                </div>
              )}
            </div>
            <p
              className={`text-[34px] font-bold leading-[1.2] ${
                plan.name !== "Light" ? "font-inter" : ""
              } ${plan.isRecommended ? "text-white" : "text-[#061225]"}`}
            >
              {plan.price}
            </p>
            <div className="flex flex-col gap-6">
              <p
                className={`text-[16px] font-medium leading-[1.6] ${
                  plan.isRecommended ? "text-white" : "text-[#5b6b82]"
                }`}
              >
                {plan.target}
              </p>
              <div className="w-[107px] border-t border-solid border-[#aeaeae]" />
              <div
                className={`flex flex-col gap-2 text-[14px] font-medium leading-[1.65] ${
                  plan.isRecommended ? "text-white" : "text-[#5b6b82]"
                }`}
              >
                {plan.rows.map((row) => (
                  <p key={row}>{row}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="w-[1200px] text-[16px] font-medium leading-[1.6] text-[#5b6b82] md:w-full">
        {PRICING_NOTE}
      </p>
    </section>
  );
};

export default Pricing;
