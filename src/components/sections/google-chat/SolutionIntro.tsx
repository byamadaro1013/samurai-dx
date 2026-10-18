import React from "react";

const SolutionIntro = () => {
  return (
    <section className="flex flex-col items-center gap-8 bg-[#f7faff] px-[120px] py-20 md:px-5">
      <h2 className="text-center text-[32px] font-medium leading-[1.5] text-[#061225] md:text-[24px]">
        それ、
        <br />
        法律事務所特化 Google Chat 導入支援がすべて解決します。
      </h2>
      <div className="flex w-[1144px] flex-col items-center gap-2.5 md:w-full">
        <p className="text-center text-[20px] leading-[1.2] text-[#061225] md:text-[17px]">
          「すでに払っているGoogle Workspace」を最大限に活かします。
        </p>
        <div className="text-center text-[16px] leading-[1.6] text-[#5b6b82] md:text-[14px]">
          <p>
            Gmailを使っている時点で、多くの事務所はGoogle
            Workspaceの土台を持っています。
          </p>
          <p>そこに標準搭載されている Google Chat を正しく設計して使うだけで、</p>
          <p>追加コストゼロで事務所のチャット環境が整います。</p>
          <p>
            Slack・Chatwork
            を使っている事務所は、移行して解約すれば毎月の固定費を削減できます。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionIntro;
