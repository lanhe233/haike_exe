// 工具集

/**
 * 矩阵和数组相关工具
 */
const matrix = {
  /*
   * 返回一个初始值全部为0的二维数组
   */
  matrix (value = 0) {
    return  Array.from({length: 9}, () => new Array(9).fill(value))
  },
  /*
   * Fisher-Yates洗牌算法
   */
  shuffle (array) {
    for (let i = 0; i < array.length - 1; i++) {
      let inte = i + Math.floor(Math.random() * (array.length - i))
      if (inte !== i) {
        [array[i], array[inte]] = [array[inte], array[i]]
      }
    }
    return array
  },
  /**
   * 检查数字 n 在该行、列和宫是否重复
   * 机制决定在行上不可能重复
   */
  checkFillable (matrix, num, rowIndex, colIndex) {
    let rowArr = matrix[rowIndex],
        colArr = matrix.map(row => row[colIndex]),
        boxArr = box.getBoxArr(matrix, box.convertToBoxCoord(rowIndex, colIndex).boxIndex)
    
    if (rowArr.includes(num) || 
        colArr.includes(num) || 
        boxArr.includes(num)) {
      return false
    }
    return true
  }
}

/**
 * 宫坐标系工具
 */
const box = {
  convertToBoxCoord (rowIndex, colIndex) {
    return {
      boxIndex: parseInt(rowIndex / 3) * 3 + parseInt(colIndex / 3),
      cellIndex: parseInt(rowIndex % 3) * 3 + parseInt(colIndex % 3)
    }
  },
  convertFromBoxCoord (boxIndex, cellIndex) {
    return {
      rowIndex: parseInt(boxIndex / 3) * 3 + parseInt(cellIndex / 3),
      colIndex: parseInt(boxIndex % 3) * 3 + parseInt(cellIndex % 3) 
    }
  },
  getBoxArr (matrix, boxIndex) {
    let startRowIndex = parseInt(boxIndex / 3) * 3,
        startColIndex = boxIndex % 3 * 3,
        boxArr = []
    // 优化一下 改成一层循环 ?
    for (let i = startRowIndex; i < startRowIndex + 3; i++) {
      for (let j = startColIndex; j < startColIndex + 3; j++) {
        boxArr.push(matrix[i][j])
      }
    }
    return boxArr
  }
}

export default {
  matrix,
  box
}