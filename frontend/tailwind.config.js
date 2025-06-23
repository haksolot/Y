/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        koulen: ["Koulen", "cursive"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        scrollbar: {
          DEFAULT: "#ff6600",
          track: "#1F1F1F",
          thumb: "#ff6600",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#ff6600 #1F1F1F",
        },
        ".scrollbar::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        ".scrollbar::-webkit-scrollbar-track": {
          background: "#1F1F1F",
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: "#ff6600",
          borderRadius: "10px",
        },
        ".scrollbar::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#ffa64d",
        },
      });
    },
  ],
};
