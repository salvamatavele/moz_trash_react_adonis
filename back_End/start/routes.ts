/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('companies', 'HomeController.getCompanies')
  Route.post('claims', 'ClaimsController.store')
  Route.get('file/:folder/:path', 'HelpersController.showFile')
  Route.get('image/:folder/:path', 'HelpersController.showImage')

  Route.get('adverts', 'AdvertsController.index')
  Route.get('adverts/:user/:id', 'AdvertsController.getByUser').middleware(['auth:api'])
  Route.get('adverts/:id', 'AdvertsController.show')
  Route.post('adverts', 'AdvertsController.store').middleware(['auth:api'])
  Route.put('adverts/:id', 'AdvertsController.update').middleware(['auth:api'])
  Route.delete('adverts/:id', 'AdvertsController.destroy').middleware(['auth:api'])

  Route.get('tips', 'TipsController.index')
  Route.get('tips/:id', 'TipsController.show')
  Route.get('tips/:user/:id', 'TipsController.getByUser').middleware(['auth:api'])
  Route.post('tips', 'TipsController.store').middleware(['auth:api'])
  Route.put('tips/:id', 'TipsController.update').middleware(['auth:api'])
  Route.delete('tips/:id', 'TipsController.destroy').middleware(['auth:api'])
  Route.group(() => {
    Route.resource('notifications', 'NotificationsController').apiOnly()
  }).middleware(['auth:api'])
}).prefix('api')

// Auth routes
Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
  Route.post('logout', 'AuthController.logout').middleware(['auth:api'])
})
  .prefix('api')
  .namespace('App/Controllers/Http/Auth')

// admin routes
Route.group(() => {
  Route.resource('companies', 'CompaniesController').apiOnly()
  Route.resource('users', 'UsersController')
  Route.resource('alerts', 'AlertsController').apiOnly()
  Route.resource('tips', 'TipsController').apiOnly()
  Route.get('tip/images/:id', 'TipImagesController.index')
  Route.post('tip/images', 'TipImagesController.store')
  Route.delete('tip/images/:id', 'TipImagesController.destroy')
  Route.resource('adverts', 'AdvertsController').apiOnly()
  Route.resource('claims', 'ClaimsController').apiOnly()
  Route.resource('schedules', 'SchedulesController').apiOnly()
  Route.get('notifications', 'NotificationsController.index')
  Route.get('notifications/:status', 'NotificationsController.getByStatus')
})
  .prefix('api/admin')
  .namespace('App/Controllers/Http/Admin')
  .middleware(['auth:api'])
