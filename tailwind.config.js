/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    colors: {
      primary: "#0075ff",
      white: "#fff",
      gray: "#858585",
      bGray: "#f2f2f2",
      black: "#000",
      green: "#29ba30",
      lightGreen: "#dbffdd",
      light_Red: "#de857e",
    },
  },
  plugins: [],
};
