import { typesTranslator } from 'app/features/generator/helpers/types-translator'
import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'
import Entity, { AttributeType } from 'app/models/entity-model'

export const generateSingleTypes = (
  attributeNames: string[],
  attributeValues: AttributeType[]
): string => {
  let types = ``
  const typesList = attributeNames.map((attributeName) => {
    const typeItem = typesTranslator(
      attributeValues[attributeNames.indexOf(attributeName)].type,
      attributeName
    )
    const isNullable = attributeValues[attributeNames.indexOf(attributeName)].nullable
    const connection = isNullable ? `?: ` : `: `
    return `${attributeName}` + connection + `${typeItem}\n`
  })
  return types.concat(...typesList)
}

export const generateTypesTemplate = (entity: Entity, isUpdate: boolean): string => {
  const { displayName } = entity
  const attributeNames = Object.keys(entity.attributes)
  const attributeValues = Object.values(entity.attributes)

  const hasMedia = attributeValues.some((value) => value.type === 'media')
  const hasEnum = attributeValues.some((value) => value.type === 'enumeration')
  let imports = ''
  let content = ''
  const mediaTypeImport = `import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'\n
  `

  const typeName = isUpdate
    ? `type Update${displayName}Input = {\n`
    : `type Create${displayName}Input = {\n`

  const exportFooter = isUpdate
    ? `}

export default Update${displayName}Input\n`
    : `}

export default Create${displayName}Input\n`

  const idType = isUpdate ? `id: string\n` : ``

  content = content + idType + generateSingleTypes(attributeNames, attributeValues)

  if (hasMedia) imports = imports + mediaTypeImport
  if (hasEnum) {
    const enumNames = attributeValues
      .filter((value) => value.type === 'enumeration')
      .map((value) => attributeNames[attributeValues.indexOf(value)])
    const enumTypeImport = enumNames.map(
      (name) =>
        `import { ${capitalizeFirstLetter(name)}Type } from 'app/models/${
          entity.singularName
        }-model'\n`
    )
    imports = imports.concat(...enumTypeImport)
  }

  return imports + typeName + content + exportFooter
}
