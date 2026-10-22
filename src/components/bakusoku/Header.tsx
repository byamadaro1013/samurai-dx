"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { PurchaseButton } from "./PurchaseProvider";

const links = [
  ["/bakusokunaiyoushoumei#features", "できること"],
  ["/bakusokunaiyoushoumei#demo", "デモ動画"],
  ["/bakusokunaiyoushoumei#how-it-works", "使い方"],
  ["/bakusokunaiyoushoumei#pricing", "料金"],
  ["/bakusokunaiyoushoumei#faq", "よくある質問"],
  ["/bakusokunaiyoushoumei/articles", "記事"],
] as const;

export function Header() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 761px)");
    const onResize = () => {
      if (wide.matches) setExpanded(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    wide.addEventListener("change", onResize);
    document.addEventListener("keydown", onKey);
    return () => {
      wide.removeEventListener("change", onResize);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          href="/bakusokunaiyoushoumei"
          aria-label="バクソク内容証明 トップ"
        >
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M13 7h11v18H13M13 12h7M13 17h7M5 12h5M3 17h7M6 22h4" />
            </svg>
          </span>
          <span className="brand-word">
            バクソク内容証明<small>BAKUSOKU NAIYO SHOMEI</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {links.map(([href, label]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <PurchaseButton className="button button-small button-red header-cta">
          購入する <Icon name="arrow" />
        </PurchaseButton>
        <button
          className="menu-toggle"
          type="button"
          aria-label={expanded ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="mobile-nav"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <Icon name={expanded ? "close" : "menu"} />
        </button>
      </div>
      <nav
        className="mobile-nav"
        id="mobile-nav"
        aria-label="モバイルナビゲーション"
        hidden={!expanded}
      >
        {links.map(([href, label]) => (
          <Link href={href} key={href} onClick={() => setExpanded(false)}>
            {label}
          </Link>
        ))}
        <PurchaseButton
          className="purchase-nav-button"
          onClick={() => setExpanded(false)}
        >
          購入する <Icon name="arrow" />
        </PurchaseButton>
      </nav>
    </header>
  );
}
