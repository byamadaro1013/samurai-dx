import React from "react";
import Image from "next/image";
import { WORKSPACE_APPS } from "@/const/google-chat";

const Intro = () => {
  return (
    <section className="flex flex-col items-center gap-10 bg-white px-[120px] py-20 md:px-5">
      <div className="text-center text-[15px] font-medium leading-[2.4] text-[#363636]">
        <p>Slack・Chatwork・LINE WORKS の月額料金を払い続けるのをやめる。</p>
        <p>あるいは、Gmailしかなくてそもそもチャットがない状態を解消する。</p>
        <p>どちらも、Google Workspace に標準搭載の Google Chat で解決します。</p>
        <p>それが、法律事務所特化 Google Chat 導入支援 です。</p>
      </div>

      {/* Support Card */}
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-2.5 rounded-2xl bg-white p-[18px] drop-shadow-[0px_14px_16px_rgba(0,0,0,0.15)]">
        <p className="text-center text-[24px] font-medium leading-[1.6] text-black md:text-[20px]">
          チャットツールに、
          <br />
          追加でお金を払う必要はありません。
        </p>
        <p className="text-center text-[16px] font-medium leading-[1.6] text-black md:text-[14px]">
          Gmail（Google Workspace）を使っている事務所なら、
          <br />
          Google Chat は追加料金なしで使えます。
          <br />
          Slack・Chatwork・LINE WORKSを別契約している事務所は、
          <br />
          それらを解約して月額コストを丸ごと削減できます。
        </p>
        <div className="flex flex-col items-center gap-4">
          <p className="font-inter text-[12px] font-bold uppercase leading-[1.2] text-black">
            Google Workspace に標準搭載
          </p>
          <div className="flex items-center gap-4 md:flex-wrap md:justify-center">
            {WORKSPACE_APPS.map((app) => (
              <div
                key={app.label}
                className="flex h-[68px] w-[199px] items-center justify-center gap-2.5 rounded-lg border border-solid border-[#e1ecf8] bg-[#f7faff] px-[18px] md:w-[160px]"
              >
                <Image src={app.icon} alt="" width={18} height={18} />
                <p className="font-inter whitespace-nowrap text-[14px] font-semibold leading-[1.2] text-[#5b6b82]">
                  {app.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
