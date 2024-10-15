import type { Config } from "tailwindcss";
import { colorScheme } from "./src/styles/tailwind/color.js";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: colorScheme,
      animation: {
        blink: "blink 1.5s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { filter: "brightness(120%)" },
          "50%": { filter: "brightness(90%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
