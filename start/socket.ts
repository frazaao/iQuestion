import Ws from 'App/Services/Ws'

const messages = []

Ws.start((socket) => {
  console.log(socket.id)
  socket.emit('updatechat', messages)
  socket.on('chatmessage', (data) => {
    console.log(messages)
    messages.push(data)
    console.log(data)
    socket.emit('updatechat', messages)
    socket.broadcast.emit('updatechat', messages)
  })
})
