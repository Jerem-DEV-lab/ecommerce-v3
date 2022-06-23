import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

enum StatusOrder {
  IN_PROGRESS = "En préparation",
  PENDING = "En attente",
  CONFIRMED = "Confirmée",
  REJECTED = "Refusée",
  DELIVER = "Livrée",
}

export default class UpdateOrderValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    status: schema.enum(Object.values(StatusOrder)),
    orderId: schema.number([rules.exists({table: "orders", column: 'id'})])
  })
  public messages = {
    enum: "Le statut de la commande est invalide.",
    exists: "Aucune commande n'est enregistrée sous cet identifiant."
  }
}
