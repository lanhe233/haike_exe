var gulp = require('gulp');											// gulp模块
var clean = require('gulp-clean');							// 清除文件
var rename = require('gulp-rename');						// 文件从命名
var cleanCss = require('gulp-clean-css'); 			// 压缩css
var uglify = require('gulp-uglify');						// 压缩js
var changed = require('gulp-changed');					// 只检测更改的文件
var debug = require('gulp-debug');							// gulp debug
var webpack = require('webpack');								// webpack模块
var webpackStream = require('webpack-stream');	// webpack with gulp
var named = require('vinyl-named');							// webpack编译js后从命名

// webpack 配置
var webpackConfig = {
	module: {
		loaders: [
  		{
  			test: /\.vue$/,
  			loader: 'vue'
  		},
  		{
  			test: /\.js$/,
  			loader: 'babel',
  			exclude: /node_module/
  		}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"devlopment"'
			}
		})
	],
	watch: true
}

var DEST = {
	HTML: './dist',
	CSS: './dist/css'
}

gulp.task('html', function() {
	return gulp.src('./src/*.html')
				.pipe(changed(DEST.HTML, {extension: '.html'}))
				.pipe(gulp.dest(DEST.HTML))
				.pipe(debug({title: 'html:'}))
});

gulp.task('css', function() {
	return gulp.src('./src/css/*.css')
				.pipe(changed(DEST.CSS, {extension: '.css'}))
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest(DEST.CSS))
				.pipe(debug({title: 'css:'}))
});

gulp.task('scripts', function() {
	return gulp.src('./src/js/*.js')
				.pipe(named())
				.pipe(webpackStream(webpackConfig))
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest('./dist/js'))
});

gulp.task('images', function() {
	return gulp.src('./src/images/*')
				.pipe(debug())
				.pipe(gulp.dest('./dist/images'))
});


gulp.task('watch', function() {
	gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/css/*.css', ['css']);
});

//把data任务加进来
gulp.task('default', ['html', 'css', 'scripts', 'images', 'watch']);

