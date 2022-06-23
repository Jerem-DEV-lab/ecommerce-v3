import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

const message = 'Vous devez être connecté pour effectué cette requête'
const status = 403
const errorCode = 'E_UNAUTHORIZED'

export default class Auth {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    const user = await auth.check()
    if (!user) {
      return response.status(status).json({errorCode, reason: message})
    }
    await next()
  }
}
