import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import DeleteEntityService from '../services/delete-entity-service'

@inject([DeleteEntityService])
export default class DeleteEntityController {
  constructor(private service: DeleteEntityService) {}
  /**
   * @swagger
   * /generator/entity/{entityName}:
   *   delete:
   *     tags:
   *       - '[Generator] Entity Management'
   *     summary: Delete a existing Entity
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns success message
   *       404:
   *         description: Entity not found
   *       401:
   *         description: Unauthorized
   *     parameters:
   *       - $ref: '#/components/parameters/DeleteEntityName'
   */
  public async destroy(ctx: HttpContextContract) {
    const { entityName } = await ctx.request.validate({
      schema: schema.create({
        entityName: schema.string({ trim: true }),
      }),
      data: {
        entityName: ctx.request.param('entityName'),
      },
    })
    try {
      const deleteEntity = await this.service.execute(entityName)
      if (!deleteEntity) {
        ctx.response.status(404)
        ctx.response.send({ message: 'Entity not found' })
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
