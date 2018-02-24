process.env.NODE_ENV = 'production';

const path = require('path');
const webpackConfig = require('./config/webpack.config.umd.js');

const aliases = {
  src: path.resolve(process.cwd(), 'src'),
  sinon: path.resolve(process.cwd(), 'node_modules/sinon/pkg/sinon.js'),
};
const rules = [
  {
    enforce: 'post',
    test: /\.js[x]$/,
    include: /(src)\/(js)\//,
    loader: 'istanbul-instrumenter-loader',
  },
];
webpackConfig.resolve.alias = aliases;
webpackConfig.module.rules = rules.concat(webpackConfig.module.rules || []);

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/react-boilerplate-app-scripts/config/polyfills.js',
      'tests/**/*.spec.js',
    ],

    // list of files / patterns to exclude
    exclude: ['**/*.swp'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'node_modules/react-boilerplate-app-scripts/config/polyfills.js': [
        'webpack',
      ],
      'tests/**/*.spec.js': ['webpack'],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage-istanbul', 'junit'],

    // web server port
    port: 9876,

    colors: true, // colors in the output (reporters and logs)
    // to avoid DISCONNECTED messages when connecting to BrowserStack
    browserDisconnectTimeout: 20 * 1000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 10 * 1000, // default 10000
    captureTimeout: 120 * 1000, // default 60000

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      // 'PhantomJS',
      'Chrome',
      // 'Safari', // experiencing issues with safari-launcher@1.0.0 and Safari 9.1.1
      // 'Firefox',
    ],
    coverageIstanbulReporter: {
      reports: ['text-summary', 'html'],
      dir: 'coverage',
      fixWebpackSourcePaths: true,
    },

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    webpack: {
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      performance: webpackConfig.performance,
    },
  });
};