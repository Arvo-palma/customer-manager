import { inject } from '@adonisjs/core/build/standalone'
import BaseService from 'app/features/base/services/base-service'
import Entity from 'app/models/entity-model'
import { formatTablesAndColumns } from '../../helpers/format-tables-definitions'
import ListEntitiesRepository from '../repositories/list-entities-respository'
import { ListEntitiesInput } from '../types/list-entities-types'

@inject([ListEntitiesRepository])
export default class ListEntitiesService extends BaseService<typeof Entity> {
  constructor(protected repo: ListEntitiesRepository) {
    super(Entity)
  }

  public async execute(props: ListEntitiesInput): Promise<any> {
    const rawtablesAndColumns = await this.repo.search(props)

    const treatedTablesAndColumns = await formatTablesAndColumns(rawtablesAndColumns)

    const systemEntities = ['AdonisSchema', 'AdonisSchemaVersion', 'AdminToken']
    const filteredEntities = treatedTablesAndColumns.filter(
      (entity) => !systemEntities.includes(entity.displayName)
    )

    return filteredEntities
  }
}
