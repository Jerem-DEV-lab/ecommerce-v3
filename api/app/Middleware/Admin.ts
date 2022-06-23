import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

const message = 'Vous n\'êtes pas autorisé à effectuer cette requête.'
const status = 403
const errorCode = 'E_UNAUTHORIZED'
export default class Admin {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    const user = await auth.use('web').user
    if (user && user.role === "ROLE_ADMIN") {
      return await next()
    }
    return response.status(status).json({errorCode, reason: message})
  }
}
