import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateUserSchema } from '../schemas/update-user-schema'
import UpdateUserService from '../services/update-user-service'
@inject([UpdateUserService])
export default class UpdateUserController {
  constructor(private service: UpdateUserService) {}

  /**
   * @swagger
   * /admin/user/{userId}:
   *   put:
   *     tags:
   *       - '[Admin] User Management'
   *     summary: Update a existing user
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns the updated user object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UpdateUserOutput'
   *       401:
   *         description: Unauthorized
   *     requestBody:
   *       description: Put User object
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserInput'
   *     parameters:
   *       - $ref: '#/components/parameters/UpdateUserId'
   */
  public async update(ctx: HttpContextContract) {
    const params = await ctx.request.validate({
      schema: UpdateUserSchema,
      data: {
        id: ctx.request.param('userId'),
        ...ctx.request.all(),
      },
    })
    try {
      const updatedUser = await this.service.execute({
        id: ctx.request.param('userId'),
        ...params,
      })
      if (!updatedUser) {
        ctx.response.status(500)
        ctx.response.send({ message: 'User could not be created' })
        return
      }
      ctx.response.status(200)
      ctx.response.send(updatedUser)
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
