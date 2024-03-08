// DatabaseInspector.ts

import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'
import { snakeToCamel } from 'app/helpers/snake-to-camel-case'
import { Attributes } from 'app/models/entity-model'
import pluralize from 'pluralize'

export type rawAttributesData = {
  column_name?: string
  data_type?: string
  is_nullable?: string
  column_default?: string | null
  columns_definitions?: any
  target?: string
  relation_type?: string
  enum?: string[]
}[]

export type rawTablesData = {
  [key: string]: rawAttributesData
}

export enum RelationTypeEnum {
  'hasMany' = 'HAS_MANY',
  'belongsTo' = 'BELONGS_TO',
  'hasOne' = 'HAS_ONE',
}

export type EntityDataType = {
  displayName: string
  singularName: string
  pluralName: string
  attributes: Attributes[]
}[]

const generateEntityNames = (
  snakeCaseName: string
): { displayName: string; singularName: string; pluralName: string } => {
  const pluralName = snakeToCamel(snakeCaseName)
  const singularName = pluralize(pluralName, 1)
  const displayName = capitalizeFirstLetter(singularName)

  return { displayName, singularName, pluralName }
}

const fromTableToModelType = (rawDataType: string): string => {
  switch (rawDataType) {
    case 'character varying':
      return 'string'
    case 'integer':
      return 'number'
    case 'timestamp with time zone':
      return 'date'
    case 'text':
      return 'enum'
    case 'double precision':
      return 'number'
    case 'json':
      return 'JSON'
    case 'boolean':
      return 'boolean'
    case 'relation':
      return 'relation'
    default:
      return rawDataType
  }
}

const formatTableAttributes = (rawAttributes: rawAttributesData): Attributes[] => {
  const convertedAttributes = rawAttributes.map((attribute) => {
    const enumProps =
      attribute.data_type === 'enumeration'
        ? {
            default: attribute.column_default?.split('::')[0].replace(/'/g, ''),
            enum: attribute.enum,
          }
        : undefined
    const relationProps =
      attribute.data_type === 'relation'
        ? {
            target: attribute.target,
            relation: RelationTypeEnum[attribute?.relation_type!],
          }
        : undefined
    return {
      [`${attribute.column_name}`]: {
        type: fromTableToModelType(attribute.data_type!),
        nullable: attribute.is_nullable === 'NO' ? false : true,
        ...relationProps,
        ...enumProps,
      },
    }
  })

  return convertedAttributes as Attributes[]
}

export const formatTablesAndColumns = (rawData: rawTablesData): EntityDataType => {
  try {
    let formattedData: EntityDataType = []
    const tablesAndColumns = Object.entries(rawData)
    tablesAndColumns.map((table) => {
      const { displayName, singularName, pluralName } = generateEntityNames(table[0])
      const formattedAttributes = formatTableAttributes(table[1])
      formattedData.push({
        displayName,
        singularName,
        pluralName,
        attributes: formattedAttributes,
      })
    })

    return formattedData
  } catch (error) {
    return error
  }
}
