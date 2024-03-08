import { schema } from '@ioc:Adonis/Core/Validator'
import { PaginateSchemaProps } from '../../../base/schemas/paginate-schema'

export const ListUsersSchema = schema.create({
  ...PaginateSchemaProps,
  criteria: schema.string.optional(),
})
