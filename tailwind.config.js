/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003B4A',
          50: '#e6f0f3',
          100: '#b3d1d9',
          200: '#80b2bf',
          300: '#4d93a5',
          400: '#1a748b',
          500: '#003B4A',
          600: '#003242',
          700: '#002939',
          800: '#002031',
          900: '#001728',
        },
        seafoam: {
          DEFAULT: '#90CDBA',
          50: '#f0f9f6',
          100: '#d1ede6',
          200: '#b2e1d6',
          300: '#90CDBA',
          400: '#6abba4',
          500: '#4da98e',
          600: '#3d8872',
          700: '#2e6756',
          800: '#1e463a',
          900: '#0f251e',
        },
        teal: {
          deep: '#055D67',
          mid: '#4B858E',
          light: '#61B0BB',
        },
        coral: {
          DEFAULT: '#EB5A5E',
          light: '#EE8F7A',
          pale: '#EFC2B3',
        },
        slate: {
          brand: '#5E7875',
          warm: '#A79F89',
          gold: '#D4BA8B',
        },
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
