/**
 * 游戏引擎
 */


function Game(id, options) {


	let _this = this

	Object.assign(this, {
		_width: 960,
		_height: 600
	}, options)


	let cvs = document.getElementById(id)
	cvs.width = _this._width
	cvs.height = _this._height
	let ctx = cvs.getContext('2d')

	let Stage = {
		id: 0,					//舞台编号
		status: 0,			//舞台状态：0 未激活 | 1 激活中

	}







}