import { generateSwaggerProperties } from 'app/features/generator/helpers/schema-properties-translator'
import Entity from 'app/models/entity-model'

export const generateSwaggerUpdateSchema = (entity: Entity): string => {
  const header = `components:
  schemas:
    Update${entity.displayName}Input:
      type: object
      properties:\n`
  const properties = generateSwaggerProperties(entity.attributes)
  const footer = `    Update${entity.displayName}Output:
      $ref: '#components/schemas/${entity.displayName}Model'
  parameters:
    Update${entity.displayName}Id:
      name: ${entity.singularName}Id
      in: path
      type: string
      required: true`

  return header + properties + footer
}
