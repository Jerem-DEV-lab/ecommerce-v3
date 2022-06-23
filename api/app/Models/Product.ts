import {DateTime} from 'luxon'
import {
  BaseModel,
  beforeCreate,
  column, computed, HasMany, hasMany,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm'
import {v4 as uuidv4} from 'uuid';
import Order from "App/Models/Order";
import Review from "App/Models/Review";

export default class Product extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public product_name: string

  @column()
  public product_id: string

  @column()
  public product_img: string

  @column()
  public product_description: string

  @column()
  public price_ttc: number

  @column()
  public unit: string

  @column()
  public vat_rate: number

  @column()
  public price_ht: number

  @column()
  public category_name: string

  @column()
  public archived: boolean

  @hasMany(() => Review)
  public notes: HasMany<typeof Review>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @computed()
  public get quantity() {
    return this.$extras.pivot_quantity
  }

  @beforeCreate()
  public static async generateUniqueId(productId: Product) {
    productId.product_id = await uuidv4()
  }

  @manyToMany(() => Order)
  public orders: ManyToMany<typeof Order>
}
