const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 打包的静态资源路径
const publicPath = process.env.NODE_ENV === 'local' 
  ? '' : ('//static.dragonest.com/sdoricaweb/${env}/images/'.replace('${env}', process.env.NODE_ENV))

// 后端接口路径，js中通过 process.env.BASE_API 访问
const env = {
  BASE_API: JSON.stringify('//api.com/${env}/'.replace('${env}', process.env.NODE_ENV))
}

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'js/[name].js?[hash:8]',
    path: path.resolve(__dirname, '../dist'),
    publicPath: publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { 
              loader: 'css-loader',
              options: { 
                importLoaders: 1,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('autoprefixer')()
                ]
              }
            }
          ],
          publicPath: '../'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]?[hash:8]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'media/[name].[ext]?[hash:8]'
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':src']
          }
        }
      }
    ]
  },
  plugins: [
    // 清除dist目录
    new CleanWebpackPlugin([path.join(__dirname, '..', 'dist')], {
      root: path.join(__dirname, '..')
    }),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('css/[name].css?[hash:8]')
  ]
}