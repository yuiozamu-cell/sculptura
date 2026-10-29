/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAF8F4',
          100: '#F5F1E8',
          200: '#EBE5D8',
          300: '#DFD8C5',
          DEFAULT: '#F5F1E8'
        },
        charcoal: {
          DEFAULT: '#252525',
          900: '#161616',
          800: '#252525',
          700: '#3A3A3A',
          600: '#525252',
          500: '#6E6E6E',
          400: '#949494'
        },
        stone: {
          gray: '#B8B4AC',
          light: '#D7D4CE',
          dark: '#938E84'
        },
        terracotta: {
          DEFAULT: '#B66A4D',
          light: '#CD8266',
          dark: '#965239',
          50: '#FDF7F5',
          100: '#FAEEE8',
          200: '#F2D7CD'
        },
        olive: {
          DEFAULT: '#777B62',
          light: '#8F937A',
          dark: '#5F624E',
          50: '#F7F8F5',
          100: '#EDEDE6'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'museum': '0 10px 30px -10px rgba(37, 37, 37, 0.08), 0 4px 6px -2px rgba(37, 37, 37, 0.04)',
        'museum-lg': '0 20px 40px -15px rgba(37, 37, 37, 0.12), 0 8px 12px -3px rgba(37, 37, 37, 0.06)'
      }
    },
  },
  plugins: [],
}
