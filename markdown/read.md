##tips
1.	Array.prototype.slice.call(arguments)  
	可以将一个有length属性的对象转化为数组 
	>《css揭秘》一文中用于转化querySelectorAll获取到的dom对象集

2.	linear-gradient()属于*background-image*而不是*background-color*

3.	设置背景颜色时，可以加一层    

		linear-gradient(rgba(255,255,255,.2),transparent)

	来使得按钮有亮暗的变化

4.	currentColor

5.	inherit 可以用在表单样式、after样式

		input{font:inherit}
		a{color:inherit}
		div:after{border:inherit;background:inherit}
6.	vw vh vmax vmin
应用：查看大图 以图片原大小显示，但不能超出视窗，且维持比例

		img{
			display: block;
			max-width: 90vw;
			max-height: 90vh;
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}

其实直接用%作单位就可以了。。。用不着vw

7.	一些不熟悉的css

		column-width
		column-count
		outline-offset 可负值
		
8.	background-clip
半透明边框，自测ie9以上有效

		width: 200px;
		height: 200px;
		background-color: #fff;
		border: 50px solid rgba(0,0,0,.5);
		background-clip: padding-box;
		background-blend-mode 背景层的混合模式

9.	background、box-shadow等多重的，都是前者覆盖后者

10. 最好写回退机制，自测ie9以上有效

		background-positon:right 10px bottom 5px;
	与background-origin配合使用，可在padding弹性的情况下自适应。
	或者（ie10都不兼容）

		background-position:calc(100% - 20px) calc(100% - 10px);
	
11. 2-7 伪随机背景，同时可应用与伪随机照片旋转，伪随机循环动画
	参数不好调

12. clip-path P93 没怎么看懂、

13. 看到p95 