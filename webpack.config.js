var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =  {
    devtool: 'source-map',

    entry: {
        app: "./src/index.js"
    },

    output: {
        path: "./dist",
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'url?name=limit=10000&[name].[hash].[ext]'
            },
            { test: /\.css$/, loader: "style!css" }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        })
    ]
};