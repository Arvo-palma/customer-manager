import Database from '@ioc:Adonis/Lucid/Database'
import BaseRepository from 'app/features/base/repositories/base-repository'
import { camelToSnakeCase } from 'app/helpers/camel-to-snake-case'
import Entity from 'app/models/entity-model'
import path from 'path'
import pluralize from 'pluralize'
import { rawTablesData } from '../../helpers/format-tables-definitions'

export default class FindEntityRepository extends BaseRepository<typeof Entity> {
  constructor() {
    super(Entity)
  }

  public async getOne(entityName: string): Promise<rawTablesData> {
    const tableName = pluralize(camelToSnakeCase(entityName), 5).replace('_', '')
    try {
      let tableDefinitions: rawTablesData = {}

      const columns = await Database.rawQuery(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = '${tableName}'
    `)

      tableDefinitions[tableName] = columns.rows.map((row) => ({
        column_name: row.column_name,
        data_type: row.data_type,
        is_nullable: row.is_nullable,
        column_default: row.column_default,
      }))

      const modelName = `${pluralize(tableName, 1)}-model`
      const modelPath = path.join(__dirname, '..', '..', '..', '..', 'models', modelName)
      const modelData = await import(modelPath)
      const tableNameFroMData = modelData.default['table']
      const definitions = tableDefinitions[tableNameFroMData]
      let completeTableDefinitions = {}

      if (!!tableNameFroMData && !!definitions) {
        completeTableDefinitions[tableNameFroMData] = []
        // Insert columns definitions in response:
        modelData.default['$columnsDefinitions'].forEach((column) => {
          const exists = definitions.some(
            (attribute) => attribute.column_name === column.columnName
          )
          if (exists) {
            let rightAttr = definitions.find(
              (attribute) => attribute.column_name === column.columnName
            )
            rightAttr = { ...rightAttr, columns_definitions: column }
            completeTableDefinitions[tableNameFroMData].push(rightAttr)
          }
        })
        // Insert relation fields info in response:
        modelData.default['$relationsDefinitions'].forEach((relation) => {
          const exists = definitions.some(
            (attribute) => attribute.column_name === relation.relationName
          )
          if (!exists) {
            const relationAttr = {
              column_name: relation.relationName,
              is_nullable: 'NO',
              target: relation.serializeAs,
              data_type: 'relation',
              relation_type: relation.type,
            }
            completeTableDefinitions[tableNameFroMData].push(relationAttr)
          }
        })

        // Insert enum fields info in response:
        Object.keys(modelData)
          .filter((key) => key !== 'default')
          .forEach((type) => {
            const typeToAttribute = type.toLowerCase().split('type')[0]
            const attribute = definitions.find(
              (attribute) => attribute.column_name === typeToAttribute
            )

            if (!!attribute) {
              const enumAttr = {
                column_name: attribute.column_name,
                is_nullable: attribute.is_nullable,
                data_type: 'enumeration',
                column_default: attribute.column_default,
                columns_definitions: attribute.columns_definitions,
                enum: [...Object.values(modelData[type])],
              }

              const specificAttribute = completeTableDefinitions[tableNameFroMData].find(
                (attribute) => attribute.column_name === typeToAttribute
              )

              completeTableDefinitions[tableNameFroMData][
                completeTableDefinitions[tableNameFroMData].indexOf(specificAttribute)
              ] = enumAttr
            }
          })

        tableDefinitions = completeTableDefinitions
      }

      return tableDefinitions
    } catch (error) {
      console.error('Error fetching table and column definitions', error)
      throw error
    }
  }
}
