import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { IconDefs } from "@/components/bakusoku/IconDefs";
import { PurchaseProvider } from "@/components/bakusoku/PurchaseProvider";
import { getSiteUrl, product, searchKeywords } from "@/const/bakusoku/site";
import "./globals.css";
import "./purchase.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: "バクソク内容証明 | e内容証明の入力を自動化・士業の業務効率化",
  description:
    "e内容証明の繰り返し入力と画面遷移を自動化する入力支援アプリ。差出人・宛先管理、Word文書の規定チェックに対応。Windows・macOSで、弁護士・司法書士・行政書士の業務を効率化します。",
  keywords: [...searchKeywords],
  applicationName: product.name,
  publisher: "株式会社SamurAI DX",
  alternates: { canonical: "/bakusokunaiyoushoumei" },
  icons: {
    icon: [
      {
        url: "/assets/bakusoku/icon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/bakusoku/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: "/assets/bakusoku/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/bakusokunaiyoushoumei",
    siteName: product.name,
    title: "バクソク内容証明 | e内容証明を爆速送付",
    description:
      "e内容証明の入力作業と画面遷移を自動化する入力支援アプリ。Windows・macOS対応。",
    images: [
      {
        url: "/assets/bakusoku/app-screen.png",
        width: 1200,
        height: 726,
        alt: "バクソク内容証明のアプリ画面",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: product.name,
    images: ["/assets/bakusoku/app-screen.png"],
  },
};

export const viewport: Viewport = { themeColor: "#f8f6f1" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <IconDefs />
        <PurchaseProvider>{children}</PurchaseProvider>
      </body>
    </html>
  );
}
