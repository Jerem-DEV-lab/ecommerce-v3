import {DateTime} from 'luxon'
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column, hasOne,
  ManyToMany,
  HasOne,
  manyToMany
} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";
import Product from "App/Models/Product";
import Invoice from "App/Models/Invoice";

export default class Order extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public status: string

  @column()
  public userId: number

  @column()
  public total_order_ttc: number

  @column()
  public invoice_generated: boolean

  @column()
  public type_payment: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => Product)
  public products: ManyToMany<typeof Product>

  @hasOne(() => Invoice)
  public invoice: HasOne<typeof Invoice>
}
