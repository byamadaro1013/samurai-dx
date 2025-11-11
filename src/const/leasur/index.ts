// Header Navigation
export const HEADER_NAV = [
  {
    label: "サービス",
    href: "#service",
  },
  {
    label: "よくある質問",
    href: "#faq",
  },
  {
    label: "料金",
    href: "#pricing",
  },
  {
    label: "お問い合わせ",
    href: "#contact",
  },
];

// Header Buttons
export const APPLY_BUTTON = {
  text: "お申し込みはこちら",
  href: "#apply",
};

export const DOWNLOAD_BUTTON = {
  text: "資料DL",
  href: "#download",
};

// Service Data
export const SERVICES = [
  {
    number: "01",
    title: ["【瞬時に参照】", "もう探さない、その場で確認"],
    description:
      "条文参照、法令参照、定義語の参照先や定義を、文書内を移動することなくその場で瞬時に確認できます。",
    image: "/assets/images/leasur/service_01_a.png",
    imageAlt: "定義語ジャンプ機能のスクリーンショット",
    features: [
      {
        label: "定義語ジャンプ",
        description:
          "契約書内の定義語をグリーン下線でハイライトし、クリックするとその定義箇所へ瞬時にジャンプできます。もう定義を探してスクロールする必要はありません。",
      },
      {
        label: "条文ホバー表示",
        description:
          "文書中の「会社法§238」などの条文表記にマウスオーバーするだけで、その条文の全文がポップアップ表示されます。",
      },
      {
        label: "定義語ポップアップ",
        description:
          "文書中の「会社法§238」などの条文表記にマウスオーバーするだけで、その条文の全文がポップアップ表示されます。",
      },
      {
        label: "関連ガイドライン抽出",
        description:
          "条文に紐づく審査基準や通達PDFを右側タスクペインに自動で表示し、関連情報を素早く参照できます。",
      },
      {
        label: "箇条書き変換＋フィードバック",
        description:
          "読みにくい長文をAIが箇条書きに変換。ユーザーがその正誤を評価することで、より精度の高い変換が可能になります。",
      },
    ],
  },
  {
    number: "02",
    title: ["【一瞬で整形】", "「中身」に集中できる環境へ"],
    description:
      "時間のかかる「体裁調整」や「表記ゆれ修正」作業を、リーソルが一瞬で完了させます。",
    image: "/assets/images/leasur/service_02.png",
    imageAlt: "条文番号自動リナンバー機能",
    features: [
      {
        label: "条文番号自動リナンバー",
        description:
          "章・条・項レベルをリアルタイムで解析し、条項の追加・削除・並び替えに合わせて番号を自動で再付与します。文書内のクロスリファレンス（「第●条参照」等）も同時に更新されるため、手作業での修正ミスがなくなります。",
      },
    ],
  },
  {
    number: "03",
    title: ["【自動で修正】手間のかかる修正作業から解放"],
    description:
      "条項の追加・削除時に発生する後続条項のズレやリファレンス修正を自動で行い、手作業のミスと手間を削減します。",
    image: "/assets/images/leasur/service_03.png",
    imageAlt: "条文番号自動リナンバー機能",
    features: [
      {
        label: "条文番号自動リナンバー",
        description:
          "上記「条文番号自動リナンバー」機能が、この課題を解決します。条項の挿入や削除があっても、手動で番号や参照箇所を修正する手間は一切不要です。",
      },
    ],
  },
  {
    number: "04",
    title: ["【過去契約書・書類参照】最適な契約書作成をサポート"],
    description:
      "過去の契約書や書類を参照し、現在作成中の契約書と比較することで、内容の過不足や表現の違いを確認し、より適切な契約文を作成できるようになります。",
    image: "/assets/images/leasur/service_04.png",
    imageAlt: "過去契約書参照機能",
    bulletPoints: [
      "■Word、PDF、テキスト形式の過去契約書をアプリ内に直接アップロードし、参照できます（データはサーバーには送信されません）。",
      "■アップロードされた契約書は読みやすく段落分けして表示され、条文単位でワンクリックで現在の契約書にコピー挿入が可能です。",
      "■最大3ファイルまで同時参照でき、タブやアコーディオンUIでスムーズに切り替えながら比較検討できます。",
    ],
  },
  {
    number: "05",
    title: [],
    description: "",
    image: "/assets/images/leasur/service_05.png",
    imageAlt: "法令リサーチ記録機能",
    content: {
      title: "【法令リサーチ記録】リサーチ履歴を自動で保存",
      description:
        "参照した条文やガイドライン、検索クエリを自動で記録し、タイムライン形式で表示します。後で再利用したり、CSVとしてエクスポートしたりすることで、リサーチの効率を向上させます。",
    },
  },
  {
    number: "06",
    title: [],
    description: "",
    image: "/assets/images/leasur/service_06.png",
    imageAlt: "自動修正機能",
    content: {
      title: "【自動で修正】手間のかかる修正作業から解放",
      description:
        "条項の追加・削除時に発生する後続条項のズレやリファレンス修正を自動で行い、手作業のミスと手間を削減します。",
    },
  },
  {
    number: "07",
    title: [],
    description: "",
    image: "/assets/images/leasur/service_07.png",
    imageAlt: "英文契約AI翻訳機能",
    content: {
      title: "【英文契約 AI 翻訳】英文契約業務を効率化",
      description:
        "英文契約を逐条対訳・要点サマリー付きで即座に表示します。選択範囲または全選択で翻訳が可能で、専門分野辞書の選択や、承認済み訳文の表示、弁護士レビュー依頼フローの組み込みも可能です。",
    },
  },
];

// FAQ Data
export const FAQ_DATA = [
  {
    question: "Q. 導入にはどれくらい時間がかかりますか?",
    answer: [
      "A. リーソルはMicrosoft Wordのプラグインとして提供されるため、数分で簡単にインストールが完了します。",
      "特別な環境設定は不要で、すぐに使い始められます。",
    ],
  },
  {
    question: "Q. 初期費用はかかりますか?",
    answer: ["A. いいえ、初期費用はかかりません。ご利用端末数に応じた月額費用制です。"],
  },
  {
    question:
      "Q. 他にもリーガルテックの製品を活用しているのですが、リーソルを追加で利用することは出来ますか?",
    answer: [
      "A. はい、可能です。リーソルはMicrosoft Wordのプラグインとして動作するため、他のリーガルテック製品と競合することなく併用いただけます。",
      "既存のワークフローを妨げることなく、文書作成の効率化を実現します。",
    ],
  },
];

// Company Data
export const COMPANY_DATA = [
  {
    label: "社名",
    value: "株式会社 SamurAI DX",
  },
  {
    label: "住所",
    value: ["〒112-3456", "東京都中野区本町2-41-7"],
  },
  {
    label: "設立日",
    value: "2024年4月",
  },
  {
    label: "連絡先",
    value: "kai.yamada@orgai.info",
    isLink: true,
  },
  {
    label: "代表者名",
    value: "橋本祐弥 ？？？",
  },
];

// Vercel Analytics Events
export const VercelAnalyticsApplyButtonClick =
  "leasur_apply_button_click";
export const VercelAnalyticsDownloadButtonClick =
  "leasur_download_button_click";
