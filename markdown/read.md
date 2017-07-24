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
8.	
		column-width
		column-count
		
9.	background-clip
半透明边框

		width: 200px;
		height: 200px;
		background-color: #fff;
		border: 50px solid rgba(0,0,0,.5);
		background-clip: padding-box;

10.	background、box-shadow等多重的，都是前者覆盖后者

