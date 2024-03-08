import Entity from 'app/models/entity-model'

export const generateSwaggerDeleteSchema = (entity: Entity): string => {
  return `components:
  parameters:
    Delete${entity.displayName}Id:
      name: ${entity.singularName}Id
      in: path
      type: string
      required: true`
}
