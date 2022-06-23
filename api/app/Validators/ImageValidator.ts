import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class ImageValidator {
  constructor(protected ctx: HttpContextContract) {
  }
  public schema = schema.create({
    product_img: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'webp'],
    }, [rules.required()])
  })

  public messages = {}
}
