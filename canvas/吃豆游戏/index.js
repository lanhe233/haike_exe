

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

window.onload = function() {
	let game = new Game('canvas')

	let stage = game.createStage()

	// 画logo
	stage.createItem({
		x: game._width/2,
		y: game._height*0.4,
		width: 100,
		height: this.width,
		frames: 30,	
		draw (ctx) {
			// 画player
			let rate = (this.times%this.frames)/60
			// console.log(rate)
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
		},
		update () {
			if (!this.times%frames) {

			}
		}
	})
	// 画游戏名
	stage.createItem({
		x: game._width/2,
		y: game._height*0.6,
		frames: 30,	
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
		frames: 30,	
		draw (ctx) {
			ctx.fillStyle = '#fff'
			ctx.font = '16px Source Code Pro'
			ctx.textAlign = 'center'
			ctx.fillText('按[空格]暂停或继续', this.x, this.y)
		}
	})

	game.init()
}





















