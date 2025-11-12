import React from "react";
import { FAQ_DATA } from "@/const/leasur";

const Faq = () => {
  return (
    <section
      id="faq"
      className="relative flex size-full flex-col items-center gap-10 bg-slate-100 px-0 py-20"
    >
      <div className="flex flex-col items-start gap-10 md:w-[348px]">
        {/* Title Section */}
        <div className="flex flex-col items-start gap-4 leading-[0] md:gap-4">
          <div className="relative inline-grid place-items-start whitespace-pre text-nowrap">
            <p className="relative font-helvetica text-base leading-4 text-[#2ba1db]">
              ●FAQ
            </p>
            <p className="relative mt-[18px] font-gothic text-[24px] leading-[1.5] tracking-[0.96px] text-[#333333]">
              よくある質問 (FAQ)
            </p>
          </div>

          {/* FAQ Items */}
          <div className="relative inline-grid place-items-start gap-4">
            {FAQ_DATA.map((faq, index) => (
              <div
                key={index}
                className="flex w-[64.688rem] flex-col gap-[3px] rounded-[2px] border border-solid border-black bg-white px-8 py-4 font-gothic text-[#333333] md:w-[350px] md:gap-2"
              >
                {/* Question */}
                <p className="whitespace-pre text-[20px] leading-[28px] md:w-full md:whitespace-normal">
                  {faq.question}
                </p>

                {/* Answer */}
                <div className="whitespace-pre text-base leading-6 md:w-full md:whitespace-normal">
                  {faq.answer.map((line, i) => (
                    <p
                      key={i}
                      className={i < faq.answer.length - 1 ? "mb-0" : ""}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
