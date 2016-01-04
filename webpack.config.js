var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var kendoPath = path.resolve(__dirname, 'app', 'kendo', 'index.js');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

var config = {
    devtool: 'eval',
    entry: [
        // For hot style updates
        'webpack/hot/dev-server',
        // The script refreshing the browser on none hot updates
        'webpack-dev-server/client?http://localhost:8080',
        //Kendo UI Core,
        kendoPath,
        // Our application
        mainPath
    ],
    output: {
        path: buildPath,
        filename: "bundle.js",
        publicPath: "/build/"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: [nodeModulesPath]
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.gif$|\.png$/, loader: 'file-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
};

module.exports = config;
