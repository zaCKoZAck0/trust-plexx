/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#252525',
      'red': '#FF0000',
      'maroon': '#AF0404',
      'gray': '#414141',
    },},
  },
  plugins: [],
}