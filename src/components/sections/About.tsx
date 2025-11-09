import React from "react";

const About = () => {
  return (
    <section className="relative flex flex-col items-center gap-10 bg-background-dark px-0 py-[7.5rem] md:py-20">
      {/* Content */}
      <div className="relative z-10 flex w-[63.75rem] flex-col gap-10 md:w-80">
        {/* Title section */}
        <div className="flex flex-col gap-2 leading-[1.2]">
          <p className="whitespace-pre font-helvetica text-heading-sm text-text-white">
            ●About
          </p>
          <h2 className="font-gothic text-heading-xl text-text-white md:text-[30px]">
            士業界のデジタル変革
            <br className="hidden md:block" />
            パートナー
          </h2>
        </div>

        {/* Description */}
        <div className="whitespace-pre-wrap font-gothic text-body-lg text-text-gray md:text-base md:leading-[2.4]">
          <p className="mb-0">
            株式会社 SamurAI DX
            は、士業界全体のデジタル変革を支援する専門会社です。
          </p>
          <p className="mb-0">リーガルテックプロダクト「リーソル」の提供と、</p>
          <p>
            士業特化の受託開発サービスにより、士業事務所の業務効率化を実現します。
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
