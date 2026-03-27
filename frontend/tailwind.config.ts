import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        monad: {
          purple:  "#7C3AED",
          violet:  "#8B5CF6",
          light:   "#EDE9FE",
          lighter: "#F5F3FF",
          dark:    "#4C1D95",
          bg:      "#F8F7FF",
          card:    "#FFFFFF",
          border:  "#E5E7EB",
          muted:   "#6B7280",
        },
      },
    },
  },
  plugins: [],
};

export default config;
