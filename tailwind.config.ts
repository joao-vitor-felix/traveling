import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "search-background": "url(/world-map.png)"
      },
      colors: {
        primary: "#717171",
        primaryLighter: "#BBBFBF",
        walterWhite: "#F5F5F5"
      }
    }
  },
  plugins: []
};
export default config;
