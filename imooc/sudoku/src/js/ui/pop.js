// 处理弹出操作面板

class Pop {
  constructor ($panel) {
    this.$panel = $panel.hide().removeClass('hidden')

    this.$panel.on('click', 'span', e => {
      if (this.$cell) {
        let $e = $(e.target)
        if ($e.hasClass('mark-pink')) {
          this.$cell.removeClass('mark-green mark-error')
            .addClass('mark-pink')
        } else if ($e.hasClass('mark-green')) {
          this.$cell.removeClass('mark-pink mark-error')
            .addClass('mark-green')
        } else if ($e.hasClass('empty')) {
          this.$cell.removeClass('mark-pink mark-green mark-error')
            .addClass('empty')
            .text(0)
        } else {
          this.$cell.removeClass('empty')
            .text($e.text())
        }
        $panel.hide()
      }
    })
  }

  popup ($cell) {
    if (!$cell.hasClass('default')) {
      this.$cell = $cell
      let {left, top} = $cell.offset()
      if (left + this.$panel.width() > $(window).width()) {
        left = left - 2 * $cell.width() - 4
      }

      this.$panel
        .css({
          'left': `${left-2}px`,
          'top': `${top-2}px`
        })
        .show()
    } else {
      if (this.$panel.is(':visible')) {
        this.$panel.hide()
      }
    }
  }
}

export default Pop