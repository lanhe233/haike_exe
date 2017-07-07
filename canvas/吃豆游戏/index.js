

/*
let cvs = document.getElementById('canvas')
cvs.width = 960
cvs.height = 600
let ctx = cvs.getContext('2d')


// 画player
ctx.fillStyle = '#ffe600'
ctx.beginPath()
ctx.arc(20, 20, 18, 0.25*Math.PI, (2-0.25)*Math.PI)
ctx.lineTo(20, 20)
ctx.fill()

// 画有眼睛的player
ctx.fillStyle = '#ffe600'
ctx.beginPath()
ctx.arc(180, 60, 50, 0.25*Math.PI, (2-0.25)*Math.PI)
ctx.lineTo(180, 60)
ctx.fill()

ctx.fillStyle = '#000'
ctx.beginPath()
ctx.arc(180+5, 60-25, 7, 0, Math.PI*2)
ctx.fill()


// 画文字
ctx.fillStyle = '#fff'
ctx.font = '36px blod'
ctx.textAlign = 'center'
ctx.fillText('Pac-Man', ctx.canvas.width/2, 50)
*/

(function(){
	let game = new Game('canvas')
	
	// 配置启动页
	!(function(){
		let stage = game.createStage()
		// 画logo
		stage.createItem({
			x: game._width/2,
			y: game._height*0.4,
			width: 100,
			height: this.width,
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
				ctx.font = '36px bold Helvetica'
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
				ctx.font = '16px Source Code Pro'
				ctx.textAlign = 'center'
				ctx.fillText('按[空格]暂停或继续', this.x, this.y)
			}
		})
				console.log(this)
		// 绑定事件
		stage.onkeydown = function(e){
			// 空格或回车
			if (e.keyCode == 32 || e.keyCode == 13) {
				game.jumpToStage()
				console.log(this)
			}
		}
	})()

	// 配置游戏页
	!(function(){
		let stage = game.createStage()
	})()
	
	// 启动canvas
	game.init()
})()

























