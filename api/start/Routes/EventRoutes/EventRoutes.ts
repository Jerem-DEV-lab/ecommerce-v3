import Route from "@ioc:Adonis/Core/Route";

Route.get('/event', 'EventStoresController.getEvent').prefix('/api')
Route.put('/admin/event/:eventId', 'EventStoresController.updateEvent').prefix('/api').middleware(['auth', 'adminRole'])
