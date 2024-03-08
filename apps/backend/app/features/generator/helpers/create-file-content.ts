import Entity from 'app/models/entity-model'
import {
  setDeleteTemplate,
  setFindTemplate,
  setListTemplate,
  setPostTemplate,
  setUpdateTemplate,
} from './set-file-template'

export const createFileContent = (entity: Entity, option: string, type: string): string => {
  const entityName = {
    displayName: entity.displayName,
    singularName: entity.singularName,
    pluralName: entity.pluralName,
  }
  let content = ''
  switch (option) {
    case 'create':
      content = setPostTemplate(entity, type)
      break
    case 'delete':
      content = setDeleteTemplate(entityName, type)
      break
    case 'find':
      content = setFindTemplate(entityName, type)
      break
    case 'list':
      content = setListTemplate(entityName, type)
      break
    case 'update':
      content = setUpdateTemplate(entity, type)
      break
    default:
      break
  }
  return content
}
