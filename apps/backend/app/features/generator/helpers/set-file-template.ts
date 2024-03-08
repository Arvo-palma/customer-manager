import Entity from 'app/models/entity-model'
import { deleteControllerFileTemplate } from '../entity/templates/controller-templates/delete-controller-file-template'
import { findControllerFileTemplate } from '../entity/templates/controller-templates/find-controller-file-template'
import { listControllerFileTemplate } from '../entity/templates/controller-templates/list-controller-file-template'
import { postControllerFileTemplate } from '../entity/templates/controller-templates/post-controller-file-template'
import { updateControllerFileTemplate } from '../entity/templates/controller-templates/update-controller-file-template'
import { deleteRepositoryFileTemplate } from '../entity/templates/repository-templates/delete-repository-file-template'
import { findRepositoryFileTemplate } from '../entity/templates/repository-templates/find-repository-file-template'
import { listRepositoryFileTemplate } from '../entity/templates/repository-templates/list-repository-file-template'
import { postRepositoryFileTemplate } from '../entity/templates/repository-templates/post-repository-file-template'
import { updateRepositoryFileTemplate } from '../entity/templates/repository-templates/update-repository-file-template'
import { deleteServiceFileTemplate } from '../entity/templates/service-templates/delete-service-file-template'
import { findServiceFileTemplate } from '../entity/templates/service-templates/find-service-file-template'
import { listServiceFileTemplate } from '../entity/templates/service-templates/list-service-file-template'
import { postServiceFileTemplate } from '../entity/templates/service-templates/post-service-file-template'
import { updateServiceFileTemplate } from '../entity/templates/service-templates/update-service-file-template'

export const setPostTemplate = (entity: Entity, type: string): string => {
  let template = ''
  switch (type) {
    case 'controller':
      template = postControllerFileTemplate(entity.displayName, entity.singularName)
      break
    case 'service':
      template = postServiceFileTemplate(entity)
      break
    case 'repository':
      template = postRepositoryFileTemplate(entity.displayName, entity.singularName)
      break
    case 'schema':
      template = ''
      break
    case 'type':
      template = ''
      break
    default:
      break
  }
  return template
}

export const setDeleteTemplate = (
  entityName: {
    displayName: string
    singularName: string
    pluralName: string
  },
  type: string
): string => {
  let template = ''
  switch (type) {
    case 'controller':
      template = deleteControllerFileTemplate(entityName.displayName, entityName.singularName)
      break
    case 'service':
      template = deleteServiceFileTemplate(entityName.displayName, entityName.singularName)
      break
    case 'repository':
      template = deleteRepositoryFileTemplate(entityName.displayName, entityName.singularName)
      break
    case 'schema':
      template = ''
      break
    case 'type':
      template = ''
      break
    default:
      break
  }
  return template
}

export const setFindTemplate = (
  entityName: {
    displayName: string
    singularName: string
    pluralName: string
  },
  type: string
): string => {
  let template = ''
  switch (type) {
    case 'controller':
      template = findControllerFileTemplate(entityName.displayName, entityName.singularName)
      break
    case 'service':
      template = findServiceFileTemplate(entityName.displayName, entityName.singularName)
      break
    case 'repository':
      template = findRepositoryFileTemplate(entityName.displayName, entityName.singularName)
      break
    case 'schema':
      template = ''
      break
    case 'type':
      template = ''
      break
    default:
      break
  }
  return template
}

export const setListTemplate = (
  entityName: {
    displayName: string
    singularName: string
    pluralName: string
  },
  type: string
): string => {
  let template = ''
  switch (type) {
    case 'controller':
      template = listControllerFileTemplate(
        entityName.displayName,
        entityName.singularName,
        entityName.pluralName
      )
      break
    case 'service':
      template = listServiceFileTemplate(
        entityName.displayName,
        entityName.singularName,
        entityName.pluralName
      )
      break
    case 'repository':
      template = listRepositoryFileTemplate(
        entityName.displayName,
        entityName.singularName,
        entityName.pluralName
      )
      break
    case 'schema':
      template = ''
      break
    case 'type':
      template = ''
      break
    default:
      break
  }
  return template
}

export const setUpdateTemplate = (entity: Entity, type: string): string => {
  let template = ''
  switch (type) {
    case 'controller':
      template = updateControllerFileTemplate(entity.displayName, entity.singularName)
      break
    case 'service':
      template = updateServiceFileTemplate(entity)
      break
    case 'repository':
      template = updateRepositoryFileTemplate(entity.displayName, entity.singularName)
      break
    case 'schema':
      template = ''
      break
    case 'type':
      template = ''
      break
    default:
      break
  }
  return template
}
