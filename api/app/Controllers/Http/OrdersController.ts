import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Order from "App/Models/Order";
import SendMail from "App/Mailers/SendMail";
import View from "@ioc:Adonis/Core/View";
import mjml from "mjml"
import UpdateOrderValidator from "App/Validators/UpdateOrderValidator";

export default class OrdersController {
    public async store({auth, request, response}: HttpContextContract) {
        try {
            const validRequest = await request.all()
            const order = await Order.create({
                ...validRequest,
                status: "En attente",
                userId: auth.user?.id
            })
            const computedProducts = this.computeProducts(validRequest)
            await order.related('products').attach(computedProducts)

            //Envoi d'un email à l'utilisateur qui a commandé une fois que la commande est bien enregistré
            const orderConfirmed = await this.userOrder(order.id)
            const optionsMailUser = {
                sendTo: /*auth.user?.email*/ "guillemet.jeremy087@gmail.com",
                subject: "Confirmation de votre commande !"
            }
            const templateEmail = mjml(View.render('emails/confirmOrder.edge', {products: orderConfirmed.products})).html
            const confirmOrderMail = new SendMail(optionsMailUser, templateEmail)
            await confirmOrderMail.send()

            //Envoi d'un email à l'administration lorsque la commande est confirmer
            const templateEmailAdmin = mjml(View.render('emails/confirmOrderAdmin.edge', {
                products: orderConfirmed.products,
                last_name: auth.user?.first_name,
                first_name: auth.user?.last_name
            })).html
            const confirmOrderMailAdmin = new SendMail({
                sendTo: "epicerie.abjat@gmail.com",
                subject: "Un client vient de passer une nouvelle commande"
            }, templateEmailAdmin)
            await confirmOrderMailAdmin.send()

            return response.json({
                success: "Votre commande a bien été enregistrée. Un e-mail de" +
                    " confirmation vient de vous être envoyé."
            })
        } catch (e) {
            return response.status(400).json({errors: "Une erreur est survenu"})
        }
    }

    public async getOrderById({params}) {
        return Order.query().preload('products', (query) => {
            query.pivotColumns(['quantity'])
        }).preload('user')
            .where('id', (params.orderId))
            .firstOrFail()
    }

    public getAllOrders({request}: HttpContextContract) {
        const pageNumber = request.qs().page || 1;
        const limitPerPage = request.qs().limit || 5;
        return Order.query().preload('products', (query) => {
            query.pivotColumns(['quantity'])
        }).preload("user").preload("invoice").orderBy('created_at', 'desc').paginate(pageNumber, limitPerPage)
    }

    public async deleteOrder({params, response}: HttpContextContract) {
        const order = await Order.findBy("id", params.orderId)
        if (!order) {
            return response.badRequest("Commande non disponible")
        }
        if (order?.invoice_generated) {
            return response.status(403).json({
                error: "Impossible de supprimer la commande, car la facture a été générée"
            })
        }
        await order?.delete()
        return response.status(200).json({success: "La commande à bien été supprimer"})
    }

    public async getUserOrders({params, response}: HttpContextContract) {
        const order = await Order.query().preload('products', (query) => {
            query.pivotColumns(['quantity'])
        }).preload('invoice').where('user_id', params.userId)
        if (order.length === 0) {
            return response.badRequest({errors: "Aucune commande pour le client"})
        }
        return response.ok(order)
    }

    public async storeOrdersByAdmin({request, response}) {
        try {
            const validRequest = await request.all()
            const order = await Order.create({
                ...validRequest,
                status: "En attente",
                userId: validRequest.user_id
            })
            const computedProducts = this.computeProducts(validRequest)
            await order.related('products').attach(computedProducts)
            return response.json({
                success: "La commande à bien été enregistrer"
            })
        } catch (e) {
            return response.status(400).json({errors: "Une erreur est survenu"})
        }
    }

    public async updateOrderStatus({request, response}: HttpContextContract) {
        const payload = await request.validate(UpdateOrderValidator)
        const order = await Order.findBy('id', payload.orderId)
        if (order) {
            order.status = request.input('status')
            await order.save()
            return response.ok({success: 'Statut de commande correctement mis à jour.'})
        }
        return response.unprocessableEntity({errors: "Une erreur est survenu."})
    }

    private async userOrder(orderId: number) {
        return await Order.query().preload('products', (query) => {
            query.pivotColumns(['quantity'])
        })
            .where('id', orderId)
            .firstOrFail()
    }

    private computeProducts(payload) {
        return payload.products.reduce((acc, {id, quantity}) => {
            acc[id] = {quantity}
            return acc
        }, {})
    }
}
