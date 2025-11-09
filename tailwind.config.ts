import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        md: {
          max: "768px",
        },
        xl: "1280px",
      },
      maxWidth: {
        pc: "62.5rem",
      },
      colors: {
        background: {
          dark: "#161616",
          accent: "#202227",
        },
        primary: {
          blue: "#0085ff",
        },
        text: {
          white: "#FFFFFF",
          gray: "rgba(255, 255, 255, 0.85)",
        },
      },
      fontSize: {
        "heading-xl": [
          "1.875rem", // 30px
          {
            lineHeight: "1.2",
            fontWeight: "500",
          },
        ],
        "heading-sm": [
          "1rem", // 16px
          {
            lineHeight: "1.2",
            fontWeight: "700",
          },
        ],
        "body-lg": [
          "1.25rem", // 20px
          {
            lineHeight: "3",
            fontWeight: "500",
          },
        ],
      },
      fontFamily: {
        helvetica: ["Helvetica Neue", "sans-serif"],
        gothic: ["A-OTF A1Gothic StdN", "Noto Sans JP", "sans-serif"],
        hiragino: ["Hiragino Sans", "Hiragino Kaku Gothic ProN", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
