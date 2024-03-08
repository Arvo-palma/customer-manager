import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateEntitySchema } from '../schemas/update-entity-schema'
import UpdateEntityService from '../services/update-entity-service'
@inject([UpdateEntityService])
export default class UpdateEntityController {
  constructor(private service: UpdateEntityService) {}
  /**
   * @swagger
   * /generator/entity:
   *   put:
   *     tags:
   *       - '[Generator] Entity Management'
   *     summary: Update entity
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       201:
   *         description: Returns the updated Entity object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UpdateEntityOutput'
   *       401:
   *         description: Unauthorized
   *     requestBody:
   *       description: Put Entity object
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateEntityInput'
   */
  public async update(ctx: HttpContextContract) {
    const params = await ctx.request.validate({
      schema: UpdateEntitySchema,
    })

    try {
      const entity = await this.service.execute(params)
      if (!entity) {
        ctx.response.status(500)
        ctx.response.send({ message: 'Entity could not be updated' })
        return
      }
      ctx.response.status(201)
      ctx.response.send(entity)
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
