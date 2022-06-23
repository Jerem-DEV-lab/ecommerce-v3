import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post('/create-product', "ProductsController.store")
  Route.post('/create-category', "CategoriesController.store")
  Route.delete('/delete-category/:id', "CategoriesController.deleteCategory")
  Route.get('/find-categories', "CategoriesController.findCategories")
  Route.get('/products', 'AdminsController.getAll')
  Route.get('/products/archived', 'AdminsController.getAllProductsArchived')
  Route.get('/product/:productId', 'ProductsController.getProductById')
  Route.delete('/product/:productId', 'ProductsController.destroy')
  Route.patch('/product/:productId', 'ProductsController.update')
  Route.put('/product/:productId', 'ProductsController.puttingProductOnSale')
}).prefix('/api/admin')/*.middleware(['auth', 'adminRole'])*/

Route.get('upload-img/:filename', 'AdminsController.getImgProduct')
Route.group(() => {
  Route.get('/messages', "AdminsController.getAllMessages")
  Route.post('/send-mail', "AdminsController.sendMessage")
  Route.delete('/messages', "AdminsController.deleteManyMessages")
  Route.patch('/messages-path', 'ContactsController.changePathMessage')
  Route.patch('/message/:messageId', 'AdminsController.updateStatusMessage')
  Route.patch('/message/bookmark/:messageId', "AdminsController.bookmarkMessage")
}).prefix('/api/admin')/*.middleware(['auth', 'adminRole'])*/

Route.group(() => {
  Route.get('/orders', "OrdersController.getAllOrders")
  Route.post('/orders', "OrdersController.storeOrdersByAdmin")
  Route.get('/orders/:orderId', "OrdersController.getOrderById")
  Route.patch('/orders/update', "OrdersController.updateOrderStatus")
  Route.delete('/orders/:orderId', "OrdersController.deleteOrder")
}).prefix('/api/admin')/*.middleware(['auth', 'adminRole'])*/

Route.group(() => {
  Route.post('/facture', "InvoicesController.createInvoice")
  Route.get('/facture', "InvoicesController.getAllInvoices")
  Route.get('/facture/:orderId', "InvoicesController.getInvoiceById")
}).prefix('/api/admin')/*.middleware(['auth', 'adminRole'])*/

Route.group(() => {
  Route.get('/users', "AdminsController.findUsers")
  Route.post('/manage-access', "AdminsController.manageUserAccess")
  Route.get('/user-order/:userId', "OrdersController.getUserOrders")
  Route.post('/user/nouveau', "AuthController.register")
}).prefix('/api/admin')/*.middleware(['auth', 'adminRole'])*/

Route.group(() => {
  Route.post('/event', "EventStoresController.store")
  Route.get('/events', "EventStoresController.getAllEvents")
  Route.patch('/events/:eventId', "EventStoresController.updateEvent")
  Route.delete('/event/:eventId', "EventStoresController.deleteEvent")
}).prefix('/api/admin').middleware(['auth', 'adminRole'])
