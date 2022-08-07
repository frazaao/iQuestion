import { Server, Socket } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'

class Ws {
  public io: Server
  private isReady = false

  public start(callback: (socket: Socket) => void) {
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: true,
        allowedHeaders: ['*'],
        credentials: true,
      },
    })
    this.io.on('connection', callback)
    this.isReady === false ? (this.isReady = true) : null
  }
}

export default new Ws()
