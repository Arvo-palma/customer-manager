import Entity from 'app/models/entity-model'
import {
  setCreateSchemaTemplate,
  setDeleteSchemaTemplate,
  setFindSchemaTemplate,
  setListSchemaTemplate,
  setUpdateSchemaTemplate,
} from './set-schema-template'

export const createSchemaContent = (entity: Entity, option: string, type: string): string => {
  let content = ''
  switch (option) {
    case 'create':
      content = setCreateSchemaTemplate(entity, type)
      break
    case 'delete':
      content = setDeleteSchemaTemplate(entity, type)
      break
    case 'find':
      content = setFindSchemaTemplate(entity, type)
      break
    case 'list':
      content = setListSchemaTemplate(entity, type)
      break
    case 'update':
      content = setUpdateSchemaTemplate(entity, type)
      break
    default:
      break
  }
  return content
}
