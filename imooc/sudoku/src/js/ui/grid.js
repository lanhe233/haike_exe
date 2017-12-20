import Toolkit from '../core/toolkit'
import Sudoku from '../core/sudoku'
import Pop from './pop'
import Checker from '../core/checker'

// 生成九宫格
class Grid {
  constructor ($container) {
    this.$container = $container
  }

  build () {
    let sudoku = new Sudoku()
    this.$matrix = sudoku.init()
    // 666
    this.draw()
  }

  draw () {
    this.$container.empty().append(
      this.$matrix.map(rowArr => 
        $('<div class="row" />').append(
          rowArr.map(colValue => 
            $('<span class="col" />')
              .text(colValue)
              .addClass(colValue ? 'default' : 'empty')
          )
        )
      )
    )
  }

  layout () {
    let width = $('.col', this.$container).outerWidth()
    $('.col', this.$container).css('line-height', `${width}px`)
  }

  // 绑定pop弹窗
  bindPop ($pop) {
    let pop = new Pop($pop)
    this.$container.on('click', '.col', e => {
      e.stopPropagation()
      pop.popup($(e.target))
    })
    $(document).on('click', e => {
      if ($pop.is(':visible')) {
        $pop.hide()
      }
    })
  }

  // 检查，通过则提示成功，否则标记出错误
  check () {
    // 通过界面生成一个二维数组
    let data = this.$container.children()
      .map((rowIndx, row) => {
        return $(row).children()
          .map((colIndex, col) => parseInt($(col).text()) || 0)
    })
    .toArray()
    .map(row => row.toArray())
    

    let checker = new Checker(data)

    if (checker.check()) {
      alert('通关成功！')
    } else {
      let marks = checker.matrixMarks
      // 循环dom比循环数组再去找dom简单啊！
      // 要去除固定显示的数字，那些数字不用标记错误的，错的不是它们
      this.$container.children().each((rowIndex, row) => {
        $(row).children().each((colIndex, col) => {
          if (!marks[rowIndex][colIndex] && !$(col).hasClass('default')) {
            $(col).addClass('mark-error')
          } else {
            $(col).removeClass('mark-error')
          }
        })
      })
    }
  }

  // 回到本局重新开始
  reset () {
    /** 
     * 重建dom
     * this.draw()
     * this.layout() 
    **/

    // 还可以不重建dom，只修改类
    this.$container.find('.col:not(.default)')
      .removeClass('mark-pink mark-error mark-green')
      .addClass('empty')
      .text(0)
  }

  // 放弃本局新开一局
  rebuild () {
    this.build()
    this.layout()
  }

  // 清除所有标记
  clear () {
    // this.$container.find('.col').each((rowIndex, col) => {
    //     $(col).removeClass('mark-error')
    // })
    
    this.$container.find('.col.mark-error').removeClass('mark-error');
  }
}

export default Grid