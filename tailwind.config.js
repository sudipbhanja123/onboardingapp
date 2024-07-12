/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primeryBtn: "#FE8C00",
        PrimarySeparator: "#878787",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
