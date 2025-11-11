import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="relative flex flex-col items-center gap-10 px-0 py-20"
    >
      <div className="relative z-10 flex w-[67.5rem] flex-col gap-10 md:w-80">
        {/* Title */}
        <div className="flex flex-col items-center gap-4">
          <p className="font-helvetica text-base font-bold leading-[16px] text-[#2BA1DB]">
            ●About
          </p>
          <h2 className="text-center font-gothic text-[30px] font-normal leading-[40px] text-[rgba(0,0,0,0.85)]">
            法律専門家のための総合文書エディタ「リーソル」が、その悩みを解決します。
          </h2>
        </div>

        {/* Description */}
        <p className="text-center font-gothic text-[20px] font-normal leading-[1.6] text-[#333333]">
          私たちリーソルは、「弁護士、法務のプロが本来業務に集中できる環境」を実現するために生まれました。
          <br />
          AI契約レビューとは設計思想が異なり、法律家の皆様が本当に必要とする「痒いところに手が届く」機能で、あなたの業務を強力にサポートします。
        </p>

        {/* Content with image and reasons */}
        <div className="flex items-start gap-6 md:flex-col">
          {/* Image */}
          <div className="h-[405px] w-[402px] flex-shrink-0 md:h-auto md:w-full">
            <Image
              src="/assets/images/leasur/about_reason.png"
              alt="LESOL"
              width={402}
              height={405}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Reasons */}
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-center gap-[6px]">
              <div className="h-3 w-3 rounded-full bg-[#2BA1DB]"></div>
              <h3 className="font-gothic text-[24px] font-normal leading-[28px] text-[#333333]">
                リーソルが選ばれる理由
              </h3>
            </div>

            {/* Reason 1 */}
            <div className="flex flex-col gap-3">
              <h4 className="font-gothic text-[20px] font-normal leading-[28px] text-[#2BA1DB]">
                課題起点の実用的な機能群
              </h4>
              <p className="font-gothic text-base font-normal leading-[24px] text-[#333333]">
                AIレビューとは異なり、法律家の実際の課題解決に特化。
              </p>
            </div>

            {/* Reason 2 */}
            <div className="flex flex-col gap-3">
              <h4 className="font-gothic text-[20px] font-normal leading-[28px] text-[#2BA1DB]">
                現行フローを維持
              </h4>
              <p className="font-gothic text-base font-normal leading-[24px] text-[#333333]">
                Microsoft
                Wordプラグインなので、新たなソフト導入や業務フロー変更は不要。
              </p>
            </div>

            {/* Reason 3 */}
            <div className="flex flex-col gap-3">
              <h4 className="font-gothic text-[20px] font-normal leading-[28px] text-[#2BA1DB]">
                カスタマイズ開発が可能
              </h4>
              <p className="font-gothic text-base font-normal leading-[24px] text-[#333333]">
                他SaaSだと自社の基幹システムとの統合ができないことが多いですが、リーソルは貴社専用にカスタマイズ開発を行うことが可能です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
