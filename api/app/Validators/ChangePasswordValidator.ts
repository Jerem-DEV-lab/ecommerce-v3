import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChangePasswordValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    password: schema.string({trim: true}, [rules.minLength(6), rules.confirmed()]),
  })

  public messages = {
    required: 'Le champs est requis',
    'password_confirmation.confirmed': "Le mot de passe ne correspond pas"
  }
}
