/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in-out",
      },
      fontFamily: {
        roboto: ["Roboto Condensed", "sans-serif"],
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
