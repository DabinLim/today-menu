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
    'react/jsx-props-no-spreading': ['off'],
    'import/prefer-default-export': ['off'],
    'import/no-cycle': ['off'],
    'react/prop-types': ['off'],
    camelcase: ['off'],
  },
  extends: ['airbnb'],
};
