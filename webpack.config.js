var version = require('./package.json').version;

module.exports = {
    entry: './lib',
    output: {
        filename: './dist/index.js',
        library: 'jupyter-js-utils',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        publicPath: 'https://npmcdn.com/jupyter-js-utils@' + version + '/dist/'
    },
    bail: true,
    devtool: 'source-map'
};
