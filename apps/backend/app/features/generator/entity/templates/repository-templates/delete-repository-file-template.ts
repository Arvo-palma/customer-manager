export const deleteRepositoryFileTemplate = (
  displayName: string,
  singularName: string
) => `import BaseRepository from 'app/features/base/repositories/base-repository'
import ${displayName} from 'app/models/${singularName}-model'

export default class Delete${displayName}Repository extends BaseRepository<typeof ${displayName}> {
  constructor() {
    super(${displayName})
  }
}
`
