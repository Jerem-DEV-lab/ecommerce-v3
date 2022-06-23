import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class PasswordResetValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    reset_token: schema.string(),
    password: schema.string({}, [rules.minLength(6), rules.confirmed()])
  })

  public messages = {}
}
