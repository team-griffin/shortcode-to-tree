import babel from 'rollup-plugin-babel';
import memory from 'rollup-plugin-memory';

export default {
    input: 'entry.js',
    output: [
    {
      file: 'dist/es/shortcode-to-tree.js',
      format: 'es',
    },
    {
      file: 'dist/cjs/shortcode-to-tree.js',
      format: 'cjs',
    },
  ],
  plugins: [
    memory({
      path: 'entry.js',
      contents: `
// @flow
if (process.env.NODE_ENV === 'production') {
module.exports = require('./shortcode-to-tree.production.js');
} else {
module.exports = require('./shortcode-to-tree.development.js');
}`,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};