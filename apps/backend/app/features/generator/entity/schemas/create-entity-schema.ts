import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const CreateEntitySchema = schema.create({
  displayName: schema.string({ trim: true }, [rules.maxLength(100)]),
  singularName: schema.string({ trim: true }, [rules.maxLength(100)]),
  pluralName: schema.string({ trim: true }, [rules.maxLength(100)]),
  attributes: schema.object().anyMembers(),
})
