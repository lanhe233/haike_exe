const webpack = require('webpack')
const path = require('path')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  devServer: {
    port: 8000,
    inline: true,
    hot: true,
    host: '0.0.0.0'
  },
  // entry: './src/js/index.js',
  entry: {
    'index': './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'js/index.js'
  },
  resolve: {
    extensions:['.js', '.less']  //自动补全识别后缀
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
        test: /\.less$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','less-loader'],
          publicPath: '/'
        })
        // use: ['style-loader','css-loader','less-loader']
      },
      {
        test: /\.css$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '/'
        })
        // use: 'css-loader'
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: 'url-loader?name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new extractTextWebpackPlugin('css/[name].css'),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './view/index.html',
      thunks: ['index']
    })
  ]
}