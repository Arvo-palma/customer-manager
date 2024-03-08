import { generateSwaggerProperties } from 'app/features/generator/helpers/schema-properties-translator'
import Entity from 'app/models/entity-model'

export const generateSwaggerCreateSchema = (entity: Entity): string => {
  const header = `components:
  schemas:
    Create${entity.displayName}Input:
      type: object
      properties:\n`
  const properties = generateSwaggerProperties(entity.attributes)
  const footer = `
    CreateBrandOutput:
      $ref: '#components/schemas/${entity.displayName}Model'`

  return header + properties + footer
}
