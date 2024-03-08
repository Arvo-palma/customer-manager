// import Database from '@ioc:Adonis/Lucid/Database'
import BaseRepository from 'app/features/base/repositories/base-repository'
import { camelToSnakeCase } from 'app/helpers/camel-to-snake-case'
import Entity from 'app/models/entity-model'
import pluralize from 'pluralize'

export default class DeleteEntityRepository extends BaseRepository<typeof Entity> {
  constructor() {
    super(Entity)
  }

  public async remove(entityName: string): Promise<boolean> {
    const tableName = pluralize(camelToSnakeCase(entityName), 5).replace(/_/g, '')
    try {
      // Add drop of tables here if needed
      return true
    } catch (error) {
      console.error('Error fetching table and column definitions', error)
      throw error
    }
  }
}
