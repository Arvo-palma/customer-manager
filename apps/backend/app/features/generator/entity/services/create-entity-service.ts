import BaseService from 'app/features/base/services/base-service'
import { default as Entity } from 'app/models/entity-model'
import { execSync, spawn } from 'child_process'
import fs from 'fs'
import { DateTime } from 'luxon'
import pluralize from 'pluralize'
import { createFileContent } from '../../helpers/create-file-content'
import { createSchemaContent } from '../../helpers/create-schema-content'
import { createMigrationTemplate } from '../templates/migration-file-template'
import { createModelTemplate } from '../templates/model-file-template'
import { createRouteFileTemplate } from '../templates/routes-file-template'
import { createSchemaModelTemplate } from '../templates/schema-model-file-template'
import { generateTypesTemplate } from '../templates/type-file-templates/create-type-template'
import { generateListTypesTemplate } from '../templates/type-file-templates/list-type-template'
import CreateEntityInput from '../types/create-entity-types'

export default class CreateEntityService extends BaseService<typeof Entity> {
  constructor() {
    super(Entity)
  }

  async createFolders(displayName: string, singularName: string): Promise<boolean> {
    const insideFolders = ['controllers', 'repositories', 'schemas', 'services', 'types']
    const folderCreationResult: boolean[] = []
    try {
      await fs.promises.mkdir(`app/features/admin/${singularName}`)
      console.log(`Directory ${singularName} created successfully.`)
      folderCreationResult.push(true)
    } catch (error) {
      console.error(error)
      folderCreationResult.push(false)
    }

    insideFolders.forEach(async (insideFolder) => {
      try {
        await fs.promises.mkdir(`app/features/admin/${singularName}/${insideFolder}`)
        console.log(`${displayName} ${insideFolder} folder created successfully.`)
        folderCreationResult.push(true)
      } catch (error) {
        console.error(error)
        folderCreationResult.push(false)
      }
    })

    return folderCreationResult.every((result) => result === true)
  }

  async createRoutesFile(singularName: string, pluralName: string): Promise<boolean> {
    const routesContent = createRouteFileTemplate(singularName, pluralName)
    let routeCreationResult = false
    try {
      await fs.promises.writeFile(`app/features/admin/${singularName}/routes.ts`, routesContent)
      console.log('Routes file created and data written successfully.')
      routeCreationResult = true
    } catch (error) {
      console.log(error)
      routeCreationResult = false
    }
    return routeCreationResult
  }

  async createFileOption(entity: Entity, option: string): Promise<string> {
    const fileTypes = ['controller', 'service', 'repository']
    let reports = ''
    const entityNameInFile = option === 'list' ? entity.pluralName : entity.singularName
    try {
      fileTypes.forEach(async (type) => {
        const content = createFileContent(entity, option, type)
        await fs.promises.writeFile(
          `app/features/admin/${entity.displayName}/${pluralize(
            type,
            5
          )}/${option}-${entityNameInFile}-${type}.ts`,
          content
        )
        if (type === 'service') {
          execSync(
            `yarn prettier app/features/admin/${entity.displayName}/${pluralize(
              type,
              5
            )}/${option}-${entityNameInFile}-${type}.ts --write`
          )
        }
        console.log(
          `${pluralize(
            entity.displayName,
            5
          )} ${option} ${type} file created and data written successfully.`
        )
        reports =
          reports +
          `${pluralize(
            entity.displayName,
            5
          )} ${option} ${type} file created and data written successfully. \n`
      })
    } catch (error) {
      console.log(error)
      reports = reports + `${error.message} \n`
    }
    return reports
  }

  async createModel(entity: CreateEntityInput): Promise<boolean> {
    const modelContent = createModelTemplate(entity as Entity)
    let modelCreationResult = false
    try {
      await fs.promises.writeFile(`app/models/${entity.singularName}-model.ts`, modelContent)
      execSync(`yarn prettier app/models/${entity.singularName}-model.ts --write`)
      console.log('Model file created and data written successfully.')
      modelCreationResult = true
    } catch (error) {
      console.log(error)
      modelCreationResult = true
    }
    return modelCreationResult
  }

  async createSchemaModel(entity: CreateEntityInput): Promise<boolean> {
    const schemaContent = createSchemaModelTemplate(entity as Entity)
    let schemaModelCreationResult = false
    try {
      await fs.promises.writeFile(
        `app/models/schemas/${entity.singularName}-model-schema.yml`,
        schemaContent
      )
      // execSync(`yarn prettier app/models/${entity.singularName}-model.ts --write`)
      console.log('Schema model file created and data written successfully.')
      schemaModelCreationResult = true
    } catch (error) {
      console.log(error)
      schemaModelCreationResult = false
    }
    return schemaModelCreationResult
  }

  async createTypes(entity: CreateEntityInput): Promise<boolean> {
    const createTypeContent = generateTypesTemplate(entity as Entity, false)
    const updateTypeContent = generateTypesTemplate(entity as Entity, true)
    const listTypeContent = generateListTypesTemplate(entity.pluralName)

    const fileTypes = ['create', 'update', 'list']
    const results: boolean[] = []

    try {
      fileTypes.forEach(async (type) => {
        const content =
          type === 'create'
            ? createTypeContent
            : type === 'update'
            ? updateTypeContent
            : listTypeContent
        const entityNameInFile = type === 'list' ? entity.pluralName : entity.singularName
        await fs.promises.writeFile(
          `app/features/admin/${entity.displayName}/types/${type}-${entityNameInFile}-types.ts`,
          content
        )
        console.log(
          `${pluralize(
            entity.displayName,
            5
          )} ${type} type file created and data written successfully.`
        )
        results.push(true)
      })
    } catch (error) {
      console.log(error)
      results.push(false)
    }
    return results.every((result) => result === true)
  }

  async createFiles(entity: Entity): Promise<boolean> {
    const results: boolean[] = []
    try {
      const fileOptions = ['create', 'delete', 'find', 'list', 'update']
      fileOptions.forEach(async (option) => {
        await this.createFileOption(entity, option)
        results.push(true)
      })
    } catch (error) {
      console.log(error)
      results.push(false)
    }
    return results.every((result) => result === true)
  }

  async createSchemaFileOption(entity: Entity, option: string): Promise<string> {
    const schemaTypes = ['adonis', 'swagger']
    let reports = ''
    const entityNameInFile = option === 'list' ? entity.pluralName : entity.singularName
    try {
      schemaTypes.forEach(async (type) => {
        const content = createSchemaContent(entity, option, type)
        if (content === '') return
        const schemaFileName =
          `${option}-${entityNameInFile}-` + `${type === 'adonis' ? `schema.ts` : `schemas.yml`}`
        await fs.promises.writeFile(
          `app/features/admin/${entity.singularName}/schemas/` + schemaFileName,
          content
        )
        console.log(
          `${pluralize(
            entity.displayName,
            5
          )} ${option} ${type} schema file created and data written successfully.`
        )
        reports =
          reports +
          `${pluralize(
            entity.displayName,
            5
          )} ${option} ${type} schema file created and data written successfully. \n`
      })
    } catch (error) {
      console.log(error)
      reports = reports + `${error.message} \n`
    }
    return reports
  }

  async createSchemaFiles(entity: Entity): Promise<boolean> {
    const results: boolean[] = []
    try {
      const fileOptions = ['create', 'delete', 'find', 'list', 'update']
      fileOptions.forEach(async (option) => {
        await this.createSchemaFileOption(entity, option)
        results.push(true)
      })
    } catch (error) {
      console.log(error)
      results.push(false)
    }
    return results.every((result) => result === true)
  }

  async createMigrationFile(entity: CreateEntityInput): Promise<boolean> {
    const migrationContent = createMigrationTemplate(entity as Entity)
    let migrationCreationResult = false
    try {
      await fs.promises.writeFile(
        `database/migrations/${DateTime.now().toUnixInteger()}_${entity.pluralName}.ts`,
        migrationContent
      )
      console.log('Migration file created and data written successfully.')
      migrationCreationResult = true
    } catch (error) {
      console.log(error)
      migrationCreationResult = false
    }
    return migrationCreationResult
  }

  async createSchemaFolder(entityName: string) {
    try {
      await fs.promises.mkdir(`app/features/admin/${entityName}/schemas`)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  runMigrationInSeparateTerminal() {
    const migrationProcess = spawn('node', ['ace', 'migration:run'], {
      stdio: 'inherit',
      shell: true,
      detached: true,
    })

    migrationProcess.on('error', (err) => {
      console.error('Error running migration:', err)
    })

    migrationProcess.unref()
  }

  public async execute(input: CreateEntityInput): Promise<string> {
    const { displayName, singularName, pluralName } = input

    let folderCreationSuccess = false
    let routesCreationSuccess = false
    let modelCreationSuccess = false
    let modelSchemaCreationSuccess = false
    let typesCreationSuccess = false
    let layerFilesCreationSuccess = false
    let schemaFilesCreationSuccess = false
    let migrationFilesCreationSuccess = false

    const response = await Promise.all([
      (folderCreationSuccess = await this.createFolders(displayName, singularName)),
      (routesCreationSuccess = await this.createRoutesFile(singularName, pluralName)),
      (modelCreationSuccess = await this.createModel(input)),
      (modelSchemaCreationSuccess = await this.createSchemaModel(input)),
      (typesCreationSuccess = await this.createTypes(input)),
      (layerFilesCreationSuccess = await this.createFiles(input as Entity)),
      (schemaFilesCreationSuccess = await this.createSchemaFiles(input as Entity)),
      (migrationFilesCreationSuccess = await this.createMigrationFile(input)),
    ])

    if (response.every((check) => check)) {
      await this.runMigrationInSeparateTerminal()

      console.log('Entity created successfully.')
      return 'Entity created successfully.'
    } else {
      console.error('Error creating entity')
      return 'Error creating entity'
    }
  }
}
