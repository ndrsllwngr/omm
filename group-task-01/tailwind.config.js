const defaultTheme = require('tailwindcss/defaultTheme')
// const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./components/**/*.{js,mdx}', './pages/**/*.{js,mdx}'],
    options: {
      whitelist: ['fill-current', 'stroke-current', 'inline-block', 'w-full', 'h-full'],
    },
  },
  darkMode: 'class',
  theme: {
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
  plugins: [
    require('@tailwindcss/typography'), // https://tailwindcss.com/docs/typography-plugin
  ],
}
