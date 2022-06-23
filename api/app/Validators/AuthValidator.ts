import {schema, rules} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class AuthValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.unique({
      table: 'users',
      column: 'email',
      caseInsensitive: true
    })]),
    password: schema.string({trim: true}, [rules.minLength(6), rules.confirmed()]),
    phone: schema.string({trim: true}, [rules.regex(new RegExp('^[0-9]+$')), rules.maxLength(10)]),
    first_name: schema.string({trim: true}),
    last_name: schema.string({trim: true}),
    address: schema.string({trim: true}),
    city: schema.string({trim: true}),
    postal_code: schema.string({trim: true}),
    additonal_address: schema.string.optional(),
    reset_password: schema.string.optional()
  })

  public messages = {
    required: 'Le champs est requis',
    'phone.regex': 'Vous devez entrer un numéro de téléphone valide',
    'phone.maxLength': 'Vous devez entrer un numéro de téléphone valide',
    'email.email': 'Veuillez renseigner une adresse email valide',
    'email.unique': 'Vous possédez déjà un compte avec cette adresse e-mail',
    'password_confirmation.confirmed': "Le mot de passe ne correspond pas"
  }
}
