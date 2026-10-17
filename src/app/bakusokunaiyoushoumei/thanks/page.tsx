import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/bakusoku/Footer";
import { Header } from "@/components/bakusoku/Header";
import { MetaPurchase } from "@/components/bakusoku/MetaPixel";
import { product } from "@/const/bakusoku/site";
import {
  getDownloadLink,
  getPaidOrder,
  platforms,
  type Platform,
} from "@/lib/bakusoku/stripe";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `ご購入ありがとうございます | ${product.name}`,
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ session_id?: string | string[] }> };

export default async function ThanksPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const order = await getPaidOrder(
    typeof session_id === "string" ? session_id : null
  );

  return (
    <>
      <Header />
      <main id="main" className="thanks-shell">
        <div className="thanks-card container">
          {order ? (
            <>
              <MetaPurchase orderId={order.sessionId} />
              <p className="thanks-eyebrow">決済完了</p>
              <h1>ご購入ありがとうございます</h1>
              <p>
                {order.officeName}　{order.customerName} 様
                <br />
                {product.name}
                のお支払いが完了しました。お使いのパソコンに合わせてダウンロードしてください。
              </p>
              <div className="thanks-downloads">
                {(Object.keys(platforms) as Platform[]).map((platform) => (
                  <a
                    key={platform}
                    className="button button-red button-wide"
                    href={getDownloadLink(platform, order.sessionId)}
                  >
                    {platforms[platform].label}をダウンロード
                  </a>
                ))}
              </div>
              <p className="thanks-note">
                同じダウンロードリンクを <strong>{order.email}</strong>{" "}
                宛てにメールでお送りしました。届かない場合は迷惑メールフォルダをご確認のうえ、
                <a href={`mailto:${product.contactEmail}`}>
                  {product.contactEmail}
                </a>
                までご連絡ください。
              </p>
            </>
          ) : (
            <>
              <p className="thanks-eyebrow">確認中</p>
              <h1>お支払いを確認しています</h1>
              <p>
                決済の確認に少し時間がかかる場合があります。しばらくしてからこのページを再読み込みしてください。決済が完了すると、ダウンロードリンクをメールでもお送りします。
              </p>
              <p className="thanks-note">
                再度ご購入いただく必要はありません。解決しない場合は
                <a href={`mailto:${product.contactEmail}`}>
                  {product.contactEmail}
                </a>
                までご連絡ください。
              </p>
            </>
          )}
          <Link className="thanks-back" href="/bakusokunaiyoushoumei">
            製品ページへ戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
