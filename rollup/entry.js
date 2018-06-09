import babel from 'rollup-plugin-babel';
import memory from 'rollup-plugin-memory';

export default {
    input: 'entry.js',
    output: [
    {
      file: 'dist/es/bbcode-to-ast.js',
      format: 'es',
    },
    {
      file: 'dist/cjs/bbcode-to-ast.js',
      format: 'cjs',
    },
  ],
  plugins: [
    memory({
      path: 'entry.js',
      contents: `
// @flow
if (process.env.NODE_ENV === 'production') {
module.exports = require('./bbcode-to-ast.production.js');
} else {
module.exports = require('./bbcode-to-ast.development.js');
}`,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};