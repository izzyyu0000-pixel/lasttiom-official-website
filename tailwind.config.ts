import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warmwhite: "#FAF7F2",
        milktea: "#D4B59E",
        morandipink: "#E2C2C6",
        textmain: "#4A4A4A",
        textlight: "#7A7A7A",
      },
    },
  },
  plugins: [],
};
export default config;
