import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:      "#0a0a0a",
          surface: "#111111",
          card:    "#181818",
          text:    "#f5ede0",
          muted:   "#8a7a6a",
          accent:  "#c9a96e",
          border:  "#242424",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Arial Black", "sans-serif"],
        sans:    ["var(--font-heebo)", "Arial", "sans-serif"],
        rubik:   ["var(--font-rubik)", "Arial", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)"    },
        },
      },
      animation: {
        "fade-up":  "fadeUp 0.9s ease forwards",
        "fade-in":  "fadeIn 1.2s ease forwards",
        "marquee":  "marquee 35s linear infinite",
        "scale-in": "scaleIn 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
