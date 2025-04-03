/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false, // ← 요기만 이렇게 바꿔줘
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {},
  },
  plugins: [],
}