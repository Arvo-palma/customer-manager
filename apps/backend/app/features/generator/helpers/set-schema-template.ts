import Entity from 'app/models/entity-model'
import { generateAdonisCreateSchema } from '../entity/templates/schema-templates/create-adonis-schema-template'
import { generateSwaggerCreateSchema } from '../entity/templates/schema-templates/create-swagger-schema-template'
import { generateSwaggerDeleteSchema } from '../entity/templates/schema-templates/delete-swagger-schema-template'
import { generateSwaggerFindSchema } from '../entity/templates/schema-templates/find-swagger-schema-template'
import { generateAdonisListSchema } from '../entity/templates/schema-templates/list-adonis-schema-template'
import { generateSwaggerListSchema } from '../entity/templates/schema-templates/list-swagger-schema-template'
import { generateAdonisUpdateSchema } from '../entity/templates/schema-templates/update-adonis-schema-template'
import { generateSwaggerUpdateSchema } from '../entity/templates/schema-templates/update-swagger-schema-template'

export const setCreateSchemaTemplate = (entity: Entity, type: string): string => {
  let template = ''
  switch (type) {
    case 'adonis':
      template = generateAdonisCreateSchema(entity)
      break
    case 'swagger':
      template = generateSwaggerCreateSchema(entity)
      break
    default:
      break
  }
  return template
}

export const setDeleteSchemaTemplate = (entity: Entity, type: string): string => {
  let template = ''
  switch (type) {
    case 'adonis':
      break
    case 'swagger':
      template = generateSwaggerDeleteSchema(entity)
      break
    default:
      break
  }
  return template
}

export const setFindSchemaTemplate = (entity: Entity, type: string): string => {
  let template = ''
  switch (type) {
    case 'adonis':
      break
    case 'swagger':
      template = generateSwaggerFindSchema(entity)
      break
    default:
      break
  }
  return template
}

export const setListSchemaTemplate = (entity: Entity, type: string): string => {
  let template = ''
  switch (type) {
    case 'adonis':
      template = generateAdonisListSchema(entity)
      break
    case 'swagger':
      template = generateSwaggerListSchema(entity)
      break
    default:
      break
  }
  return template
}

export const setUpdateSchemaTemplate = (entity: Entity, type: string): string => {
  let template = ''
  switch (type) {
    case 'adonis':
      template = generateAdonisUpdateSchema(entity)
      break
    case 'swagger':
      template = generateSwaggerUpdateSchema(entity)
      break
    default:
      break
  }
  return template
}
