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
			items: [],
			// events: []
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

	this.jumpToStage = function () {
		// _index = 
	}

	this.start = function () {
		let f = 0
		let fn = function () {
			f++

			_ctx.clearRect(0, 0, _this._width, _this._height)
			_ctx.fillStyle = '#000'
			_ctx.fillRect(0, 0, _this._width, _this._height)

			_stages[_index].items.forEach(function(item, i, arr){
				
				if (!(f % item.frames)) {
					// if frames=3 ，即每三帧变化一次，变化的次数由times累计，此变化不同于update函数，而是反应在draw()里面的
					item.times = f / item.frames

				}
				// if (!item.times) {
				// 	item.update()
				// }

				item.draw(_ctx)
			})
			_hander = window.requestAnimationFrame(fn)
		}
		_hander = window.requestAnimationFrame(fn)
	}

	this.init = function () {
		_index = 0
		this.start()
	}








}