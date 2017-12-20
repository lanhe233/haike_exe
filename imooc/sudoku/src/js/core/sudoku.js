// 生成数独游戏

import Generator from './generator'

class Sudoku {
  init (level = 5) {
    let generator = new Generator()
    generator.generate()
    let matrix = generator.matrix

    return matrix.map(row => row.map(v => {
      return Math.random() * 9 > level ? v : 0
    }))
  }
}

export default Sudoku