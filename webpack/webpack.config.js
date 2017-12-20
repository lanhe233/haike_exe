const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
/**
 * 提取公共代码
 * 默认会将所有入口节点的公共代码提取出来，生成一个common.js
 * 可以有选择的提取部分入口节点，方法是添加第二个参数 ['节点名','节点名']
 */
// const commonsPlugin = new webpack.optimize.commonsChunkPlugin('common.js')
const pageName = ['index','hello']

// 生成入口文件对象和插件对象
let entry = {}
let plugins = [
	new extractTextWebpackPlugin('css/[name].css')
]

pageName.forEach(function(value,i){
	entry[value] = './src/js/' + value + '.js'
	plugins.push(new htmlWebpackPlugin({
		filename: value + '.html',
		template: './view/'+ value +'.html',
		chunks: [value]
	}))
})


module.exports = {
	// 入口起点
	entry,
	// 输出
	output: {
		path: path.resolve(__dirname,'./dist'),
		// publicPath 用于修改正式上线后资源的根目录地址
		publicPath: '/',
		// filename [name].js是默认值
		filename: 'js/[name].js',	
		// sourceMapFileName: '[name].map'
	},
	module: {
		rules: [
			// test字段的正则表达式不能加引号，加了就不起作用
			// exclude:只编译自己编写的代码，不编译加载的npm包，必须是绝对路径
			{
				test: /\.js$/,
				use: 'babel-loader',
				// 相对路径不提高速度，没用，必须写成绝对路径
				exclude: path.resolve(__dirname,'node_modules/')
			},
			{
				test: /\.css$/,
				// css-loader?importLoaders=1 作用是告诉cssloader，css文件里的import文件也需要postcssloader处理
				// 但less就不需要这个步骤，因为lessloader先处理了import
				// extractTextWebpackPlugin插件就不能使用style-loader
				use: extractTextWebpackPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?importLoaders=1','postcss-loader'],
					publicPath: '/'
				})
			},
			{
				test: /\.less$/,
				use: ['style-loader','css-loader','postcss-loader','less-loader']
			},
			// 超出8192KB大小的图片会自动压缩为base64编码，减少http请求，大于的则按命名生成图片
			// 大概是由于url依赖于file，导致不安装file-loader会报错
			{
				//i 忽略大小写
				test: /\.(png|jpg|jpeg|gif)$/i,
				use: 'url-loader?limit=8192&name=images/[name].[ext]'
			},
			{
				test: /\.html$/,
				use: 'html-loader'
			}
		]
	},
	// 插件项
	plugins,
	devServer: {
		port: 9000
	}
	// 生产环境的sourcemap，可以映射到原始代码
	// devtool: 'cheap-module-source-map',
}