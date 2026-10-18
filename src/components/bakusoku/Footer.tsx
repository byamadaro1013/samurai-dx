import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link
            className="brand"
            href="/bakusokunaiyoushoumei"
            aria-label="バクソク内容証明 トップ"
          >
            <img
              className="brand-logo"
              src="/assets/bakusoku/logo.png"
              width="885"
              height="120"
              alt="バクソク内容証明"
            />
          </Link>
          <div className="footer-links">
            <a
              href="https://www.samuraidx.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              運営会社 ↗
            </a>
            <a
              href="https://slow-noise-ba5.notion.site/3df42d401011808bbc90cafe002fde87"
              target="_blank"
              rel="noopener noreferrer"
            >
              利用規約 ↗
            </a>
            <a
              href="https://note.com/samuraidx/n/nfd5973e2ed25"
              target="_blank"
              rel="noopener noreferrer"
            >
              特定商取引法に基づく表示 ↗
            </a>
            <a href="mailto:hashimoto@samurai-dx.com">お問い合わせ ↗</a>
          </div>
        </div>
        <p className="footer-disclaimer">
          本アプリは宛先・差出人・文面の正確性や法的効果を保証するものではありません。差出前に公式画面で必ずご確認ください。日本郵便株式会社およびe内容証明サービスとの提携・協力関係はありません。
        </p>
        <div className="footer-bottom">
          <span>© 2026 SamurAI DX Inc.</span>
          <a
            href="https://note.com/samuraidx/n/nfd5973e2ed25"
            target="_blank"
            rel="noopener noreferrer"
          >
            掲載情報・実画面の出典：公式note（2026年10月10日確認） ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
