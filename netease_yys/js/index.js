$(function(){
  /* header添加滚动动画 */
  var h_carousel_i = 0;

  h_animate();
  setInterval(h_animate, 3000);
  game();

  /* 添加滚动条 */
  // $('.p-car-text').html(p_cartext[3]);
  $('.p-car-text').each(function(){
    $(this).perfectScrollbar();
  })

  /* 计划-第四幅效果 */
  $('.p-picsubbox').hover(function(){
    $('.p-picsubbox').removeClass('active');
    $(this).addClass('active');
    $('.p-car-text').eq(3).html(p_cartext[$(this).data('uid')]);
    $('.p-car-text').eq(3).perfectScrollbar('update');
  })

  /* 计划-轮播 */
  $('.p-car-prev').click(function(){
    var index = $('.p-car-section.p-car-active').index();
    index--;
    if (index > -1) {
      $('.p-car-section').removeClass('p-car-active').eq(index).addClass('p-car-active');
    }
  });
  $('.p-car-next').click(function(){
    var index = $('.p-car-section.p-car-active').index();
    index++;
    if (index < $('.p-car-section').length) {
      $('.p-car-section').removeClass('p-car-active').eq(index).addClass('p-car-active');
    }
  });
  $('.p-car-nav li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.p-car-section').removeClass('p-car-active').eq($(this).index()).addClass('p-car-active');
  });

  /* 头部定时器轮播 */
  function h_animate(){
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
    setTimeout(function(){
      $('.h-car-i').text(h_carousel[h_carousel_i++]).removeClass('fadeUp2').addClass('fadeUp');
      h_carousel_i >= h_carousel.length ? h_carousel_i = 0 : '';
    }, 500);
  }

  /* 游戏目录渲染 */
  function game(){
    var column = 16;

    for (var i in games) {
      var h_game = $('<div class="h-game"></div>'),
          h_game_type = $('<div class="h-game-type">'+games[i].type+'</div>'),
          h_game_detail = $('<div class="h-game-detail"></div>');
      h_game.append(h_game_type);
      var cache = games[i].data;
      var state = true;

      for (var j in games[i].data) {
        var h_subgame = $('<div class="h-subgame"></div>');
        if (games[i].data[j].type) {
          state = false;
          h_subtype = $('<div class="h-subtype">'+games[i].data[j].type+'</div>');
          h_subgame.append(h_subtype);
          cache = games[i].data[j].data;

          var h_subdetailArr = [];
          var group = Math.ceil(cache.length / column);
          
          for (var g = 0; g < group; g++) {
            h_subdetailArr[g] = $('<div class="h-subdetail"></div>');
          }

          for (var t in cache) {
            var h_subdetail_i = $('<div class="h-subdetail-i">'+cache[t].name+'</div>');
            if (cache[t].icon != 0) {
              var icon = $('<i class="h-game-icon'+cache[t].icon+'"></i>');
              h_subdetail_i.addClass('bigger');
              h_subdetail_i.append(icon);
            }
            h_subdetailArr[Math.floor(t / column)].append(h_subdetail_i);
          }

          for (var g = 0; g < group; g++) {
            h_subgame.append(h_subdetailArr[g]);
          }

          h_game_detail.append(h_subgame);
        }
      }
      if (state) {
        var h_subgame = $('<div class="h-subgame"></div>');
        h_subdetail = $('<div class="h-subdetail"></div>');

        for (var t in cache) {
          var h_subdetail_i = $('<div class="h-subdetail-i">'+cache[t].name+'</div>');
          if (cache[t].icon != 0) {
            var icon = $('<i class="h-game-icon'+cache[t].icon+'"></i>');
            h_subdetail_i.append(icon);
          }
          h_subdetail.append(h_subdetail_i);
        }

        h_subgame.append(h_subdetail);
        h_game_detail.append(h_subgame);
      }
      h_game.append(h_game_detail);
      $('.h-gamebox').append(h_game);
    }

    $('.h-game:first-child .h-subgame:first-child .h-subdetail:last-child').hide();
    $('.h-game:first-child .h-game-detail').css('padding-right','32px');
    $('.h-game:first-child .h-game-detail').append('<div class="h-game-more">更多热门端游</div>');
  
    $('.h-game:nth-child(2) .h-subgame:nth-child(2) .h-subdetail:nth-child(n+5)').hide();
    $('.h-game:nth-child(2) .h-game-detail').css('padding-right','40px');
    $('.h-game:nth-child(2) .h-game-detail').append('<div class="h-game-more">更多热门手游</div>');
   
    console.log($('.h-game:first-child .h-subgame:first-child .h-subdetail:nth-child(2) .h-subdetail-i')[0])
    $('.h-game:first-child .h-subgame:first-child .h-subdetail:nth-child(2) .h-subdetail-i').css('width','110px');
    $('.h-game:first-child .h-subgame:nth-child(2) .h-subdetail .h-subdetail-i').css('width','80px');
  }
})