import {
  Inter,
  Montserrat,
  Noto_Sans_JP,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/google-chat/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-inter",
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-zen-kaku",
});

export const metadata: Metadata = {
  title:
    "法律事務所特化 Google Chat 導入支援 | 追加コストゼロで事務所のチャット環境を",
  description:
    "Gmail（Google Workspace）に標準搭載されているGoogle Chatで、法律事務所のチャットを追加コストゼロに。Slack・Chatwork・LINE WORKSからの乗り換えによるコスト削減から、スペース設計・履歴移行・守秘義務を前提とした運用ルール整理・定着支援まで、必要な作業をまとめて提供します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${montserrat.variable} ${notoSansJP.variable} ${zenKakuGothicNew.variable} ${inter.variable} font-montserrat`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
