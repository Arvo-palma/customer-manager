import { inject } from '@adonisjs/core/build/standalone'
import BaseService from 'app/features/base/services/base-service'
import { camelToSnakeCase } from 'app/helpers/camel-to-snake-case'
import Entity from 'app/models/entity-model'
import pluralize from 'pluralize'
import UpdateEntityInput from '../types/update-entity-types'
import CreateEntityService from './create-entity-service'
import DeleteEntityService from './delete-entity-service'

@inject([CreateEntityService, DeleteEntityService])
export default class UpdateEntityService extends BaseService<typeof Entity> {
  constructor(
    protected createService: CreateEntityService,
    private deleteService: DeleteEntityService
  ) {
    super(Entity)
  }

  public async execute(input: UpdateEntityInput): Promise<string> {
    try {
      const { singularName } = input
      const tableName = pluralize(camelToSnakeCase(input.singularName), 5)

      let modelCreationReport = 'Model file not created\n'
      let modelSchemaCreationReport = 'Schema model file not created\n'
      let typesCreationReport = 'Types files not created\n'
      let schemaFilesCreationReport = 'Schema files not created\n'
      let migrationFilesCreationReport = 'Migration files not created\n'

      const isMigrationDeleted = await this.deleteService.deleteMigration(tableName)
      const isModelDeleted = await this.deleteService.deleteModel(singularName)
      const isSchemaDeleted = await this.deleteService.deleteSchema(singularName)
      const isSchemasFolderDeleted = await this.deleteService.deleteSchemasFolder(singularName)

      if (
        [isMigrationDeleted, isModelDeleted, isSchemaDeleted, isSchemasFolderDeleted].every(
          (check) => check
        )
      ) {
        const schemaFolderCreated = await this.createService.createSchemaFolder(input.singularName)
        if (schemaFolderCreated) {
          await Promise.all([
            (modelCreationReport = await this.createService.createModel(input)),
            (modelSchemaCreationReport = await this.createService.createSchemaModel(input)),
            (typesCreationReport = await this.createService.createTypes(input)),
            (schemaFilesCreationReport = await this.createService.createSchemaFiles(
              input as Entity
            )),
            (migrationFilesCreationReport = await this.createService.createMigrationFile(input)),
          ])
        }
      }

      return (
        modelCreationReport +
        modelSchemaCreationReport +
        typesCreationReport +
        schemaFilesCreationReport +
        migrationFilesCreationReport
      )
    } catch (error) {
      return error
    }
  }
}
