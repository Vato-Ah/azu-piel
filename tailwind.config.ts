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
        azu: {
          red: "#E03131",
          reddark: "#B02525",
          leather: "#7A4A2B",
          leatherdark: "#4E3320",
          cream: "#FAF3E7",
        },
      },
    },
  },
  plugins: [],
};
export default config;