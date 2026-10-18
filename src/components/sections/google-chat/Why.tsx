import React from "react";
import { WHY_ITEMS } from "@/const/google-chat";

const Why = () => {
  return (
    <section className="flex flex-col items-center gap-9 bg-white px-[120px] py-20 md:px-5">
      <h2 className="text-center text-[32px] font-medium leading-[1.6] text-[#061225] md:text-[24px]">
        なぜ、法律事務所特化 Google Chat 導入支援 なのか？
      </h2>

      <div className="flex w-[1200px] items-stretch gap-5 md:w-full md:flex-col">
        {WHY_ITEMS.map((item) => (
          <div
            key={item.title.join("")}
            className="flex min-h-[228px] w-[386px] flex-col gap-3.5 rounded-2xl border border-solid border-[#dce8f6] bg-[#f9fbff] p-6 md:min-h-0 md:w-full"
          >
            <p className="text-[24px] font-medium leading-[1.6] text-[#061225] md:text-[20px]">
              {item.title.map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </p>
            <p className="text-[16px] font-medium leading-[1.6] text-[#5b6b82]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Why;
