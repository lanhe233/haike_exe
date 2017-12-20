// 检查数独解决方案


import Toolkit from './toolkit'

class Check {
  constructor (matrix) {
    this.matrix = matrix
    this.matrixMarks = Toolkit.matrix.matrix(true)
  }
  matrixMarks () {
    return this.matrixMarks
  }
  check () {
    this.checkRows()
    this.checkCols()
    this.checkBoxes()

    // 检查是否成功, 即matrixMarks是否含有false
    return this.success = this.matrixMarks.every(row => row.every(v => v))
  }
  checkRows () {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      let row = this.matrix[rowIndex],
          marks = this.checkArray(row)
      marks.forEach((v, i) => {
        if (!v) {
          this.matrixMarks[rowIndex][i] = false
        }
      })
    }
  }

  checkCols () {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      let col = this.matrix.map(row => row[colIndex]),
          marks = this.checkArray(col)
      marks.forEach((v, i) => {
        if (!v) {
          this.matrixMarks[i][colIndex] = false
        }
      })
    }
  }

  checkBoxes () {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      let box = Toolkit.box.getBoxArr(this.matrix, boxIndex),
          marks = this.checkArray(box)
      marks.forEach((v, i) => {
        if (!v) {
          let {rowIndex, colIndex} = Toolkit.box.convertFromBoxCoord(boxIndex, i)
          this.matrixMarks[rowIndex][colIndex] = false
        }
      })
    }
  }

  // 这个函数是用来检查生成的答案是不是对的，不是用来检查能不能在这个位置塞某个数字的！！！
  checkArray (array) {
    let marks = Array.from({length: 9}, v => true)
    for (let i = 0; i < array.length; i++) {
      // 如果该位置已经被标记为false，则不必进行下面的验证
      if (!marks[i]) {
        continue
      }
      // 如果该位置的值为0，说明不合格
      if (!array[i]) {
        marks[i] = false
        continue
      }
      // 验证数组后面的内容有没有与当前内容重复的
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] === array[i]) {
          marks[i] = marks[j] = false
        }
      }
    }
    return marks
  }
}

export default Check