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
          orange:  "#F97316",
          amber:   "#FB923C",
        },
      },
      fontSize: {
        "hero":   ["5.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "hero-md":["7rem",   { lineHeight: "1.02", letterSpacing: "-0.04em" }],
      },
    },
  },
  plugins: [],
};

export default config;
