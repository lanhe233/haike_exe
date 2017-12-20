import Grid from './ui/grid'
import '../less/main'



import Generator from './core/generator'
let grid = new Grid($('.sudoku'))
grid.build()
grid.layout()
grid.bindPop($('.pop'))

$('.check').on('click', function(){
  grid.check()
})
$('.reset').on('click', function(){
  grid.reset()
})
$('.rebuild').on('click', function(){
  grid.rebuild()
})
$('.clear').on('click', function(){
  grid.clear()
})

