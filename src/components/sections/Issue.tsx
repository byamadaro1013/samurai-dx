import Image from "next/image";
import React from "react";

const Issue = () => {
  return (
    <section className="relative flex flex-col items-center gap-10 bg-background-dark px-0 py-20">
      {/* Content */}
      <div className="relative z-10 flex w-[63.75rem] flex-col gap-10 md:w-80">
        {/* Title section */}
        <div className="flex flex-col gap-2 leading-[1.2]">
          <p className="whitespace-pre font-helvetica text-heading-sm text-text-white">
            ●Issue
          </p>
          <h2 className="whitespace-pre font-gothic text-heading-xl text-text-white md:text-[30px]">
            我々が解決する課題
          </h2>
          <p className="whitespace-pre font-gothic text-[1.25rem] font-medium leading-[1.2] text-text-white md:text-[20px]">
            士業界全体のデジタル化の遅れ
          </p>
        </div>

        {/* Description */}
        <div className="whitespace-pre-wrap font-gothic text-[1rem] font-medium leading-[1.6] text-text-gray md:text-base">
          <p className="mb-0">弁護士、司法書士、行政書士、税理士等の士業は、</p>
          <p className="mb-0">
            伝統的な業務プロセスに依存し、デジタル化が大幅に遅れています。
          </p>
          <p>これにより業務効率の低下が深刻な問題となっています。</p>
        </div>

        {/* Issue Cards */}
        <div className="flex gap-10 md:flex-col">
          {/* Card 1 */}
          <div className="flex w-[18.75rem] flex-col gap-4 md:w-[300px]">
            <div className="flex items-start gap-2 leading-[0]">
              <Image
                src="/assets/images/icons/description.svg"
                alt="Description Icon"
                width={24}
                height={24}
              />
              <h3 className="font-gothic text-[1.25rem] font-medium leading-[1.2] text-text-gray md:text-[20px]">
                文書作成業務の非効率性
              </h3>
            </div>
            <div className="whitespace-pre-wrap font-gothic text-[1rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] md:w-[293px] md:text-base">
              <p className="mb-0">
                ・参照条文や定義語を探すための果てしないスクロールと検索
              </p>
              <p className="mb-0">
                ・用語の表記ゆれや体裁の修正に費やされる本来不要な時間
              </p>
              <p className="mb-0">
                ・条項の追加・削除に伴う後続条項や参照箇所の煩雑な手作業修正
              </p>
              <p>・過去の契約書・文書との比較や参照が困難</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex w-[18.75rem] flex-col gap-4 md:w-[300px]">
            <div className="flex items-start gap-2 leading-[0]">
              <Image
                src="/assets/images/icons/border_color.svg"
                alt="Border Color Icon"
                width={24}
                height={24}
              />
              <h3 className="font-gothic text-[1.25rem] font-medium leading-[1.2] text-text-gray md:text-[20px]">
                業務プロセスのアナログ依存
              </h3>
            </div>
            <div className="whitespace-pre-wrap font-gothic text-[1rem] font-medium leading-[1.5] text-[rgba(255,255,255,0.5)] md:w-[292px] md:text-base md:leading-[24px]">
              <p className="mb-0">・手作業による繰り返し作業</p>
              <p className="mb-0">（書類作成、データ入力等）</p>
              <p className="mb-0">・Excel や Word での原始的な業務管理</p>
              <p className="mb-0">・顧客情報管理の非効率性</p>
              <p>・基幹システムの老朽化とクラウド化の遅れ</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex w-[18.75rem] flex-col gap-4 md:w-[300px]">
            <div className="flex items-start gap-2 leading-[0]">
              <Image
                src="/assets/images/icons/cloud_off.svg"
                alt="Cloud Off Icon"
                width={24}
                height={24}
              />
              <h3 className="font-gothic text-[1.25rem] font-medium leading-[1.2] text-text-gray md:text-[20px]">
                既存ツールの限界
              </h3>
            </div>
            <div className="whitespace-pre-wrap font-gothic text-[1rem] font-medium leading-[1.5] text-[rgba(255,255,255,0.5)] md:text-base md:leading-[24px]">
              <p className="mb-0">
                ・汎用的なシステムでは士業特有の業務フローに適合しない
              </p>
              <p className="mb-0">
                ・カスタマイズ開発ができず、業務に合わせたシステム構築ができない
              </p>
              <p className="mb-0">
                ・オンプレミスシステムのクラウド移行が進まない
              </p>
              <p>
                ・BoostDraft
                等の既存ツールは基本機能のみで事務所固有のニーズに対応不可
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Issue;
