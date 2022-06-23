import Route from "@ioc:Adonis/Core/Route";

Route.post('/review', 'ReviewsController.storeReview').prefix('/api')/*.middleware(['auth'])*/
Route.get('/review/:productId', 'ReviewsController.findReviewForProduct').prefix('/api')/*.middleware(['auth'])*/
