import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import ProductValidator from "App/Validators/ProductValidator";
import {cuid} from '@ioc:Adonis/Core/Helpers'
import ImageValidator from "App/Validators/ImageValidator";
import UpdateProductValidator from "App/Validators/UpdateProductValidator";

export default class ProductsController {
  public async store({request, response}: HttpContextContract) {
    try {
      const payload = await request.validate(ProductValidator)
      const file = await request.validate(ImageValidator)
      if (!file.product_img.isValid) {
        return file.product_img.errors
      }
      const fileName = `${cuid()}.${file.product_img.extname}`
      await file.product_img.moveToDisk('./produits-images', {
        name: fileName
      })
      const produitCreated = await Product.create({...payload, product_img: fileName})
      return response.created({success: "Produit correctement créer.", produitCreated})
    } catch (e) {
      return response.notAcceptable(e)
    }
  }

  public async getAll() {
    return Product.query().where('archived', '=', false).preload('notes', (user) => user.preload('users'))
  }

  public async getProductById({params}: HttpContextContract) {
    const {productId} = params
    return Product.findByOrFail('product_id', productId)
  }

  public async destroy({params, response}: HttpContextContract) {
    const requestParams = params.productId
    const product = await Product.findByOrFail("product_id", requestParams)
    if (product) {
      product.archived = true
      await product.save()
      return response.status(200).json({success: "Le produit a correctement été archivé"})
    }
    return response.status(404).json('Impossible de trouver le produit')
  }

  public async update({params, request, response}: HttpContextContract) {
    const requestParams = params.productId
    const valideRequest = await request.validate(UpdateProductValidator)
    const product = await Product.findOrFail(requestParams)
    await product.merge(valideRequest).save()
    return response.status(200).json({success: "produit correctement mis à jour"})
  }

  public async puttingProductOnSale({params, response}: HttpContextContract) {
    const requestParams = params.productId
    const product = await Product.findByOrFail('product_id', requestParams)
    await product.merge({archived: false}).save()
    return response.status(200).json({success: "produit correctement mis à jour"})
  }
}
