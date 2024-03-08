import { inject } from '@adonisjs/core/build/standalone'
import BaseService from 'app/features/base/services/base-service'
import Entity from 'app/models/entity-model'
import { EntityDataType, formatTablesAndColumns } from '../../helpers/format-tables-definitions'
import FindEntityRepository from '../repositories/find-entity-repository'

@inject([FindEntityRepository])
export default class FindEntityService extends BaseService<typeof Entity> {
  constructor(protected repo: FindEntityRepository) {
    super(Entity)
  }

  public async execute(tableName: string): Promise<EntityDataType> {
    const tableData = await this.repo.getOne(tableName)
    const formattedData = formatTablesAndColumns(tableData)

    return formattedData
  }
}
