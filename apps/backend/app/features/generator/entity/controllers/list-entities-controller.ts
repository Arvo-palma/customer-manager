import { inject } from '@adonisjs/core/build/standalone'
import { ListEntitiesSchema } from '../schemas/list-entities-schema'
import ListEntitiesService from '../services/list-entities-service'

@inject([ListEntitiesService])
export default class ListEntitiesController {
  constructor(private service: ListEntitiesService) {}
  /**
   * @swagger
   * /generator/entity:
   *   get:
   *     tags:
   *       - '[Generator] Entity Management'
   *     summary: List existing Entities
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns the list of entity object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ListEntitiesOutput'
   *       401:
   *         description: Unauthorized
   *     parameters:
   *       - $ref: '#/components/parameters/Page'
   *       - $ref: '#/components/parameters/Limit'
   *       - $ref: '#/components/parameters/ListEntitiesCriteria'
   */
  public async index(ctx) {
    const paginate = await ctx.request.validate({
      schema: ListEntitiesSchema,
    })
    try {
      const listEntities = await this.service.execute(paginate)
      if (!listEntities) {
        ctx.response.status(500)
        ctx.response.send({ message: 'Entity could not be fetched' })
        return
      }
      ctx.response.status(200)
      ctx.response.send(listEntities)
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
