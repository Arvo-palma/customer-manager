export const findControllerFileTemplate = (displayName: string, singularName: string) =>
  `import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Find${displayName}Service from '../services/find-${singularName}-service'

@inject([Find${displayName}Service])
export default class Find${displayName}Controller {
  constructor(private service: Find${displayName}Service) {}
  /**
   * @hidden
   * /admin/${singularName}/{${singularName}Id}:
   *   get:
   *     tags:
   *       - '[Admin] ${displayName} Management'
   *     summary: Find a existing ${singularName}
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns the ${displayName} object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Find${displayName}Output'
   *       404:
   *         description: ${displayName} not found
   *       401:
   *         description: Unauthorized
   *     parameters:
   *       - $ref: '#/components/parameters/Find${displayName}Id'
   */
  public async show(ctx: HttpContextContract) {
    const { id } = await ctx.request.validate({
      schema: schema.create({
        id: schema.string({ trim: true }, [rules.uuid({ version: 4 })]),
      }),
      data: {
        id: ctx.request.param('${singularName}Id'),
      },
    })
    try {
      const found${displayName} = await this.service.execute(id)
      if (!found${displayName}) {
        ctx.response.status(404)
        ctx.response.send({ message: '${displayName} not found' })
        return
      }
      ctx.response.status(200)
      ctx.response.send(found${displayName})
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
`.replace('@hidden', '@swagger')
