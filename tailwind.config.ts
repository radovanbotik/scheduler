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
      },
      fontFamily: {
        vodafone: ["var(--font-vodafone)"],
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
