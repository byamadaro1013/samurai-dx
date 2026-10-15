import type { NextConfig } from "next";

const bakusokuIndexingEnabled = process.env.SITE_INDEXING_ENABLED === "true";

const nextConfig: NextConfig = {
  async redirects() {
    // 記事原稿で使われていた綴り(yousyoumei)のURLも正しいページへ送る
    return [
      {
        source: "/bakusokunaiyousyoumei/:path*",
        destination: "/bakusokunaiyoushoumei/:path*",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      ...(!bakusokuIndexingEnabled
        ? [
            {
              source: "/bakusokunaiyoushoumei/:path*",
              headers: [
                {
                  key: "X-Robots-Tag",
                  value: "noindex, nofollow, noimageindex",
                },
              ],
            },
          ]
        : []),
      {
        source: "/api/bakusoku/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "private, no-store" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

export default nextConfig;
