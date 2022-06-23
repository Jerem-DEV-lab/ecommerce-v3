import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class BanUserValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    user_id: schema.number([rules.required(), rules.exists({table: "users", column: "id"})])
  })
  public messages = {
    "user_id.required": "Vous devez renseigner un ID d'utilisateur",
    "user_id.exists": "L'identifiant de l'utilisateur est invalide"
  }
}
