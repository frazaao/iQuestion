import Ws from 'App/Services/Ws'

const messages: string[] = []

Ws.start((socket) => {
  // socket.on('create', (room) => {
  //   console.log('sala criada', room)
  //   socket.join(room)
  // })
  socket.emit('updatechat', messages)
  socket.on('chatmessage', (data: string) => {
    console.log(messages)
    messages.push(data)
    console.log(data)
    socket.emit('updatechat', messages)
    socket.broadcast.emit('updatechat', messages)
  })
})
