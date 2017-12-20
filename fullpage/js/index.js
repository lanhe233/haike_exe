$(function(){
  $('#fullpage').fullpage({
    sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
    normalScrollElements: '.text'
  })

  // $('.text').scroll(function(){
  //   var height = $('.text').height();
  //   var trueheight = $('.text')[0].scrollHeight;
  //   var scrolltop = $('.text').scrollTop();
  //   if (scrolltop == 0) {
  //     $.fn.fullpage.moveSectionUp();//向上滚动一页
  //   } else if (scrolltop + height == trueheight) {
  //     $.fn.fullpage.moveSectionDown();
  //   }
  // })

  $('.text').on('touchstart', function(ev){

    $('.text').on('touchend', function(ev){
        var height = $('.text').height();
        var trueheight = $('.text')[0].scrollHeight;
        var scrolltop = $('.text').scrollTop();
        if (scrolltop == 0) {
          $.fn.fullpage.moveSectionUp();//向上滚动一页
        } else if (scrolltop + height == trueheight) {
          $.fn.fullpage.moveSectionDown();
        }
    })
  })
  $(document).on('mousewheel', function(ev){
    var x = ev.originalEvent.clientX, y = ev.originalEvent.clientY,
        left = $('.text').offset().left,
        top = $('.text').offset().top,
        width = $('.text').width(),
        height = $('.text').height();
        console.log(x,y)
    if (x > left && x < left + width && y > top && y < top + height && $('.text').is(':visible')) {
      console.log(11111111111)
      var direction = ev.originalEvent.wheelDelta || ev.originalEvent.detail;
      var trueheight = $('.text')[0].scrollHeight;
      // var height = $('.text').height();
      var scrolltop = $('.text').scrollTop();
      console.log(scrolltop, direction)
      if (scrolltop == 0 && direction > 0) {
        $.fn.fullpage.moveSectionUp();//向上滚动一页
        // $('.text').off('mousewheel');
      } else if (scrolltop + height == trueheight && direction < 0) {
        $.fn.fullpage.moveSectionDown();
        // $('.text').off('mousewheel');
      }
    }
  })
})