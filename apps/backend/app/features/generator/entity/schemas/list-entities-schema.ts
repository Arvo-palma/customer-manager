import { schema } from '@ioc:Adonis/Core/Validator'
import { PaginateSchemaProps } from 'app/features/base/schemas/paginate-schema'

export const ListEntitiesSchema = schema.create({
  ...PaginateSchemaProps,
  criteria: schema.string.optional(),
})
