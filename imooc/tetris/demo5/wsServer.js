var app = require('http').createServer()
var io = require('socket.io')(app)

var PORT = 3001
var connCount = 0

app.listen(PORT)

io.on('connection', function(socket) {
  socket.nickname = 'user' + (++connCount)

  console.log(connCount)

  // 广播客户端进入
  io.emit('enter', socket.nickname + ' comes in')

  // 监听客户端断开连接disconnect 并广播客户端离开  
  socket.on('disconnect', function() {
    io.emit('leave', socket.nickname + ' left')
  })

  // 监听客户端发送的信息 并广播
  socket.on('message', function(data) {
    io.emit('chat', socket.nickname + ' says: ' + data)
  })
})

