module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    camelcase: 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
