/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#fdfbfb',
          DEFAULT: '#ebedee',
          dark: '#1e293b'
        },
        accent: {
          light: '#a1c4fd',
          DEFAULT: '#c2e9fb'
        }
      }
    },
  },
  plugins: [],
}
