import { inject } from '@adonisjs/core/build/standalone'
import BaseService from 'app/features/base/services/base-service'
import User from 'app/models/user-model'
import FindUserRepository from '../repositories/find-user-repository'

@inject([FindUserRepository])
export default class FindUserService extends BaseService<typeof User> {
  constructor(protected repo: FindUserRepository) {
    super(User)
  }

  public async execute(id: string): Promise<User | null> {
    return this.find(id)
  }
}
