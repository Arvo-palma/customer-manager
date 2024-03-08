import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import FindEntityService from '../services/find-entity-service'

@inject([FindEntityService])
export default class FindEntityController {
  constructor(private service: FindEntityService) {}
  /**
   * @swagger
   * /generator/entity/{entityName}:
   *   get:
   *     tags:
   *       - '[Generator] Entity Management'
   *     summary: Find a existing entity
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns the Entity object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/FindEntityOutput'
   *       404:
   *         description: Entity not found
   *       401:
   *         description: Unauthorized
   *     parameters:
   *       - $ref: '#/components/parameters/FindEntityName'
   */
  public async show(ctx: HttpContextContract) {
    const { entityName } = await ctx.request.validate({
      schema: schema.create({
        entityName: schema.string({ trim: true }),
      }),
      data: {
        entityName: ctx.request.param('entityName'),
      },
    })
    try {
      const foundEntity = await this.service.execute(entityName)
      if (!foundEntity) {
        ctx.response.status(404)
        ctx.response.send({ message: 'Entity not found' })
        return
      }
      ctx.response.status(200)
      ctx.response.send(foundEntity)
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
