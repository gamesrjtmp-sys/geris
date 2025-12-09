/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'romantic-pink': '#ff7eb3',
        'romantic-red': '#ff758c',
      },
      fontFamily: {
        'handwriting': ['"Dancing Script"', 'cursive'],
      }
    },
  },
  plugins: [],
}