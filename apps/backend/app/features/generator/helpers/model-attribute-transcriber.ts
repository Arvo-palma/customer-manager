import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'
import Entity from 'app/models/entity-model'

export const modelAttributeTypesTranslator = (columnName: string, columnType: string): string => {
  switch (columnType) {
    case 'string':
      return `@column()
  public ${columnName}: string`
    case 'integer':
      return `@column()
  public ${columnName}: number`
    case 'double':
      return `@column()
  public ${columnName}: number`
    case 'date':
      return `@column()
  public ${columnName}: Date`
    case 'boolean':
      return `@column()
  public ${columnName}: boolean`
    case 'media':
      return `@column()
  public ${columnName}: string`
    case 'JSON':
      return `@column()
  public ${columnName}: JSON`
    default:
      return ''
  }
}

export const generateEnumProps = (
  entity: Entity
): { generatedEnum: string; generatedProps: string } => {
  const enumAttributes = Object.values(entity.attributes).filter(
    (attribute) => attribute.type === 'enumeration'
  )

  if (enumAttributes.length === 1 && enumAttributes[0].type === 'enumeration') {
    const enumAttributeName = Object.keys(entity.attributes)[
      Object.values(entity.attributes).indexOf(enumAttributes[0])
    ]
    const typeName = capitalizeFirstLetter(enumAttributeName)
    const enumOptions = enumAttributes[0].enum.map((enumValue) => {
      const key = enumValue.toUpperCase().replace(' ', '_')
      return `'${key}' = '${enumValue}',\n`
    })

    return {
      generatedEnum:
        `export enum ${typeName}Type {\n`.concat(...enumOptions) +
        `}\n
      `,
      generatedProps: `@column()
  public ${enumAttributeName}: ${typeName}Type\n
  `,
    }
  }

  let enums = ``
  let props = ``
  enumAttributes.forEach((attribute) => {
    const enumAttributeName = Object.keys(entity.attributes)[enumAttributes.indexOf(attribute)]
    const typeName = capitalizeFirstLetter(enumAttributeName)

    const enumOptions =
      attribute.type === 'enumeration'
        ? attribute.enum.map((enumValue) => {
            const key = enumValue.toUpperCase().replace(' ', '_')
            return `'${key}' = '${enumValue}',\n`
          })
        : ''

    enums =
      enums +
      `export enum ${typeName}Type {\n`.concat(...enumOptions) +
      `}\n
      `
    props =
      props +
      `@column()
  public ${enumAttributeName}: ${typeName}Type\n
  `
  })

  return {
    generatedEnum: enums,
    generatedProps: props,
  }
}

export const generateSlugProps = (
  displayName: string,
  singularName: string
): string => `@beforeCreate()
  public static async createSlug(${singularName}: ${displayName}) {
    ${singularName}.slug = slugify(${singularName})
  }\n`

const relationTranslator = (relationType: string) => {
  switch (relationType) {
    case 'HAS_ONE':
      return { singularRelationName: 'hasOne', displayRelationName: 'HasOne' }
    case 'BELONGS_TO':
      return { singularRelationName: 'belongsTo', displayRelationName: 'BelongsTo' }
    case 'HAS_MANY':
      return { singularRelationName: 'hasMany', displayRelationName: 'HasMany' }
    default:
      return { singularRelationName: '', displayRelationName: '' }
  }
}

export const generateRelationProps = (entity: Entity): { imports: string; props: string } => {
  const relationAttributes = Object.values(entity.attributes).filter(
    (attribute) => attribute.type === 'relation'
  )

  let imports = ``
  let props = ``
  relationAttributes.map((relationAttribute) => {
    if (relationAttribute.type === 'relation') {
      const relationType = relationAttribute.relation
      const targetDisplayName = capitalizeFirstLetter(relationAttribute.target)
      const targetSingularName = relationAttribute.target
      const { singularRelationName, displayRelationName } = relationTranslator(relationType)
      const isAlreadyImported = imports.includes(
        `import { ${displayRelationName}, ${singularRelationName} } from '@ioc:Adonis/Lucid/Orm'`
      )
      const relationImports = isAlreadyImported
        ? ''
        : `import { ${displayRelationName}, ${singularRelationName} } from '@ioc:Adonis/Lucid/Orm'\n
      `

      imports =
        imports +
        `import ${targetDisplayName} from './${targetSingularName}-model'\n
        ` +
        relationImports

      props =
        props +
        `@${singularRelationName}(() => ${targetDisplayName}, {
      localKey: 'id',
      foreignKey: '${targetSingularName}Id',
    })
    public ${targetSingularName}: ${displayRelationName}<typeof ${targetDisplayName}>\n
    `
    }
  })

  return { imports, props }
}
