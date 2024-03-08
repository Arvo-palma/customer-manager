import BaseRepository from 'app/features/base/repositories/base-repository'
import User from 'app/models/user-model'

export default class DeleteUserRepository extends BaseRepository<typeof User> {
  constructor() {
    super(User)
  }
}
