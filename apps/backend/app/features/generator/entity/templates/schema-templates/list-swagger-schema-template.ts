import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'
import Entity from 'app/models/entity-model'

export const generateSwaggerListSchema = (entity: Entity): string => {
  return `components:
  schemas:
    List${capitalizeFirstLetter(entity.pluralName)}Output:
      properties:
        meta:
          $ref: '#/components/schemas/PaginateMetaSchema'
        data:
          type: array
          items:
            $ref: '#/components/schemas/${entity.displayName}Model'
  parameters:
    List${capitalizeFirstLetter(entity.pluralName)}Criteria:
      name: criteria
      in: query
      type: string
      required: false`
}
