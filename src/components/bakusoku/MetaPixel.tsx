"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { product } from "@/const/bakusoku/site";
import { trackMetaEvent, trackPageView } from "@/lib/bakusoku/meta-pixel";

/** バクソク内容証明の全ページでMetaの計測タグを読み込み、ページ表示を送る */
export function MetaPixel() {
  const pathname = usePathname();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

const PURCHASE_SENT_PREFIX = "bakusoku:meta-purchase:";

/**
 * 決済が確認できたときだけ完了画面に置く。購入イベントを注文ごとに1回だけ送る。
 * 再読み込みでの二重送信は、ブラウザ保存の記録と注文番号(eventID)で防ぐ。
 */
export function MetaPurchase({ orderId }: { orderId: string }) {
  useEffect(() => {
    const key = PURCHASE_SENT_PREFIX + orderId;
    try {
      if (window.localStorage.getItem(key)) return;
    } catch {
      // 保存領域が使えない環境でも送信は行う(eventIDでMeta側が重複をまとめる)
    }
    trackMetaEvent(
      "Purchase",
      {
        value: product.priceJpy,
        currency: product.currency,
        content_name: product.name,
      },
      orderId
    );
    try {
      window.localStorage.setItem(key, "1");
    } catch {
      // 記録できなくても計測自体は済んでいる
    }
  }, [orderId]);
  return null;
}
