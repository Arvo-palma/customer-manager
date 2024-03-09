import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const CreateUserSchema = schema.create({
  name: schema.string({ trim: true }, [rules.maxLength(100)]),
  email: schema.string({ trim: true }, [rules.maxLength(100)]),
  phone: schema.string({ trim: true }, [rules.maxLength(100)]),
  coordX: schema.number(),
  coordY: schema.number(),
})
