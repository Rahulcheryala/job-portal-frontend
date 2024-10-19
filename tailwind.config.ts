import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blued: "#3a4b9a",
        primary: {
          50: "#DCF2F1",
          300: "#7FC7D9",
          500: "#365486",
          700: "#0F1035",
        },
      },
      fontFamily: {
        Nunito: ["Nunito", "Inter", "sans-serif"],
        RadioGrotesk: ["RadioGrotesk", "Inter", "sans-serif"],
        Insomatte: ["Insomatte", "Inter", "sans-serif"],
      },
      backgroundImage: {
        login: "url('/assets/images/login.jpeg')",
        signup: "url('/assets/images/signup.webp')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        background: {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
      },
      animation: {
        background: "background 6s ease infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
