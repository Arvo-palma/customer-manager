import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import DeleteUserService from '../services/delete-user-service'

@inject([DeleteUserService])
export default class DeleteUserController {
  constructor(private service: DeleteUserService) {}
  /**
   * @swagger
   * /admin/user/{userId}:
   *   delete:
   *     tags:
   *       - '[Admin] User Management'
   *     summary: Delete a existing User
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns success message
   *       404:
   *         description: User not found
   *       401:
   *         description: Unauthorized
   *     parameters:
   *       - $ref: '#/components/parameters/DeleteUserId'
   */
  public async destroy(ctx: HttpContextContract) {
    const { id } = await ctx.request.validate({
      schema: schema.create({
        id: schema.string({ trim: true }, [rules.uuid({ version: 4 })]),
      }),
      data: {
        id: ctx.request.param('userId'),
      },
    })
    try {
      const deleteUser = await this.service.execute(id)
      if (!deleteUser) {
        ctx.response.status(404)
        ctx.response.send({ message: 'User not found' })
        return
      }
      ctx.response.status(200)
      ctx.response.send({ message: 'success' })
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
