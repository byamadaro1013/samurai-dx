import Image from "next/image";
import React from "react";

const Issue = () => {
  return (
    <>
      {/* Section 1: Issue - 法に関するプロの皆様へ */}
      <section
        id="issue"
        className="relative flex flex-col items-center gap-10 px-0 py-20"
      >
        <div className="relative z-10 flex w-[63.75rem] flex-col gap-10 md:w-80">
          {/* Text content */}
          <div className="flex flex-col items-center gap-2">
            <p className="font-helvetica text-base font-bold leading-[16px] text-white">
              ●Issue
            </p>
            <h2 className="font-gothic text-[30px] font-normal leading-[40px] text-white">
              法に関するプロの皆様へ
            </h2>
            {/* Main illustration with text bubbles */}
            <div className="relative mt-0 flex w-full items-center justify-center">
              <Image
                src="/assets/images/leasur/issue.png"
                alt="法的文書作成の課題"
                width={1030}
                height={290}
                className="h-auto w-full"
              />
            </div>
          </div>

          {/* Description text */}
          <div className="font-gothic text-base font-normal leading-[2] text-white">
            <p className="mb-0 text-center">
              日々複雑な法的文書作成に追われる弁護士、または法務のプロフェッショナル。
            </p>
            <p className="mb-0 text-center">
              本来注力すべきは案件の戦略や法的分析のはずなのに、
            </p>
            <p className="text-center">
              文書の体裁調整、表記の統一、条項の修正といったノンコア業務に多くの時間を奪われ、疲弊していませんか？
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: その「見えないムダ」、もう終わりにしませんか？ */}
      <section className="relative flex flex-col items-center gap-10 px-0 pb-20 pt-10">
        <div className="relative z-10 flex w-[63.75rem] flex-col items-center gap-10 md:w-80">
          <h2 className="font-gothic text-[30px] font-normal leading-[40px] text-white">
            その「見えないムダ」、もう終わりにしませんか？
          </h2>
          <div className="flex flex-col gap-2">
            <p className="text-center font-gothic text-base font-normal leading-[2] text-white">
              法的文書作成の現場には、気づかないうちに業務効率を著しく低下させる「ムダ」が潜んでいます。
            </p>
            <p className="text-center font-gothic text-base font-normal leading-[2] text-white">
              これらの作業は「仕方がない」と諦めていませんか？
            </p>
            <p className="text-center font-gothic text-base font-normal leading-[2] text-white">
              その結果、最も重要な「文書の中身」に集中する時間が削られているのではないでしょうか。
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Issue;
