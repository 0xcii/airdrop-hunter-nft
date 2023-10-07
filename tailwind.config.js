/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: ['responsive', 'hover', 'focus', 'active'],
      borderWidth: ['responsive', 'hover', 'focus'],
      screens: {
        "5xl": "2000px"
      },
      fontFamily: {
        kanit: ["Kanit", "sans-serif"]
      },
      rotate: {
        '-20': '-20deg',
      },
      perspective: {
        '500': '500px',
      },
      keyframes: {
          rotate: {
            '0%': { transform: 'rotateY(0deg)' },
            '100%': { transform: 'rotateY(1turn)' },
          },
      }
    },
  },
  variants: {
    extend: {
      transform: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
      transition: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
      animation: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    },
  },
  plugins: [],
}