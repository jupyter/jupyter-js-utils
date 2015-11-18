module.exports = function (config) {
  config.set({
    browsers: ['Firefox'],
    frameworks: ['browserify', 'mocha'],
    reporters: ['mocha', 'coverage'],
    preprocessors: { 'build/index.js': ['browserify'] },
    browserify: {
      debug: true,
      transform: ['browserify-istanbul']
    },
    files: ['build/index.js'],
    coverageReporter: {
      reporters : [
        { 'type': 'text' },
        { 'type': 'lcov', dir: 'coverage' },
        { 'type': 'html', dir: 'coverage' }
      ]
    },
    port: 9876,
    colors: true,
    singleRun: true,
    logLevel: config.LOG_INFO
  });
};
