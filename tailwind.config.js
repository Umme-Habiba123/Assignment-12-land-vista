/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#802BB1",
        secondary: "#564F6F",
        lightBg: "#D1D7E0",
        darkBg: "#1e1e1e",
      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        sansita: ["Sansita", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")], 
    themes: ["light", "dark"], 
  },
};
