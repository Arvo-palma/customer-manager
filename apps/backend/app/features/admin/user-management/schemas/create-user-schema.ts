import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { RoleType } from 'app/models/user-model'

export const CreateUserSchema = schema.create({
  name: schema.string({ trim: true }, [rules.maxLength(100)]),
  email: schema.string({ trim: true }, [rules.maxLength(100)]),
  role: schema.enum(Object.values(RoleType)),
  avatar: schema.string({ trim: true }),
  password: schema.string({ trim: true }, [rules.maxLength(20)]),
  temporaryPassword: schema.string({ trim: true }, [rules.maxLength(20)]),
})
