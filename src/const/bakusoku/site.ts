import { SITE_URL } from "@/const";
import { COMPANY_DATA } from "@/const/leasur";
export const product = {
  name: "バクソク内容証明",
  priceJpy: 9800,
  currency: "JPY",
  termsUrl:
    "https://slow-noise-ba5.notion.site/3df42d401011808bbc90cafe002fde87",
  contactEmail: "hashimoto@samurai-dx.com",
} as const;

// Intentionally false. The payment/download implementation is a separate phase.
// Do not turn this on until docs/requirements.md acceptance criteria are satisfied.
export const CHECKOUT_IMPLEMENTED: boolean = false;

export const searchKeywords = [
  "バクソク内容証明",
  "e内容証明 入力支援",
  "e内容証明 自動入力",
  "e内容証明 自動化",
  "内容証明 業務効率化",
  "内容証明 文書チェック",
  "内容証明 宛先管理",
  "士業 業務効率化",
  "弁護士 e内容証明",
  "司法書士 e内容証明",
  "行政書士 e内容証明",
  "内容証明 Windows macOS",
] as const;

export function formatJPY(value: number): string {
  return new Intl.NumberFormat("ja-JP").format(value);
}

export function getSiteUrl(): URL {
  const url = new URL(process.env.SITE_URL ?? SITE_URL);
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error("Invalid SITE_URL protocol");
  return new URL(url.origin);
}

export const publisherName = "株式会社SamurAI DX";
export const ogImage = {
  url: "/assets/bakusoku/app-screen.png",
  width: 1200,
  height: 726,
  alt: "バクソク内容証明のアプリ画面",
};

// 子ページで openGraph を指定すると親の設定は丸ごと置き換わるので、共通部分をここから渡す
export const openGraphBase = {
  siteName: product.name,
  locale: "ja_JP",
  images: [ogImage],
};

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}

export const companyHref = "/bakusokunaiyoushoumei/company";
export const supervisorHref = "/bakusokunaiyoushoumei/supervisor";

// 会社名・URLの表記は note・X・PR TIMES・Googleビジネスプロフィールとそろえる
// sameAs には会社の公式アカウントだけを入れる。
// 【要確認】X と PR TIMES 企業ページのURLが決まったら追加する
export const organizationSameAs = ["https://note.com/samuraidx"];

const organizationId = `${SITE_URL}/#organization`;

export const publisherJsonLd = {
  "@type": "Organization",
  "@id": organizationId,
  name: publisherName,
  url: SITE_URL,
};

function companyValue(label: string): string | undefined {
  const value = COMPANY_DATA.find((item) => item.label === label)?.value;
  return Array.isArray(value) ? value.join(" ") : value;
}

export const company = {
  name: publisherName,
  address: companyValue("住所"),
  founded: companyValue("設立日"),
  representative: companyValue("代表者名"),
  email: product.contactEmail,
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    ...publisherJsonLd,
    logo: absoluteUrl("/assets/images/logo/logo.svg"),
    email: company.email,
    ...(company.address && { address: company.address }),
    ...(company.representative && {
      founder: { "@type": "Person", name: company.representative },
    }),
    sameAs: organizationSameAs,
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "SoftwareApplication",
        name: product.name,
        url: absoluteUrl("/bakusokunaiyoushoumei"),
      },
    },
  };
}

// 記事の監修者。プロフィールは samuraidx.co.jp のメンバー紹介と同じ内容にする。
// 【要確認】弁護士登録番号と、所属事務所の正式名称。決まったら null を置き換える
export const supervisor = {
  name: "橋本 祐弥",
  jobTitle: "弁護士",
  barAssociation: "東京弁護士会",
  registeredOn: "2020年12月",
  registrationNumber: null as string | null,
  lawFirm: null as string | null,
  alumniOf: "慶應義塾大学法学部法律学科",
  bio: "森・濱田松本法律事務所を退職後、個人事務所を立ち上げ独立し、弁護士業務に従事。2025年10月に株式会社SamurAI DXを共同創業。慶應義塾大学法学部法律学科卒、慶應義塾大学大学院法学研究科中退、2020年12月東京弁護士会弁護士登録。",
};

export function supervisorJsonLd() {
  return {
    "@type": "Person",
    "@id": absoluteUrl(`${supervisorHref}#person`),
    name: supervisor.name.replace(/\s/g, ""),
    jobTitle: supervisor.jobTitle,
    url: absoluteUrl(supervisorHref),
    memberOf: { "@type": "Organization", name: supervisor.barAssociation },
    alumniOf: { "@type": "CollegeOrUniversity", name: "慶應義塾大学" },
    worksFor: { "@id": organizationId },
  };
}
