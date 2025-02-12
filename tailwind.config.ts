import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "360px",
      md: "512px",
      lg: "976px",
    },
    extend: {
      fontSize: {
        "body-xs-regular": [
          "0.75rem",
          {
            lineHeight: "150%",
            fontWeight: "400",
          },
        ],
        "body-xs-medium": [
          "0.75rem",
          {
            lineHeight: "150%",
            fontWeight: "500",
          },
        ],
        "body-sm-regular": [
          "0.875rem",
          {
            lineHeight: "145%",
            fontWeight: "400",
          },
        ],
        "body-sm-medium": [
          "0.875rem",
          {
            lineHeight: "145%",
            fontWeight: "500",
          },
        ],
        "body-lg-regular": [
          "1rem",
          {
            lineHeight: "150%",
            fontWeight: "400",
          },
        ],
        "body-lg-medium": [
          "1rem",
          {
            lineHeight: "150%",
            fontWeight: "500",
          },
        ],
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
