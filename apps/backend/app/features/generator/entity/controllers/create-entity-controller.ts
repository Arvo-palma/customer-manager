import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateEntitySchema } from '../schemas/create-entity-schema'
import CreateEntityService from '../services/create-entity-service'
@inject([CreateEntityService])
export default class CreateEntityController {
  constructor(private service: CreateEntityService) {}
  /**
   * @swagger
   * /generator/entity:
   *   post:
   *     tags:
   *       - '[Generator] Entity Management'
   *     summary: Create new entity
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       201:
   *         description: Returns the new Entity object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateEntityOutput'
   *       401:
   *         description: Unauthorized
   *     requestBody:
   *       description: Put Entity object
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateEntityInput'
   */
  public async store(ctx: HttpContextContract) {
    const params = await ctx.request.validate({
      schema: CreateEntitySchema,
    })

    try {
      const entity = await this.service.execute(params)
      if (!entity) {
        ctx.response.status(500)
        ctx.response.send({ message: 'Entity could not be created' })
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
