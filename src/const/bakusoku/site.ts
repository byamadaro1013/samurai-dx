import { SITE_URL } from "@/const";
export const product = {
  name: "バクソク内容証明",
  priceJpy: 9800,
  currency: "JPY",
  termsUrl:
    "https://slow-noise-ba5.notion.site/3df42d401011808bbc90cafe002fde87",
  contactEmail: "hashimoto@samurai-dx.com",
} as const;

// Stripeの環境変数が未設定なら購入APIが503を返し、モーダルにエラーを出す
export const CHECKOUT_IMPLEMENTED: boolean = true;

export const searchKeywords = [
  "バクソク内容証明",
  "e内容証明 入力支援",
  "e内容証明 自動入力",
  "e内容証明 自動化",
  "内容証明 業務効率化",
  "内容証明 文書チェック",
  "内容証明 宛先管理",
  "士業 業務効率化",
  "弁護士 e内容証明",
  "司法書士 e内容証明",
  "行政書士 e内容証明",
  "内容証明 Windows macOS",
] as const;

export function formatJPY(value: number): string {
  return new Intl.NumberFormat("ja-JP").format(value);
}

export function getSiteUrl(): URL {
  const url = new URL(process.env.SITE_URL ?? SITE_URL);
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error("Invalid SITE_URL protocol");
  return new URL(url.origin);
}

export const publisherName = "株式会社SamurAI DX";
export const ogImage = {
  url: "/assets/bakusoku/app-screen.png",
  width: 1200,
  height: 726,
  alt: "バクソク内容証明のアプリ画面",
};

// 子ページで openGraph を指定すると親の設定は丸ごと置き換わるので、共通部分をここから渡す
export const openGraphBase = {
  siteName: product.name,
  locale: "ja_JP",
  images: [ogImage],
};

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}

export const publisherJsonLd = {
  "@type": "Organization",
  name: publisherName,
  url: SITE_URL,
};
