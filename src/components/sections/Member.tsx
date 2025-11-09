"use client";

import React from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { VercelAnalyticsContactButtonClick } from "@/const";

const Member = () => {
  const handleContactClick = () => {
    track(VercelAnalyticsContactButtonClick);
    // TODO: Add contact form modal or navigation
  };

  return (
    <section
      id="member"
      className="relative flex flex-col items-center bg-background-dark px-0 py-20"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-10">
        {/* Title section */}
        <div className="mx-auto flex w-[63.75rem] flex-col gap-2 leading-[1.2] md:w-80">
          <p className="whitespace-pre font-helvetica text-heading-sm text-text-white">
            ●Member
          </p>
          <h2 className="whitespace-pre font-gothic text-heading-xl text-text-white md:text-[30px]">
            チームメンバー
          </h2>
        </div>

        {/* Members Grid */}
        <div className="mt-6 grid w-screen grid-cols-[500px_500px] justify-between gap-10 md:mt-0 md:w-80 md:grid-cols-1 md:flex-col md:gap-10">
          {/* Member 1: 橋本祐弥 */}
          <div className="flex flex-1 flex-col gap-6 leading-[0]">
            {/* Photo and Name Container */}
            <div className="relative">
              {/* Photo Container */}
              <div className="relative w-full overflow-hidden">
                <Image
                  src="/assets/images/member_01.png"
                  alt="橋本祐弥"
                  width={500}
                  height={612}
                  className="h-[612px] w-[500px] object-cover md:h-[318px] md:w-[197px]"
                />
              </div>

              {/* Name Plate - Positioned absolutely on SP */}
              <Image
                src="/assets/images/member_01_name.png"
                alt="橋本祐弥"
                width={137}
                height={341}
                className="absolute -right-40 top-32 md:right-0 md:top-0"
              />
            </div>

            {/* Bio */}
            <div className="font-gothic text-[0.813rem] font-medium leading-[1.5] text-[rgba(255,255,255,0.5)] md:w-[302.065px] md:text-[13px] md:leading-[24px]">
              <p className="mb-0">
                森・濱田松本法律事務所を退職後、個人事務所を立ち上げ独立し、弁護士業務に従事。弁護士資格と弁護士業界での深いネットワークから、士業の問題を深く捉え、顧客からの高い信頼と法律実務の現場を知り尽くした製品設計能力を強みとする。2025年10月に株式会社
                SamurAI
                DXを株式会社オーガイ代表の山田魁とともに共同創業。慶應義塾大学法学部法律学科大学卒、慶應義塾大学大学院法学研究科中退、2020年12月東京弁護士会弁護士登録。
              </p>
            </div>
          </div>

          {/* Member 2: 山田魁 */}
          <div className="flex flex-1 flex-col gap-6 leading-[0]">
            {/* Photo and Name Container */}
            <div className="relative">
              {/* Photo Container */}
              <div className="relative w-full overflow-hidden md:flex md:justify-end">
                <Image
                  src="/assets/images/member_02.png"
                  alt="山田魁"
                  width={500}
                  height={612}
                  className="h-[612px] w-[500px] object-cover md:h-[318px] md:w-[197px]"
                />
              </div>

              <Image
                src="/assets/images/member_02_name.png"
                alt="山田魁"
                width={137}
                height={339}
                className="absolute -left-40 top-32 md:left-0 md:top-0"
              />
            </div>

            {/* Bio */}
            <div className="font-gothic text-[0.813rem] font-medium leading-[1.5] text-[rgba(255,255,255,0.5)] md:w-80 md:text-[13px] md:leading-[24px]">
              <p className="mb-0">
                大学時代に、ベンチャーキャピタル「SAMURAI
                INCUBATE」でインターンを経験。
              </p>
              <p className="mb-0">
                その後、宇宙スタートアップ「ElevationSpace」に3人目の創業メンバーとして参画し、創業当初3人だったチームを約1年半で30人規模まで拡大。
              </p>
              <p className="mb-0">
                その後、大手IT企業でエンジニアとして勤務したのち独立し、
              </p>
              <p>
                AIチャットボットの開発などに携わる。現在は、約12名のチームを率いながら事業を展開している。
              </p>
            </div>
          </div>
        </div>

        {/* JOIN US Button */}
        <div className="absolute bottom-40 left-1/2 mt-10 flex -translate-x-1/2 justify-center md:relative md:bottom-0 md:mt-0 md:justify-start">
          <button
            onClick={handleContactClick}
            className="flex flex-col items-center justify-center gap-1 whitespace-pre border border-solid border-white px-10 py-2 font-gothic not-italic transition-colors hover:bg-white/10 md:gap-1 md:px-10 md:py-2"
          >
            <p className="relative shrink-0 text-[2.188rem] leading-none text-text-gray md:text-[24px]">
              JOIN US!
            </p>
            <p className="relative shrink-0 text-[0.813rem] leading-[0.813rem] text-[rgba(255,255,255,0.5)] md:text-[13px] md:leading-[13px]">
              リクルート情報はこちら
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Member;
