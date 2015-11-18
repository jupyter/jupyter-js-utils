module.exports = function (config) {
  config.set({
    frameworks: ['browserify', 'mocha'],
    reporters: ['mocha'],
    preprocessors: { 'build/*.js': ['browserify'] },
    browserify: { debug: true, transform: ['browserify-css'] },
    files: ['build/*.js'],
    port: 9876,
    colors: true,
    singleRun: true,
    logLevel: config.LOG_INFO
  });
};
