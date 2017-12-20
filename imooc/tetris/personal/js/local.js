import Game from './game'

export default class Local {
  start() {
    // 方块自由掉落时间间隔和定时器
    let INTERVAL = 500
    this.timer = null
    // 时间记录和时间计数器
    let time = 0
    let timeCount = 0
    // 记分
    let score = 0

    let $game = document.querySelector('.game')
    let $next = document.querySelector('.next')
    let $time = document.querySelector('#time')
    let $score = document.querySelector('#score')
    let $result = document.querySelector('#result')
    this.game = new Game($game, $next, $time, $score, $result)
    this.game.init()
    this.bindKeyBoard()
    this.game.performNext()
    // 方块自由下落
    this.timer = setInterval(() => {
      timeCount++
      if (timeCount % parseInt(1000 / INTERVAL) === 0) {
        time = timeCount / parseInt(1000 / INTERVAL)
        $time.innerText = time
      }
      if (!this.game.go(3)) {
        // 不能清除
        // clearInterval(timer)
        this.game.fixed()
        let line = this.game.checkClear()
        if (this.game.checkGameOver()) {
          this.stop()
          this.game.result(false)
        } else {
          this.game.performNext()  
        }
        if (line) {
          for (let n = 1; n <= line; n++) {
            score += n * 10
          }
          $score.innerText = score
        }
      }
    }, INTERVAL)
  }

  // 绑定键盘事件
  bindKeyBoard() {
    document.onkeydown = (e) => {
      if (e.keyCode === 38) {
        this.game.rotate()
      } else if (e.keyCode === 39) {
        this.game.go(2)
      } else if (e.keyCode === 40) {
        this.game.go(3)
      } else if (e.keyCode === 37) {
        this.game.go(4)
      } else if (e.keyCode === 32) {
        // space
        this.game.fall()
      }
    }
  }
  // 结束
  stop() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    document.onkeydown = null
  }
}