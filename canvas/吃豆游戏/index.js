
(function(){
	const _MAPDATA = [		//地图数据
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
		[1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
		[1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
		[1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	],
	_GOODS = {			//能量豆
		'1,3':1,
		'26,3':1,
		'1,23':1,
		'26,23':1
	},
	_COS = [0, 1, 0, -1],
	_SIN = [1, 0, -1, 0],
	_LIFE = 3

	let score = 0

	let game = new Game('canvas')
	
	// 配置启动页
	!(function(){
		let stage = game.createStage()
		// 画logo
		stage.createItem({
			x: game._width/2,
			y: game._height*0.4,
			width: 100,
			height: 100,
			frames: 4,
			draw (ctx) {
				// 画player
				// 0.067的来源：假设想要嘴巴的rate从-60~60度，那么最大60度，设定从张嘴到闭嘴执行五步，每步走60/5=12度，12/180=0.067，所以rate设定值乘以0.067
				let rate = Math.abs(this.times % 10 - 5) * 0.04

				ctx.fillStyle = '#ffe600'
				ctx.beginPath()
				ctx.arc(this.x, this.y, this.width/2, rate*Math.PI, (2-rate)*Math.PI)
				ctx.lineTo(this.x, this.y)
				ctx.fill()

				// 画眼睛
				let r = this.width*0.07
				ctx.fillStyle = '#000'
				ctx.beginPath()
				ctx.arc(this.x+r-2, this.y-this.width/4, r, 0, Math.PI*2)
				ctx.fill()
			}
		})
		// 画游戏名
		stage.createItem({
			x: game._width/2,
			y: game._height*0.6,
			draw (ctx) {
				ctx.fillStyle = '#fff'
				ctx.font = 'bold 36px Helvetica'
				ctx.textAlign = 'center'
				ctx.fillText('Pac-Man', this.x, this.y)
			}
		})
		// 画提示文字
		stage.createItem({
			x: game._width/2,
			y: game._height*0.96,
			draw (ctx) {
				ctx.fillStyle = '#fff'
				ctx.font = 'normal 16px Source Code Pro'
				ctx.textAlign = 'center'
				ctx.fillText('按[空格]暂停或继续', this.x, this.y)
			}
		})
		// 绑定事件
		stage.bind('keydown',function(e){
			// 空格或回车
			if (e.keyCode == 32 || e.keyCode == 13) {
				game.jumpToStage(stage.id + 1)
			}
		})
	})()

	// 配置游戏页
	!(function(){
		let stage = game.createStage()
		
		// 地图
		stage.createMap({
			x: 60,
			y: 10,
			data: _MAPDATA,
			draw (ctx) {
				// ctx.save()
				// ctx.translate(this.x, this.y)

				for (let j = 0; j < this.data.length; j++){
					for (let i = 0; i < this.data[0].length; i++){
						let value = this.get(i, j), 
								code = [0, 0, 0, 0]
						
						if (value) {
							if (this.get(i+1, j)&&!(this.get(i+1, j-1)&&this.get(i+1, j+1)&&this.get(i, j-1)&&this.get(i, j+1))) {
								code[0] = 1
							}
							if (this.get(i, j+1)&&!(this.get(i+1, j)&&this.get(i+1, j+1)&&this.get(i-1, j)&&this.get(i-1, j+1))) {
								code[1] = 1
							}
							if (this.get(i-1, j)&&!(this.get(i-1, j-1)&&this.get(i-1, j+1)&&this.get(i, j-1)&&this.get(i, j+1))) {
								code[2] = 1
							}
							if (this.get(i, j-1)&&!(this.get(i-1, j-1)&&this.get(i-1, j)&&this.get(i+1, j-1)&&this.get(i+1, j))) {
								code[3] = 1
							}
						}
						if (code.includes(1)) {
							let pos = this.getPos(i, j)

							ctx.strokeStyle = '#09c'
							ctx.beginPath()
							// ？ 自己设想的情况， 0110 和 1001 是相反的
							switch(code.join('')){
								case '1100':
									ctx.arc(pos.x + this.size / 2, pos.y + this.size / 2, this.size / 2, Math.PI, 1.5 * Math.PI)
									break
								case '0110':
									ctx.arc(pos.x - this.size / 2, pos.y + this.size / 2, this.size / 2, 1.5 * Math.PI, 2 * Math.PI)
									break
								case '0011':
									ctx.arc(pos.x - this.size / 2, pos.y - this.size / 2, this.size / 2, 0, 0.5 * Math.PI)
									break
								case '1001':
									ctx.arc(pos.x + this.size / 2, pos.y - this.size / 2, this.size / 2, 0.5 * Math.PI, Math.PI)
									break
								default:
									for (let c in code){
										if (code[c]) {
											ctx.moveTo(pos.x, pos.y)
											// ？ 把 getPos() 改为i->x,j->y，并且这里_SIN和_COS调换，地图才是正的，而不是翻转了90度
											ctx.lineTo(pos.x + _SIN[c] * this.size / 2, pos.y + _COS[c] * this.size / 2)
										}
									}
									break
							}
							ctx.stroke()
						}
						// let ccc = 0
						// if (value==0 && ccc==0) {
						// 	ccc++;
						// 	let pos = this.getPos(i, j), width = 5
						// 	// stage.createItem({
						// 	// 	x: pos.x,
						// 	// 	y: pos.y,
						// 	// 	width: 5,
						// 	// 	height: 5,
						// 	// 	draw (ctx) {
						// 			ctx.fillStyle = '#fff'
						// 			ctx.beginPath()
						// 			ctx.fillRect(pos.x - width/2, pos.y - width/2, width, width)
						// 		// }
						// 	// })
						// }
					}
				}
				// ctx.restore()
			}
		})
		// 分数
		stage.createItem({
			x: 690,
			y: 95,
			draw (ctx) {
				ctx.fillStyle = '#f00'
				ctx.font = 'bold 28px Arial'
				ctx.fillText('SCORE', this.x, this.y)
				ctx.fillStyle = '#fff'
				ctx.font = '28px Arial'
				ctx.fillText(score, this.x + 10, this.y + 30)
			}
		})
		// 生命
		stage.createItem({
			x: 690,
			y: game._height*.85,
			width: 30,
			height: 30,
			draw (ctx) {
				let coord = (x, i) => x + this.width/2 + (this.width + 12) * i
				
				ctx.fillStyle = '#FFE600'																																																																																																																																																																																																																										
				for (let i = 0; i < _LIFE; i++) {
					ctx.beginPath()
					ctx.arc(coord(this.x, i), this.y, this.width/2, 0.2 * Math.PI, 1.8 * Math.PI)
					ctx.lineTo(coord(this.x, i), this.y)
					ctx.fill()
				}
			}
		})
		// 游戏状态
		stage.createItem({
			x: 690,
			y: game._height*.55,
			draw (ctx) {
				// 舞台暂停时显示，并且要有一闪一闪的效果
				if (stage.status==1 && this.times%50>25) {
					ctx.fillStyle = '#09F'
					ctx.font = '24px Arial'
					ctx.fillText('PAUSE', this.x, this.y)
				}
			}
		})
		// 豆子
		let map = stage.maps[0]
		for(let i = 0; i < map.data[0].length; i++){
			for(let j = 0; j < map.data.length; j++){
				if (map.get(i, j)==0) {
					let pos = map.getPos(i, j)
					stage.createItem({
						x: pos.x,
						y: pos.y,
						width: 5,
						height: 5,
						draw (ctx) {
							ctx.fillStyle = '#fff'
							ctx.beginPath()
							ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height)
						}
					})
				}
			}
		}
		// 绑定键盘事件
		stage.bind('keydown', function(e){
			if (e.keyCode==13 || e.keyCode==32) {
				// 注意，这里的this并不是stage，所以需要在bind实现函数里去绑定作用域
				this.status = this.status==1 ? 0 : 1
			}
			if (e.keyCode==38) {
				// 上
			}
			if (e.keyCode==40) {
				// 下
			}
			if (e.keyCode==37) {
				// 左
			}
			if (e.keyCode==39) {
				// 右
			}
		})
	})()
	
	// 启动canvas
	game.init()
})()

























