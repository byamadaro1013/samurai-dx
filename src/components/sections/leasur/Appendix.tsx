import React from "react";

const Appendix = () => {
  return (
    <section className="relative flex size-full flex-col items-center gap-10 px-0 py-20">
      <div className="flex w-[64.375rem] flex-col items-start gap-10 md:w-80">
        {/* Text Section */}
        <div className="flex flex-col items-start gap-2">
          <p className="whitespace-pre text-center font-helvetica text-base font-bold leading-4 text-[#2ba1db]">
            ●Appendix
          </p>
          <p className="whitespace-pre font-gothic text-[24px] leading-[1.5] tracking-[0.96px] text-[#333333]">
            利用料金
          </p>
          <div className="relative inline-grid place-items-start whitespace-nowrap font-gothic leading-[0] text-[#333333]">
            <p className="relative whitespace-pre text-[20px] leading-[28px]">
              月額：5,000円/1ユーザー
            </p>
            <div className="relative mt-[31px] whitespace-pre text-base leading-6">
              <p className="mb-0">
                ご希望に応じて貴社専用にカスタマイズ開発を行うことも可能です。
              </p>
              <p>100万円/1機能が目安となります。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appendix;
