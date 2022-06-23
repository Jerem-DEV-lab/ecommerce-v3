import {schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class UpdateInfoUserValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    address: schema.string({trim: true}),
    city: schema.string({trim: true}),
    first_name: schema.string({trim: true}),
    last_name: schema.string({trim: true}),
    postal_code: schema.string({trim: true}),
    additonal_address: schema.string.optional()
  })

  public messages = {
    required: 'Le champs est requis',
    'phone.regex': 'Vous devez entrer un numéro de téléphone valide',
    'phone.maxLength': 'Vous devez entrer un numéro de téléphone valide',
    'email.email': 'Veuillez renseigner une adresse e-mail valide',
    'email.unique': 'Vous possédez déjà un compte avec cette adresse e-mail',
    'password_confirmation.confirmed': "Le mot de passe ne correspond pas"
  }
}
