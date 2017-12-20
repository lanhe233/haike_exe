import Tool from './tool'
import Square from './square'

export default class Game {
  constructor($game, $next, $time, $score, $result) {
    this.$game = $game
    this.$next = $next
    this.$time = $time
    this.$score = $score
    this.$result = $result
    // 游戏矩阵
    this.gameData = Tool.makeMatrix(20, 10)
    this.nextData = Tool.makeMatrix(8)
    // 保存dom
    this.gameDivs = []
    this.nextDivs = []
    // 保存当前方块，下一个方块
    this.cur = null
    this.next = null
  }
  init(doms) {
    this.cur = {}
    this.next = new Square()
    // 生成dom
    this.initDivs(this.$game, this.gameData, this.gameDivs)
    this.initDivs(this.$next, this.next.data, this.nextDivs)
  }
  // 生成dom
  initDivs($container, matrix, divs) {
    for (let i in matrix) {
      var arr = []
      for (let j in matrix[i]) {
        var newNode = document.createElement('div')
        if (matrix[i][j] == 1) {
          newNode.className = 'done'
        } else if (matrix[i][j] == 2) {
          newNode.className = 'current'
        } else {
          newNode.className = 'none'
        }
        newNode.style.top = i * 20 + 'px'
        newNode.style.left = j * 20 + 'px'
        $container.appendChild(newNode)
        arr.push(newNode)
      }
      divs.push(arr)
    }
  }
  // 更新dom
  refreshDivs(matrix, divs) {
    for (let i in matrix) {
      for (let j in matrix[i]) {
        if (matrix[i][j] === 1) {
          divs[i][j].className = 'done'
        } else if (matrix[i][j] === 2) {
          divs[i][j].className = 'current'
        } else {
          divs[i][j].className = 'none'
        }
      }
    }
  }
  // 整合game数组和cur数组
  // 将当前方块的数据插入game的整体数据里渲染出来
  // status为true时执行一遍清理
  convert(status) {
    let {data, origin: { x, y }} = this.cur
    for (let i in data) {
      for (let j in data[i]) {
        if (this.check(x, y, parseInt(i), parseInt(j))) {
          this.gameData[x + parseInt(i)][y + parseInt(j)] = status ? 0 : data[i][j]
        }
      }
    }
  }
  go(directions) {
    if (this.canGo(this.isValid, directions)) { 
      this.convert(true)
      if (directions === 2) {
        this.cur.origin.y++
      } else if (directions === 3) {
        this.cur.origin.x++
      } else if (directions === 4) {
        this.cur.origin.y--
      }
      this.convert()
      this.refreshDivs(this.gameData, this.gameDivs)
      return true
    } else {
      return false
    }
  }
  // 判断某个点是否能够移动
  check(x, y, i, j) {
    if (x + i < 0 ||
      x + i >= this.gameData.length ||
      y + j < 0 ||
      y + j >= this.gameData[0].length ||
      this.gameData[x + i][y + j] === 1) {
      return false
    }
    return true
  }
  // 判断整体能否下移
  canGo(isValid, directions) {
    let test = {
      x: null,
      y: null
    }
    if (directions === 2) {
      test.y = this.cur.origin.y + 1
      test.x = this.cur.origin.x
    } else if (directions === 3) {
      test.x = this.cur.origin.x + 1
      test.y = this.cur.origin.y
    } else if (directions === 4) {
      test.y = this.cur.origin.y - 1
      test.x = this.cur.origin.x
    }
    return isValid.apply(this, [test, this.cur.data])
  }
  // 判断整体能否移动
  isValid(pos, data) {
    for (let i in data) {
      for (let j in data[i]) {
        if (data[i][j]) {
          if (!this.check(pos.x, pos.y, parseInt(i), parseInt(j))) {
            return false
          }  
        }
      }
    }
    return true
  }
  fall() {
    while (this.go(3)){}
  }
  rotate() {
    if (this.canRotate(this.isValid)) {
      this.convert(true)
      this.cur.dir = (this.cur.dir + 1) % 4
      this.cur.data = this.cur.rotateData[this.cur.dir]
      this.convert()
      this.refreshDivs(this.gameData, this.gameDivs)
    }
  }
  canRotate(isValid) {
    var d = (this.cur.dir + 1) % 4
    var data = this.cur.rotateData[d]
    return isValid.apply(this, [this.cur.origin, data])
  }
  // 固定方块
  fixed() {
    for (let i in this.cur.data) {
      for (let j in this.cur.data[i]) {
        if (this.cur.data[i][j] === 2) {
          this.cur.data[i][j] = 1
        }
      }
    }
    this.convert()
    this.refreshDivs(this.gameData, this.gameDivs)
  }
  // next中的方块移进来并生成新的next
  performNext() {
    Object.assign(this.cur, this.next)
    this.cur.data = Tool.makeMatrix(4)
    for (let i = 0; i < this.cur.data.length; i++) {
      for (let j = 0; j < this.cur.data[0].length; j++) {
        this.cur.data[i][j] = this.next.data[i][j]
      }
    }
    this.next = new Square()
    this.convert()
    this.refreshDivs(this.gameData, this.gameDivs)
    this.refreshDivs(this.next.data, this.nextDivs)
  }
  // 消行
  checkClear() {
    let line = 0
    for (let i = this.gameData.length - 1; i >= 0; i--) {
      let status = true
      for (let j = 0; j < this.gameData[0].length; j++) {
        if (this.gameData[i][j] !== 1) {
          status = false
        }
      }
      if (status) {
        line++
        for (let m = i; m >= 0; m--) {
          for (let n = 0; n < this.gameData[0].length; n++) {
            if (m === 0) {
              this.gameData[m][n] = 0
            } else {
              this.gameData[m][n] = this.gameData[m-1][n]
            }
          }
        }
        i++
      }
    }
    return line
  }
  // 判断是否结束游戏
  checkGameOver() {
    for (let i = 0; i < this.next.data[0].length; i++) {
      if (this.next.data[0][i] === 2 && this.gameData[0][this.next.origin.y + i] === 1) {
        return true
      }
    }
    return false
  }
  // 显示游戏结果
  result(win) {
    if (win) {
      $result.innerText = '你赢了'
    } else {
      $result.innerText = '你输了'
    }
  }
}