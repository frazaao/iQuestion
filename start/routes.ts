import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.resource('users', 'UsersController').apiOnly()
Route.post('users/login', 'UsersController.login')
Route.post('users/logout', 'UsersController.logout')

Route.post('rooms', 'RoomsController.store')
Route.post('rooms/:id', 'RoomsController.show')
Route.post('rooms/:id/questions', 'RoomsController.listQuestions')
Route.post('rooms/:id/questions/create', 'RoomsController.createQuestion')
