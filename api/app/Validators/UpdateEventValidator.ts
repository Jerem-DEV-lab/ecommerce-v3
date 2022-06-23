import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class UpdateEventValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    title_event: schema.string.optional({}, [rules.minLength(5)]),
    content_event: schema.string.optional({trim: true, escape: true}),
    is_online: schema.boolean.optional(),
    start_event: schema.string.optional(),
    end_event: schema.string.optional(),
  })

  public messages = {}
}
