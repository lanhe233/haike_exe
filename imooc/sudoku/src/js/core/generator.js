// 生成数独解决方案
import Toolkit from './toolkit'

class Generator {
  generate () {
    while (!this.beginGenerate()) {
      // TODO
      console.log('生成答案again...')
    }
  }
  beginGenerate () {
    // 生成九宫格矩阵
    this.matrix = Toolkit.matrix.matrix()
    // 生成随机矩阵，用来形成随机有序列
    this.orders = Toolkit.matrix.matrix()
      .map(row => row.map((v, i) => i))
      .map(row => Toolkit.matrix.shuffle(row))

    // 往九宫格内依次塞数字1-9
    for (let num = 1; num <= 9; num++) {
      if (!this.recursion(num)) {
        return false
      }
    }
    return true
  }

  // 数字 num 每行塞一个,需要加一个行参数
  recursion (num, row = 0) {
    if (row > 8) {
      // 成功结束该行的填数字
      return true
    }
    // 依次判断每一列适不适合放数字 num
    for (let col = 0; col < 9; col++) {
      let colValue = this.orders[row][col]
      // 如果这个位置已经有值，跳过
      if (this.matrix[row][colValue]) {
        continue
      }
      // 检查这个位置是否可以填 num，不可以则跳过
      // 当前行肯定不会重复，但需要检查当前列和当前宫
      if (!Toolkit.matrix.checkFillable(this.matrix, num, row, colValue)) {
        continue
      }

      this.matrix[row][colValue] = num
      
      // 当前行填写 num 成功，递归调用 recursion()
      // 但是下一行的填写是可能失败的，如果失败，清除当前行当前值，重新在当前行选一个能填的列
      if (!this.recursion(num, row + 1)) {
        this.matrix[row][colValue] = 0
        // 这个地方我开始想写的是this.recursion(num, row)
        // 后来看教程，完全不必要啊，接着上次的col继续下去就好了
        // 所以 continue...
        continue
      }

      // 这里还有一行这个，走到这里都没有continue跳走则表示填写成功啦，返回true
      return true
    }
    return false
  }
}

export default Generator
