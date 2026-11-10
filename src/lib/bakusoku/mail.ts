import { product } from "@/const/bakusoku/site";
import { getDownloadLink, platforms, type PaidOrder } from "./stripe";

// サーバー専用。Resend の REST API で購入案内メールを送る。

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendMail(
  idempotencyKey: string,
  mail: {
    to: string[];
    reply_to: string;
    subject: string;
    text: string;
    html?: string;
  }
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BAKUSOKU_MAIL_FROM;
  if (!apiKey || !from)
    throw new Error("RESEND_API_KEY / BAKUSOKU_MAIL_FROM is not set");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Webhookの再送で同じメールが二重に届かないようにする(Resend側で24時間有効)
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({ from, ...mail }),
  });
  if (!response.ok)
    throw new Error(`Resend responded with status ${response.status}`);
}

export async function sendPurchaseMail(order: PaidOrder): Promise<void> {
  const links = (Object.keys(platforms) as (keyof typeof platforms)[]).map(
    (platform) => ({
      label: platforms[platform].label,
      href: getDownloadLink(platform, order.sessionId),
    })
  );
  const greeting = `${order.officeName}\n${order.customerName} 様`;
  const text = [
    greeting,
    "",
    `このたびは${product.name}をご購入いただき、ありがとうございます。`,
    "決済が完了しましたので、以下のリンクからアプリをダウンロードしてください。",
    "",
    ...links.map(({ label, href }) => `■ ${label}\n${href}\n`),
    "このリンクはご購入者さま専用です。第三者へ共有しないでください。",
    `ご不明な点は ${product.contactEmail} までご連絡ください。`,
    "",
    "株式会社SamurAI DX",
  ].join("\n");
  const html = `<div style="font-family:sans-serif;line-height:1.8;color:#1d2420">
<p>${escapeHtml(order.officeName)}<br>${escapeHtml(order.customerName)} 様</p>
<p>このたびは${escapeHtml(product.name)}をご購入いただき、ありがとうございます。<br>決済が完了しましたので、以下のリンクからアプリをダウンロードしてください。</p>
${links
  .map(
    ({ label, href }) =>
      `<p><a href="${escapeHtml(href)}" style="display:inline-block;padding:10px 18px;background:#b2291b;color:#fff;text-decoration:none;border-radius:6px">${escapeHtml(label)}をダウンロード</a></p>`
  )
  .join("\n")}
<p style="font-size:12px;color:#5b665f">このリンクはご購入者さま専用です。第三者へ共有しないでください。<br>ご不明な点は ${escapeHtml(product.contactEmail)} までご連絡ください。</p>
<p>株式会社SamurAI DX</p>
</div>`;

  await sendMail(`bakusoku-purchase/${order.sessionId}`, {
    to: [order.email],
    reply_to: product.contactEmail,
    subject: `【${product.name}】ダウンロードのご案内`,
    text,
    html,
  });
}

/** 運営側への注文通知。購入フォームに入力された内容を orderNotifyEmail に送る */
export async function sendOrderNotification(order: PaidOrder): Promise<void> {
  const text = [
    `${product.name}の購入がありました。`,
    "",
    `事務所名: ${order.officeName}`,
    `お名前: ${order.customerName}`,
    `メールアドレス: ${order.email}`,
    `金額: ${product.priceJpy.toLocaleString("ja-JP")}円(税込)`,
    `Stripe決済ID: ${order.sessionId}`,
  ].join("\n");
  await sendMail(`bakusoku-order-notify/${order.sessionId}`, {
    to: [product.orderNotifyEmail],
    reply_to: order.email,
    subject: `【${product.name}】購入通知: ${order.officeName}`,
    text,
  });
}
