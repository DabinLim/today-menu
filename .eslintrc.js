module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    'react/jsx-filename-extension': [
      0,
    ],
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
  },
  extends: ['airbnb'],
};
