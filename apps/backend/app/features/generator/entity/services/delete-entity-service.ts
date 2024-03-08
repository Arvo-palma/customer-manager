import { inject } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
import BaseService from 'app/features/base/services/base-service'
import { camelToSnakeCase } from 'app/helpers/camel-to-snake-case'
import Entity from 'app/models/entity-model'
import pluralize from 'pluralize'
import DeleteEntityRepository from '../repositories/delete-entity-repository'

import fs from 'fs'
import { promisify } from 'util'

const readdirAsync = promisify(fs.readdir)
const unlinkAsync = promisify(fs.unlink)
const rmAsync = promisify(fs.rm)

@inject([DeleteEntityRepository])
export default class DeleteEntityService extends BaseService<typeof Entity> {
  constructor(protected repo: DeleteEntityRepository) {
    super(Entity)
  }

  async deleteMigration(tableName: string): Promise<boolean> {
    try {
      const migrations = await readdirAsync(`database/migrations`)
      const entityMigration = migrations.filter(
        (migration) => migration.split(/_(.*)/s)[1].split('.ts')[0] === tableName
      )[0]
      await unlinkAsync(`database/migrations/${entityMigration}`)
      console.log('Migration and its contents deleted successfully.')
      return true
    } catch (error) {
      console.error('Error deleting migration:', error)
      return false
    }
  }

  async deleteModel(entityName: string): Promise<boolean> {
    try {
      const models = await readdirAsync(`app/models`)
      const entityModel = models.filter(
        (migration) => migration.split('-model')[0] === entityName
      )[0]
      await unlinkAsync(`app/models/${entityModel}`)

      console.log('Model and its contents deleted successfully.')
      return true
    } catch (error) {
      console.error('Error deleting model:', error)
      return false
    }
  }

  async deleteSchema(entityName: string): Promise<boolean> {
    try {
      const schemas = await readdirAsync(`app/models/schemas`)
      const entitySchema = schemas.filter(
        (migration) => migration.split('-model')[0] === entityName
      )[0]
      await unlinkAsync(`app/models/schemas/${entitySchema}`)

      console.log('Schema and its contents deleted successfully.')
      return true
    } catch (error) {
      console.error('Error deleting schema:', error)
      return false
    }
  }

  async deleteFeature(entityName: string): Promise<boolean> {
    try {
      await rmAsync(`app/features/admin/${entityName}`, { recursive: true })
      console.log('Folder and its contents deleted successfully.')
      return true
    } catch (error) {
      console.error('Error deleting folder:', error)
      return false
    }
  }

  async deleteSchemasFolder(entityName: string): Promise<boolean> {
    try {
      await rmAsync(`app/features/admin/${entityName}/schemas`, { recursive: true })
      console.log('Schema folder and its contents deleted successfully.')
      return true
    } catch (error) {
      console.error('Error deleting folder:', error)
      return false
    }
  }

  async dropEntityTable(tableName: string): Promise<boolean> {
    try {
      await Database.rawQuery(`DROP TABLE IF EXISTS "${tableName}"`)
      console.log(`Table "${tableName}" dropped successfully`)
      return true
    } catch (error) {
      console.error(`Error dropping table "${tableName}":`, error)
      return false
    }
  }

  public async execute(entityName: string): Promise<boolean> {
    try {
      const tableName = pluralize(camelToSnakeCase(entityName), 5)
      const isMigrationDeleted = await this.deleteMigration(tableName)
      const isModelDeleted = await this.deleteModel(entityName)
      const isSchemaDeleted = await this.deleteSchema(entityName)
      const isFeatureDeleted = await this.deleteFeature(entityName)
      const isTableDropped = await this.dropEntityTable(tableName)

      if (
        [
          isMigrationDeleted,
          isModelDeleted,
          isSchemaDeleted,
          isFeatureDeleted,
          isTableDropped,
        ].every((check) => check)
      ) {
        console.log('Entity deleted successfully.')
        return true
      } else {
        console.error('Error deleting entity')
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
