import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import MessageValidator from "App/Validators/MessageValidator";
import Message from "App/Models/Message";

export default class ContactsController {
  public async store({request, response}: HttpContextContract) {
    const payload = await request.validate(MessageValidator)
    await Message.create(payload)
    return response.status(200).json(
      {success: "Votre message a bien été envoyé, nous répondrons dans les plus brefs délais"})
  }

  public async changePathMessage({request, response}: HttpContextContract) {
    const newPathMessage = request.input('path')
    const messagesId = request.input('messages')
    await Message.query().where('id', 'IN', messagesId).update({path: newPathMessage})
    return response.status(204)
  }
}
