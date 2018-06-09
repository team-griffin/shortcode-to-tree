import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';

export default {
    input: 'src/index.js',
    output: [
    {
      file: 'dist/es/bbcode-to-ast.development.js',
      format: 'es',
    },
    {
      file: 'dist/cjs/bbcode-to-ast.development.js',
      format: 'cjs',
    },
  ],
  plugins: [
    localResolve(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
  ],
};