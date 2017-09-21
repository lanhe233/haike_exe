/*===========获取地理位置==========*/
$(function(){
	var position_box =$('#position');
	var no_btn = $('#position-no');
	var ok_btn = $('#position-ok');
	no_btn.click(function(){
		position_box.css('display','none');
	});
	ok_btn.click(function (){
		getLocation(function(){
			position_box.css('display','none');
		})
	});
})
function getLocation(callback){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition1,showError);
	}else{
		alert('浏览器不支持地理定位');
	}
	callback&&callback();
}
function showError(error){
	switch(error.code){
		case error.PERMISSION_DENIED:
			alert('定位失败，用户拒绝请求地理位置');
			break;
		case error.POSITION_UNAVAILABLE:
			alert('定位失败，位置信息是不可用的');
			break;
		case error.UNKNOWN_ERROR:
			alert('定位失败，定位系统失效');
			break;
		default:
			alert('定位失败，呆萌错误！');
			break;
	}
}
/*===========引用Google地图=============*/
function showPosition(position){   
	var lat = position.coords.latitude;//纬度
	var lag = position.coords.longitude;//经度
    var latlon = lat+','+ lag;//当前位置   
    var url = 'http://maps.google.cn/maps/api/geocode/json?latlng='+latlon+'&language=CN';   
    $.ajax({    
        type: "GET",   
        url: url,    
        beforeSend: function(){   
            $("#position_status").html('正在获取您的位置信息<span>……</span>');
        },   
        success: function (json) {    
            if(json.status=='OK'){   
                var results = json.results;   
                $.each(results,function(index,array){   
                    if(index==0){   
                    	$("#position_status").html(array['formatted_address']);   
                    }   
                });   
            }   
        },   
        error: function (XMLHttpRequest, textStatus, errorThrown) {    
            $("#position_status#").html(latlon+"地址位置获取失败");    
        }    
    });   
} 
/*============引用百度地图==============*/
function showPosition1(position){   
    var lat = position.coords.latitude;//纬度
	var lag = position.coords.longitude;//经度
    var latlon = lat+','+ lag;//当前位置       
    var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0";   
    $.ajax({    
        type: "GET",    
        dataType: "jsonp",    
        url: url,   
        beforeSend: function(){   
            $("#position_status").html('正在获取您的位置信息<span>……</span>');
        },   
        success: function (json) {    
            if(json.status=='OK'){   
                var results = json.results;   
                $.each(results,function(index,array){   
                    if(index==0){   
                    	$("#position_status").html(array['formatted_address']);   
                    }   
                });   
            }   
        },   
        error: function (XMLHttpRequest, textStatus, errorThrown) {    
            $("#position_status#").html(latlon+"地址位置获取失败");    
        }  
    });   
};  



var div = document.getElementById('clock');
/*=========时钟 start=========*/
// 创建一个canvas对象
var canvasClock = {
	init:function(){
		var cvs = document.createElement('canvas');
		div.appendChild(cvs);
		cvs.width = div.offsetWidth;
		cvs.height = div.offsetHeight;
		var ctx = cvs.getContext("2d");
		canvasClock.play(cvs,ctx,index);
		var index = 0;
		setInterval(function(){
			if(index >= 3000) index = 0;
				canvasClock.play(cvs,ctx,index);
				index++;
			},1);
		},
	play:function(cvs,ctx,index){
		var currentDate = new Date();
		var hour = currentDate.getHours(),
			min = currentDate.getMinutes(),
			second = currentDate.getSeconds(),
			ms = currentDate.getMilliseconds();
		ctx.clearRect(0,0,cvs.width,cvs.height);
		ctx.fillStyle = 'transparent';
		ctx.fillRect(0,0,cvs.width,cvs.height);
		// 时分的角度
		var radians = -Math.PI * 2 / 60,
			radians1 = -Math.PI * 2 / 12;
		var x = y = r = cvs.width / 2;
			r -= 10;

		ctx.fillStyle = 'transparent' ;
		ctx.beginPath();
		ctx.shadowBlur = 0;
		ctx.arc(x,y,r,0,Math.PI*2,false);
		ctx.fill();
		ctx.fillStyle = "white";
		ctx.closePath();

		ctx.beginPath();
		ctx.shadowBlur = 5;
		ctx.shadowColor = 'white';
		ctx.arc(x,y,3,0,Math.PI * 2);
		ctx.fill();
		ctx.closePath();
		ctx.shadowBlur = 0;
		// 构建时钟数值点
		for (var i = 0; i < 60; i++) {
			var _x = x + (r - 2) * Math.sin(radians * i);
			var _y = y + (r - 2) * Math.cos(radians * i);
			ctx.fillStyle = "white" ;
			ctx.beginPath();
			ctx.arc(_x,_y,1,0,Math.PI*2);
			ctx.fill();
			ctx.closePath();
		}
		for (var i = 1;i<=12; i++){
			var _x = x - (r) * Math.sin(radians1 * i);
			var _y = y - (r) * Math.cos(radians1 * i);
			var _x1 = x-(r-0.8)*Math.sin(radians1 * i);
			var _y1 = y-(r-0.8)*Math.cos(radians1 * i);
			var _x2 = x-(r-6)*Math.sin(radians1 * i);
			var _y2 = y-(r-6)*Math.cos(radians1 * i);
			// 文字的位置
			var _x3 = x-(r-16)*Math.sin(radians1 * i);
			var _y3 = y-(r-16)*Math.cos(radians1 * i);
						
			ctx.beginPath();
			ctx.fillStyle = "white" ;
			ctx.shadowBlur = 0;
			ctx.lineCap = 'butt';
			ctx.lineWidth = 3;
			ctx.moveTo(_x1,_y1);
			ctx.lineTo(_x2,_y2);
			ctx.strokeStyle = "white" ;
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.fillStyle = 'white' ;
			ctx.font = '12px microsoft yahei';
			ctx.fillText(i,_x3-ctx.measureText(i).width/2,_y3+4);
			ctx.closePath();
		}
					//秒针(毫秒)
		var secondX = x - (r-1)*Math.sin(-Math.PI*2/60000*((second)*1000+ms));
		var secondY = y - (r-1)*Math.cos(-Math.PI*2/60000*((second)*1000+ms));
		ctx.beginPath();
		ctx.lineCap = 'round';
		ctx.shadowBlur = 5;
		ctx.shadowColor = 'white';
		ctx.lineWidth = 1;
		ctx.moveTo(x,y); //圆心
		ctx.lineTo(secondX,secondY);
		ctx.stroke();
		ctx.closePath();

		//分针
		var minX = x - (r/1.6) * Math.sin(radians *min);
		var minY = y - (r/1.6) * Math.cos(radians *min);
		ctx.beginPath();
		ctx.lineWidth =2;
		ctx.moveTo(x,y);
		ctx.lineTo(minX,minY);
		ctx.stroke();
		ctx.closePath();

		// 时针
		var hourX = x - (r/3) * Math.sin(radians1 * (hour + min/60));
		var hourY = y - (r/3) * Math.cos(radians1 * (hour + min/60));
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.moveTo(x,y);
		ctx.lineTo(hourX,hourY);
		ctx.stroke();
		ctx.closePath();

		//时间
		var hourInfo = hour < 10? '0'+ hour:hour,
			minInfo = min < 10? '0' + min:min,
			TimeStr = hourInfo+":"+minInfo;
		ctx.beginPath();
		ctx.font = "14px microsoft yayhei";
		ctx.shadowBlur = 5;
		ctx.fillText(TimeStr,x-ctx.measureText(TimeStr).width/2,y+r/2);
		ctx.closePath();
	}
};
canvasClock.init();

/*========可拖拽=======*/
div.onmousedown = function(ev){
	var ev = ev||event;
	var disX = ev.pageX - div.offsetLeft;
	var disY = ev.pageY - div.offsetTop;
	document.onmousemove = function(ev){
		var ev = ev || event;
		var l = ev.pageX - disX;
		var t = ev.pageY - disY;
		div.style.left = l+'px';
		div.style.top = t+'px';
	}
	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
}
/*=======本地存储======*/
var contact = new Object;
$('#sign-up-button').click(function(){
	localStorage.clear();
	if(checkPassword()){
		contact.user_name = $('#username').val();
		contact.password = $('#pass1').val();
		contact.email = $('#email').val();
		var str = JSON.stringify(contact);
		console.log(str);
		localStorage.setItem(contact.user_name,str);
		console.log(localStorage);
	}else{
		alert('注册不成功！');
	}
})
function checkPassword(){
	var pass1 = $('#pass1').val();
	var pass2 = $('#pass2').val();
	if(pass1 == pass2){
		return true;
	}
	return false;
}
$('#user').blur(function(){
	if(localStorage.length>0){
		var user = $('#user').val();
		var str = localStorage.getItem(user);
		var cont = JSON.parse(str);
		if(cont!=null){
			$('#pass').val(cont.password);
		}else{
			alert('请先注册！');
		}	
	}
})

$('#sign-in-button').click(function(){
	var user = $('#user').val();
	var pass = $('#pass').val();
	if(user != '' && pass != ''){
		location.href='home.html';
	}else{
		alert('error！');
	}
});