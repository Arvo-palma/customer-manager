import Entity from 'app/models/entity-model'
import { generateSwaggerProperties } from '../../helpers/schema-properties-translator'

export const createSchemaModelTemplate = (entity: Entity) => {
  const header = `components:
  schemas:
    ${entity.displayName}Model:
      allOf:
        - $ref: '#/components/schemas/BaseModel'
      properties:\n`
  const properties = generateSwaggerProperties(entity.attributes)

  return header + properties
}
