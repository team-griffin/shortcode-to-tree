const chromium = require('chromium');

process.env.CHROME_BIN = chromium.path;

module.exports = function(config) {
  config.set({
    frameworks: ['polyfill', 'mocha'],

    files: [
      /**
       * Make sure to disable Karma’s file watcher
       * because the preprocessor will use its own.
       */
      { pattern: 'integration/**/*.int.js', watched: false }
    ],

    preprocessors: {
      'integration/**/*.int.js': ['webpack']
    },

    webpack: {
      mode: 'production',
    },

    polyfill: [],

    browsers: [ 'ChromeHeadlessDebian' ],
    customLaunchers: {
      'ChromeHeadlessDebian': {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    },
    singleRun: true,
  });
}