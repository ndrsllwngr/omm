// Resources
// - https://medium.com/@ravv/setup-eslint-prettier-for-your-react-project-in-2020-2afd56b15c84
// - https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code
module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['/node_modules/**', '/build/**', '/out/**', '/.next/**'],
  rules: {
    'no-unused-vars': ['warn', { args: 'none', argsIgnorePattern: 'req|res|next|val' }],
    'prettier/prettier': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
