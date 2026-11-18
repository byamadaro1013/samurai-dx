import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { sendOrderNotification, sendPurchaseMail } from "@/lib/bakusoku/mail";
import { getPaidOrder, getStripe } from "@/lib/bakusoku/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAID_EVENTS = new Set<Stripe.Event["type"]>([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

/**
 * Stripe Webhook。署名を検証し、支払い完了ならダウンロードリンクを購入者に、注文通知を運営側にメールで送る。
 * メール送信に失敗したら500を返し、Stripeの自動再送に任せる。
 */
export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret)
    return NextResponse.json({ error: "not configured" }, { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature)
    return NextResponse.json({ error: "missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    // 署名検証には加工前の本文をそのまま渡す
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      secret
    );
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  if (!PAID_EVENTS.has(event.type))
    return NextResponse.json({ received: true });

  const session = event.data.object as Stripe.Checkout.Session;
  // イベント本文を鵜呑みにせず、Stripeから取り直して支払い済みか確かめる
  const order = await getPaidOrder(session.id);
  if (!order) return NextResponse.json({ received: true });

  try {
    await sendPurchaseMail(order);
    await sendOrderNotification(order);
  } catch (cause) {
    console.error("[bakusoku] purchase mail failed", session.id, cause);
    return NextResponse.json({ error: "mail failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
