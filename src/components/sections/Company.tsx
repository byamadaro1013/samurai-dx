import React from "react";
import Image from "next/image";

const Company = () => {
  return (
    <section className="relative flex flex-col items-center gap-10 bg-background-dark px-0 py-20">
      <div className="relative z-10 flex w-[63.75rem] flex-col gap-10 md:w-80">
        <div className="flex flex-col gap-2 leading-[1.2]">
          <p className="whitespace-pre font-helvetica text-heading-sm text-text-white">
            ●Company
          </p>
          <h2 className="whitespace-pre font-gothic text-heading-xl text-text-white md:text-[30px]">
            会社概要
          </h2>
        </div>

        <div className="flex gap-10 md:flex-col md:gap-10">
          <div className="flex w-[15rem] items-center justify-center md:w-full">
            <div className="relative h-[8.313rem] w-[15rem]">
              <Image
                src="/assets/images/logo/logo.svg"
                alt="SamurAI DX Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex border-b border-[rgba(255,255,255,0.2)] py-5 md:py-5">
              <div className="w-[9.125rem] font-gothic text-[1rem] font-medium leading-[1.2] text-text-gray opacity-50 md:w-auto md:text-base">
                社名
              </div>
              <div className="flex-1 font-gothic text-[1rem] font-medium leading-[1.2] text-text-white md:text-base">
                株式会社 SamurAI DX
              </div>
            </div>

            <div className="flex border-b border-[rgba(255,255,255,0.2)] py-5 md:py-5">
              <div className="w-[9.125rem] font-gothic text-[1rem] font-medium leading-[1.2] text-text-gray opacity-50 md:w-auto md:text-base">
                住所
              </div>
              <div className="flex-1 font-gothic text-[1rem] font-medium leading-[1.6] text-text-white md:text-base">
                〒112-3456
                <br />
                まるまる県まるまる市まるまる区まるまる
              </div>
            </div>

            <div className="flex border-b border-[rgba(255,255,255,0.2)] py-5 md:py-5">
              <div className="w-[9.125rem] font-gothic text-[1rem] font-medium leading-[1.2] text-text-gray opacity-50 md:w-auto md:text-base">
                設立日
              </div>
              <div className="flex-1 font-gothic text-[1rem] font-medium leading-[1.2] text-text-white md:text-base">
                2025年10月
              </div>
            </div>

            <div className="flex border-b border-[rgba(255,255,255,0.2)] py-5 md:py-5">
              <div className="w-[9.125rem] font-gothic text-[1rem] font-medium leading-[1.2] text-text-gray opacity-50 md:w-auto md:text-base">
                資本金
              </div>
              <div className="flex-1 font-gothic text-[1rem] font-medium leading-[1.2] text-text-white md:text-base">
                株式会社 SamurAI DX
              </div>
            </div>

            <div className="flex py-5 md:py-5">
              <div className="w-[9.125rem] font-gothic text-[1rem] font-medium leading-[1.2] text-text-gray opacity-50 md:w-auto md:text-base">
                代表者名
              </div>
              <div className="flex-1 font-gothic text-[1rem] font-medium leading-[1.2] text-text-white md:text-base">
                橋本祐弥
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;
