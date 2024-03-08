import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'
import { Attributes } from 'app/models/entity-model'

export const generateAdonisProperties = (
  singularName: string,
  attributes: Attributes
): { imports: string; properties: string } => {
  let imports = `import { rules, schema } from '@ioc:Adonis/Core/Validator'\n`
  let properties = ''
  const attributeNames = Object.keys(attributes)
  const attributeValues = Object.values(attributes)

  attributeValues.forEach((value) => {
    const attributeName = attributeNames[attributeValues.indexOf(value)]
    const attributeTypeName = `${capitalizeFirstLetter(attributeName)}Type`
    const nullable = value.nullable ? `.optional` : ``
    const isAlreadyImported = imports.includes(
      `import { FILES_EXT_AVAILABLE, FILES_MAX_SIZE } from 'app/helpers/file-constants'\n`
    )

    switch (value.type) {
      case 'string':
        properties =
          properties + `${attributeName}: schema.string` + `${nullable}` + `({ trim: true }),\n`
        break
      case 'integer':
        properties = properties + `${attributeName}: schema.number` + `${nullable}` + `(),\n`
        break
      case 'double':
        properties = properties + `${attributeName}: schema.number` + `${nullable}` + `(),\n`
        break
      case 'date':
        properties =
          properties +
          `${attributeName}: schema.date` +
          `${nullable}` +
          `({ format: 'yyyy-MM-dd' }),\n`
        break
      case 'boolean':
        properties = properties + `${attributeName}: schema.boolean` + `${nullable}` + `(),\n`
        break
      case 'enumeration':
        imports =
          imports + `import { ${attributeTypeName} } from 'app/models/${singularName}-model'\n`
        properties =
          properties +
          `${attributeName}: schema.enum` +
          `${nullable}` +
          `(Object.values(${attributeTypeName})),\n`
        break
      case 'media':
        imports = isAlreadyImported
          ? imports + ''
          : imports +
            `import { FILES_EXT_AVAILABLE, FILES_MAX_SIZE } from 'app/helpers/file-constants'\n`
        properties =
          properties +
          `${attributeName}: schema.file` +
          `${nullable}` +
          `({ extnames: FILES_EXT_AVAILABLE, size: FILES_MAX_SIZE }),\n`
        break
      case 'relation':
        properties =
          properties + `${attributeName}: schema.string` + `${nullable}` + `({ trim: true }),\n`
        break
      case 'JSON':
        properties =
          properties + `${attributeName}: schema.object` + `${nullable}` + `().anyMembers(),\n`
        break
      default:
        properties = properties + `${attributeName}: schema.string({ trim: true }),\n`
        break
    }
  })
  return { imports, properties }
}

export const generateSwaggerProperties = (attributes: Attributes): string => {
  let properties = ''
  const attributeNames = Object.keys(attributes)
  const attributeValues = Object.values(attributes)

  attributeValues.forEach((value) => {
    const attributeName = attributeNames[attributeValues.indexOf(value)]

    switch (value.type) {
      case 'string':
        properties =
          properties +
          `        ${attributeName}:
          type: string\n`
        break
      case 'integer':
        properties =
          properties +
          `        ${attributeName}:
          type: number\n`
        break
      case 'double':
        properties =
          properties +
          `        ${attributeName}:
          type: number\n`
        break
      case 'date':
        properties =
          properties +
          `        ${attributeName}:
          type: string
            format: date\n`
        break
      case 'boolean':
        properties =
          properties +
          `        ${attributeName}:
          type: boolean\n`
        break
      case 'enumeration':
        properties =
          properties +
          `        ${attributeName}:
          type: string\n`
        break
      case 'media':
        properties =
          properties +
          `        ${attributeName}:
          type: string
            format: binary\n`
        break
      case 'relation':
        properties =
          properties +
          `        ${attributeName}:
          type: string\n`
        break
      case 'JSON':
        properties =
          properties +
          `        ${attributeName}:
          type: object\n`
        break
      default:
        properties =
          properties +
          `        ${attributeName}:
          type: string\n`
        break
    }
  })
  return properties
}
