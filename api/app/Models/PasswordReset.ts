import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PasswordReset extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public reset_token: string

  @column()
  public password: string

}
