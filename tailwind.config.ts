import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        panel: "#1e293b",
        panelSoft: "#243041",
        accentBlue: "#38bdf8",
        accentCyan: "#22d3ee",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        textPrimary: "#e2e8f0",
        textSecondary: "#94a3b8",
        foreground: "#e2e8f0",
        border: "#334155",
        input: "#334155",
        ring: "#38bdf8",
        primary: {
          DEFAULT: "#38bdf8",
          foreground: "#0f172a",
        },
        secondary: {
          DEFAULT: "#1e293b",
          foreground: "#e2e8f0",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#e2e8f0",
        },
        muted: {
          DEFAULT: "#1e293b",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#22d3ee",
          foreground: "#0f172a",
        },
        popover: {
          DEFAULT: "#1e293b",
          foreground: "#e2e8f0",
        },
        card: {
          DEFAULT: "#1e293b",
          foreground: "#e2e8f0",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
