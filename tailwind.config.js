/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ksu: {
          green: '#006633',
          dark: '#004422',
          gold: '#C8A84B',
          light: '#E8F5E9',
          blue: '#0084bd',
        },
      },
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
