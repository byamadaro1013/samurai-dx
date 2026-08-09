import React from "react";
import Image from "next/image";
import { DELIVERABLES } from "@/const/google-chat";

const Deliverables = () => {
  return (
    <section className="flex flex-col items-center gap-9 bg-white px-[120px] py-20 md:px-5">
      <h2 className="w-[860px] text-center text-[32px] font-medium leading-[1.6] text-[#061225] md:w-full md:text-[24px]">
        導入・設計・移行・定着支援まで、
        <br />
        必要な作業をまとめて提供します。
      </h2>

      <div className="grid w-[1200px] grid-cols-2 gap-5 md:w-full md:grid-cols-1">
        {DELIVERABLES.map((deliverable) => (
          <div
            key={deliverable.title}
            className="flex min-h-[130px] flex-col gap-3.5 rounded-2xl border border-solid border-[#dce8f6] bg-white p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-[42px] shrink-0 items-center justify-center rounded-lg bg-[#0e4c71]">
                <Image src={deliverable.icon} alt="" width={18} height={18} />
              </div>
              <p className="flex-1 text-[24px] font-bold leading-[1.6] text-[#061225] md:text-[19px]">
                {deliverable.title}
              </p>
            </div>
            <p className="text-[16px] font-medium leading-[1.6] text-[#5b6b82]">
              {deliverable.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Deliverables;
