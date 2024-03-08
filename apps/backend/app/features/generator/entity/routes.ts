import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'create-entity-controller.store')
  Route.put('/', 'update-entity-controller.update')
  Route.get('/', 'list-entities-controller.index')
  Route.get('/:entityName', 'find-entity-controller.show')
  Route.delete('/:entityName', 'delete-entity-controller.destroy')
})
  .prefix('generator/entity')
  // .middleware('bearerAuth')
  .namespace('entity/controllers')
