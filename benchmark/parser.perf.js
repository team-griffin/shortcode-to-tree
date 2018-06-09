const { parser } = require('../dist/cjs/shortcode-to-tree');
const prettyHrtime = require('pretty-hrtime');

{
  const start = process.hrtime();
  for(let i = 0; i < 1000; i++) {
    parser('Hello world!');
  }
  const diff = process.hrtime(start);
  console.log(prettyHrtime(diff));
}
