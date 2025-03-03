import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        borderColor: {
          DEFAULT: "#2F3239",
          DARK: "rgba(205,205,205,0.05)",
        },
        primary: "#121418",
        secondary: "rgba(255, 255, 255, 0.05)",
        green: "rgb(14 203 129)",
        blue: "#3498DB",
        yellow: "#D8A600",
        red: "rgb(234 57 67)",
        purple: "#836EF9",
        font: {
          DEFAULT: "rgba(255, 255, 255, 1)",
          90: "rgba(255, 255, 255, 0.9)",
          80: "rgba(255, 255, 255, 0.8)",
          70: "rgba(255, 255, 255, 0.7)",
          60: "rgba(255, 255, 255, 0.6)",
          40: "rgba(255, 255, 255, 0.4)",
          20: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
