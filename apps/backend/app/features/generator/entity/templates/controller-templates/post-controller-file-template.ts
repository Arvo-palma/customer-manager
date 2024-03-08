export const postControllerFileTemplate = (displayName: string, singularName: string) =>
  `import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Create${displayName}Schema } from '../schemas/create-${singularName}-schema'
import Create${displayName}Service from '../services/create-${singularName}-service'
@inject([Create${displayName}Service])
export default class Create${displayName}Controller {
  constructor(private service: Create${displayName}Service) {}
  /**
   * @hidden
   * /admin/${singularName}:
   *   post:
   *     tags:
   *       - '[Admin] ${displayName} Management'
   *     summary: Create new ${singularName}
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       201:
   *         description: Returns the new ${displayName} object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Create${displayName}Output'
   *       401:
   *         description: Unauthorized
   *     requestBody:
   *       description: Put ${displayName} object
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Create${displayName}Input'
   */
  public async store(ctx: HttpContextContract) {
    const params = await ctx.request.validate({
      schema: Create${displayName}Schema,
    })

    try {
      const ${singularName} = await this.service.execute(params)
      if (!${singularName}) {
        ctx.response.status(500)
        ctx.response.send({ message: '${displayName} could not be created' })
        return
      }
      ctx.response.status(201)
      ctx.response.send(${singularName})
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
`.replace('@hidden', '@swagger')
