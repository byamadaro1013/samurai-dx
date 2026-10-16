// AI検索の引用元を選ぶクローラーは、明示的に許可しておく。
// 学習用(GPTBot, Google-Extended, ClaudeBot)も止めていない。
// Google-Extended は Gemini の回答の根拠にも使われるため。
const aiSearchCrawlers = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Claude-SearchBot",
  "Claude-User",
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.samuraidx.co.jp",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      ...aiSearchCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
  },
};
