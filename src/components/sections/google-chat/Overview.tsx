import React from "react";
import Image from "next/image";
import { FEATURES } from "@/const/google-chat";

const Overview = () => {
  return (
    <section className="flex flex-col items-center gap-12 bg-white px-[120px] py-20 md:px-5">
      <div className="flex w-[1200px] items-center justify-center gap-8 md:w-full md:flex-col">
        <div className="flex w-[592px] flex-col gap-5 md:w-full">
          <p className="text-[12px] font-medium uppercase leading-[1.2] text-[#14699a]">
            GoogleChatとは？
          </p>
          <h2 className="text-[32px] font-medium leading-[1.5] text-[#061225] md:text-[24px]">
            Google Chatは、
            <br />
            Google Workspace（Gmail）に
            <br />
            標準搭載されているビジネスチャットです。
          </h2>
          <p className="text-[16px] font-medium leading-[1.6] text-[#5b6b82]">
            SlackやChatworkと同じように、メンバーとリアルタイムにメッセージのやり取りができます。Gmailを使っている事務所なら、追加料金なしで今すぐに使い始められます。
          </p>
          <div className="flex flex-col gap-2 rounded-2xl border border-solid border-[#dce8f6] bg-[#f7faff] p-[22px]">
            <p className="text-[18px] font-medium leading-[1.2] text-[#061225]">
              「事務所のためのLINE」のようなもの。
              <br />
              しかもGmailに最初からついています。
            </p>
            <p className="text-[16px] font-medium leading-[1.6] text-[#5b6b82]">
              チャット・グループ会話・ファイル共有が、普段のメール画面の中だけで完結。新しいアプリを別途契約・インストールする必要はありません。
            </p>
          </div>
        </div>
        <div className="h-[296px] w-[560px] shrink-0 overflow-hidden rounded-[20px] md:h-auto md:w-full">
          <Image
            src="/assets/images/google-chat/overview_chat.png"
            alt="Google Chatの画面イメージ"
            width={560}
            height={296}
            className="size-full object-cover"
          />
        </div>
      </div>

      <div className="flex w-[1200px] flex-col items-center gap-[18px] md:w-full">
        <h3 className="font-noto-jp text-[28px] font-bold leading-[1.2] text-[#061225] md:text-[22px]">
          Google Chatでできること
        </h3>
        <div className="flex w-full items-stretch gap-2 md:flex-col">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex w-[234px] flex-col gap-3 rounded-2xl border border-solid border-[#dce8f6] bg-[#f9fbff] p-5 md:w-full"
            >
              <div className="flex items-center">
                <div className="flex size-[42px] shrink-0 items-center justify-center rounded-lg">
                  <Image src={feature.icon} alt="" width={18} height={18} />
                </div>
                <p className="flex-1 text-[16px] font-medium leading-[1.2] text-[#061225]">
                  {feature.title}
                </p>
              </div>
              <p className="text-[16px] font-medium leading-[1.6] text-[#5b6b82]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
