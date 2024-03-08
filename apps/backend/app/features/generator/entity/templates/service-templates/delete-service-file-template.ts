export const deleteServiceFileTemplate = (
  displayName: string,
  singularName: string
) => `import { inject } from '@adonisjs/core/build/standalone'
import BaseService from 'app/features/base/services/base-service'
import ${displayName} from 'app/models/${singularName}-model'
import Delete${displayName}Repository from '../repositories/delete-${singularName}-repository'

@inject([Delete${displayName}Repository])
export default class Delete${displayName}Service extends BaseService<typeof ${displayName}> {
  constructor(protected repo: Delete${displayName}Repository) {
    super(${displayName})
  }

  public async execute(id: string): Promise<boolean> {
    return this.delete(id)
  }
}
`
