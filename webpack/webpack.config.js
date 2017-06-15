var webpack = require('webpack')

/**
 * 提取公共代码
 * 默认会将所有入口节点的公共代码提取出来，生成一个common.js
 * 可以有选择的提取部分入口节点，方法是添加第二个参数 ['节点名','节点名']
 */
var commonsPlugin = new webpack.optimize.commonsChunkPlugin('common.js')

module.exports = {
	// 插件项
	plugins: [commonsPlugin],
	// 入口起点
	entry: {
		'index': './src/js/index.js',
		'hello': './src/js/hello.js'
	},
	// 输出
	output: {
		path: path.resolve(_dirname,'dist/js')
	},
	module: {
		rules: [
			{test: '/\.js$/',loader: 'babel-loader'},
			{test: '/\.css$/',loader: 'style-loader!css-loader'},
			{test: '/\.less$/',loader: 'style-loader!css-loader!less-loader'},
			{test: '/\.(png|jpg)$/',loader: 'url-loader'},
		]
	}
}