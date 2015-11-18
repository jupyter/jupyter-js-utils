module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    reporters: ['mocha'],
    files: ['index.html'],
    port: 9876,
    colors: true,
    singleRun: true,
    logLevel: config.LOG_INFO
  });
};
