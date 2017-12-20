$(function() {
  /* header添加滚动动画 */
  var h_carousel_i = 0;

  h_animate();
  setInterval(h_animate, 3000);

  /* 添加滚动条 */
  // $('.p-car-text').html(p_cartext[3]);
  $('.p-car-text').each(function() {
    $(this).perfectScrollbar();
  })

  /* 计划-第四幅效果 */
  $('.p-picsubbox').hover(function() {
    $('.p-picsubbox').removeClass('active');
    $(this).addClass('active');
    $('.p-car-text').eq(3).html(p_cartext[$(this).data('uid')]);
    $('.p-car-text').eq(3).perfectScrollbar('update');
  })

  /* 计划-轮播 */
  $('.p-car-prev').click(function() {
    var index = $('.p-car-section.p-car-active').index();
    index--;
    if (index > -1) {
      $('.p-car-section').removeClass('p-car-active').eq(index).addClass('p-car-active');
    }
  });
  $('.p-car-next').click(function() {
    var index = $('.p-car-section.p-car-active').index();
    index++;
    if (index < $('.p-car-section').length) {
      $('.p-car-section').removeClass('p-car-active').eq(index).addClass('p-car-active');
    }
  });
  $('.p-car-nav li').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.p-car-section').removeClass('p-car-active').eq($(this).index()).addClass('p-car-active');
  });

  /* 更多热门端游 */
  $('.h-game-more1').click(function() {

  });

  /* 头部定时器轮播 */
  function h_animate() {
    /* 法一：替换dom，使执行动画 */
    // var _html = $('.h-car-i').clone().text(h_carousel[h_carousel_i]);
    // $('.h-car-i').animate({top:'-55px',opacity:'0'}, 500);
    // setTimeout(function(){
    //   $('.h-car-i').remove();
    //   $('.h-carousel').append(_html);
    //   h_carousel_i++;
    //   h_carousel_i >= h_carousel.length ? h_carousel_i = 0 : '';
    // },500);

    /* 法二：仅替换文字，通过改变类名使执行进入和离开的动画 */
    $('.h-car-i').removeClass('fadeUp').addClass('fadeUp2');
    setTimeout(function() {
      $('.h-car-i').text(h_carousel[h_carousel_i++]).removeClass('fadeUp2').addClass('fadeUp');
      h_carousel_i >= h_carousel.length ? h_carousel_i = 0 : '';
    }, 500);
  }
})


