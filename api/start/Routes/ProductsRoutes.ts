import Route from "@ioc:Adonis/Core/Route";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";


Route.get('/products', 'ProductsController.getAll').prefix('/api')
Route.get('/find-categories', "CategoriesController.findCategories").prefix('/api')
Route.get('/products/:fileName', async ({params, response}: HttpContextContract) => {
  const readableStream = await Drive.getStream("produits-images/" + params.fileName)
  return response.stream(readableStream)
})
