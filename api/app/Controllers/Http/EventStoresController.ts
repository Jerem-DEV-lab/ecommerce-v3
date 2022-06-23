import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import EventStoreValidator from "App/Validators/EventStoreValidator";
import EventStore from "App/Models/EventStore";
import UploadImage from "App/Services/UploadImage";
import ImageEventValidator from "App/Validators/ImageEventValidator";
import Env from "@ioc:Adonis/Core/Env";
import fs from "fs";
import UpdateEventValidator from "App/Validators/UpdateEventValidator";

export default class EventStoresController {
  public async store({request, response}: HttpContextContract) {
    const payload = await request.validate(EventStoreValidator)
    const file = await request.validate(ImageEventValidator)
    const pathStoreImage = await Env.get("UPLOAD_FILE_PATH")
    const imageUploaded = await new UploadImage(file.event_image, `${pathStoreImage}/event-image`).upload()
    const event = await EventStore.create({
      ...payload,
      event_image: imageUploaded.upload.fileName,
      is_online: Boolean(payload.is_online)
    })
    return response.created({success: "L'événement a correctement été ajouté", event})
  }

  public async getAllEvents() {
    return EventStore.all()
  }

  public async getEvent() {
    return EventStore.query().where('is_online', 1).first()
  }

  public async updateEvent({params, request, response}: HttpContextContract) {
    try {
      const payload = await request.validate(UpdateEventValidator)
      const event = await EventStore.findByOrFail('id', params.eventId)
      await event.merge({...payload, is_online: Boolean(payload.is_online)}).save()
      return response.created({success: "L'événement a correctement été modifié"})
    } catch (e) {
      return response.notFound("Impossible de modifié l'événement...")
    }
  }

  public async deleteEvent({response, params}) {
    try {
      const path = await Env.get('UPLOAD_FILE_PATH')
      const event = await EventStore.findBy('id', params.eventId)
      await event?.delete()
      await fs.unlink(`${path}/event-image/${event?.event_image}`, (err) => {
        if (err) {
          return response.badRequest({errors: "Une erreur est survenu"})
        }
      })
      return response.ok({success: "Événement supprimé avec succès"})
    } catch (e) {
      return response.badRequest({error: "Impossible de supprimé l'événement"})
    }
  }
}
