import React from "react";

// Icon components as SVG
const DescriptionIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"
      fill="rgba(255, 255, 255, 0.85)"
    />
  </svg>
);

const BorderColorIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.75 7L14 3.25L15.06 2.19C15.45 1.8 16.08 1.8 16.47 2.19L19.81 5.53C20.2 5.92 20.2 6.55 19.81 6.94L17.75 7ZM12.94 4.31L3 14.25V18H6.75L16.69 8.06L12.94 4.31ZM2 22H22V24H2V22Z"
      fill="rgba(255, 255, 255, 0.85)"
    />
  </svg>
);

const CloudOffIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4C10.5 4 9.11 4.48 7.94 5.27L9.46 6.79C10.21 6.3 11.08 6 12 6C14.76 6 17 8.24 17 11V12H19C20.66 12 22 13.34 22 15C22 15.99 21.6 16.87 20.95 17.54L22.36 18.95C23.38 17.86 24 16.45 24 15C24 12.36 21.95 10.22 19.35 10.04ZM3 5.27L5.75 8.02C4.14 8.42 3 9.86 3 11.5C3 13.43 4.57 15 6.5 15H17.73L19.73 17H6.5C3.46 17 1 14.54 1 11.5C1 9.35 2.36 7.56 4.27 6.79L1.27 3.79L2.68 2.38L20.73 20.43L19.32 21.84L3 5.27Z"
      fill="rgba(255, 255, 255, 0.85)"
    />
  </svg>
);

const Issue = () => {
  return (
    <section className="relative flex flex-col items-center gap-10 bg-background-dark px-0 py-20">
      {/* Content */}
      <div className="relative z-10 flex w-[63.75rem] flex-col gap-10 md:w-80">
        {/* Title section */}
        <div className="flex flex-col gap-2 leading-[1.2]">
          <p className="whitespace-pre text-center font-helvetica text-heading-sm text-text-white">
            ●Issue
          </p>
          <h2 className="whitespace-pre font-gothic text-heading-xl text-text-white md:text-[30px]">
            我々が解決する課題
          </h2>
          <p className="whitespace-pre font-gothic text-[1.25rem] leading-[1.2] font-medium text-text-white md:text-[20px]">
            士業界全体のデジタル化の遅れ
          </p>
        </div>

        {/* Description */}
        <div className="whitespace-pre-wrap font-gothic text-[1rem] leading-[1.6] font-medium text-text-gray md:text-base">
          <p className="mb-0">
            弁護士、司法書士、行政書士、税理士等の士業は、
          </p>
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
              <DescriptionIcon />
              <h3 className="font-gothic text-[1.25rem] leading-[1.2] font-medium text-text-gray md:text-[20px]">
                文書作成業務の非効率性
              </h3>
            </div>
            <div className="whitespace-pre-wrap font-gothic text-[1rem] leading-[1.6] font-medium text-[rgba(255,255,255,0.5)] md:text-base md:w-[293px]">
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
              <BorderColorIcon />
              <h3 className="font-gothic text-[1.25rem] leading-[1.2] font-medium text-text-gray md:text-[20px]">
                業務プロセスのアナログ依存
              </h3>
            </div>
            <div className="whitespace-pre-wrap font-gothic text-[1rem] leading-[1.5] font-medium text-[rgba(255,255,255,0.5)] md:text-base md:leading-[24px] md:w-[292px]">
              <p className="mb-0">・手作業による繰り返し作業</p>
              <p className="mb-0">（書類作成、データ入力等）</p>
              <p className="mb-0">
                ・Excel や Word での原始的な業務管理
              </p>
              <p className="mb-0">・顧客情報管理の非効率性</p>
              <p>・基幹システムの老朽化とクラウド化の遅れ</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex w-[18.75rem] flex-col gap-4 md:w-[300px]">
            <div className="flex items-start gap-2 leading-[0]">
              <CloudOffIcon />
              <h3 className="font-gothic text-[1.25rem] leading-[1.2] font-medium text-text-gray md:text-[20px]">
                既存ツールの限界
              </h3>
            </div>
            <div className="whitespace-pre-wrap font-gothic text-[1rem] leading-[1.5] font-medium text-[rgba(255,255,255,0.5)] md:text-base md:leading-[24px]">
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
