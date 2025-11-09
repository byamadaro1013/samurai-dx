import React from "react";
import Image from "next/image";

const Service = () => {
  return (
    <section
      id="service"
      className="relative flex flex-col items-center gap-10 bg-background-dark px-0 py-20"
    >
      <div className="relative z-10 flex w-[63.75rem] flex-col gap-10 md:w-80">
        <div className="flex flex-col gap-2 leading-[1.2]">
          <p className="whitespace-pre font-helvetica text-heading-sm text-text-white">
            ●Service
          </p>
          <h2 className="whitespace-pre font-gothic text-heading-xl text-text-white md:text-[30px]">
            事業内容
          </h2>
        </div>

        <div className="flex gap-10 md:flex-col md:gap-10">
          <div className="flex w-[30.547rem] flex-col gap-10 md:w-80">
            <div className="flex flex-col gap-0 leading-[1.6]">
              <p className="font-gothic text-[1.25rem] font-medium leading-[1.6] text-text-white md:text-[20px]">
                リーソル（リーガルテックプロダクト）
              </p>
              <p className="font-gothic text-[1rem] font-medium leading-[1.6] text-text-gray md:text-base">
                弁護士版 Cursor として設計された総合文書エディタ
              </p>
            </div>

            <div className="relative h-[8.125rem] w-[16.563rem] md:w-[265px]">
              <Image
                src="/assets/images/service_01.png"
                alt="リーガルテックプロダクト"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-0 leading-[0]">
              <div className="whitespace-pre-wrap font-gothic text-[1rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] md:w-80 md:text-base">
                <p className="mb-0">
                  形態：Microsoft Word プラグイン（現行フローを維持）
                </p>
                <p className="mb-0">価格：月額 ￥5,000 /ID</p>
                <p>販売：2025 年 11 月一般販売開始予定</p>
              </div>

              <div className="mt-6 flex flex-col gap-0">
                <p className="font-gothic text-[1rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] md:text-base">
                  主要機能
                </p>
                <div className="mt-2 whitespace-pre-wrap font-gothic text-[0.813rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] md:w-[163.941px] md:text-[13px]">
                  <p className="mb-0">・定義語ジャンプ機能</p>
                  <p className="mb-0">・参照ジャンプ機能</p>
                  <p className="mb-0">・条文番号自動リナンバー</p>
                  <p className="mb-0">・過去契約書参照機能（独自機能）</p>
                  <p className="mb-0">・プルーフリード機能</p>
                  <p>・英文 ⇔ 和文 AI 翻訳</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-[30.547rem] flex-col gap-10 md:w-80">
            <div className="flex flex-col gap-0 leading-[1.6]">
              <p className="font-gothic text-[1.25rem] font-medium leading-[1.6] text-text-white md:text-[20px]">
                士業向け受託開発サービス
              </p>
              <p className="font-gothic text-[1rem] font-medium leading-[1.6] text-text-gray md:text-base">
                士業事務所の業務に特化したシステム開発
              </p>
            </div>

            <div className="relative h-[8.125rem] w-[14.563rem] md:w-[233px]">
              <Image
                src="/assets/images/service_02.png"
                alt="受託開発サービス"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-6 leading-[0] md:gap-4">
              <div className="flex flex-col gap-0 md:w-80">
                <p className="font-gothic text-[1rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] md:text-base">
                  ■リーソルカスタマイズ開発
                </p>
                <div className="mt-2 whitespace-pre-wrap font-gothic text-[0.813rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] md:w-80 md:text-[13px]">
                  <p className="mb-0">・事務所固有の文書テンプレート対応</p>
                  <p className="mb-0">・既存基幹システムとの連携開発</p>
                  <p>・特殊な業務フローに合わせた機能追加</p>
                </div>
              </div>

              <div className="flex flex-col gap-0">
                <p className="font-gothic text-[1rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] md:text-base">
                  ■業務効率化システム開発
                </p>
                <div className="mt-2 flex gap-8 md:flex-col md:gap-0">
                  <div className="whitespace-pre-wrap font-gothic text-[0.813rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] md:w-[145px] md:text-[11px]">
                    <p className="mb-0">GAS(Google Apps Script)活用</p>
                    <p className="mb-0">・繰り返し作業の自動化</p>
                    <p className="mb-0">・データ入力・集計の効率化</p>
                    <p>・顧客管理システムの構築</p>
                  </div>
                  <div className="whitespace-pre-wrap font-gothic text-[0.813rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] md:w-[145px] md:text-[11px]">
                    <p className="mb-0">業務管理システム</p>
                    <p className="mb-0">・案件管理・進捗管理システム</p>
                    <p className="mb-0">・顧客情報統合管理</p>
                    <p>・請求・会計システム連携</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-0 md:w-80">
                <p className="font-gothic text-[1rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] md:text-base">
                  ■システム移行
                </p>
                <div className="mt-2 whitespace-pre-wrap font-gothic text-[0.813rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] md:w-80 md:text-[11px]">
                  <p className="mb-0">オンプレミスからクラウドへの移行</p>
                  <p className="mb-0">・レガシーシステムのクラウド化</p>
                  <p className="mb-0">・データ移行・セキュリティ強化</p>
                  <p>・運用コスト削減とパフォーマンス向上</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
