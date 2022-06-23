import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import CategoryValidator from "App/Validators/CategoryValidator";
import Category from "App/Models/Category";

export default class CategoriesController {
  public async store({request, response}: HttpContextContract) {
    const payload = await request.validate(CategoryValidator)
    await Category.create(payload)
    return response.ok({success: "La catégorie a correctement été créée"})
  }

  public findCategories() {
    return Category.all()
  }

  public async deleteCategory({params, response}: HttpContextContract) {
    try {
      const categoryId = params.id
      const category = await Category.findByOrFail('id', categoryId)
      await category.delete()
      return response.ok("Catégorie correctement supprimée")
    } catch (e) {
      return response.badRequest("Erreur")
    }
  }
}
