// Meta広告の計測タグ(ピクセル)。ブラウザ専用。
// 公式の読み込みスニペットと同じ動きを関数にしたもので、イベントを送る前に必ず初期化する。
// これにより、子コンポーネントの送信がタグの読み込みより先に走っても取りこぼさない。

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "2078391856122175";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let lastPageViewPath: string | null = null;

function ensurePixel(): Fbq | null {
  if (typeof window === "undefined" || !META_PIXEL_ID) return null;
  if (window.fbq) return window.fbq;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq ??= fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  return fbq;
}

/** ページ表示を1回だけ送る(同じパスで二重に送らない) */
export function trackPageView(pathname: string) {
  const fbq = ensurePixel();
  if (!fbq || lastPageViewPath === pathname) return;
  lastPageViewPath = pathname;
  fbq("track", "PageView");
}

export function trackMetaEvent(
  event: "InitiateCheckout" | "Purchase",
  params: { value: number; currency: string; content_name?: string },
  eventId?: string
) {
  const fbq = ensurePixel();
  if (!fbq) return;
  fbq("track", event, params, eventId ? { eventID: eventId } : {});
}
