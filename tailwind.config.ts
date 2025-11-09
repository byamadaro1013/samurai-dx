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
        // samurai-dx specific colors will be defined here
      },
      fontSize: {
        // samurai-dx specific font sizes will be defined here
      },
      fontFamily: {
        // samurai-dx specific fonts will be defined here
      },
    },
  },
  plugins: [],
} satisfies Config;
