import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}
