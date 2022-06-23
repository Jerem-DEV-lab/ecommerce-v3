import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

import Invoice from "App/Models/Invoice";
import Order from "App/Models/Order";

export default class InvoicesController {

  private vatRate20: number[] = []
  private vatRate10: number[] = []
  private vatRate5: number[] = []

  private vat5: number[] = []
  private vat10: number[] = []
  private vat20: number[] = []

  private calculPriceHt(priceTtc: number, vat_rat: number): number {
    return parseFloat((priceTtc * 100 / (100 + vat_rat)).toFixed(4))
  }

  private calculTotalVat(arr): number {
    return arr.reduce((a, c) => parseFloat((a + c).toFixed(4)), 0)
  }


  public async createInvoice({request}: HttpContextContract) {
    const payload = await request.all()
    const order = await Order.findOrFail(payload.order_id)
    await order.merge({invoice_generated: true}).save()
    return Invoice.create({...payload, invoice_generated: true})
    //TODO renvoyer un message si la facture a déjà été édité
  }

  public async getInvoiceById({params}: HttpContextContract) {
/*    return Invoice.query().preload('order', (query) => {
      query.preload('products')
      query.preload('user')
    }).where('id', params.orderId).firstOrFail()*/
    const order = await Order.query().preload('products', (query) => {
      query.pivotColumns(['quantity'])
    }).preload('invoice').where('id', params.orderId).preload("user").firstOrFail()
    let totalOrderTtc: number = 0
    order.products?.map(p => {
      if (p.vat_rate === 20) {
        this.vatRate20.push(this.calculPriceHt(p.price_ttc, 20) * p.quantity)
        this.vat20.push(p.price_ttc * p.quantity)
      } else if (p.vat_rate === 5.5) {
        this.vatRate5.push(this.calculPriceHt(p.price_ttc, 5.5) * p.quantity)
        this.vat5.push(p.price_ttc * p.quantity)
      } else {
        this.vatRate10.push(this.calculPriceHt(p.price_ttc, 10) * p.quantity)
        this.vat10.push(p.price_ttc * p.quantity)
      }
      totalOrderTtc = parseFloat(((p.price_ttc * p.quantity) + totalOrderTtc).toFixed(2))
    })
    const diffPrice = parseFloat(this.calculTotalVat(this.vat5).toFixed(3)) - parseFloat(this.calculTotalVat(this.vatRate5).toFixed(3))
    const totalAmount = {
      total5: {
        totalHt: parseFloat(this.calculTotalVat(this.vatRate5).toFixed(3)),
        totalTtc: parseFloat(this.calculTotalVat(this.vat5).toFixed(2)),
        total: parseFloat(diffPrice.toFixed(2))
      },
      TotalHt10: {
        totalHt: this.calculTotalVat(this.vatRate10),
        totalTtc: this.vat10
      },
      TotalHt20: {
        totalHt: this.calculTotalVat(this.vatRate20),
        totalTtc: this.vat20
      }
    };
    const totalHt = this.calculTotalVat(Array.prototype.concat(this.vatRate5, this.vatRate10, this.vatRate20))
    const totalTvaTaxes = parseFloat((totalOrderTtc - totalHt).toFixed(2))
    return {
      order: order,
      totalAmount,
      totalTvaTaxes,
      totalHt: parseFloat(totalHt.toFixed(2)),
      totalOrderTtc
    }
  }

  public async getAllInvoices({request}: HttpContextContract) {
    const pageNumber = request.qs().page || 1;
    const limitPerPage = request.qs().limit || 5;
    return Invoice.query().preload('order', (query) => {
      query.preload('products')
      query.preload('user')
    }).paginate(pageNumber, limitPerPage)
  }
}
