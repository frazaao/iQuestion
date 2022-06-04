import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Question from 'App/Models/Question'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public uuid: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public userId: number

  @hasMany(() => Question)
  public questions: HasMany<typeof Question>

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

  @beforeSave()
  public static async hashPassword(room: Room) {
    if (room.$dirty.password) {
      room.password = await Hash.make(room.password)
    }
  }
}
