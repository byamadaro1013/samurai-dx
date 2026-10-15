import { NextResponse, type NextRequest } from "next/server";
import { checkoutInputSchema } from "@/const/bakusoku/checkout-input";
import { getSiteUrl, product } from "@/const/bakusoku/site";
import { getStripe, PRODUCT_KEY } from "@/lib/bakusoku/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function error(status: number, code: string, message: string) {
  return NextResponse.json(
    { error: { code, message } },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

/**
 * 購入モーダルの入力を検証し、Stripe Checkoutのセッションを作ってURLを返す。
 * 金額・商品はサーバー側で固定し、ブラウザから受け取らない。
 */
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin)
    return error(403, "FORBIDDEN", "不正なリクエストです。");

  const stripe = getStripe();
  if (!stripe)
    return error(
      503,
      "CHECKOUT_NOT_READY",
      "現在は販売準備中です。購入手続きはまだ開始できません。"
    );

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error(400, "INVALID_INPUT", "入力内容を確認してください。");
  }
  const input = checkoutInputSchema.safeParse(body);
  if (!input.success)
    return error(400, "INVALID_INPUT", "入力内容を確認してください。");
  const { officeName, customerName, email } = input.data;

  const requestKey = request.headers.get("idempotency-key");
  const site = getSiteUrl();
  const priceId = process.env.STRIPE_PRICE_ID;
  const metadata = { product: PRODUCT_KEY, officeName, customerName };

  try {
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        line_items: [
          priceId
            ? { price: priceId, quantity: 1 }
            : {
                price_data: {
                  currency: "jpy",
                  unit_amount: product.priceJpy,
                  product_data: { name: product.name },
                },
                quantity: 1,
              },
        ],
        customer_email: email,
        metadata,
        payment_intent_data: { metadata },
        locale: "ja",
        submit_type: "pay",
        success_url: `${site.origin}/bakusokunaiyoushoumei/thanks?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${site.origin}/bakusokunaiyoushoumei`,
      },
      requestKey && UUID_PATTERN.test(requestKey)
        ? { idempotencyKey: `bakusoku-checkout/${requestKey}` }
        : undefined
    );
    if (!session.url) throw new Error("Checkout session has no URL");
    return NextResponse.json(
      { checkoutUrl: session.url, orderId: session.id },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (cause) {
    console.error("[bakusoku] checkout session creation failed", cause);
    return error(
      502,
      "CHECKOUT_FAILED",
      "購入手続きを開始できませんでした。しばらくしてからもう一度お試しください。"
    );
  }
}
