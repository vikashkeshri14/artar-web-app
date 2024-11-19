/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      headerText: "#212529",
      buttonColor: "#ab6a43",
      textLightBlack: "#545b62",
      textDark: "#212529",
      red: "#de3618",
      lighticon: "#e3a37d",
      darkicon: "#ab6a43",
    },
  },
  plugins: [],
};
