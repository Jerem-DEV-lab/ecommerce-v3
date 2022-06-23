import {schema, rules} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    category_name: schema.string({trim: true}, [rules.minLength(5), rules.unique({
      table: 'categories',
      column: 'category_name',
      caseInsensitive: false
    })])
  })

  public messages = {
    required: "Le champ est requis",
  }
}
