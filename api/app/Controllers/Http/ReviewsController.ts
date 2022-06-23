import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Review from "App/Models/Review";

export default class ReviewsController {
  public async storeReview({request, response}: HttpContextContract) {
    const payload = request.all()
    await Review.create(payload)
    return response.created("Nous vous remercions pour votre avis")

  }

  public async getReview() {
    return Review.query().preload('product').preload('users')
  }

  public async findReviewForProduct({params, response}: HttpContextContract) {
    const productId = params.productId
    const reviews = await Review.query().where('product_id', productId).preload('users')
    return response.ok(reviews)
  }
}
