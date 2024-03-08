export const updateControllerFileTemplate = (displayName: string, singularName: string) =>
  `import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Update${displayName}Schema } from '../schemas/update-${singularName}-schema'
import Update${displayName}Service from '../services/update-${singularName}-service'
@inject([Update${displayName}Service])
export default class Update${displayName}Controller {
  constructor(private service: Update${displayName}Service) {}

  /**
   * @hidden
   * /admin/${singularName}/{${singularName}Id}:
   *   put:
   *     tags:
   *       - '[Admin] ${displayName} Management'
   *     summary: Update a existing ${singularName}
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns the updated ${singularName} object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Update${displayName}Output'
   *       401:
   *         description: Unauthorized
   *     requestBody:
   *       description: Put ${displayName} object
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Update${displayName}Input'
   *     parameters:
   *       - $ref: '#/components/parameters/Update${displayName}Id'
   */
  public async update(ctx: HttpContextContract) {
    const params = await ctx.request.validate({
      schema: Update${displayName}Schema,
      data: {
        id: ctx.request.param('${singularName}Id'),
        ...ctx.request.all(),
      },
    })
    try {
      const updated${displayName} = await this.service.execute({
        id: ctx.request.param('${singularName}Id'),
        ...params,
      })
      if (!updated${displayName}) {
        ctx.response.status(500)
        ctx.response.send({ message: '${displayName} could not be created' })
        return
      }
      ctx.response.status(200)
      ctx.response.send(updated${displayName})
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
`.replace('@hidden', '@swagger')
