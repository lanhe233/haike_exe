var ws = require('nodejs-websocket')

var PORT = 3001

var server = ws.createServer(function(conn) {
  // 连接建立
  console.log('New connection')
  // 服务器接收到信息
  conn.on('text', function(str) {
    // 服务器处理收到的信息并返回给客户端
    console.log('Received ' + str)
    conn.sendText(str.toUpperCase() + '!!!')
  })
  conn.on('close', function(code, reason) {
    console.log('websocket closed')
  })
  conn.on('error', function(err) {
    console.log('handle error')
    console.log(err)
  })
}).listen(PORT)

console.log('websocket is listening at port' + PORT)