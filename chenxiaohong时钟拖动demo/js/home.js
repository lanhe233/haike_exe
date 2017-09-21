$(function(){
	// 全屏高度
	var height = $(window).height();
	$('.stars-wrapper').css('height',height);
	$('.slider-container').css('height',height);
	//追加星星
	var star_box = $('.stars-cluster');
	for(var i=1;i<=40;i++){
		var star = '<div class="star star-'+i+'"></div>';
		$(star_box).append(star);
	}
	for(var i=1;i<=5;i++){
		for(var j=1;j<=40;j++){
			var star = $('.stars-cluster-'+i+' .star-'+j);
			star.css({
				'width':Math.floor(Math.random()*4)+1+'px',
				'opacity':Math.random(),
				'top':Math.random()*100+'%',
				'left':Math.random()*100+'%',
				'animation-duration':Math.random()+1+'s',
				'animation-delay':Math.random()+'s'
			})
			var width = star.width();
			star.css('height',width);
		}
	}
	
	var $slider = $('.slider'),
		$slideBGs = $('.slide__bg'),
		diff = 0,
		curSlide = 0,
		numOfSlides = $('.slide').length-1,
		animating = false,
		animTime = 500,
		autoSlideTimeOut,
		autoSlideDelay = 6000,
		$pagination = $('.slider-pagi');

	function createBullets(){
		for(var i = 0;i <= numOfSlides;i++){
			var $li = $('<li class="slider-pagi__elem"></li>');
			$li.addClass('slider-pagi__elem-'+i).data('page',i);
			if(!i) $li.addClass('active');
			$pagination.append($li);
		}
	}
	createBullets();

	function manageControls(){
		$('.slider-control').removeClass('inactive');
		if(!curSlide) $('.slider-control.left').addClass('inactive');
		else if(curSlide === numOfSlides) $('.slider-control.right').addClass('inactive');
	}

	function autoSlide(){
		autoSlideTimeOut = setTimeout(function(){
			curSlide++;
			if(curSlide > numOfSlides) curSlide=0;
			changeSlides();
		},autoSlideDelay);
	}
	autoSlide();

	function changeSlides(instant){
		if(!instant){
			animating = true;
			manageControls();
			$slider.addClass('animating');
			$slider.css("top");
			$('.slide').removeClass("active");
			$('.slide-'+curSlide).addClass('active');
			setTimeout(function(){
				$slider.removeClass('animating');
				animating = false;
			},animTime);
		}
		window.clearTimeout(autoSlideTimeOut);
		$('.slider-pagi__elem').removeClass('active');
		$('.slider-pagi__elem-'+curSlide).addClass('active');
		$slider.css('transform','translate3d('+ -curSlide*100 +'%,0,0)');
		$slideBGs.css('transform','translate3d('+ curSlide*50 +'%,0,0)');
		diff = 0;
		autoSlide();
	}

	function navigateLeft(){
		if(animating) return;
		if(curSlide > 0) curSlide--;
		changeSlides();
	}

	function navigateRight(){
		if(animating) return;
		if(curSlide < numOfSlides) curSlide++;
		changeSlides();
	}

	$(document).on("mousedown touchstart",'.slider',function(e){
		if(animating) return;
		window.clearTimeout(autoSlideTimeOut);
		var startX = e.pageX||e.originalEvent.touches[0].pageX;
		var winW = $(window).width();
		diff = 0;

		$(document).on("mousemove touchmove",function(e){
			var x = e.pageX||e.originalEvent.touches[0].pageX;
			diff = (startX - x)/winW * 70;
			if((!curSlide && diff < 0) || (curSlide === numOfSlides && diff>0)) diff /=2;
			$slider.css('transform','translate3d('+(-curSlide*100 - diff)+'%,0,0)');
			$slideBGs.css('transform','translate3d('+(curSlide*50+diff/2)+'%,0,0)');
		});
	});

	$(document).on('mouseup touchend',function(e){
		$(document).off("mousemove touchmove");
		if(animating) return;
		if(!diff){
			changeSlides(true);
			return;
		}
		if(diff > -8 && diff < 8){
			changeSlides();
			return;
		}
		if(diff <= -8){
			navigateLeft();
			return;
		}
		if(diff >= 8){
			navigateRight();
			return;
		}
	});

	$(document).on('click','.slider-control',function(){
		if($(this).hasClass('left')){
			navigateLeft();
		}else{
			navigateRight();
		}
	});

	$(document).on('click','.slider-pagi__elem',function(){
		curSlide = $(this).data('page');
		changeSlides();
	});

});
// 全屏滚动
$(function() {
  	$('#scene').parallax({
  		calibrateX: true,
  		calibrateY: true,
  		scalarX: 12,
  		scalarY: 12,
  		frictionX: 0.1,
  		frictionY: 0.1,
  		originX: 0.5,
  		originY: 0.5
  	});
    $('.main').onepage_scroll({
        sectionContainer: '.page',
        loop: false
    });
});

//图片切换
window.onload = function(){
	var clickTimes = 1;
	var lineCount =6;
	var btnRefresh = $('#btnRefresh');
	var iconRefresh = $('iconRefresh');
	var img3DList = $('.img-3d');
	var len = img3DList.length;
	$(btnRefresh).click(function(){
		iconRefresh.css({
			'transition':'.3s linear',
			'transform':'rotate('+360*clickTimes+'deg)'
		});
		for(var i = 0;i<len;i++){
			var colNum = parseInt(i/lineCount);
			var rowNum = i%lineCount;
			var delayTime = (colNum+rowNum)*100;
			$(img3DList[i]).css({
				'transition':'.3s '+delayTime +'ms linear',
				'transform':'rotateY('+180*clickTimes+'deg)'
			})
		}
		clickTimes++;
	});
	init_canvas();
}

// 鼠标右键不可用
// $(document).ready(function(){
//   $(document).bind("contextmenu",function(e){
//     return false; 
//   });
// });

// 光点聚集页面
var text_container =$('.text-container');
var text_box = $('.text-container .text_box');
var cvs = document.createElement('canvas');
text_box.append(cvs);
text_box.width = text_container.width();
text_box.height = text_container.height();
cvs.width = text_container.width();
cvs.height = text_container.height();

var ctx = cvs.getContext("2d");
var focallength = 250;//页面深度
var txt = $('#txt');//目标文字
var btn =$('#btn');//功能按钮
var particleArr = getImgData(txt.val());//光点数组
var pause = false;//是否在移动中
var timer;//定时器

function init_canvas(){

	initMove();

	function initMove(){
		particleArr.forEach(function(){
			this.locx = parseInt(Math.random()*cvs.width);//随机数x轴
			this.locy = parseInt(Math.random()*cvs.height);//随机数y轴
			this.locz = Math.random()*focallength*2 - focallength;//从-250到250（层次）
			this.x = parseInt(Math.random()*cvs.width);
			this.y = parseInt(Math.random()*cvs.height);
			this.z = Math.random()*focallength*2 - focallength;
			this.paint();
		});
		startMove();
	}

	// 速度
	var lastTime;
	var derection = true;//方向
	function startMove(){
		clearInterval(timer);
		var thisTime = new Date();
		ctx.clearRect(0,0,cvs.width,cvs.height);
		particleArr.forEach(function(){
			var particle = this;
			if(derection){//聚拢
				if(Math.abs(particle.disx -particle.x)<0.1 && Math.abs(particle.disy - particle.y)<0.1&&Math.abs(particle.disz - particle.z)<0.1){
					particle.x = particle.disx;
					particle.y = particle.disy;
					particle.z = particle.disz;
					if(thisTime  - lastTime > 300){//聚拢分散的时间间隔
						derection = false;//不可运动
					}
				}else{
					particle.x = particle.x + (particle.disx - particle.x) * 0.1;
					particle.y = particle.y + (particle.disy - particle.y) * 0.1;
					particle.z = particle.z + (particle.disz - particle.z) * 0.1;
					lastTime = new Date();
				}
			}else{//聚拢状态时
				if(Math.abs(particle.locx -particle.x)<0.1 && Math.abs(particle.locy- particle.y)<0.1&&Math.abs(particle.locz - particle.z)<0.1){
					particle.x = particle.locx;
					particle.y = particle.locy;
					particle.z = particle.locz;
					pause = true;
					clearInterval(timer);
					move();
				}else{//发散
					particle.x = particle.x + (particle.locx - particle.x) * 0.1;
					particle.y = particle.y + (particle.locy - particle.y) * 0.1;
					particle.z = particle.z + (particle.locz - particle.z) * 0.1;
					pause = false;
				}
			}
			particle.paint();
		});
		if(!pause){
			// 通过递归调用同一方法来不断更新画面以达到动起来的效果，但它优于setTimeout/setInterval的地方在于它是由浏览器专门为动画提供的API，
			// 在运行时浏览器会自动优化方法的调用，并且如果页面不是‘激活’状态下的话，动画会自动暂停，有效节省了CPU开销。
			if('requestAnimationFrame' in window){
				requestAnimationFrame(startMove);
			}
			else if('webkitRequestAnimationFrame' in window){
				webkitRequestAnimationFrame(startMove);
			}
			else if('msRequestAnimationFrame' in window){
				msRequestAnimationFrame(startMove);
			}
			else if('mozRequestAnimationFrame' in window){
				mozRequestAnimationFrame(startMove);
			}
		}
	}

	// 点击获取按钮
	btn.click(function(){
		if(!pause){
			return;
		}
		clearInterval(timer);
		particleArr = getImgData(txt.val());
		derection = true;
		pause = false;//改变pause，startMove()继续
		initMove();//移动
	});

	// 按回车键的效果
	document.onkeydown = function(e){
		var e = e || event;
		if(!pause){
			return
		}
		if(e.keyCode == '13'){
			clearInterval(timer);
			particleArr = getImgData(txt.val());
			derection = true;
			pause = false;//状态改为不可点击
			initMove();//移动
		}
	}

	function move(){
		timer = setInterval(makeParticle,10)//闪烁的亮片
	}

	function makeParticle(){
		ctx.clearRect(0,0,cvs.width,cvs.height);//清除画布
		for(var i=0;i<particleArr.length;i++){
			var particle = particleArr[i];
			particle.paint();
		}
	}
}
Array.prototype.forEach = function(callback) {
	for(var i=0;i<this.length;i++){
		callback.call(this[i]);
	}
}
// 重绘文字
function getImgData(text){
	drawText(text);//绘制文字
	var imgData = ctx.getImageData(0,0,cvs.width,cvs.height);//将绘制的文字的坐标信息取出
	ctx.clearRect(0,0,cvs.width,cvs.height);//清除文字
	var newArr = [];
	//imgData的宽高与画布的宽高相同
	for(var i=0;i<imgData.width;i+=6){
		for(var j=0; j<imgData.height; j+=6){
			var num = (j*imgData.width+i)*4;
			//data[]可取出每个像素的color/alpha 0-255
			if(imgData.data[num]>=128){//取一半的值
				var particle = new Particle(i-3,j-3,0,3);//半径为3的亮片，占据6*6的像素
				newArr.push(particle);
			}
		}
	}
	return newArr;
}
// 绘制文字
function drawText(text){
	ctx.clearRect(0,0,cvs.width,cvs.height);
	ctx.save();
	ctx.font = '200px 微软雅黑 bold';
	ctx.fillStyle ='rgba(255,255,255,1)';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(text,cvs.width/2,cvs.height/2);
	ctx.restore;
}
// 定义粒子
function Particle(x,y,z,r){
	this.disx = x;
	this.disy = y;
	this.disz = z;
	this.x = x;
	this.y = y;
	this.z = z;
	this.locx = 0;
	this.locy = 0;
	this.locz = 0;
	this.radius = r;
	this.col = 'rgba('+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+',1)';
}
Particle.prototype.paint=function(){
	ctx.save();
	ctx.beginPath();
	var scale = focallength/(focallength+this.z);//放大缩小的比例
	// this.x - cvs.width/2 为亮片距离中心的位置，*scale可将在屏幕太前面的大亮片移出到屏幕外（最大值是远超250*3的半径的圆）
	ctx.arc(cvs.width/2+(this.x - cvs.width/2)*scale,cvs.height/2+(this.y-cvs.height/2)*scale,this.radius*scale,0,2*Math.PI);
	ctx.fillStyle = 'rgba('+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+','+scale+')';
	ctx.fill();
	ctx.restore();
}