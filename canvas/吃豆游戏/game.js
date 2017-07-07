/**
 * 游戏引擎
 */


function Game(id, options) {

	let _this = this

	Object.assign(this, {
		_width: 960,
		_height: 600
	}, options)

	let _cvs = document.getElementById(id)
	_cvs.width = _this._width
	_cvs.height = _this._height
	let _ctx = _cvs.getContext('2d')

	let Stage = function (params) {
		Object.assign(this, {
			id: 0,					//舞台编号
			status: 0,			//舞台状态：0 未激活 | 1 激活中
			maps: [],
			items: []
		}, params)
	}

	let Map = function (params) {
		Object.assign(this, {
			id: 0,					//地图编号
			status: 0,			//地图状态：0 未激活 | 1 激活中
			stage: null,		//该地图绑定的舞台
			data: null,			//地图数据
			draw () {},
			update () {}
		}, params)
	}

	let Item = function (params) {
		Object.assign(this, {
			id: 0,					//物体编号
			status: 0,			//物体状态：0 未激活 | 1 正常 | 2 死亡 | 3 特殊
			stage: null,		//该物体绑定的舞台
			life: 3,				//物体生命
			x: 0,
			y: 0,
			width: 20,
			height: 20,
			frames: 1,			//多少帧变化一次
			times: 0,				//计算已经走过的帧数
			draw () {},
			update () {}
		}, params)
	}

	let _stages = [],	//舞台数组
			_index = 0,		//当前位于哪个舞台（舞台数组下标）
			// _items = []
			_hander				//动画

	Stage.prototype.createMap =  function (params) {
		
	}

	Stage.prototype.createItem = function (params) {
		let item = new Item(params)
		item.id = this.items.length
		this.items.push(item)
		// item.stage = this
		// return item
	}

	this.createStage = function (params) {
		let stage = new Stage(params)
		_index = stage.id = _stages.length
		_stages.push(stage)
		return stage
	}

	this.start = function () {
		let fn = function () {
			_ctx.fillStyle = '#000'
			_ctx.clearRect(0, 0, this._width, this._height)

			_stages[_index].items.forEach(function(item, i, arr){
				// console.log(item)
				item.times==item.frames ? item.times=0 : item.times++
				item.update()

				if (!item.times) {
					console.log(1)
					item.draw(_ctx)
				}
			})
			_hander = window.requestAnimationFrame(fn)
			// console.log(1)
		}
		_hander = window.requestAnimationFrame(fn)
	}

	this.init = function () {
		_index = 0
		this.start()
	}








}