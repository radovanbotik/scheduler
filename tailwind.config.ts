import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        vodafone: {
          "50": "#fff0f0",
          "100": "#ffdddd",
          "200": "#ffc1c1",
          "300": "#ff9595",
          "400": "#ff5959",
          "500": "#ff2626",
          "600": "#fc0606",
          "700": "#e60000",
          "800": "#af0505",
          "900": "#900c0c",
          "950": "#500000",
        },
        "vodafone-gray": {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#333333",
          "950": "#262626",
        },
      },
      fontFamily: {
        vodafone: ["var(--font-vodafone)"],
      },
      keyframes: {
        pulseFast: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "pulse-fast": "pulseFast 0.5s infinite", // Use the new keyframe and duration
      },
    },
  },
  plugins: [],
  // safelist: [
  //   {
  //     pattern: /grid-cols-\[120px_repeat\(\d+,_100px\)\]/,
  //   },
  // ],
} satisfies Config;
