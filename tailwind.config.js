const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./components/**/*.{js,mdx}', './lib/**/*.{js,mdx}', './pages/**/*.{js,mdx}'],
    options: {
      whitelist: [],
    },
  },
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: '#000',
      white: '#fff',

      amber: colors.amber,
      blue: colors.blue,
      cyan: colors.cyan,
      emerald: colors.emerald,
      fuchsia: colors.fuchsia,
      gray: colors.coolGray,
      green: colors.green,
      indigo: colors.indigo,
      'light-blue': colors.lightBlue,
      lime: colors.lime,
      orange: {
        ...colors.orange,
        1000: '#4a2008',
      },
      pink: {
        ...colors.pink,
        1000: '#460d25',
      },
      purple: colors.purple,
      red: colors.red,
      rose: colors.rose,
      teal: colors.teal,
      violet: colors.violet,
      yellow: colors.yellow,
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
        source: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        system: defaultTheme.fontFamily.sans,
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['odd', 'even', 'active'],
      borderWidth: ['first', 'last', 'hover', 'focus'],
      cursor: ['active'],
      display: ['responsive', 'group-hover'],
      opacity: ['disabled'],
      textColor: ['group-focus'],
      ringWidth: ['focus-visible'],
      ringOffsetWidth: ['focus-visible'],
      ringOffsetColor: ['focus-visible'],
      ringColor: ['focus-visible'],
      ringOpacity: ['focus-visible'],
      rotate: ['first', 'last', 'odd', 'even'],
    },
  },
  plugins: [],
}
