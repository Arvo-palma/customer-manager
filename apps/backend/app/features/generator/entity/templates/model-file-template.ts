import Entity from 'app/models/entity-model'
import {
  generateEnumProps,
  generateRelationProps,
  generateSlugProps,
  modelAttributeTypesTranslator,
} from '../../helpers/model-attribute-transcriber'

export const createModelTemplate = (entity: Entity) => {
  const { displayName, singularName } = entity
  const hasSlug = Object.keys(entity.attributes).some((attributeName) => attributeName === 'slug')
  const hasEnum = Object.values(entity.attributes).some(
    (attribute) => attribute.type === 'enumeration'
  )
  const hasRelation = Object.values(entity.attributes).some(
    (attribute) => attribute.type === 'relation'
  )
  let fileImports = ''
  let enumType = ''
  let tableProps = ''

  if (hasEnum) {
    const { generatedEnum, generatedProps } = generateEnumProps(entity)
    enumType = generatedEnum
    tableProps = tableProps + generatedProps
  }

  if (hasSlug) {
    fileImports =
      fileImports +
      `import { beforeCreate } from '@ioc:Adonis/Lucid/Orm'\n
import { slugify } from 'app/helpers/get-slug'\n`
    tableProps = tableProps + generateSlugProps(displayName, singularName)
  }

  if (hasRelation) {
    const { imports, props } = generateRelationProps(entity)
    fileImports = fileImports + imports
    tableProps = tableProps + props
  }

  const attributeNames = Object.keys(entity.attributes)
  const attributeValues = Object.values(entity.attributes)
  const complexAttributes = ['enumeration', 'relation']
  const baseImports = `import { column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel } from './base-model'\n`

  const columns: string[] = attributeNames.map((attributeName, index) => {
    if (
      attributeName !== 'slug' &&
      !complexAttributes.includes(entity.attributes[attributeName].type)
    ) {
      return `${modelAttributeTypesTranslator(attributeName, attributeValues[index].type)}
      \n`
    }
    return ''
  })

  return baseImports.concat(
    fileImports,
    enumType,
    `export default class ${displayName} extends BaseModel {\n`,
    ...columns,
    tableProps,
    `}`
  )
}
