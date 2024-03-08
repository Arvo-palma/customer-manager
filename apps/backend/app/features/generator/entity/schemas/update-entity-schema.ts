import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const UpdateEntitySchema = schema.create({
  displayName: schema.string({ trim: true }, [rules.maxLength(100)]),
  singularName: schema.string({ trim: true }, [rules.maxLength(100)]),
  pluralName: schema.string({ trim: true }, [rules.maxLength(100)]),
  attributes: schema.object().anyMembers(),
})
