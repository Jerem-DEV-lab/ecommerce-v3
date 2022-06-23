import Route from "@ioc:Adonis/Core/Route";

Route.post('/contact', 'ContactsController.store').prefix('/api')
Route.post('/reply_message', 'AdminsController.sendMailWithGmail').prefix('/api')
Route.post('/reset_password', 'AuthController.passwordReset').prefix('/api')
Route.post('/check_token_reset', 'AuthController.checkResetPasswordToken').prefix('/api')
Route.post('/confirm_reset_password', 'AuthController.resetPassword').prefix('/api')
Route.patch('/update_info', 'AuthController.updateUserInfo').prefix('/api').middleware(['auth'])
Route.patch('/update_password', 'AuthController.changePassword').prefix('/api').middleware(['auth'])
