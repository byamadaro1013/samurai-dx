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
    <section className="relative flex flex-col items-center bg-background-dark px-0 py-[7.5rem]">
      {/* Content */}
      <div className="relative z-10 flex w-[63.75rem] flex-col gap-10 md:w-full md:px-6">
        {/* Title section */}
        <div className="flex flex-col gap-2">
          <p className="whitespace-pre text-center font-helvetica text-heading-sm text-text-white">
            ●Member
          </p>
          <h2 className="whitespace-pre font-gothic text-heading-xl text-text-white">
            チームメンバー
          </h2>
        </div>

        {/* Members Grid */}
        <div className="flex gap-10 mt-6 md:flex-col">
          {/* Member 1: 橋本祐弥 */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Photo Container */}
            <div className="relative aspect-[500/612] w-full overflow-hidden">
              <Image
                src="/assets/images/member_01.png"
                alt="橋本祐弥"
                fill
                className="object-cover"
              />
            </div>

            {/* Name Plate */}
            <div className="flex items-end gap-4">
              <div className="flex flex-col items-center bg-white px-2 py-1">
                <p className="whitespace-pre text-center font-hiragino text-[3.75rem] leading-[4rem] font-semibold text-background-dark">
                  橋
                  <br />本<br />祐
                  <br />弥
                </p>
              </div>
              <div className="mb-2 whitespace-pre text-right font-hiragino text-[0.813rem] leading-[1.75rem] font-semibold text-text-white">
                <p className="mb-0">株式会社SamurAI DX</p>
                <p>代表取締役CEO</p>
              </div>
            </div>

            {/* Bio */}
            <div className="font-gothic text-[0.813rem] leading-[1.5] font-medium text-[rgba(255,255,255,0.5)]">
              <p className="mb-0">
                森・濱田松本法律事務所を退職後、個人事務所を立ち上げ独立し、弁護士業務に従事。弁護士資格と弁護士業界での深いネットワークから、士業の問題を深く捉え、顧客からの高い信頼と法律実務の現場を知り尽くした製品設計能力を強みとする。2025年10月に株式会社
                SamurAI
                DXを株式会社オーガイ代表の山田魁とともに共同創業。慶應義塾大学法学部法律学科大学卒、慶應義塾大学大学院法学研究科中退、2020年12月東京弁護士会弁護士登録。
              </p>
            </div>
          </div>

          {/* Member 2: 山田魁 */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Photo Container */}
            <div className="relative aspect-[500/612] w-full overflow-hidden">
              <Image
                src="/assets/images/member_02.png"
                alt="山田魁"
                fill
                className="object-cover"
              />
            </div>

            {/* Name Plate */}
            <div className="flex items-end gap-4">
              <div className="flex flex-col items-center bg-white px-2 py-1">
                <p className="whitespace-pre text-center font-hiragino text-[3.75rem] leading-[4rem] font-semibold text-background-dark">
                  山
                  <br />田<br />魁
                </p>
              </div>
              <div className="mb-2 whitespace-pre font-hiragino text-[0.813rem] leading-[1.75rem] font-semibold text-text-white">
                <p className="mb-0">株式会社SamurAI DX</p>
                <p>取締役CTO</p>
              </div>
            </div>

            {/* Bio */}
            <div className="font-gothic text-[0.813rem] leading-[1.5] font-medium text-[rgba(255,255,255,0.5)]">
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
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleContactClick}
            className="flex flex-col items-center justify-center gap-1 whitespace-pre border border-solid border-white px-10 py-2 font-gothic not-italic transition-colors hover:bg-white/10"
          >
            <p className="relative shrink-0 text-[2.188rem] leading-none text-text-gray">
              JOIN US!
            </p>
            <p className="relative shrink-0 text-[0.813rem] leading-[0.813rem] text-[rgba(255,255,255,0.5)]">
              リクルート情報はこちら
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Member;
