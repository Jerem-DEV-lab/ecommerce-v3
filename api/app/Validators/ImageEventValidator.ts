import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ImageEventValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    event_image: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }, [rules.required()])
  })

  public messages = {}
}
