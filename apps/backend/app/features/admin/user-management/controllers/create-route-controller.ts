import { inject } from '@adonisjs/core/build/standalone'
import { CreateRouteSchema } from '../schemas/create-route-schema'
import CreateRouteService from '../services/get-route-service'

@inject([CreateRouteService])
export default class CreateRouteController {
  constructor(private service: CreateRouteService) {}
  /**
   * @swagger
   * /admin/user/route:
   *   post:
   *     tags:
   *       - '[Admin] User Management'
   *     summary: Create new route
   *     produces:
   *       - application/json
   *     responses:
   *       201:
   *         description: Returns the User list by route
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateRouteOutput'
   *       401:
   *         description: Unauthorized
   *     requestBody:
   *       description: User id list to route
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateRouteInput'
   */
  public async index(ctx) {
    try {
      const usersIds = await ctx.request.validate({
        schema: CreateRouteSchema,
      })
      const usersRoute = await this.service.execute(usersIds)
      if (!usersRoute) {
        ctx.response.status(500)
        ctx.response.send({ message: 'Route could not be fetched' })
        return
      }
      ctx.response.status(200)
      ctx.response.send(usersRoute)
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
