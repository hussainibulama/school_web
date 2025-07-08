module.exports = {
  extends: [
    'react-app', // from CRA
    'react-app/jest', // test support
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, jsxSingleQuote: true }],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'warn',
  },
};
