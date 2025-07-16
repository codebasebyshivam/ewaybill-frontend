/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        t1: '#083E38',
        t2: '#157B71',
        h1: '#F0F0F0',
        tertiary: '#000000',
      },
      backgroundColor: {
        t1: '#083E38',
        t2: '#157B71',
        tertiary: '#000000',
      },
      backgroundImage: {
        'teal-gradient': `linear-gradient(
          to bottom,
          #AEDEDB 0%,
          #97C9C6 39%,
          #77B6B3 59%,
          #1F766E 76%,
          #1C6F67 100%
        )`,
      },
    },
  },
  plugins: [],
};
