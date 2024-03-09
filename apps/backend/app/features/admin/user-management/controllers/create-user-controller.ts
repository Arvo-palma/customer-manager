import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateUserSchema } from '../schemas/create-user-schema'
import CreateUserService from '../services/create-user-service'
@inject([CreateUserService])
export default class CreateUserController {
  constructor(private service: CreateUserService) {}
  /**
   * @swagger
   * /admin/user:
   *   post:
   *     tags:
   *       - '[Admin] User Management'
   *     summary: Create new user
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       201:
   *         description: Returns the new User object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateUserOutput'
   *       401:
   *         description: Unauthorized
   *     requestBody:
   *       description: Put User object
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserInput'
   */
  public async store(ctx: HttpContextContract) {
    const params = await ctx.request.validate({
      schema: CreateUserSchema,
    })

    try {
      const user = await this.service.execute(params)
      if (!user) {
        ctx.response.status(500)
        ctx.response.send({ message: 'User could not be created' })
        return
      }
      ctx.response.status(201)
      ctx.response.send(user)
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
