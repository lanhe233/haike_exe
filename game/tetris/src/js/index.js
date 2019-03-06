// 游戏主程序
import '../css/common.css'
import Data from './data/data.js'
import Databus from './util/databus.js'
import Draw from './function/draw.js'

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

// 游戏常量数据
const _data = new Data()
// 游戏变量数据
let databus = new Databus()

canvas.width = _data.canvasWidth
canvas.height = _data.canvasHeight

// 绘制背景
let draw = new Draw(ctx)


