import { inject } from '@adonisjs/core/build/standalone'
import CustomHttpException from 'app/exceptions/custom-http-exceptions'
import BaseService from 'app/features/base/services/base-service'
import User from 'app/models/user-model'
import UpdateUserRepository from '../repositories/update-user-repository'
import UpdateUserInput from '../types/update-user-types'

@inject([UpdateUserRepository])
export default class UpdateUserService extends BaseService<typeof User> {
  constructor(protected repo: UpdateUserRepository) {
    super(User)
  }

  public async execute(input: UpdateUserInput): Promise<User> {
    const { id, ...props } = input

    const user = await this.repo.find(id)
    if (!user) {
      throw new CustomHttpException(404, `User id '${id}' not found`)
    }

    let updatedUser: User | null
    try {
      updatedUser = await this.repo.update(id, props as User)
    } catch (error) {
      throw new CustomHttpException(400, error.message)
    }

    if (!updatedUser) {
      throw new CustomHttpException(500, 'Data received could not be processed')
    }
    return updatedUser
  }
}
