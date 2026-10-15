import Stripe from "stripe";
import { getSiteUrl, product } from "@/const/bakusoku/site";

// サーバー専用。クライアントコンポーネントからimportしない。

export const PRODUCT_KEY = "bakusoku-naiyoushoumei";
const SESSION_ID_PATTERN = /^cs_(test|live)_[A-Za-z0-9]{10,255}$/;

let client: Stripe | null = null;

/** STRIPE_SECRET_KEY が未設定なら null(購入受付を止める) */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key);
  return client;
}

export type PaidOrder = {
  sessionId: string;
  email: string;
  officeName: string;
  customerName: string;
};

/**
 * Stripeから決済セッションを取り直し、この商品の支払いが完了しているときだけ注文を返す。
 * 完了画面・ダウンロード・Webhookのすべてでこれを通す。
 */
export async function getPaidOrder(
  sessionId: string | null | undefined
): Promise<PaidOrder | null> {
  const stripe = getStripe();
  if (!stripe || !sessionId || !SESSION_ID_PATTERN.test(sessionId)) return null;
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
  const email = session.customer_details?.email ?? session.customer_email;
  if (
    session.mode !== "payment" ||
    session.payment_status !== "paid" ||
    session.metadata?.product !== PRODUCT_KEY ||
    session.currency !== "jpy" ||
    session.amount_total !== product.priceJpy ||
    !email
  )
    return null;
  return {
    sessionId: session.id,
    email,
    officeName: session.metadata.officeName ?? "",
    customerName: session.metadata.customerName ?? "",
  };
}

export const platforms = {
  windows: {
    label: "Windows版（.exe）",
    env: "BAKUSOKU_DOWNLOAD_URL_WINDOWS",
  },
  mac: { label: "Mac版（.dmg）", env: "BAKUSOKU_DOWNLOAD_URL_MAC" },
} as const;

export type Platform = keyof typeof platforms;

export function isPlatform(value: string): value is Platform {
  return Object.hasOwn(platforms, value);
}

/** 実ファイルのURL(環境変数)。購入確認後のリダイレクト先にだけ使う */
export function getFileUrl(platform: Platform): URL | null {
  const raw = process.env[platforms[platform].env];
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

/** 購入者に見せるダウンロードリンク。開くたびにサーバーで決済状態を確認する */
export function getDownloadLink(platform: Platform, sessionId: string): string {
  const url = new URL(`/api/bakusoku/download/${platform}`, getSiteUrl());
  url.searchParams.set("session_id", sessionId);
  return url.href;
}
