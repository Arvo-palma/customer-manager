import Entity from 'app/models/entity-model'
import { migrationPropertiesTranslator } from '../../helpers/migration-properties-translator'

export const createMigrationTemplate = (entity: Entity): string => {
  const header = `import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = '${entity.pluralName}'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()\n`

  const { imports, properties } = migrationPropertiesTranslator(entity)

  const footer = `/**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true }).defaultTo(null)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}`

  return imports + header + properties + footer
}
