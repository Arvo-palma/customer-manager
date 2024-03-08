import { inject } from '@adonisjs/core/build/standalone'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import BaseService from 'app/features/base/services/base-service'
import { default as Category, default as User } from 'app/models/user-model'
import ListUsersRepository from '../repositories/list-users-repository'
import { ListUsersInput } from '../types/list-users-types'

@inject([ListUsersRepository])
export default class ListUsersService extends BaseService<typeof Category> {
  constructor(protected repo: ListUsersRepository) {
    super(Category)
  }

  public async execute(props: ListUsersInput): Promise<ModelPaginatorContract<User>> {
    return this.repo.search(props)
  }
}
