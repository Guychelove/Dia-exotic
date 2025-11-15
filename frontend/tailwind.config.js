/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      diaYellow: '#D97706', // text-yellow-700
      diaGreen: '#16A34A',  // green-600
      },
    },
  },
  plugins: [],
}