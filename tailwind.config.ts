import type { Config } from "tailwindcss";
import { colorScheme } from './src/styles/tailwind/color.js';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: colorScheme,
    },
  },
  plugins: [],
};
export default config;
