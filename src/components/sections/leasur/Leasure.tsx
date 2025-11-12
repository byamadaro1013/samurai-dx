import React from "react";
import Image from "next/image";

const Leasure = () => {
  return (
    <section className="relative flex size-full flex-col items-center gap-10 bg-[#2ba1db] px-0 py-20 md:px-10">
      <div className="relative flex w-[46.313rem] flex-col items-start gap-10 md:w-full">
        {/* Text Section */}
        <div className="relative flex w-full flex-col items-start gap-4 whitespace-nowrap text-white md:gap-4">
          <p className="relative whitespace-pre text-center font-helvetica text-[10px] font-bold leading-[10px]">
            ●LESOL
          </p>
          <div className="relative whitespace-pre font-gothic text-[24px] leading-[1.5] tracking-[0.96px] md:w-full">
            <p className="mb-0 md:whitespace-break-spaces">
              今すぐ、法的文書作成の「見えないムダ」を解消しませんか？
            </p>
            <p className="mb-0 md:whitespace-break-spaces">
              リーソルが、あなたの業務効率をどれだけ改善できるか、
            </p>
            <p className="md:whitespace-break-spaces">
              ぜひご自身の目でお確かめください。
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="relative flex w-[46.688rem] items-center justify-center gap-2 md:w-full md:flex-col md:gap-2">
          <div className="flex flex-col items-center gap-2">
            <p className="whitespace-pre font-gothic text-[13px] leading-[1.2] text-white">
              \ 今すぐ効果を実感してください /
            </p>
            <button className="relative flex min-w-[20.938rem] items-center justify-between gap-5 border-2 border-solid border-white bg-transparent px-10 py-5 transition-colors hover:bg-white/10 md:w-[335px] md:min-w-0 md:gap-[100px]">
              <p className="relative whitespace-pre font-gothic text-base tracking-[0.48px] text-white">
                デモを申し込む
              </p>
              <div className="flex size-[14px] items-center justify-center">
                <Image
                  src="/assets/images/icons/triangle_left_white.svg"
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
            <button className="relative flex min-w-[20.938rem] items-center justify-between gap-5 border-2 border-solid border-white bg-transparent px-10 py-5 transition-colors hover:bg-white/10 md:w-[335px] md:min-w-0 md:gap-[100px]">
              <p className="relative whitespace-pre font-gothic text-base tracking-[0.48px] text-white">
                資料ダウンロード ＋ 料金のご相談
              </p>
              <div className="flex size-[14px] items-center justify-center">
                <Image
                  src="/assets/images/icons/triangle_left_white.svg"
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
    </section>
  );
};

export default Leasure;
