/**
 * 把今天最好的表现当作明天最新的起点．．～
 * いま 最高の表現 として 明日最新の始発．．～
 * Today the best performance  as tomorrow newest starter!
 * Created by IntelliJ IDEA.
 *
 * @author: xiaomo
 * @github: https://github.com/qq83387856
 * @email: hupengbest@163.com
 * @QQ_NO: 83387856
 * @Date: 2016/5/16 10:00
 * @Description:
 * @Copyright(©) 2015 by xiaomo.
 **/
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var copyWebpackPlugin = require('copy-webpack-plugin');
var extraTextWebpackPlugin = require('extract-text-webpack-plugin');
//模块化的写化
module.exports = {
    //入口文件 有几个页面就写几个entry   webpack 从当前路径找要加个./ 不然找不到文件   现在可以了
    entry: './index.js',
    //输出
    // 输出路径和输出文件的名字
    output: {
        path: __dirname + '/../dist',
        filename: '[name].[hash].js',
        publicPath: '/',
        chunkFilename: '[name].[hash].js'
    },
    //配置loader
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: extraTextWebpackPlugin.extract(
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                )
            },
            {
                test: /\.scss$/,
                loader: extraTextWebpackPlugin.extract(
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                )
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loaders: ['file-loader']
            }, {
                test: /\.json$/,
                loaders: ['json-loader']
            }, {
                test: /\.html$/,
                loader: 'raw'
            }

        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: '学习webpack之路'
        }),
        new copyWebpackPlugin([
            {
                from: __dirname + '/src/public'
            }
        ]),
        new extraTextWebpackPlugin(
            '[name].[hash].css'
        ),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            "window.jQuery": "jquery"
        })
    ],
    postcss: [autoprefixer({
        browsers: ['last 2 version']
    })],
    devtool:'source-map'
};