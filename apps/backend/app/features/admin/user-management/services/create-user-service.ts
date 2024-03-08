import { inject } from '@adonisjs/core/build/standalone'
import BaseService from 'app/features/base/services/base-service'
import User from 'app/models/user-model'
import CreateUserRepository from '../repositories/create-user-repository'
import CreateUserInput from '../types/create-user-types'

@inject([CreateUserRepository])
export default class CreateUserService extends BaseService<typeof User> {
  constructor(protected repo: CreateUserRepository) {
    super(User)
  }

  public async execute(input: CreateUserInput): Promise<User> {
    const brand = await User.create(input)

    return brand
  }
}
