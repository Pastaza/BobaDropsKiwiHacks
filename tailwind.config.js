/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#050a1a',
          800: '#0a1628',
          700: '#0f2040',
        },
        mist: {
          100: '#e8eef5',
          200: '#c5d5e8',
          300: '#9ab5d0',
        },
        'pale-blue': '#b8d4e8',
        'warm-accent': '#f0a855',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
