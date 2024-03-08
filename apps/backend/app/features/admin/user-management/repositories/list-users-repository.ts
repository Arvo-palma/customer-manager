import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import BaseRepository from 'app/features/base/repositories/base-repository'
import normalizeString from 'app/helpers/normalize-string'
import User from 'app/models/user-model'
import { ListUsersInput } from '../types/list-users-types'

export default class ListUsersRepository extends BaseRepository<typeof User> {
  constructor() {
    super(User)
  }

  public async search(props: ListUsersInput): Promise<ModelPaginatorContract<User>> {
    const { page, limit, criteria } = props
    const query = User.query()

    if (criteria)
      query.where((query) => {
        query.whereRaw(`LOWER(name) LIKE '%${normalizeString(criteria)}%'`)
      })

    return query.paginate(page, limit)
  }
}
