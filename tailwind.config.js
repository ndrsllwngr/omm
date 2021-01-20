const defaultTheme = require('tailwindcss/defaultTheme')
// const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./components/**/*.{js,mdx}', './lib/**/*.{js,mdx}', './pages/**/*.{js,mdx}'],
    options: {
      whitelist: [],
    },
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-gray': '#28292F',
        'custom-green': '#1CE783',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
        source: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        system: defaultTheme.fontFamily.sans,
      },
      stroke: (theme) => ({
        green: theme('colors.custom-green'),
        gray: theme('colors.custom-gray'),
      }),
      fill: (theme) => ({
        green: theme('colors.custom-green'),
        gray: theme('colors.custom-gray'),
      }),
    },
  },
  variants: {
    extend: {},
    stroke: ['hover', 'focus'],
  },
  plugins: [],
}
