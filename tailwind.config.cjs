/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  daisyui: {
    themes: ["lemonade"],
  },
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")]
};
