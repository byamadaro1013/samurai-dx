import React from "react";
import Image from "next/image";

const LeasureMin = () => {
  return (
    <section className="relative flex size-full flex-col items-center gap-10 bg-[#2ba1db] px-0 py-20">
      <div className="relative flex w-[46.313rem] flex-col items-start gap-10 md:w-80">
        {/* Text Section */}
        <div className="relative flex w-full flex-col items-center gap-4">
          <div className="relative inline-grid place-items-start whitespace-pre text-nowrap leading-[0] text-white">
            <p className="relative text-center font-helvetica text-base font-bold leading-4 translate-x-[-50%] ml-[373.5px]">
              ●LESOL●
            </p>
            <p className="relative mt-[18px] font-gothic text-[24px] leading-[1.5] tracking-[0.96px]">
              リーソルで、法的文書作成の生産性を飛躍的に向上させましょう。
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="relative flex w-[46.688rem] items-center justify-center gap-2">
            <div className="flex flex-col items-center gap-2">
              <p className="whitespace-pre font-gothic text-[13px] leading-[1.2] text-white">
                \ 今すぐ効果を実感してください /
              </p>
              <button className="relative flex min-w-[20.938rem] items-center justify-between gap-5 rounded-[2px] border-2 border-solid border-[#333333] bg-white px-10 py-5 transition-colors hover:bg-gray-50">
                <p className="relative whitespace-pre font-gothic text-base tracking-[0.48px] text-[#333333]">
                  デモを申し込む
                </p>
                <div className="flex size-[14px] rotate-90 items-center justify-center">
                  <Image
                    src="/assets/images/leasur/arrow-icon.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="object-contain"
                  />
                </div>
              </button>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="whitespace-pre font-gothic text-[13px] leading-[1.2] text-white">
                \ 詳細はこちらから /
              </p>
              <button className="relative flex min-w-[20.938rem] items-center justify-between gap-5 rounded-[2px] border-2 border-solid border-[#333333] bg-white px-10 py-5 transition-colors hover:bg-gray-50">
                <p className="relative whitespace-pre font-gothic text-base tracking-[0.48px] text-[#333333]">
                  資料ダウンロード ＋ 料金のご相談
                </p>
                <div className="flex size-[14px] rotate-90 items-center justify-center">
                  <Image
                    src="/assets/images/leasur/arrow-icon.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="object-contain"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeasureMin;
