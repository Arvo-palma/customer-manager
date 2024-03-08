import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'

export const listRepositoryFileTemplate = (
  displayName: string,
  singularName: string,
  pluralName: string
) => `import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import BaseRepository from 'app/features/base/repositories/base-repository'
import normalizeString from 'app/helpers/normalize-string'
import ${displayName} from 'app/models/${singularName}-model'
import { List${capitalizeFirstLetter(pluralName)}Input } from '../types/list-${pluralName}-types'

export default class List${capitalizeFirstLetter(
  pluralName
)}Repository extends BaseRepository<typeof ${displayName}> {
  constructor() {
    super(${displayName})
  }

  public async search(props: List${capitalizeFirstLetter(
    pluralName
  )}Input): Promise<ModelPaginatorContract<${displayName}>> {
    const { page, limit, criteria } = props
    const query = ${displayName}.query()

    // if (criteria)
    //   query.where((query) => {
    //     query.whereRaw(LOWER(name) LIKE '%normalizeString(criteria)%')
    //   })

    return query.paginate(page, limit)
  }
}
`
