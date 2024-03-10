import { schema } from '@ioc:Adonis/Core/Validator'

export const CreateRouteSchema = schema.create({
  users: schema.array().members(schema.string()),
})
