/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        main: "#008bd2"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}