import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import UserLike from 'App/Models/UserLike'
import Room from 'App/Models/Room'
import Question from 'App/Models/Question'

export default class Users extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @hasMany(() => UserLike)
  public userLikes: HasMany<typeof UserLike>

  @hasMany(() => Room)
  public rooms: HasMany<typeof Room>

  @hasMany(() => Question)
  public questions: HasMany<typeof Question>

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(users: Users) {
    if (users.$dirty.password) {
      users.password = await Hash.make(users.password)
    }
  }
}
