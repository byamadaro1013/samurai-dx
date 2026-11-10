import { Footer } from "@/components/bakusoku/Footer";
import { Header } from "@/components/bakusoku/Header";
import { PurchaseButton } from "@/components/bakusoku/PurchaseProvider";
import {
  ImageButton,
  MediaProvider,
  VideoButton,
} from "@/components/bakusoku/MediaProvider";
import Link from "next/link";
import { Icon } from "@/components/bakusoku/Icon";
import { JsonLd } from "@/components/bakusoku/JsonLd";
import { articlesBasePath, getArticles } from "@/const/bakusoku/articles";
import {
  absoluteUrl,
  formatJPY,
  ogImage,
  product,
  publisherJsonLd,
  publisherName,
} from "@/const/bakusoku/site";
import "./articles.css";

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Windows, macOS",
  description:
    "e内容証明の入力を自動化する入力支援アプリ。全角・半角の自動調整、住所自動入力、書式エラーの事前検知に対応し、入力・確認・決済の3操作で約2分で送付できます。",
  url: absoluteUrl(articlesBasePath),
  image: absoluteUrl(ogImage.url),
  offers: {
    "@type": "Offer",
    price: product.priceJpy,
    priceCurrency: product.currency,
  },
  publisher: publisherJsonLd,
};

const specRows: ReadonlyArray<readonly [string, string]> = [
  ["製品名", product.name],
  ["提供", `${publisherName}（代表取締役・弁護士　橋本 祐弥）`],
  ["対応OS", "Windows（64bit）／macOS"],
  ["対応する差出方法", "e内容証明の「かんたん差出し」「差出し」"],
  ["価格", `${formatJPY(product.priceJpy)}円（税込）（買い切り）`],
  [
    "ライセンス",
    "同一事務所内であれば、人数・台数の制限なし。事務所外への配布・転売は不可。",
  ],
  ["アップデート", "無償"],
  ["購入先", "本ページの購入ボタンから（クレジットカード決済）"],
  ["想定ユーザー", "弁護士、司法書士、行政書士、企業の法務部門"],
];

const faqs: ReadonlyArray<readonly [string, string]> = [
  [
    "事務所の全員で使えますか。",
    "同一事務所内であれば、人数・台数の制限なくお使いいただけます。買い切りですので、追加の費用はかかりません。事務所外の第三者への配布・転売はお断りしています。",
  ],
  [
    "差出しまで全部自動でやってくれるのですか。",
    "いいえ。自動入力は文書確認画面で停止します。料金の確定、購入、差出し、決済は利用者ご自身の操作です。取消しのできない操作を自動化しない設計にしています。",
  ],
  [
    "依頼者の情報が外部に出ることはありませんか。",
    "文書の読み込みと書式チェックはお使いのPC内で完結します。生成AIのAPIなどの外部サービスは使用しておらず、文書や差出人・受取人の情報が当社のサーバーへ送信されることはありません。通信が発生するのは、日本郵便の公式サイトへの接続と、任意機能であるGoogle Driveへの保存のみです。",
  ],
  [
    "日本郵便の公式ツールですか。",
    "いいえ。株式会社SamurAI DXが提供する入力支援アプリで、日本郵便株式会社およびe内容証明サービスとの提携・協力関係はありません。",
  ],
  [
    "公式画面の仕様が変わったら使えなくなりませんか。",
    "日本郵便側の画面仕様が変更された場合、入力支援が正常に動作しなくなることがあります。その際は可能な範囲で更新版を無償で配布しますが、対応を保証するものではありません。",
  ],
  [
    "アップデートは有料ですか。",
    "無償です。一度ご購入いただければ、以降の更新版を追加費用なしでお使いいただけます。",
  ],
];

const errorHubHref = `${articlesBasePath}/error`;

export default function HomePage() {
  const articles = getArticles();
  const errorHub = articles.find((article) => article.href === errorHubHref);
  // エラー一覧以外の記事(エラー別の解説と、使えない文字の一覧)
  const errorGuides = articles.filter(
    (article) => article.href !== errorHubHref
  );
  return (
    <MediaProvider>
      <JsonLd data={softwareJsonLd} />
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <Header />
      <main id="main">
        <section className="hero">
          <div className="hero-inner container">
            <div className="hero-copy">
              <h1 className="hero-title">
                <span className="eyebrow">
                  <span className="live-dot" />{" "}
                  {"e内容証明 入力支援アプリ「バクソク内容証明」"}
                </span>
                <span className="hero-catch">
                  e内容証明を、
                  <br />
                  <span className="text-red">バクソクで。</span>
                </span>
              </h1>
              <p className="hero-description">
                全角・半角エラーや書式エラーのストレス、使いづらい入力画面、遅い画面遷移など、e内容証明の問題を全て解決します。
              </p>
              <dl className="hero-metrics">
                <div>
                  <dt>操作数</dt>
                  <dd>
                    たった<strong>3</strong>操作
                    <small>（入力・確認・決済）</small>
                  </dd>
                </div>
                <div>
                  <dt>1通あたりの作業時間</dt>
                  <dd>
                    <s>約7分</s>
                    <span aria-hidden="true">→</span>
                    <span className="visually-hidden">から</span>約
                    <strong>2</strong>分<sup>※</sup>
                  </dd>
                </div>
              </dl>
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
                  <span className="tax">（税込）買い切り</span>
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
                <span className="speed-note-label">1通あたりの作業時間</span>
                <span className="speed-value">
                  <small>約</small>2<span>分</span>
                  <sup>※</sup>
                </span>
                <span className="speed-note-caption">
                  従来は約7分の作業が。
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
              当社実測の1通あたりの作業時間です。操作者や環境、宛先数等により異なることがあります。文書確認・差出し・決済は利用者が行います。
            </p>
            <a href="#how-it-works" className="scroll-link">
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
        <section className="problem-section section container" id="problem">
          <div className="section-heading">
            <p className="eyebrow section-eyebrow">PROBLEM</p>
            <h2>
              ストレスフルで
              <br />
              とにかく使いづらい
              <br />
              e内容証明
            </h2>
            <p className="section-description">
              e内容証明は便利ですが、
              <br />
              とにかく使いにくくてストレスフル。
            </p>
          </div>
          <div className="problem-list">
            <div className="problem-row">
              <span className="problem-number">01</span>
              <div>
                <h3>入力画面が使いづらい。</h3>
                <p>差出人の住所・氏名の入力画面が使いづらい。</p>
              </div>
              <span className="problem-mark" aria-hidden="true">
                ?
              </span>
            </div>
            <div className="problem-row">
              <span className="problem-number">02</span>
              <div>
                <h3>全角・半角エラーで差し戻し。</h3>
                <p>
                  全角で入れると「半角で入力してください」と弾かれ、直してまた次へ進む。
                </p>
              </div>
              <span className="problem-mark" aria-hidden="true">
                ↔
              </span>
            </div>
            <div className="problem-row">
              <span className="problem-number">03</span>
              <div>
                <h3>画面遷移が多く、遅い。</h3>
                <p>画面遷移が多く、1画面ごとに読み込みを待つ。</p>
              </div>
              <span className="problem-mark" aria-hidden="true">
                …
              </span>
            </div>
            <div className="problem-row">
              <span className="problem-number">04</span>
              <div>
                <h3>宛先の数だけ、同じ入力。</h3>
                <p>受取人が3人いれば、同じ入力を3回繰り返す。</p>
              </div>
              <span className="problem-mark" aria-hidden="true">
                ↻
              </span>
            </div>
            <div className="problem-row">
              <span className="problem-number">05</span>
              <div>
                <h3>書式エラーで、Wordからやり直し。</h3>
                <p>
                  文書をアップロードすると余白が足りないと弾かれ、Wordに戻って直してやり直す。
                </p>
              </div>
              <span className="problem-mark" aria-hidden="true">
                ×
              </span>
            </div>
          </div>
          <div className="problem-summary">
            <p>
              1通送るのに早くても<strong>7分</strong>
              。エラーが続くと<strong>30分</strong>
              経っていた、なんてこともあります。
            </p>
            <p className="problem-answer">
              そんなe内容証明を「たった3操作・2分」で送れるようにするのが「バクソク内容証明」です。
            </p>
          </div>
        </section>
        <section className="how-section section container" id="how-it-works">
          <div className="section-top">
            <div>
              <p className="eyebrow section-eyebrow">SOLUTION</p>
              <h2>
                たった3操作で送付完了。
                <br />
                その間、僅か2分。
              </h2>
            </div>
            <VideoButton className="video-trigger button button-outline">
              <svg className="icon">
                <use href="#i-play" />
              </svg>{" "}
              実際の操作を見る
            </VideoButton>
          </div>
          <p className="solution-lead">
            差出人・受取人の情報を入力してファイルを添付し、「入力支援を開始」ボタンを押せば、アプリが公式画面を自動で操作します。あとは「文書確認」と「決済」の操作をするだけで、送付が完了します。
          </p>
          <ol className="step-grid">
            <li>
              <span className="step-number">
                01<span>INPUT</span>
              </span>
              <h3>入力</h3>
              <p>
                差出人と受取人を入力し、文書ファイルを添付して、「入力支援を開始」を押します。ここまでで1操作です。登録済みの差出人・受取人は、入力せず選ぶだけで済みます。
              </p>
              <p className="step-auto">
                <svg className="icon" aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
                押したあとは自動。約30秒で文書確認画面まで進みます
              </p>
            </li>
            <li>
              <span className="step-number">
                02<span>REVIEW</span>
              </span>
              <h3>確認</h3>
              <p>
                アプリは文書確認画面で停止します。文書の全ページと、宛先・料金をご自身で確認の上、決済に進んでいただきます。
              </p>
            </li>
            <li>
              <span className="step-number">
                03<span>PAYMENT</span>
              </span>
              <h3>決済</h3>
              <p>料金を確定して決済手続を行っていただき、差し出します。</p>
            </li>
          </ol>
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
        <section className="security-section section" id="security">
          <div className="security-grid container">
            <div className="security-copy">
              <p className="eyebrow section-eyebrow">SAFETY</p>
              <h2>
                「文書の確認」と
                <br />
                「決済」は手動
              </h2>
              <p>
                内容証明は、一度差し出すと取り消せません。時効の完成猶予や契約解除の意思表示など、法律上の効果が生じる書面です。だからこそ、バクソク内容証明では、自動化する範囲を入力作業までに限定しています。
              </p>
              <ul className="security-list">
                <li>
                  <svg className="icon">
                    <use href="#i-check" />
                  </svg>
                  <span>
                    <strong>自動入力は文書確認画面で止まります</strong>
                    アプリが進めるのはここまでです。差出しや決済の画面へ、自動で進むことはありません。
                  </span>
                </li>
                <li>
                  <svg className="icon">
                    <use href="#i-check" />
                  </svg>
                  <span>
                    <strong>送る前に、文書の全ページを確認できます</strong>
                    公式画面で、文書イメージの全ページと、宛先・料金を確認してから差し出せます。
                  </span>
                </li>
                <li>
                  <svg className="icon">
                    <use href="#i-check" />
                  </svg>
                  <span>
                    <strong>
                      差出しと決済は、必ず人が手動で行う設計になっています
                    </strong>
                    取消しのできない操作をアプリが代わりに行うことはありません。宛先の誤りや文面の不備を抱えたまま差し出されることを防ぎます。
                  </span>
                </li>
              </ul>
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
        <section className="features-section section" id="features">
          <div className="container">
            <div className="section-top">
              <div>
                <p className="eyebrow section-eyebrow">OTHER FEATURES</p>
                <h2>その他の機能</h2>
              </div>
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
                  半角・全角自動調整／
                  <br />
                  住所自動入力
                </h3>
                <p>
                  頻出エラーの「住所・受取人の全角・半角エラー」はアプリが自動で調整して解消します。郵便番号を入力すれば住所が、住所を入力すれば郵便番号が自動で反映。
                </p>
                <div className="address-visual" aria-hidden="true">
                  <span className="address-tag">
                    <span className="avatar-dot">Ａ</span>全角・半角を自動調整
                    <svg className="icon">
                      <use href="#i-check" />
                    </svg>
                  </span>
                  <span className="address-tag">
                    <span className="avatar-dot recipient-dot">〒</span>
                    郵便番号 ⇄ 住所
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
                <h3>書式エラーの自動検知</h3>
                <p>
                  送付しようとするファイルがe内容証明の規定書式に適合しているかをアプリ側で先に判定し、適合しない場合にはエラーメッセージを出します。
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
              <article className="feature-card feature-local">
                <div className="feature-card-top">
                  <svg className="icon feature-icon">
                    <use href="#i-shield" />
                  </svg>
                  <span className="feature-index">03</span>
                </div>
                <h3>外部への情報送信なし</h3>
                <p>
                  生成AIのAPIをはじめ、外部サービスは一切使用していません。文書の読み込みも書式チェックもお使いのPCの中で完結し、文書や差出人・受取人の情報が当社や第三者のサーバーへ送信されることはありません。
                </p>
                <div className="history-visual" aria-hidden="true">
                  <span className="history-line">
                    <span className="history-dot" />
                    文書の読み込み <span>PC内</span>
                  </span>
                  <span className="history-line">
                    <span className="history-dot" />
                    書式チェック <span>PC内</span>
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
                <h3>送付履歴の確認</h3>
                <p>
                  案件名・案件番号で検索でき、過去の差出し先を案件ごとに確認できます。差出人・受取人はマスタとして事務所内で使い回せます。
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
        <section
          className="spec-section section container"
          id="spec"
          aria-labelledby="spec-heading"
        >
          <div className="spec-heading">
            <p className="eyebrow section-eyebrow">SPEC</p>
            <h2 id="spec-heading">製品概要</h2>
          </div>
          <dl className="spec-list">
            {specRows.map(([term, detail]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </section>
        {errorGuides.length > 0 && (
          <section
            className="guides-section section container"
            id="guides"
            aria-labelledby="guides-heading"
          >
            <div className="guides-heading">
              <p className="eyebrow section-eyebrow">TROUBLESHOOTING</p>
              <h2 id="guides-heading">
                e内容証明のエラーと
                <br />
                直し方
              </h2>
              <p className="section-description">
                アップロードで止まったときは、画面に出たエラー文から原因と直し方を探せます。
              </p>
              {errorHub && (
                <Link
                  className="button button-red guides-hub"
                  href={errorHub.href}
                >
                  エラー一覧を見る <Icon name="arrow" />
                </Link>
              )}
            </div>
            <ul className="guides-list">
              {errorGuides.map((article) => (
                <li key={article.href}>
                  <Link href={article.href}>{article.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="faq-section section container" id="faq">
          <div className="faq-heading">
            <p className="eyebrow section-eyebrow">FAQ</p>
            <h2>よくあるご質問</h2>
            <a className="contact-link" href={`mailto:${product.contactEmail}`}>
              お問い合わせ{" "}
              <svg className="icon">
                <use href="#i-external" />
              </svg>
            </a>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>
                  {question}
                  <span className="faq-plus" aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="closing-section">
          <div className="closing-inner container">
            <div>
              <p className="eyebrow">YOUR TIME, BACK TO YOU.</p>
              <h2>
                打ち込みに7分使うのを、
                <br />
                今日でやめる
              </h2>
              <p className="closing-lead">
                内容証明を月に10通出す事務所なら、1か月で50分、1年で10時間の打ち込み作業がなくなります。
              </p>
            </div>
            <div className="closing-actions">
              <PurchaseButton className="button button-white">
                バクソク内容証明を購入{" "}
                <svg className="icon">
                  <use href="#i-external" />
                </svg>
              </PurchaseButton>
              <span>
                {formatJPY(product.priceJpy)}円（税込）買い切り ／
                同一事務所内は台数無制限
              </span>
            </div>
          </div>
        </section>
        <section className="notes-section container" aria-label="注記">
          <ul className="notes-list">
            <li>
              ※「e内容証明」「Webゆうびん」は日本郵便株式会社の登録商標またはサービス名称です。本アプリは同社が提供・承認・推奨するものではなく、同社との提携・協力関係はありません。
            </li>
            <li>
              ※本アプリは、宛先・差出人・文面の正確性や法的効果を保証するものではありません。差出前に公式画面で必ずご確認ください。
            </li>
            <li>
              ※所要時間は当社による実測値です。ご利用環境、文書の内容、宛先数などにより異なります。
            </li>
            <li>
              ※日本郵便側の画面仕様の変更、OSやセキュリティ仕様の変更により、動作しなくなる場合があります。
            </li>
          </ul>
          <address className="company-info">
            <strong>{publisherName}</strong>
            <span>
              〒101-0041 東京都千代田区神田須田町1丁目7番8号 VORT秋葉原Ⅳ 2F
            </span>
            <span>代表取締役 橋本 祐弥</span>
            <span>
              お問い合わせ：
              <a href={`mailto:${product.contactEmail}`}>
                {product.contactEmail}
              </a>
            </span>
          </address>
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
