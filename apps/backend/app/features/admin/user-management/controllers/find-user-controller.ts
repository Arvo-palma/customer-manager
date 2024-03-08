import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import FindUserService from '../services/find-user-service'

@inject([FindUserService])
export default class FindUserController {
  constructor(private service: FindUserService) {}
  /**
   * @swagger
   * /admin/user/{userId}:
   *   get:
   *     tags:
   *       - '[Admin] User Management'
   *     summary: Find a existing user
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns the User object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/FindUserOutput'
   *       404:
   *         description: User not found
   *       401:
   *         description: Unauthorized
   *     parameters:
   *       - $ref: '#/components/parameters/FindUserId'
   */
  public async show(ctx: HttpContextContract) {
    const { id } = await ctx.request.validate({
      schema: schema.create({
        id: schema.string({ trim: true }, [rules.uuid({ version: 4 })]),
      }),
      data: {
        id: ctx.request.param('userId'),
      },
    })
    try {
      const foundUser = await this.service.execute(id)
      if (!foundUser) {
        ctx.response.status(404)
        ctx.response.send({ message: 'User not found' })
        return
      }
      ctx.response.status(200)
      ctx.response.send(foundUser)
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
