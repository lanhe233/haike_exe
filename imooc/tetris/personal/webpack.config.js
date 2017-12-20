const webpack = require('webpack')
const path = require('path')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    'index': './js/index.js'
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'js/index.js'
  },
  resolve: {
    extensions:['.js']  // 自动补全识别后缀
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        // 相对路径不提高速度，没用，必须写成绝对路径
        exclude: path.resolve(__dirname,'node_modules/')
      },
      {
        test: /\.css$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '/'
        })
      }
    ]
  },
  plugins: [
    new extractTextWebpackPlugin('css/[name].css'),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      thunks: ['index']
    })
  ]
}