import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'create-user-controller.store')
  Route.post('/route', 'create-route-controller.index')
  Route.put('/:userId', 'update-user-controller.update')
  Route.get('/', 'list-users-controller.index')
  Route.get('/:userId', 'find-user-controller.show')
  Route.delete('/:userId', 'delete-user-controller.destroy')
})
  .prefix('admin/user')
  .namespace('user-management/controllers')
