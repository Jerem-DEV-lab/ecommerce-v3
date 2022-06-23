import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, computed} from '@ioc:Adonis/Lucid/Orm'
import Order from "App/Models/Order";

export default class Invoice extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public invoice_generated: boolean

  @column()
  public invoice_pay: boolean

  @column()
  public orderId: number

  @column.dateTime({autoCreate: false})
  public invoice_pay_at: DateTime

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>

  @computed()
  public get quantity(){
    return this.$extras.pivot_quantity
  }
}
