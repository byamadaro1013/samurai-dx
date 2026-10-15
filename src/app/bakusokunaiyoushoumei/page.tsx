import { Footer } from "@/components/bakusoku/Footer";
import { Header } from "@/components/bakusoku/Header";
import { PurchaseButton } from "@/components/bakusoku/PurchaseProvider";
import {
  ImageButton,
  MediaProvider,
  VideoButton,
} from "@/components/bakusoku/MediaProvider";
import { formatJPY, product } from "@/const/bakusoku/site";

export default function HomePage() {
  return (
    <MediaProvider>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <Header />
      <main id="main">
        <section className="hero">
          <div className="hero-inner container">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="live-dot" /> e内容証明 入力支援アプリ
              </p>
              <h1>
                その入力、
                <br />
                <span className="text-red">バクソクに。</span>
              </h1>
              <p className="hero-description">
                書面に向き合う時間を、取り戻す。
                <br />
                e内容証明の繰り返し入力と画面遷移を、
                <br className="desktop-break" />
                まとめて自動化。
              </p>
              <div className="hero-actions">
                <PurchaseButton className="button button-red">
                  購入する{" "}
                  <svg className="icon">
                    <use href="#i-external" />
                  </svg>
                </PurchaseButton>
                <a className="video-link" href="#demo">
                  <span className="play-small">
                    <svg className="icon">
                      <use href="#i-play" />
                    </svg>
                  </span>
                  デモ動画を見る
                </a>
              </div>
              <div className="hero-support">
                <span>
                  <svg className="icon">
                    <use href="#i-windows" />
                  </svg>
                  Windows 64bit
                </span>
                <span>macOS</span>
                <span className="support-price">
                  {formatJPY(product.priceJpy)}円
                  <span className="tax">（税込）</span>
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <span className="visual-orbit orbit-one" aria-hidden="true" />
              <span className="visual-orbit orbit-two" aria-hidden="true" />
              <div className="screen-topline">
                <span className="tiny-label">DESIGNED FOR YOUR WORKFLOW</span>
                <span className="tiny-label">01 / APPLICATION</span>
              </div>
              <ImageButton
                className="app-image image-trigger"
                src="/assets/bakusoku/app-screen.png"
                title="バクソク内容証明 — 実際のアプリ画面"
                label="実際のアプリ画面を拡大する"
              >
                <img
                  src="/assets/bakusoku/app-screen.png"
                  width="1200"
                  height="726"
                  alt="バクソク内容証明の実際の画面。左に案件一覧、中央に入力欄、右に日本郵便の公式画面が並んでいます。"
                  fetchPriority="high"
                />
                <span className="image-zoom">
                  <svg className="icon">
                    <use href="#i-zoom" />
                  </svg>{" "}
                  実画面を拡大
                </span>
              </ImageButton>
              <div className="speed-note">
                <span className="speed-note-label">
                  入力開始から文書確認まで
                </span>
                <span className="speed-value">
                  <small>約</small>30<span>秒</span>
                  <sup>※</sup>
                </span>
                <span className="speed-note-caption">
                  面倒な入力は、アプリに。
                </span>
              </div>
              <div className="screen-caption">
                <span>
                  <i>01</i> 案件一覧
                </span>
                <span>
                  <i>02</i> 入力欄
                </span>
                <span>
                  <i>03</i> 公式画面
                </span>
              </div>
            </div>
          </div>
          <div className="hero-bottom container">
            <p>
              ※
              記事執筆者による実測値です。環境・文書・宛先数などにより所要時間は異なります。文書確認・差出し・決済は利用者が行います。
            </p>
            <a href="#features" className="scroll-link">
              SCROLL TO EXPLORE <span>↓</span>
            </a>
          </div>
        </section>
        <div className="audience-strip">
          <div className="audience-inner container">
            <p>内容証明を、日々の仕事に使う方へ。</p>
            <div>
              <span>弁護士</span>
              <span>司法書士</span>
              <span>行政書士</span>
              <span>企業の法務部門</span>
            </div>
          </div>
        </div>
        <section className="problem-section section container">
          <div className="section-heading">
            <p className="eyebrow section-eyebrow">THE EVERYDAY FRICTION</p>
            <h2>
              考える仕事の前に、
              <br />
              入力で疲れていませんか。
            </h2>
            <p className="section-description">
              一つひとつは小さな作業。
              <br />
              でも、毎回となると大きな負担に。
            </p>
          </div>
          <div className="problem-list">
            <div className="problem-row">
              <span className="problem-number">01</span>
              <div>
                <h3>毎回、同じ住所を打ち直す。</h3>
                <p>差出人も、以前送った相手も、また最初から。</p>
              </div>
              <span className="problem-mark" aria-hidden="true">
                ↻
              </span>
            </div>
            <div className="problem-row">
              <span className="problem-number">02</span>
              <div>
                <h3>入力エラーで、行ったり来たり。</h3>
                <p>全角・半角、書式の確認、画面の切り替え。</p>
              </div>
              <span className="problem-mark" aria-hidden="true">
                ↔
              </span>
            </div>
            <div className="problem-row">
              <span className="problem-number">03</span>
              <div>
                <h3>宛先の数だけ、同じ操作。</h3>
                <p>複数の相手方への差出しで、手間が積み重なる。</p>
              </div>
              <span className="problem-mark" aria-hidden="true">
                ×
              </span>
            </div>
          </div>
        </section>
        <section className="features-section section" id="features">
          <div className="container">
            <div className="section-top">
              <div>
                <p className="eyebrow section-eyebrow">
                  LESS INPUT. MORE FOCUS.
                </p>
                <h2>
                  いつもの手間を、
                  <br />
                  ひとまとめに。
                </h2>
              </div>
              <p className="section-description">
                登録した情報を再利用しながら、
                <br />
                公式画面への入力をアプリが進めます。
              </p>
            </div>
            <div className="feature-grid">
              <article className="feature-card feature-address">
                <div className="feature-card-top">
                  <svg className="icon feature-icon">
                    <use href="#i-people" />
                  </svg>
                  <span className="feature-index">01</span>
                </div>
                <h3>
                  住所は「入力」から
                  <br />
                  「選択」へ。
                </h3>
                <p>
                  差出人・受取人を保存して再利用。複数の宛先も、まとめて入力支援。
                </p>
                <div className="address-visual" aria-hidden="true">
                  <span className="address-tag">
                    <span className="avatar-dot">差</span>保存した差出人
                    <svg className="icon">
                      <use href="#i-check" />
                    </svg>
                  </span>
                  <span className="address-tag">
                    <span className="avatar-dot recipient-dot">宛</span>
                    登録済みの受取人
                    <svg className="icon">
                      <use href="#i-check" />
                    </svg>
                  </span>
                </div>
              </article>
              <article className="feature-card feature-docx">
                <div className="feature-card-top">
                  <svg className="icon feature-icon">
                    <use href="#i-file" />
                  </svg>
                  <span className="feature-index">02</span>
                </div>
                <h3>
                  アップロード前に、
                  <br />
                  文書の規定をチェック。
                </h3>
                <p>
                  .docxの規定適合を事前に判定。書式のエラーで戻る手間を減らします。
                </p>
                <div className="docx-visual" aria-hidden="true">
                  <div className="file-art">
                    <svg className="icon">
                      <use href="#i-file" />
                    </svg>
                    <span>.docx</span>
                  </div>
                  <span className="check-stamp">
                    <svg className="icon">
                      <use href="#i-check" />
                    </svg>
                  </span>
                  <span>送る前にチェック</span>
                </div>
              </article>
              <article className="feature-card feature-workflow">
                <div className="feature-card-top">
                  <svg className="icon feature-icon">
                    <use href="#i-monitor" />
                  </svg>
                  <span className="feature-index">03</span>
                </div>
                <h3>
                  入力も公式画面も、
                  <br />
                  一つのアプリで。
                </h3>
                <p>
                  案件・入力欄・公式画面を並べた構成。画面を離れず進捗を確認できます。
                </p>
                <div className="panes-visual" aria-hidden="true">
                  <span>案件</span>
                  <span>入力</span>
                  <span>
                    公式画面
                    <svg className="icon">
                      <use href="#i-arrow" />
                    </svg>
                  </span>
                </div>
              </article>
              <article className="feature-card feature-cases">
                <div className="feature-card-top">
                  <svg className="icon feature-icon">
                    <use href="#i-history" />
                  </svg>
                  <span className="feature-index">04</span>
                </div>
                <h3>
                  あの案件、あの宛先を、
                  <br />
                  すぐに振り返る。
                </h3>
                <p>
                  案件名・案件番号で検索。過去の差出し先を、案件ごとに確認できます。
                </p>
                <div className="history-visual" aria-hidden="true">
                  <span className="history-line">
                    <span className="history-dot" />
                    案件一覧 <span>→</span>
                  </span>
                  <span className="history-line">
                    <span className="history-dot" />
                    差出し履歴 <span>→</span>
                  </span>
                </div>
              </article>
            </div>
            <p className="visual-note">
              図は機能のイメージです。実際の操作画面はページ上部・操作動画でご確認いただけます。
            </p>
          </div>
        </section>
        <section
          className="demo-section section"
          id="demo"
          aria-labelledby="demo-heading"
        >
          <div className="container">
            <div className="section-top">
              <div>
                <p className="eyebrow section-eyebrow">SEE IT IN ACTION</p>
                <h2 id="demo-heading">
                  実際の操作を、
                  <br />
                  動画でチェック。
                </h2>
              </div>
              <p className="section-description">
                入力支援を開始して、確認画面へ。
                <br />
                実際のアプリの動きをご覧ください。
              </p>
            </div>
            <figure className="demo-figure">
              <div className="demo-player">
                <div className="demo-player-heading">
                  <span>
                    <svg className="icon" aria-hidden="true">
                      <use href="#i-play" />
                    </svg>
                    バクソク内容証明 — 操作デモ
                  </span>
                  <span className="demo-duration">01:11</span>
                </div>
                <video
                  id="demo-video"
                  controls
                  playsInline
                  preload="none"
                  poster="/assets/bakusoku/demo-poster.jpg"
                  width="2464"
                  height="1440"
                  aria-label="バクソク内容証明の操作デモ、約1分11秒"
                  aria-describedby="demo-summary"
                >
                  <source
                    src="/assets/bakusoku/demo-operation.mp4"
                    type="video/mp4"
                  />
                  お使いのブラウザで動画を再生できない場合は、
                  <a
                    href="https://x.com/inagorevival/status/2110441971965964602"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Xでデモ動画をご覧ください。
                  </a>
                </video>
              </div>
              <figcaption className="demo-caption">
                <div>
                  <p id="demo-summary">
                    入力支援から確認画面までの操作デモです。最終確認・差出し・決済は利用者が行います。
                  </p>
                  <p className="demo-credit">
                    出典：弁護士 橋本 祐弥 / 株式会社SamurAI DX のX投稿
                  </p>
                </div>
                <a
                  className="demo-source-link"
                  href="https://x.com/inagorevival/status/2110441971965964602"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  元の投稿をXで見る{" "}
                  <svg className="icon" aria-hidden="true">
                    <use href="#i-external" />
                  </svg>
                </a>
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="how-section section container" id="how-it-works">
          <div className="section-top">
            <div>
              <p className="eyebrow section-eyebrow">HOW IT WORKS</p>
              <h2>
                準備して、任せて、
                <br />
                最後は自分で確認。
              </h2>
            </div>
            <VideoButton className="video-trigger button button-outline">
              <svg className="icon">
                <use href="#i-play" />
              </svg>{" "}
              実際の操作を見る
            </VideoButton>
          </div>
          <ol className="step-grid">
            <li>
              <span className="step-number">
                01<span>PREPARE</span>
              </span>
              <h3>文書と宛先を準備</h3>
              <p>
                文書を添付し、差出人・受取人を設定。登録済みの情報は選ぶだけ。
              </p>
            </li>
            <li>
              <span className="step-number">
                02<span>AUTOMATE</span>
              </span>
              <h3>入力支援をスタート</h3>
              <p>
                公式画面でログインし、注意事項に同意。アプリが入力と画面遷移を進めます。
              </p>
            </li>
            <li>
              <span className="step-number">
                03<span>REVIEW &amp; SEND</span>
              </span>
              <h3>確認して、差し出す</h3>
              <p>
                公式画面で文書の全ページ・宛先・料金を確認。差出しと決済はご自身で。
              </p>
            </li>
          </ol>
          <div className="step-note">
            <svg className="icon">
              <use href="#i-shield" />
            </svg>
            <p>
              自動入力は文書確認で停止。
              <strong>取消しのできない最終操作は、自動化しません。</strong>
            </p>
          </div>
        </section>
        <section className="security-section section" id="security">
          <div className="security-grid container">
            <div className="security-copy">
              <p className="eyebrow section-eyebrow">SPEED WITH CONTROL</p>
              <h2>
                速く進めて、
                <br />
                大事なところで止まる。
              </h2>
              <p>
                大切な書面を扱う仕事だから。
                <br />
                自動化する範囲と、確認する場所を明確に。
              </p>
              <ul className="security-list">
                <li>
                  <svg className="icon">
                    <use href="#i-check" />
                  </svg>
                  <span>文書の読み込み・規定チェックはPC内で処理</span>
                </li>
                <li>
                  <svg className="icon">
                    <use href="#i-check" />
                  </svg>
                  <span>生成AI APIを使わず、AIベンダーへ文書を送信しない</span>
                </li>
                <li>
                  <svg className="icon">
                    <use href="#i-check" />
                  </svg>
                  <span>差出人・受取人・案件データはPC内に保存</span>
                </li>
              </ul>
              <p className="security-footnote">
                日本郵便の公式サイトへ接続します。Google
                Drive保存機能を使う場合は、ご自身のDriveへ保存します。
              </p>
            </div>
            <figure className="security-figure">
              <ImageButton
                className="image-trigger consent-image"
                src="/assets/bakusoku/confirmation-screen.png"
                title="入力支援を開始する前の、実際の確認画面"
                label="入力支援開始前の確認画面を拡大する"
              >
                <img
                  src="/assets/bakusoku/confirmation-screen.png"
                  width="885"
                  height="621"
                  alt="入力支援開始前の同意ダイアログ。最終確認と差出しは手動で行うことなどが表示されています。"
                  loading="lazy"
                />
                <span className="image-zoom">
                  <svg className="icon">
                    <use href="#i-zoom" />
                  </svg>{" "}
                  実画面を拡大
                </span>
              </ImageButton>
              <figcaption>
                <span className="live-dot" />{" "}
                入力支援の開始前に、注意事項を確認。
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="pricing-section section" id="pricing">
          <div className="pricing-grid container">
            <div className="pricing-copy">
              <p className="eyebrow section-eyebrow">SIMPLE PRICING</p>
              <h2>
                一度の購入で、
                <br />
                事務所のみんなに。
              </h2>
              <p className="section-description">
                同じ事務所なら、人数・台数を問わず利用可能。
                <br />
                日々の差出しを、もっと身軽に。
              </p>
              <div className="os-badges">
                <span>
                  <svg className="icon">
                    <use href="#i-windows" />
                  </svg>{" "}
                  Windows 64bit
                </span>
                <span>macOS</span>
              </div>
            </div>
            <div className="price-card">
              <div className="price-card-head">
                <span>バクソク内容証明</span>
                <span className="purchase-badge">買い切り</span>
              </div>
              <p className="price">
                <span className="yen">¥</span>
                {formatJPY(product.priceJpy)}
                <span className="price-tax">税込</span>
              </p>
              <ul className="price-includes">
                <li>
                  <svg className="icon">
                    <use href="#i-check" />
                  </svg>
                  同一事務所内なら、人数・台数の制限なし
                </li>
                <li>
                  <svg className="icon">
                    <use href="#i-check" />
                  </svg>
                  アップデート無償
                </li>
                <li>
                  <svg className="icon">
                    <use href="#i-check" />
                  </svg>
                  購入者専用ページからアプリをダウンロード
                </li>
              </ul>
              <PurchaseButton className="button button-red button-wide">
                購入する{" "}
                <svg className="icon">
                  <use href="#i-external" />
                </svg>
              </PurchaseButton>
              <p className="purchase-note">
                購入ボタンから事務所名・メールアドレスを入力します。
                <br />
                郵便料金は日本郵便の公式画面でご確認ください。
              </p>
            </div>
          </div>
        </section>
        <section className="faq-section section container" id="faq">
          <div className="faq-heading">
            <p className="eyebrow section-eyebrow">FAQ</p>
            <h2>
              気になることを、
              <br />
              先に解決。
            </h2>
            <a className="contact-link" href="mailto:hashimoto@samurai-dx.com">
              お問い合わせ{" "}
              <svg className="icon">
                <use href="#i-external" />
              </svg>
            </a>
          </div>
          <div className="faq-list">
            <details open>
              <summary>
                どのパソコンで使えますか？
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>
                Windows（64bit）とmacOSに対応するデスクトップアプリです。購入・インストール前に、noteの案内と利用規約をご確認ください。
              </p>
            </details>
            <details>
              <summary>
                決済や差出しも、自動で行われますか？
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>
                自動化は入力作業までです。文書の全ページ、宛先、料金は公式画面でご確認いただき、料金の確定・差出し・決済は利用者ご自身で行います。
              </p>
            </details>
            <details>
              <summary>
                文書を生成AIへ送信しますか？
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>
                生成AI
                APIは使用していません。文書の読み込みと規定チェックはPC内で行い、AIベンダーのサーバーへ文書を送信しない設計です。
              </p>
            </details>
            <details>
              <summary>
                事務所内の複数人で使えますか？
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>
                同一事務所内であれば、人数・台数を問わず利用できます。事務所外への配布、転売、再頒布は禁止されています。
              </p>
            </details>
            <details>
              <summary>
                購入後のダウンロード・更新方法は？
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>
                購入後の専用ページからWindows版・Mac版をダウンロードする流れです。最新版の取得方法は購入時の案内をご確認ください。アップデートは無償です。
              </p>
            </details>
            <details>
              <summary>
                日本郵便の公式アプリですか？
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>
                株式会社SamurAI
                DXが提供する入力支援アプリです。日本郵便株式会社およびe内容証明サービスとの提携・協力関係はありません。公式画面の仕様変更により、入力支援が正常に動作しなくなる場合があります。
              </p>
            </details>
          </div>
        </section>
        <section className="closing-section">
          <div className="closing-inner container">
            <div>
              <p className="eyebrow">YOUR TIME, BACK TO YOU.</p>
              <h2>
                作業を減らして、
                <br />
                書面に向き合う時間を。
              </h2>
            </div>
            <div className="closing-actions">
              <PurchaseButton className="button button-white">
                バクソク内容証明を購入{" "}
                <svg className="icon">
                  <use href="#i-external" />
                </svg>
              </PurchaseButton>
              <span>
                Windows / macOS 対応 · {formatJPY(product.priceJpy)}円（税込）
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <div className="mobile-purchase">
        <span>
          {formatJPY(product.priceJpy)}
          <small>円（税込）</small>
        </span>
        <PurchaseButton className="button button-red button-small">
          購入する{" "}
          <svg className="icon">
            <use href="#i-external" />
          </svg>
        </PurchaseButton>
      </div>
    </MediaProvider>
  );
}
