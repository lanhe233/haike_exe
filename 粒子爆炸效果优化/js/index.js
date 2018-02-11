// 粒子总数
var COUNT = 500;
// 重力
var G = -0.1;
// 摩擦力
var F = -0.04;

var objects = [];

function init() {
  objects = [];
  for (var i = 0; i < COUNT; i++) {
    var d = Math.random() * 2 * Math.PI,
      v = Math.random() * 5;
    var circle = $('<div class="circle"></div>');
    objects.push({
      x: 250,
      y: 250,
      vx: v * Math.cos(d),
      vy: v * Math.sin(d),
      circle: circle[0]     // 存dom不存jquery对象
    })
    circle.appendTo($('.main'));
  }
}

function updateCircle() {
  for (var i = 0; i < COUNT; i++) {
    var x = objects[i].x;
    var y = objects[i].y;
    var vx = objects[i].vx;
    var vy = objects[i].vy;
    // 计算新速度
    var v = Math.sqrt(vx * vx + vy * vy);
    if (Math.abs(vx) < 1e-9) vx = 0;
    // 速度分量改变
    vx += F * vx / v;
    vy += F * vy / v + G;
    // 计算新速度
    v = Math.sqrt(vx * vx + vy * vy);
    if (vy > 0) d = Math.acos(vx / v);
    else d = -Math.acos(vx / v);
    // 位移分量改变
    x += vx;
    y += vy;
    objects[i].x = x;
    objects[i].y = y;
    objects[i].vx = vx;
    objects[i].vy = vy;
    objects[i].circle.style.transform = 'translate(' + x + 'px, ' + (400 - y) + 'px)';
  }
  requestAnimationFrame(updateCircle);
}

function showAnimation() {
  $('.main').html('');
  init();
  updateCircle();
}