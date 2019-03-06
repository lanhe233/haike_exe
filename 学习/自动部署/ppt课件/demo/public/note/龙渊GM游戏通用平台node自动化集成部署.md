
## 龙渊GM游戏通用平台node自动化集成部署

> 作者：李立冬 web开发组

-知识点小结

- Shell 脚本 
- Node（spawn/stdout/events/util/stream/process)
- npm模块 邮件通信 nodemailer  nodemailer-smtp-transport
- gitlab的钩子（通信ssh）
- pm2进程守护
- docker+redis（高级用法）




## 核心三个服务端的node进程文件

```
longyuan_gm_all_front_onlineTest_webhook_auto_deploy.sh (gitlab-ssh拉取代码)
longyuan_gm_all_front_onlineTest_webhook_email.js(开发人员代码推送分支部署)
longyuan_gm_all_front_onlineTest_webhook_web_monit.js（网站状态监控）

```


## longyuan_gm_all_front_onlineTest_webhook_auto_deploy.sh

```
echo "龙渊GM系统测试服部署开始..."

cd "/home/worker/node-server-longyaun-mall-c"

dir="/home/worker/node-server-longyaun-mall-c/longyuan-gm-all-front"
#这里的-x 参数判断$myPath是否存在并且是否具有可执行权限
if [ ! -d "$dir" ]; then git clone git@gitlab.ilongyuan.cn:csdata/longyuan-gm-all-front.git
fi

cd /home/worker/node-server-longyaun-mall-c/longyuan-gm-all-front

echo "pull from origin:onlineTest..."
#git checkout onlineTest
#git pull origin/onlineTest
git fetch --all
git reset --hard origin/onlineTest


source  ~/.bash_profile
npm install
npm run build:dev

echo "白屏方案解决拷贝"

cp -r -f ./dist/. /home/worker/node-server-longyaun-mall-c/longyuan-gm-all-front/deploy/

echo "龙渊GM系统测试服部署成功！！！"


```

## longyuan_gm_all_front_onlineTest_webhook_email.js

```
var http = require('http')
var createHandler = require('./webhook.js') //主要是和gitlab通信，可自行封装
var handler = createHandler({ path: '/' })

var user = process.env.USER
var pass = process.env.PASS

// 上面的 Secret Token（没有不设置） 保持和 Gitlab仓库 后台设置的一致

var mailer        = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//邮件端口和登录


var transport = mailer.createTransport(smtpTransport({
      host: 'smtp.exmail.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pass
      }
}));


function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7780)



handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
        //在此获取push 的返回json --见（gitlabpayload.json）
   //通过event.payload 组装mailOptions对象
   //邮件配置
        var mailOptions = {
                from: `龙渊GM系统测试服 <${user}>`, // 如果不加<xxx@xxx.com> 会报语法错误
                to: 'lilidong@ilongyuan.com.cn', // list of receivers
                subject: '龙渊GM系统自动部署版本号：'+event.payload.commits[0].message, // Subject line
                html: '<p>当前部署版本号为：'+event.payload.commits[0].id+'</p> ' +
                ' <p>代码分支：'+event.payload.ref+'</p> ' +
                ' <p>部署注释信息：'+event.payload.commits[0].message+'</p> ' +
                ' <p>时间戳：'+event.payload.commits[0].timestamp+'</p> ' +
                ' <p>提交作者：'+event.payload.user_name+'</p> ' +
                ' <p>提交作者邮箱：'+event.payload.user_email+'</p> ' +
                ' <p>龙渊GM系统测试服部署成功！！！！</p> ' +
            ' <p>线上测试服地址：<a href=\"http://gm.test.dragonest.com\">http://gm.test.dragonest.com</a></p>'+
                '<div><div>成都龙渊网络科技有限公司/Dragonest Co.Ltd.<div></div><div style="font-family: Verdana;"></div><div style="font-family: Verdana;"></div><div style="font-family: Verdana;"></div><div style="line-height: normal; font-family: Verdana;"></div><div style="font-family: Verdana;"></div><font face="Lucida Grande, Lucida Sans Unicode, sans-serif" color="#808080">北京市朝阳区百子湾路自空间CDB创意园C3</font></div><div style="font-family: Verdana;"><font face="Lucida Grande, Lucida Sans Unicode, sans-serif" color="#808080">Building C3, ZiSPACE, Baiziwan Road, Chaoyang District, Beijing</font></div><div style="font-family: Verdana;"><font face="Verdana" color="#808080"><span style="  ;; ">成都市高新区益州大道<font face="Verdana">722</font>号复城国际广场<font face="Verdana">T1-12层</font></span></font></div><div style="font-family: Verdana;"><span style="  ;; "></span><span style="  ;; "><font face="Verdana" color="#808080">Fl. 12, T1, Fucheng International Plaza, 722 Yizhou Avenue, Gaoxin District, Chengdu</font></span></div><div style="font-family: Verdana;"><span style="  ;; "><font face="Verdana" color="#808080">绵阳市科创区创新中心5号楼负一层B5-05</font></span></div><div style="font-family: Verdana;"><span style="  ;; "><font face="Verdana" color="#808080">Room B5-05, B1, Building 5, Innovation Center, S&amp;T Business Park, Mianyang<br></font></span></div></div>'+
        '<p> <img src="https://exmail.qq.com/cgi-bin/viewfile?type=signature&amp;picid=ZX0423-Sd681mxatElf9W40A_6GK7n&amp;uin=2617096855"></p> ' // html body

        };

        //邮件发送 onlineTest 分支才发邮件和部署
        if(event.payload.ref == 'refs/heads/onlineTest'){
            run_cmd('sh', ['./longyuan_gm_all_front_onlineTest_webhook_auto_deploy.sh'], function(text){
                  console.log(text)
                //部署脚本部署完成回调
                        transport.sendMail(mailOptions, function(error, info){
                                if(error){
                                        console.log(error);
                                }else{
                                        console.log('Message sent: ' + info.response);
                                }
                        });



          });
         }
})


```

## longyuan_gm_all_front_onlineTest_webhook_web_monit.js

```
var user = process.env.USER
var pass = process.env.PASS
var mailer        = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//邮件端口和登录
var transport = mailer.createTransport(smtpTransport({
      host: 'smtp.exmail.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pass
      }
}));

var http = require("http")
var url = 'http://gm.test.dragonest.com/'
// statusCode = 502(502 Bad Gateway nginx) ||  错误信息: connect ECONNREFUSED 118.190.17.174:9000

function mailOptionsWebMonitInfo(info){

  if(info = 502){
    info = '502 Bad Gateway nginx'
  }
  var mailOptionsWebMonit = {
    from: `龙渊运营GM游戏管理平台网站异常监控 <${user}>`, // 如果不加<xxx@xxx.com> 会报语法错误
    to: 'lilidong@ilongyuan.com.cn', // list of receivers
    subject: '龙渊运营GM游戏管理平台测试服务器异常请及时排查!', // Subject line
    html: '<p>龙渊运营GM游戏管理平台测试服务器网站异常监控!!!!</p> ' +
       ' <p>异常监控信息上报：'+info+'</p> ' +
       ' <p>请联系作者--邮箱：lilidong@ilongyuan.com.cn </p> ' +
      ' <p>线上测试服地址：<a href=\"http://gm.test.dragonest.com\">http://gm.test.dragonest.com</a></p>'+
      '<div><div>成都龙渊网络科技有限公司/Dragonest Co.Ltd.<div></div><div style="font-family: Verdana;"></div><div style="font-family: Verdana;"></div><div style="font-family: Verdana;"></div><div style="line-height: normal; font-family: Verdana;"></div><div style="font-family: Verdana;"></div><font face="Lucida Grande, Lucida Sans Unicode, sans-serif" color="#808080">北京市朝阳区百子湾路自空间CDB创意园C3</font></div><div style="font-family: Verdana;"><font face="Lucida Grande, Lucida Sans Unicode, sans-serif" color="#808080">Building C3, ZiSPACE, Baiziwan Road, Chaoyang District, Beijing</font></div><div style="font-family: Verdana;"><font face="Verdana" color="#808080"><span style="  ;; ">成都市高新区益州大道<font face="Verdana">722</font>号复城国际广场<font face="Verdana">T1-12层</font></span></font></div><div style="font-family: Verdana;"><span style="  ;; "></span><span style="  ;; "><font face="Verdana" color="#808080">Fl. 12, T1, Fucheng International Plaza, 722 Yizhou Avenue, Gaoxin District, Chengdu</font></span></div><div style="font-family: Verdana;"><span style="  ;; "><font face="Verdana" color="#808080">绵阳市科创区创新中心5号楼负一层B5-05</font></span></div><div style="font-family: Verdana;"><span style="  ;; "><font face="Verdana" color="#808080">Room B5-05, B1, Building 5, Innovation Center, S&amp;T Business Park, Mianyang<br></font></span></div></div>'+
      '<p> <img src="https://exmail.qq.com/cgi-bin/viewfile?type=signature&amp;picid=ZX0423-Sd681mxatElf9W40A_6GK7n&amp;uin=2617096855"></p> ' // html body

  };
  return mailOptionsWebMonit
}

//调试6s正常1分钟

var timerId = setTimeout(function () {
 webSiteMonitCheck();
}, 60*1000);


function webSiteMonitCheck() {
    console.log("龙渊运营GM游戏管理平台网站异常监控...");
    http.get(url, function (res) {

        const statusCode  = res.statusCode;
        let error;
        if (statusCode !== 200) {
          error = new Error('请求失败.' +  `Status Code: ${statusCode}`);

          //发邮件监控报错502
          transport.sendMail(mailOptionsWebMonitInfo(statusCode), function(error, info){
            if(error){
              console.log(error);
            }else{
              console.log('Message sent: ' + info.response);
            }
          });

          timerId = setTimeout(function () { webSiteMonitCheck(); }, 30 * 60 * 1000);//挂掉之后就半小时检查一次

        }

        if (error) {
          console.error(error.message);
          res.resume();
          return;
        }

        res.setEncoding('utf8');
        let body = ''
        res.on("data", function (data) {
          body +=data
         });
        res.on("end", function () {
          //正常 try 区块
          try {
            const parsedData = JSON.parse(body);
            console.log(parsedData);
            timerId = setTimeout(function () { webSiteMonitCheck(); }, 60*1000);//正常情况下1分钟检查一次
          } catch (e) {
            console.error(e.message);
          }

        });
    }).on("error", function (e) {
      //这里捕获不能正常连接的错误
        console.error(`错误信息: ${e.message}`);
      //发邮件监控报错
        transport.sendMail(mailOptionsWebMonitInfo(e.message), function(error, info){
          if(error){
            console.log(error);
          }else{
            console.log('Message sent: ' + info.response);
          }
        });

        timerId = setTimeout(function () { webSiteMonitCheck(); }, 30 * 60 * 1000);//挂掉之后就半小时检查一次
    });
}


```


## pm2部署和进程

```
worker@ali-ly-basic-data-118 auto-deploy]$ ./longyuan_gm_all_front_onlineTest_webhook_auto_deploy.sh 
龙渊GM系统测试服部署开始...
pull from origin:onlineTest...
Fetching origin
HEAD is now at 0bb82a7 修复属性页面变更问题
up to date in 14.131s

> longyaun-gm-front@1.0.0 build:dev /home/worker/node-server-longyaun-mall-c/longyuan-gm-all-front
> cross-env NODE_ENV=dev node build/build.js

.....打包步骤的文件信息省略
.....打包步骤的文件信息省略
.....打包步骤的文件信息省略
.....打包步骤的文件信息省略



  系统部署时间:2018-01-24 15：59：52
  龙渊运营GM游戏管理平台
  系统采用node开发自动化部署
  @name       :   Longyuan Gm System
  @desc       :   运营系统
  @product    :   CMS
  @author     :   李立冬
  @website    :   West Gate Internet
  @webname    :   西门互联
  
  Build complete.

白屏方案解决拷贝
龙渊GM系统测试服部署成功！！！

```

## 代码推送分支部署

```
USER='龙渊邮箱' PASS='龙渊邮箱密码' pm2 start longyuan_gm_all_front_onlineTest_webhook_email.js --name longyuan-gm-all-front-watch-email --watch
```

## pm2进程list 

```
[worker@ali-ly-basic-data-118 auto-deploy]$ pm2 list
 longyuan-gm-all-front             │ 47 │ fork │ 6944  │ online  │ 853     │ 15D    │ 0%  │ 46.2 MB   │ worker │ enabled  │
│ longyuan-gm-all-front-watch-email │ 27 │ fork │ 10544 │ online  │ 36      │ 23D    │ 0%  │ 37.9 MB   │ worker │ enabled  │
│ longyuan-gm-all-front-web-monit   │ 37 │ fork │ 2993  │ online  │ 100332  │ 43s    │ 0%  │ 24.5 MB   │ worker │ enabled  │

```