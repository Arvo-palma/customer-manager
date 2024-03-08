import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'

export const listServiceFileTemplate = (
  displayName: string,
  singularName: string,
  pluralName: string
) => {
  const capitalizedPluralName = capitalizeFirstLetter(pluralName)
  return `import { inject } from '@adonisjs/core/build/standalone'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import BaseService from 'app/features/base/services/base-service'
import ${displayName} from 'app/models/${singularName}-model'
import List${capitalizedPluralName}Repository from '../repositories/list-${pluralName}-repository'
import { List${capitalizedPluralName}Input } from '../types/list-${pluralName}-types'

@inject([List${capitalizedPluralName}Repository])
export default class List${capitalizedPluralName}Service extends BaseService<typeof ${displayName}> {
  constructor(protected repo: List${capitalizedPluralName}Repository) {
    super(${displayName})
  }

  public async execute(props: List${capitalizedPluralName}Input): Promise<ModelPaginatorContract<${displayName}>> {
    return this.repo.search(props)
  }
}
`
}
