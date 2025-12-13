import React from "react";
import Image from "next/image";
import { COMPANY_DATA } from "@/const/leasur";

const Company = () => {
  return (
    <section
      id="company"
      className="relative flex flex-col items-center gap-10 bg-background-dark px-0 py-20"
    >
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
          <div className="flex w-[15rem] items-center justify-center md:w-full md:justify-start">
            <Image
              src="/assets/images/logo/logo.svg"
              alt="SamurAI DX Logo"
              width={240}
              height={133}
            />
          </div>

          <div className="flex flex-1 flex-col">
            {COMPANY_DATA.map((item, index) => (
              <div
                key={index}
                className={`flex py-5 md:py-5 ${
                  index !== COMPANY_DATA.length - 1
                    ? "border-b border-[rgba(255,255,255,0.2)]"
                    : ""
                }`}
              >
                <div className="w-[9.125rem] font-gothic text-[1rem] font-medium leading-[1.2] text-text-gray opacity-50 md:w-32 md:text-base">
                  {item.label}
                </div>
                <div className="flex-1 font-gothic text-[1rem] font-medium leading-[1.6] text-text-white md:text-base">
                  {Array.isArray(item.value) ? (
                    <>
                      {item.value[0]}
                      <br />
                      {item.value[1]}
                    </>
                  ) : (
                    item.value
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;
