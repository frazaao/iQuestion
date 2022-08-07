import { DateTime } from 'luxon'
import { BaseModel, column, afterCreate, afterSave, afterDelete } from '@ioc:Adonis/Lucid/Orm'
import Ws from 'App/Services/Ws'
import Users from 'App/Models/Users'
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
    const user = Users.find(question.userId)
    Ws.io.to(`room-${question.roomUuid}`).emit('newMessage', {
      content: question.content,
      created_at: question.createdAt,
      id: question.id,
      is_read: question.isRead,
      qtd_likes: question.qtdLikes,
      room_uuid: question.roomUuid,
      updated_at: question.updatedAt,
      user_id: user,
    })
  }

  @afterSave()
  public static dispatchRead(question) {
    Ws.io.to(`room-${question.roomUuid}`).emit('readMessage', {
      ...question,
    })
  }

  @afterDelete()
  public static dispatchDelete(question) {
    Ws.io.to(`room-${question.roomUuid}`).emit('deleteMessage', {
      ...question,
    })
  }
}
