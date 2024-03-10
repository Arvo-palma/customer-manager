import { inject } from '@adonisjs/core/build/standalone'
import BaseService from 'app/features/base/services/base-service'
import { default as User } from 'app/models/user-model'
import { getRoute } from '../helpers/get-route'
import ListUsersRepository from '../repositories/list-users-repository'
import { CreateRouteInput } from '../types/create-route-types'

@inject([ListUsersRepository])
export default class CreateRouteService extends BaseService<typeof User> {
  constructor(protected repo: ListUsersRepository) {
    super(User)
  }

  public async execute(props: CreateRouteInput): Promise<User[]> {
    const users = await User.query().whereIn('id', props.users)
    const usersRoute = getRoute({ x: 0, y: 0 }, users)

    return usersRoute
  }
}
