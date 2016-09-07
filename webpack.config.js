var version = require('./package.json').version;

module.exports = {
    entry: './lib',
    output: {
        filename: './dist/index.js',
        library: ['jupyter', 'utils'],
        libraryTarget: 'umd',
        publicPath: 'https://unpkg.com/jupyter-js-utils@' + version + '/dist/'
    },
    devtool: 'source-map'
};
