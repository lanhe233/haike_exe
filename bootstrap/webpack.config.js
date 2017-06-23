const webpack = require('webpack')
const path = require('path')
const extractTextPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		index: './src/js/index.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/',
		filename: 'js/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: path.resolve(__dirname, 'node_modules'),
				options: {
					presets: ['es2015']
				}
			},
			{
				test: /\.css$/,
				use: extractTextPlugin.extract({
					use: 'css-loader',
					publicPath: '/'
				})
			},
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: 'file-loader?name=images/[name].[ext]'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: 'file-loader?name=fonts/[name].[ext]'
			}
		]
	},
	plugins: [
		new extractTextPlugin('css/[name].css'),
		new htmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			chunks: ['index']
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	],
	devServer: {
		port: 9001
	},
	resolve: {
		alias: {

		}
	}
}