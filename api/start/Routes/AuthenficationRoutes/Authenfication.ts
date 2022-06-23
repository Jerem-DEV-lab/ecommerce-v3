import Route from "@ioc:Adonis/Core/Route";

Route.post('/register', 'AuthController.register').prefix('/api')
Route.post('/login', 'AuthController.login').prefix('/api')
Route.get('/logout', 'AuthController.logout').prefix('/api')
Route.get('/check', 'AuthController.check').prefix('/api')
Route.get('/user_order/:userId', 'AuthController.getUserOrder').prefix('/api')
