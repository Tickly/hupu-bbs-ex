const webpack = require('webpack'),
    path = require('path'),
    VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    mode: 'development',

    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader',
            ]
        }, {
            test: /\.js$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            use: 'babel-loader',
        }, {
            test: /\.vue$/,
            use: 'vue-loader',
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                name: '[name].[ext]?[hash]'
            }
        }, ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}