import { DateTime } from 'luxon'
import { BaseModel, column, afterCreate } from '@ioc:Adonis/Lucid/Orm'
import Ws from 'App/Services/Ws'
export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public qtdLikes: number

  @column()
  public isRead: boolean

  @column({ columnName: 'room_id' })
  public roomUuid: string

  @column()
  public content: string

  @column()
  public userId: number

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yy')
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yy')
    },
  })
  public updatedAt: DateTime

  @afterCreate()
  public static dispathMessage(question) {
    Ws.io.to(`room-${question.roomUuid}`).emit('newMessage', {
      content: question.content,
      created_at: question.created_at,
      id: question.id,
      is_read: question.is_read,
      qtd_likes: question.qtd_likes,
      room_uuid: question.room_uuid,
      updated_at: question.updated_at,
      user_id: question.user_id,
    })
  }
}
