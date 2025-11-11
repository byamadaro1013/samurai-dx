import React from "react";
import { COMPANY_DATA } from "@/const/leasur";

const Company = () => {
  return (
    <section className="relative flex size-full flex-col items-center gap-10 px-0 py-20">
      <div className="flex w-[64.375rem] flex-col items-start gap-5 md:w-80">
        {/* Title Section */}
        <div className="flex flex-col items-start gap-2 whitespace-pre text-nowrap text-center">
          <p className="font-helvetica text-base font-bold leading-4 text-[#2ba1db]">
            ●Company
          </p>
          <p className="font-gothic text-[24px] leading-6 tracking-[0.96px] text-[#333333]">
            会社概要
          </p>
        </div>

        {/* Company Info */}
        <div className="relative inline-grid w-full place-items-start leading-[0]">
          {COMPANY_DATA.map((item, index) => (
            <React.Fragment key={index}>
              {/* Info Row */}
              <div className="grid w-full grid-cols-[auto_1fr] items-center border-b border-[rgba(0,0,0,0.2)] py-5 text-base leading-[1.2]">
                <p className="font-gothic-r relative w-[146px] text-[rgba(0,0,0,0.5)]">
                  {item.label}
                </p>
                <div>
                  {Array.isArray(item.value) ? (
                    <div className="whitespace-pre text-nowrap font-gothic text-black">
                      {item.value.map((line, i) => (
                        <p key={i} className={i === 0 ? "mb-0" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : item.isLink ? (
                    <p className="w-[273.538px] font-gothic text-black underline decoration-solid">
                      {item.value}
                    </p>
                  ) : (
                    <p className="w-[273.538px] font-gothic text-black">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Company;
