const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.overflow-y-overlay': {
          'overflow-y': 'overlay'
        },
        '.scrollbar-gutter-stable': {
          'scrollbar-gutter': 'stable'
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            'width': '10px'
          },
          '&::-webkit-scrollbar-track': {
            'background': '#f8f8f8'
          },
          '&::-webkit-scrollbar-thumb': {
            'background': 'rgba(0, 0, 0, 0.3)',
            '&:hover': {
              'background': 'rgba(0, 0, 0, 0.5)'
            },
          }
        },
      })
    })
  ]
};
