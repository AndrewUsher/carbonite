module.exports = {
  extends: ['@drewster/eslint-config/react', '@drewster/eslint-config/ts'],
  globals: {
    mocha: true
  }
  rules: {
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-non-null-assertion': 0
  }
}
