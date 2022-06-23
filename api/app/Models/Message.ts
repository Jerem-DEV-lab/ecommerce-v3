import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Message extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public message: string

  @column()
  public is_read: boolean

  @column()
  public is_favorite: boolean

  @column()
  public path: string

  @column()
  public subject: string

  @column()
  public type: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}
