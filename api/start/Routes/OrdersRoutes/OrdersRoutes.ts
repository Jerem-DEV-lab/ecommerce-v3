import Route from "@ioc:Adonis/Core/Route";

Route.post('/orders', "OrdersController.store").prefix('/api').middleware(["auth"])
