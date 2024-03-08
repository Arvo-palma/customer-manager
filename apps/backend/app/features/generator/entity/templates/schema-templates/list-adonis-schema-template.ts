import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'
import Entity from 'app/models/entity-model'

export const generateAdonisListSchema = (entity: Entity): string => {
  return `import { schema } from '@ioc:Adonis/Core/Validator'
import { PaginateSchemaProps } from 'app/features/base/schemas/paginate-schema'

export const List${capitalizeFirstLetter(entity.pluralName)}Schema = schema.create({
  ...PaginateSchemaProps,
  criteria: schema.string.optional(),
})`
}
