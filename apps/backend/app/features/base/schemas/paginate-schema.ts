import { schema } from '@ioc:Adonis/Core/Validator'

export const PaginateSchemaProps = {
  page: schema.number(),
  limit: schema.number(),
}

const PaginateSchema = schema.create(PaginateSchemaProps)

export default PaginateSchema
