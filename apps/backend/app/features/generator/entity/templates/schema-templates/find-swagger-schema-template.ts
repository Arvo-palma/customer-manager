import Entity from 'app/models/entity-model'

export const generateSwaggerFindSchema = (entity: Entity): string => {
  return `components:
  schemas:
    Find${entity.displayName}Output:
      $ref: '#components/schemas/${entity.singularName}Model'
  parameters:
    Find${entity.displayName}Id:
      name: ${entity.singularName}Id
      in: path
      type: string
      required: true`
}
