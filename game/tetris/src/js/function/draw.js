import Data from '../data/data.js'
import Databus from '../util/databus.js'

const _data = new Data()
let databus = new Databus()

export default class Background {
  constructor(ctx) {
    // 画静止不动的东西
    this.drawStatic()
  }

  drawStatic() {
    // 画游戏框
    ctx.strokeRect(0, 0, _data.gameboxWidth, _data.gameboxHeight)

    // 画下一个方块框
    ctx.strokeRect(_data.gameboxWidth + 50, 0, _data.nextboxWidth, _data.nextboxHeight)

    // 画得分
    ctx.textAlign = 'center'
    ctx.font = "24px serif"
    ctx.fillText('score', _data.gameboxWidth + 150, _data.nextboxHeight + 200, 200)

  }

  drawScore(score) {
    ctx.font = "12px serif"
    ctx.fillText(score, _data.gameboxWidth + 150, _data.nextboxHeight + 250, 200)
  }

  // TODO
  drawStatus(status) {
    
    // 画暂停按钮
    ctx.font = "16px serif"
    ctx.fillText('暂停', _data.gameboxWidth + 150, _data.nextboxHeight + 400, 200)

    if (status) {

    }
  }
}