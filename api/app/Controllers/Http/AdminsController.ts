import Message from "App/Models/Message";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import ReplyMessage from "App/Mailers/ReplyMessage";
import SendMail from "App/Mailers/SendMail";
import User from "App/Models/User";
import View from "@ioc:Adonis/Core/View";
import BanUserValidator from "App/Validators/BanUserValidator";
import Product from "App/Models/Product";

export default class AdminsController {
    public async getAllMessages() {
        return Database.from('messages').orderBy('created_at', 'desc')
    }

    public async updateStatusMessage({params, response}: HttpContextContract) {
        const messageId = params.messageId
        const message = await Message.findOrFail(messageId)
        message.is_read = true
        await message.save()
        return response.status(204)
    }

    public async bookmarkMessage({params, request, response}: HttpContextContract) {
        const messageId = params.messageId
        const message = await Message.findOrFail(messageId)
        message.is_favorite = request.input('favorite')
        await message.save()
        return response.status(204)
    }

    public async deleteManyMessages({request, response}: HttpContextContract) {
        const messagesId = request.input('messages')
        await Database.rawQuery(`DELETE
                                 from messages
                                 where id IN (${messagesId})`)
        return response.status(204)
    }

    public async sendMailWithGmail({request, response}: HttpContextContract) {
        const replyTo = request.input('replyTo')
        const optionsMail = {
            replyTo
        }
        const contentMessage = request.input('content_message')
        try {
            await new ReplyMessage(contentMessage, optionsMail).send()
            await Message.create({
                first_name: "Alain",
                last_name: "Levasseur",
                email: "epicerie.abjat@gmail.com",
                phone: "0670162106",
                subject: 'Réponse à la demande de contact',
                message: contentMessage,
                is_read: true,
                type: "sent",
                path: "sent"
            })
            return response.status(200).json({success: "Votre e-mail a bien été envoyé"})
        } catch (e) {
            return response.status(403).json({error: "Une erreur est survenu."})
        }
    }

    public async sendMessage({request, response}: HttpContextContract) {
        const sendTo = request.input('sent_to')
        const subject = request.input('subject')
        const message = request.input('message')
        const payload = {
            first_name: "Alain",
            last_name: "Levasseur",
            email: "epicerie.abjat@gmail.com",
            phone: "0670162106",
            message,
            subject,
            is_read: true,
            type: "sent",
            path: "sent"
        }
        const html = View.render('emails/welcome.edge', {content_message: payload.message})
        await Message.create(payload)
        await new SendMail({sendTo, subject, message}, html).send()
        return response.status(200).json({success: "L'e-mail a correctement été envoyer"})
    }

    public async findUsers({response, request}: HttpContextContract) {
        /*const users = await User.query().select('*').from("users").where('role', "=", "ROLE_CLIENT")
        return response.ok(users)*/
        const pageNumber = request.qs().page || 1;
        const limitPerPage = request.qs().limit || 5;
        const user = await User.query().select("*").from("users").where("role", "=", "ROLE_CLIENT").paginate(pageNumber, limitPerPage);
        return response.ok(user)
    }

    /*
    * Permet de bannir ou débannir un utilisateur
    */
    public async manageUserAccess({request, response}: HttpContextContract) {
        const payload = await request.validate(BanUserValidator)
        const user = await User.query().where('id', payload.user_id).first()
        if (user) {
            user.user_ban = !user.user_ban
            await user.save()
            return response.ok({success: this.checkAccessUser(Boolean(user.user_ban))})
        }
    }

    public async getAll({request}: HttpContextContract) {
        const pageNumber = request.qs().page;
        const limitPerPage = request.qs().limit;

        if(pageNumber && limitPerPage){
            return Product.query().select("*").from("products").where('archived', '!=', true).paginate(pageNumber, limitPerPage);
        }
        else {
            return Product.query().select("*").from("products").where('archived', '!=', true)
        }
    }

    /**
     * @description Récupère les produits qui ne sont pas en vente
     * */
    public async getAllProductsArchived({request}: HttpContextContract) {
        const pageNumber = request.qs().page || 1;
        const limitPerPage = request.qs().limit || 5;
        return Product.query().select("*").from("products").where('archived', '=', true).paginate(pageNumber, limitPerPage);
    }

    //Vérifie l'accès de l'utilisateur à son compte
    private checkAccessUser(status: Boolean): string {
        if (status) {
            return "L'utilisateur à bien été banni"
        } else {
            return "L'utilisateur à bien été débanni"
        }
    }


}
