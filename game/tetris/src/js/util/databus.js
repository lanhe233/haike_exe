
let instance

export default class Databus {
  constructor() {
    if (instance) {
      return instance
    }

    instance = this

    this.init()
  }

  // 初始化数据
  init() {

    this.score = 0        // 分数
    this.next = []        // 下一个方块
    this.blocks = []      // 游戏区域内方块数据
    this.status = 0       // 0 游戏未开始     1 正在游戏      2 游戏暂停     3 游戏结束

  }
}