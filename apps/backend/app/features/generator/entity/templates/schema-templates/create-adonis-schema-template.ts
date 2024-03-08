import { generateAdonisProperties } from 'app/features/generator/helpers/schema-properties-translator'
import Entity from 'app/models/entity-model'

export const generateAdonisCreateSchema = (entity: Entity): string => {
  const header = `export const Create${entity.displayName}Schema = schema.create({\n`
  const { imports, properties } = generateAdonisProperties(entity.singularName, entity.attributes)
  const footer = `})`

  return imports + header + properties + footer
}
