export const findServiceFileTemplate = (
  displayName: string,
  singularName: string
) => `import { inject } from '@adonisjs/core/build/standalone'
import BaseService from 'app/features/base/services/base-service'
import ${displayName} from 'app/models/${singularName}-model'
import Find${displayName}Repository from '../repositories/find-${singularName}-repository'

@inject([Find${displayName}Repository])
export default class Find${displayName}Service extends BaseService<typeof ${displayName}> {
  constructor(protected repo: Find${displayName}Repository) {
    super(${displayName})
  }

  public async execute(id: string): Promise<${displayName} | null> {
    return this.find(id)
  }
}
`
