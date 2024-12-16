import jsdoc from '@jsdoc/eslint-config';

export default [
  {
    ignores: ['lib/parser.js'],
  },
  ...jsdoc,
];
