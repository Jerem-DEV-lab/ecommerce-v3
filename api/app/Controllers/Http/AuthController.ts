import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import AuthValidator from "App/Validators/AuthValidator";
import User from "App/Models/User";
import SendMail from "App/Mailers/SendMail";
import View from "@ioc:Adonis/Core/View";
import Env from '@ioc:Adonis/Core/Env'
import {randomString} from "App/Services";
import PasswordResetValidator from "App/Validators/PasswordResetValidator";
import Order from "App/Models/Order";
import UpdateInfoUserValidator from "App/Validators/UpdateInfoUserValidator";
import ChangePasswordValidator from "App/Validators/ChangePasswordValidator";

export default class AuthController {
  public async login({auth, request, response}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      await auth.attempt(email, password)
      return response.status(200).json({userInfo: auth.use('web'), success: "Connexion réussi"})
    } catch (e) {
      return response.badRequest("Email ou mot de passe incorrecte")
    }
  }

  public async logout({auth, response}) {
    await auth.use('web').logout()
    return response.status(200)
  }

  public async register({request, response}: HttpContextContract) {
    //TODO: Envoyer un e-mail pour confirmer la création du compte
    const payload = await request.validate(AuthValidator)
    const user = await User.create(payload)
    return response.created({
      success: "Un e-mail vient de vous être envoyer pour confirmer votre" +
        " compte", user
    })
  }

  public async check({auth, response}: HttpContextContract) {
    await auth.use('web').check()
    if (auth.use('web').isLoggedIn) {
      return response.status(200).json({userInfo: auth.use('web'), success: "Connexion réussi"})
    } else {
      return response.status(403)
    }
  }

  public async passwordReset({request, response}: HttpContextContract) {
    const sendTo = request.input('email_user')
    //Génération d'un token qui sera envoyer à l'utilisateur
    const token = await randomString()
    const user = await User.query().where('email', sendTo).first()
    //Si aucun utilisateur n'est trouvé en bdd alors on renvoi une erreur
    if (!user) {
      return response.badRequest({error: "Il semblerait que vous n'ayez pas de compte chez nous."})
    }
    const domain = await Env.get('WEBSITE_DOMAIN')
    const linkReset = `${domain}/reset-password/${token}`
    //Préparation de l'e-mail qui sera envoyé à l'utilisateur.
    const templateHtml = View.render('emails/resetPassword.edge',
      {link_reset: linkReset})
    user.reset_password = token
    await user.save()
    const prepareMail = new SendMail({
      sendTo,
      subject: "Réinitialisation du mot de passe"
    }, templateHtml)
    await prepareMail.send()
    return response.ok('Un e-mail vient de vous être envoyé pour réinitialiser votre mot de passe')
  }

  public async changePassword({auth, request, response}: HttpContextContract) {
    const email = await auth.user?.email
    const payload = await request.validate(ChangePasswordValidator)
    const old_password = await request.input('old_password')
    await auth.attempt(`${email}`, old_password)
    const user = await User.findBy('id', auth.user?.id)
    await user?.merge(payload).save()
    return response.ok({success: "Votre mot de passe a bien été mis à jour."})
  }

  public async checkResetPasswordToken({request, response}: HttpContextContract) {
    const token = request.input('token_reset')
    //Si il n'y a pas de token on renvoi une erreur
    if (!token) {
      return response.badRequest("Token invalide")
    }
    const user = await User.query().where('reset_password', token).first()
    //Si il n'y a aucun utilisateur avec ce token on renvoi une erreur
    if (!user)
      return response.badRequest({error: "Le lien a expiré.", tokenValide: false})
    else {
      return response.ok({tokenValide: true})
    }
  }

  public async resetPassword({request, response}: HttpContextContract) {
    const validation = await request.validate(PasswordResetValidator)

    const user = await User.query().where('reset_password', validation.reset_token).first()
    //Si il n'y a aucun utilisateur avec ce token on renvoi une erreur
    if (!user) {
      return response.badRequest({error: "Le lien a expiré.", tokenValide: false})
    }
    user.password = validation.password
    user.reset_password = ""
    await user.save()
    return response.ok({success: "Votre mot de passe à bien été mis à jour"})
  }

  public async checkRole({auth}: HttpContextContract) {
    return auth
  }

  public async getUserOrder({params, response}: HttpContextContract) {
    const userOrder = await Order.query().where('user_id', "=", params.userId).preload('products', (query) => {
      query.pivotColumns(['quantity'])
    }).orderBy('created_at', 'desc')
    if (userOrder) {
      return response.ok(userOrder)
    } else
      return response.badRequest({errors: "Une erreur est survenue"})
  }

  public async updateUserInfo({auth: {user}, request, response}: HttpContextContract) {
    try {
      const infos = await request.validate(UpdateInfoUserValidator)
      const userLogged = await User.findBy('id', user?.id)
      await userLogged?.merge({...infos}).save()
      return response.ok({success: "Votre profil à correctement est mis à jour"})
    } catch (e) {
      return response.unprocessableEntity(e)
    }
  }
}
