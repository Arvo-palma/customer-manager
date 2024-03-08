export const createRouteFileTemplate = (
  singularName: string,
  pluralName: string
) => `import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'create-${singularName}-controller.store')
  Route.put('/:${singularName}Id', 'update-${singularName}-controller.update')
  Route.get('/', 'list-${pluralName}-controller.index')
  Route.get('/:${singularName}Id', 'find-${singularName}-controller.show')
  Route.delete('/:${singularName}Id', 'delete-${singularName}-controller.destroy')
})
  .prefix('admin/${singularName}')
  .middleware('bearerAuth')
  .namespace('${singularName}/controllers')
`
