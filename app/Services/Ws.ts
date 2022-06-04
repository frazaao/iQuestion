import { Server, Socket } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'

class Ws {
  public io: Server
  private isReady = false

  public start(callback: (socket: Socket) => void) {
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: [
          'http://localhost:3000',
          'https://localhost:3000',
          'https://localhost:5500',
          'http://localhost:5500',
        ],
        allowedHeaders: ['*'],
        credentials: true,
      },
    })
    this.io.on('connection', callback)
    this.isReady === false ? (this.isReady = true) : null
  }
}

export default new Ws()
