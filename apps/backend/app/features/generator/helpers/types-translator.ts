import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'

export const typesTranslator = (attributeType: string, attributeName: string) => {
  switch (attributeType) {
    case 'string':
      return `string`
    case 'integer':
      return `number`
    case 'double':
      return `number`
    case 'date':
      return `Date`
    case 'boolean':
      return `boolean`
    case 'media':
      return `MultipartFileContract`
    case 'enumeration':
      return `${capitalizeFirstLetter(attributeName)}Type`
    case 'relation':
      return `string`
    case 'JSON':
      return `JSON`
    default:
      return `string`
  }
}
