import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class OrderValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    status: schema.string(),
    products: schema.array().members(
      schema.object().members({
        id: schema.number([rules.exists({table: 'products', column: 'id'})]),
        quantity: schema.number()
      })
    )
  })

  public messages = {
    exists: "Le produit n'existe pas"
  }
}
