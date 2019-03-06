import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    // instance就一个值，第一次new DataBus就新建，以后就直接用
    if ( instance )
      return instance

    instance = this

    // 创建对象池
    this.pool = new Pool()

    // 初始化数据
    this.reset()
  }

  reset() {
    this.frame      = 0
    this.score      = 0                 // 分数
    this.bullets    = []                // 子弹
    this.enemys     = []                // 敌人
    this.animations = []                // 动画
    this.gameOver   = false             // 游戏结束标记
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    // shift 删除数组的第一个元素，并返回该值
    let temp = this.enemys.shift()

    // 设置不可见
    temp.visible = false

    // 回收敌人
    this.pool.recover('enemy', enemy)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    // 删除的一定是第一个子弹，先出来先移出屏幕
    let temp = this.bullets.shift()

    temp.visible = false

    this.pool.recover('bullet', bullet)
  }
}
