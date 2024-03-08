export const deleteControllerFileTemplate = (displayName: string, singularName: string) =>
  `import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Delete${displayName}Service from '../services/delete-${singularName}-service'

@inject([Delete${displayName}Service])
export default class Delete${displayName}Controller {
  constructor(private service: Delete${displayName}Service) {}
  /**
   * @hidden
   * /admin/${singularName}/{${singularName}Id}:
   *   delete:
   *     tags:
   *       - '[Admin] ${displayName} Management'
   *     summary: Delete a existing ${displayName}
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns success message
   *       404:
   *         description: ${displayName} not found
   *       401:
   *         description: Unauthorized
   *     parameters:
   *       - $ref: '#/components/parameters/Delete${displayName}Id'
   */
  public async destroy(ctx: HttpContextContract) {
    const { id } = await ctx.request.validate({
      schema: schema.create({
        id: schema.string({ trim: true }, [rules.uuid({ version: 4 })]),
      }),
      data: {
        id: ctx.request.param('${singularName}Id'),
      },
    })
    try {
      const delete${displayName} = await this.service.execute(id)
      if (!delete${displayName}) {
        ctx.response.status(404)
        ctx.response.send({ message: '${displayName} not found' })
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
`.replace('@hidden', '@swagger')
