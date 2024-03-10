import { inject } from '@adonisjs/core/build/standalone'
import { ListUsersSchema } from '../schemas/list-users-schema'
import ListUsersService from '../services/list-users-service'

@inject([ListUsersService])
export default class ListUsersController {
  constructor(private service: ListUsersService) {}
  /**
   * @swagger
   * /admin/user:
   *   get:
   *     tags:
   *       - '[Admin] User Management'
   *     summary: List existing Users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns the list of user object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ListUsersOutput'
   *       401:
   *         description: Unauthorized
   *     parameters:
   *       - $ref: '#/components/parameters/Page'
   *       - $ref: '#/components/parameters/Limit'
   *       - $ref: '#/components/parameters/ListUsersCriteria'
   */
  public async index(ctx) {
    const paginate = await ctx.request.validate({
      schema: ListUsersSchema,
    })
    try {
      const listUsers = await this.service.execute(paginate)
      if (!listUsers) {
        ctx.response.status(500)
        ctx.response.send({ message: 'User could not be fetched' })
        return
      }
      ctx.response.status(200)
      ctx.response.send(listUsers)
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
