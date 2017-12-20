const Tool = {
  makeMatrix(row, col) {
    return Array.from({
      length: row
    }, () => new Array(col || row).fill(0))
  }
}

export default Tool