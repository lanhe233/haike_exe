function Tool() {
  // 生成一个5X5的矩形
  this.get = function() {
    return [0, 0, 0, 0, 0].map(function(row) {
      return [0, 0, 0, 0, 0]
    })
  }

  // 获取某个点可以行走的方向的集合
  this.direction = function(matrix, dot) {
    // console.log(dot)
    var dirts = []
    // 次序：上 下 左 右
    if (matrix[dot.row - 1] && matrix[dot.row - 1][dot.col] == 0) {
      dirts.push('t')
    }
    if (matrix[dot.row + 1] && matrix[dot.row + 1][dot.col] == 0) {
      dirts.push('b')
    }
    if (matrix[dot.row][dot.col - 1] == 0) {
      dirts.push('l')
    }
    if (matrix[dot.row][dot.col + 1] == 0) {
      dirts.push('r')
    }
    // console.log(dirts)
    // console.log(matrix)
    return dirts
  }
}

function Draw($container) {
  this.$container = $container
  this.tool = new Tool()
  this.count = 0

  // 描绘一个5X5的矩形
  this.generate = function(matrix) {
    this.$container.empty()
      // 生成dom结构
    for (var i = 0; i < matrix.length; i++) {
      var div = $('<div class="row"></div>')
      for (var j = 0; j < matrix.length; j++) {
        div.append($('<span class="col"></span>'))
      }
      this.$container.append(div)
    }
    // 计算每个格子的高度
    $('.col').height($('.col').width())
  }

  // 古董占位
  this.occupy = function($grid, matrix) {
    if ($grid.is(':empty')) {
      var img = './images/antique' + parseInt(Math.random() * 7) + '.png'
      $grid.append($('<img/>').attr('src', img))
      matrix[$grid.parent().index()][$grid.index()] = 1
    } else {
      $grid.empty()
      matrix[$grid.parent().index()][$grid.index()] = 0
    }
    return matrix
  }

  // 生成答案
  this.answer = function(matrix) {
    // var isStart = false
    // var start = {}    
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix.length; j++) {
        /**
         * 0 空
         * 1 古董
         * 2 起始点
         * 3 上箭头
         * 4 下箭头
         * 5 左箭头
         * 6 右箭头
         */
        if (matrix[i][j]) {
          continue
        }
        matrix[i][j] = 2
        var start = {
          row: i,
          col: j
        }
        if (this.path(matrix, start)) {
          // console.log('成功')
          this.render()
          return
        } else {
          // console.log('失败')
          // matrix[i][j] = 0
          return
          // continue
        }
      }
    }
  }

  // 根据起始点，寻找路径
  this.path = function(matrix, start) {
    // this.recursion(matrix, start)
    return this.recursion(matrix, start)
    // return true
  }

  // 递归
  this.recursion = function(matrix, start) {
    // if (++this.count>3) {return}
    var _this = this
    var directions = this.tool.direction(matrix, start)
        console.log(start.row,start.col)
        console.log(directions)
        console.log(matrix)
    if (directions.length == 0) { 
      // 没有方向可以走的时候，检查是否所有格子都满了
      // 是，则答案出现；
      // 否，则退回上一步，且不能走上一次走过的方向；
      var noend = matrix.some(function(value) {
        return $.inArray(0,value) != -1
      })
      if (noend) {
        console.log('没方向可以走了')
        return false
      } else {
        console.log(matrix)
        return true
      }
    }
    // var value = directions[0]
    // if (matrix[start.row][start.col] != 2) {
    //   matrix[start.row][start.col] = value
    // }
      // console.log(++this.count)
      // console.log(JSON.stringify(start))
      // console.log(directions)
      // console.log(matrix)
    // _this.recursion(matrix, start)
    // console.log(_this.recursion(matrix, start))
    // if (!_this.recursion(matrix, start)) {
    //   return false
    // }
    for (var n = 0; n < directions.length; n++) {
      var storeStart = start
      if (matrix[start.row][start.col] != 2) {
        matrix[start.row][start.col] = directions[n]
        // $container.find('.row').eq(start.row).find('.col').eq(start.col).append(matrix[start.row][start.col])
        // console.log(directions[n])
      }
      if (directions[n] == 't') {
        start.row -= 1
      } else if (directions[n] == 'b') {
        start.row += 1
      } else if (directions[n] == 'l') {
        start.col -= 1
      } else if (directions[n] == 'r') {
        start.col += 1
      }
      // console.log(JSON.stringify(storeStart))
      // console.log(directions)
      // console.log(directions[n])
      // console.log(matrix)
      if (!_this.recursion(matrix, start)) {
        start = storeStart
        console.log('下一步走不了了，返回到本步')
        console.log(storeStart)
        matrix[storeStart.row][storeStart.col] = 0
        // $container.find('.row').eq(start.row).find('.col').eq(start.col).empty(0)
        continue
      }
      return true
    }
    return false
  }

  // 渲染答案
  this.render = function(matrix) {
    // console.log(matrix)

  }
}

window.onload = function() {
  var tool = new Tool(),
    draw = new Draw($('.matrix')),
    matrix = tool.get()
  draw.generate(matrix)

  // 点击方格，切换有无古董状态
  $('.col').on('click', function() {
    matrix = draw.occupy($(this), matrix)
  })

  // 点击生成答案，生成路线
  $('.submit').on('click', function() {
    draw.answer(matrix)
  })
}