module.exports = {
    extends: [
      'react-app',                // from CRA
      'react-app/jest',           // test support
      'plugin:prettier/recommended'
    ],
    rules: {
      'prettier/prettier': ['error']
    }
  };
  