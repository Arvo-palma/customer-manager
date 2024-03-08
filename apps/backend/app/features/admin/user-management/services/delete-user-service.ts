import { inject } from '@adonisjs/core/build/standalone'
import BaseService from 'app/features/base/services/base-service'
import User from 'app/models/user-model'
import DeleteUserRepository from '../repositories/delete-user-repository'

@inject([DeleteUserRepository])
export default class DeleteUserService extends BaseService<typeof User> {
  constructor(protected repo: DeleteUserRepository) {
    super(User)
  }

  public async execute(id: string): Promise<boolean> {
    return this.delete(id)
  }
}
