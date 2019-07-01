import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';

export default {
    input: 'src/index.js',
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
    localResolve(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
  ],
  external: [
    'ramda',
    'xml-js',
    'meta-shortcodes',
  ],
};
