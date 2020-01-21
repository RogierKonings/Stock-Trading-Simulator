const webpack = require('webpack');

module.exports = {
    entry: [
        './public/js/app'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'app.bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.html$/,
                loader: 'ngtemplate!html'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
