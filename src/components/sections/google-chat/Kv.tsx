import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_CHIPS } from "@/const/google-chat";

const Kv = () => {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[linear-gradient(209deg,#07111f_14.6%,#0c1830_55.7%,#07263a_85.4%)]"
    >
      {/* Background photo (gradient + photo baked in the exported image) */}
      <Image
        src="/assets/images/google-chat/hero_bg.png"
        alt=""
        fill
        className="pointer-events-none object-cover"
        priority
      />

      <div className="relative mx-auto h-[800px] max-w-[1440px] md:h-auto md:px-5 md:pb-16 md:pt-10">
        {/* Floating chat screenshot */}
        <div className="absolute left-[-21px] top-[30px] h-[322px] w-[610px] overflow-hidden rounded-[20px] shadow-[0px_4px_24px_20px_rgba(0,0,0,0.25)] md:hidden">
          <Image
            src="/assets/images/google-chat/hero_chat.png"
            alt="Google Chatの画面イメージ"
            width={610}
            height={322}
            className="size-full object-cover"
            priority
          />
        </div>

        {/* Laptop visual */}
        <div className="absolute left-[54px] top-[178px] h-[460px] w-[671px] md:hidden">
          <Image
            src="/assets/images/google-chat/hero_laptop.png"
            alt="ノートPCに表示されたGoogle Chat"
            width={671}
            height={460}
            className="size-full object-cover object-left"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="absolute right-[54px] top-[231px] flex w-[620px] flex-col gap-6 md:static md:w-full">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="bg-gradient-to-r from-[#f2f2f2] to-white bg-clip-text text-[56px] font-medium leading-[1.2] text-transparent md:text-[30px]">
                法律事務所のための
                <br />
                Google Chat導入支援
              </h1>
              <p className="text-[18px] font-medium leading-[1.6] text-white md:text-[15px]">
                Gmailに“すでについている”Google Chatで、
                <br className="md:hidden" />
                事務所のチャットを追加コストゼロに。
              </p>
            </div>
            <Link href="#contact">
              <button className="flex items-center justify-center gap-4 rounded-[10px] bg-[linear-gradient(162deg,#114e70_33.6%,#f9ddc6_100%)] px-7 py-3.5 transition-opacity hover:opacity-80">
                <Image
                  src="/assets/images/google-chat/icons/mobile_friendly.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <p className="font-bold leading-[1.2] text-white">
                  <span className="text-[20px]">まずは無料</span>
                  <span className="text-[16px]">で</span>
                  <span className="text-[20px]">ご相談</span>
                </p>
                <span className="flex size-6 shrink-0 items-center justify-center">
                  <Image
                    src="/assets/images/google-chat/icons/chevron_right.svg"
                    alt=""
                    width={8}
                    height={12}
                    className="h-3 w-auto"
                  />
                </span>
              </button>
            </Link>
          </div>

          {/* Chips */}
          <div className="flex items-center gap-3 md:flex-wrap">
            {HERO_CHIPS.map((chip) => (
              <div
                key={chip.label}
                className="flex h-[38px] items-center gap-2 rounded-full border border-solid border-[#1a3556] bg-[#0d1b33] px-3"
              >
                <Image src={chip.icon} alt="" width={16} height={16} />
                <p className="whitespace-nowrap text-[14px] font-bold leading-none text-[#d9ecff]">
                  {chip.label}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile visual */}
          <div className="hidden md:block">
            <Image
              src="/assets/images/google-chat/hero_laptop.png"
              alt="ノートPCに表示されたGoogle Chat"
              width={671}
              height={460}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kv;
