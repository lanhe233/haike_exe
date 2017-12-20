var ws = require('nodejs-websocket')

var PORT = 3001
var connCount = 0

var server = ws.createServer(function(conn) {
  // 连接建立
  console.log('New connection')
  conn.nickname = 'user' + (++connCount)
  broadcast(conn.nickname + ' comes in')
    // 服务器接收到信息
  conn.on('text', function(str) {
    // 服务器处理收到的信息并返回给客户端
    console.log('Received ' + str)
    broadcast(conn.nickname + '：' + str)
  })
  conn.on('close', function(code, reason) {
    console.log('websocket closed')
    broadcast(conn.nickname + ' left')
  })
  conn.on('error', function(err) {
    console.log('handle error')
    console.log(err)
  })
}).listen(PORT)

console.log('websocket is listening at port ' + PORT)

function broadcast(data) {
  // 广播
  // 遍历所有连接，发送相同的信息
  server.connections.forEach(function(conn) {
    conn.sendText(data)
  })
}