import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProductValidator {
  constructor (protected ctx: HttpContextContract) {
  }
  public schema = schema.create({
    product_name: schema.string.optional({trim: true}, [
      rules.minLength(2)]),
    price_ht: schema.number.optional(),
    price_ttc: schema.number.optional(),
    unit: schema.string.optional(),
    vat_rate: schema.number.optional(),
    product_description: schema.string.optional({}, [
      rules.minLength(10)
    ]),
    category_name: schema.string.optional({}, [
      rules.minLength(5)
    ]),
  })

  public messages = {}
}
