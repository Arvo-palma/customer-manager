import { camelToSnakeCase } from 'app/helpers/camel-to-snake-case'
import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'
import Entity from 'app/models/entity-model'
import pluralize from 'pluralize'

export const migrationPropertiesTranslator = (
  entity: Entity
): { imports: string; properties: string } => {
  const { attributes } = entity
  let imports = ``
  let properties = ''
  const attributeNames = Object.keys(attributes)
  const attributeValues = Object.values(attributes)

  attributeValues.forEach((value) => {
    const attributeName = attributeNames[attributeValues.indexOf(value)]
    const attributeTypeName = `${capitalizeFirstLetter(attributeName)}Type`
    const nullable = value.nullable ? `.notNullable()` : ``

    switch (value.type) {
      case 'string':
        properties =
          properties +
          `      table.string('${camelToSnakeCase(attributeName)}')` +
          `${nullable}` +
          `\n`
        break
      case 'integer':
        properties =
          properties +
          `      table.integer('${camelToSnakeCase(attributeName)}')` +
          `${nullable}` +
          `\n`
        break
      case 'double':
        properties =
          properties +
          `      table.double('${camelToSnakeCase(attributeName)}')` +
          `${nullable}` +
          `\n`
        break
      case 'date':
        properties =
          properties +
          `      table.timestamp('${camelToSnakeCase(attributeName)}', { useTz: true })` +
          `${nullable}` +
          `\n`
        break
      case 'boolean':
        properties =
          properties +
          `      table.boolean('${camelToSnakeCase(attributeName)}')` +
          `${nullable}` +
          `\n`
        break
      case 'enumeration':
        imports =
          imports +
          `import { ${attributeTypeName} } from 'app/models/${entity.singularName}-model'\n`
        properties =
          properties +
          `      table.enum('${camelToSnakeCase(
            attributeName
          )}', Object.values(${attributeTypeName})).defaultTo('${value.default}')` +
          `${nullable}` +
          `\n`
        break
      case 'media':
        properties =
          properties +
          `      table.string('${camelToSnakeCase(attributeName)}')` +
          `${nullable}` +
          `\n`
        break
      case 'relation':
        properties =
          properties +
          `      table.string('${camelToSnakeCase(value.target)}_id').references('${pluralize(
            camelToSnakeCase(value.target),
            5
          )}.id')` +
          `${nullable}` +
          `\n`
        break
      case 'JSON':
        properties =
          properties +
          `      table.json('${camelToSnakeCase(attributeName)}')` +
          `${nullable}` +
          `\n`
        break
      default:
        properties = properties + `${nullable}` + `\n`
        break
    }
  })
  return { imports, properties }
}
