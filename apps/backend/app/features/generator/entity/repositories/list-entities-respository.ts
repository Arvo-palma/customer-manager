import Database from '@ioc:Adonis/Lucid/Database'
import BaseRepository from 'app/features/base/repositories/base-repository'
import Entity from 'app/models/entity-model'
import { readdirSync } from 'fs'
import path from 'path'
import { rawTablesData } from '../../helpers/format-tables-definitions'
import { ListEntitiesInput } from '../types/list-entities-types'

export default class ListEntitiesRepository extends BaseRepository<typeof Entity> {
  constructor() {
    super(Entity)
  }

  public async search(props: ListEntitiesInput): Promise<rawTablesData> {
    try {
      const tables = await Database.rawQuery(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `)

      let tableDefinitions: rawTablesData = {}

      for (const table of tables.rows) {
        const tableName = table.table_name
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
      }

      const modelsPath = path.join(__dirname, '..', '..', '..', '..', 'models')
      const models = readdirSync(modelsPath)

      let completeTableDefinitions = {}

      models.forEach(async (model) => {
        const isReallyAModel = !!model && model !== 'schemas'
        if (isReallyAModel) {
          const modelFile = path.join(modelsPath, model)
          const modelData = await import(modelFile)
          try {
            const tableNameFroMData = modelData.default['table']
            const definitions = tableDefinitions[tableNameFroMData]
            if (!!tableNameFroMData && !!definitions) {
              completeTableDefinitions[tableNameFroMData] = []
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
            }
            tableDefinitions = completeTableDefinitions
          } catch (error) {}
        }
      })

      return tableDefinitions
    } catch (error) {
      console.error('Error fetching table and column definitions', error)
      throw error
    }
  }
}
