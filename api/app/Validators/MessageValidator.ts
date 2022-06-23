import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    first_name: schema.string({}),
    last_name: schema.string({}),
    email: schema.string({}, [rules.email()]),
    phone: schema.string({}, [rules.mobile({
      locales: ['fr-FR']
    })]),
    message: schema.string({}, [rules.minLength(10), rules.maxLength(255)]),
    type: schema.string(),
    subject: schema.string({}, [rules.minLength(5), rules.maxLength(255)])
  })
  public messages = {
    required: 'Le champs est requis',
    'message.minLength': "Votre message doit faire un minium de 10 caractères.",
    'message.maxLength': "Votre message ne doit pas faire plus de 255 caractères."
  }
}
