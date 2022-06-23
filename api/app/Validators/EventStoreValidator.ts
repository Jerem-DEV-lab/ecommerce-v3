import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class EventStoreValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    title_event: schema.string({trim: true, escape: true}, [rules.required()]),
    content_event: schema.string({trim: true, escape: true}, [rules.required()]),
    is_online: schema.boolean(),
    start_event: schema.string({}, [rules.required()]),
    end_event: schema.string({}, [rules.required()]),
  })
  public messages = {}
}
