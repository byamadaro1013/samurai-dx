export const product = {
  name: "バクソク内容証明",
  priceJpy: 9800,
  currency: "JPY",
  termsUrl:
    "https://slow-noise-ba5.notion.site/3df42d401011808bbc90cafe002fde87",
  contactEmail: "hashimoto@samurai-dx.com",
} as const;

// Intentionally false. The payment/download implementation is a separate phase.
// Do not turn this on until docs/requirements.md acceptance criteria are satisfied.
export const CHECKOUT_IMPLEMENTED: boolean = false;

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
  const url = new URL(process.env.SITE_URL ?? "http://localhost:3000");
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error("Invalid SITE_URL protocol");
  return new URL(url.origin);
}
