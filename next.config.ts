import type { NextConfig } from "next";

const bakusokuIndexingEnabled = process.env.SITE_INDEXING_ENABLED === "true";

const nextConfig: NextConfig = {
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
