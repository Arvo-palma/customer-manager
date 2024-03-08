import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'

export const listControllerFileTemplate = (
  displayName: string,
  singularName: string,
  pluralName: string
) =>
  `import { inject } from '@adonisjs/core/build/standalone'
import { List${capitalizeFirstLetter(
    pluralName
  )}Schema } from '../schemas/list-${pluralName}-schema'
import List${capitalizeFirstLetter(pluralName)}Service from '../services/list-${pluralName}-service'

@inject([List${capitalizeFirstLetter(pluralName)}Service])
export default class List${capitalizeFirstLetter(pluralName)}Controller {
  constructor(private service: List${capitalizeFirstLetter(pluralName)}Service) {}
  /**
   * @hidden
   * /admin/${singularName}:
   *   get:
   *     tags:
   *       - '[Admin] ${displayName} Management'
   *     summary: List existing ${capitalizeFirstLetter(pluralName)}
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns the list of ${singularName} object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/List${capitalizeFirstLetter(pluralName)}Output'
   *       401:
   *         description: Unauthorized
   *     parameters:
   *       - $ref: '#/components/parameters/Page'
   *       - $ref: '#/components/parameters/Limit'
   *       - $ref: '#/components/parameters/List${capitalizeFirstLetter(pluralName)}Criteria'
   */
  public async index(ctx) {
    const paginate = await ctx.request.validate({
      schema: List${capitalizeFirstLetter(pluralName)}Schema,
    })
    try {
      const list${capitalizeFirstLetter(pluralName)} = await this.service.execute(paginate)
      if (!list${capitalizeFirstLetter(pluralName)}) {
        ctx.response.status(500)
        ctx.response.send({ message: '${displayName} could not be fetched' })
        return
      }
      ctx.response.status(200)
      ctx.response.send(list${capitalizeFirstLetter(pluralName)})
    } catch (error) {
      ctx.response.status(error.status || 500)
      ctx.response.send({ message: error.message })
      return
    }
  }
}
`.replace('@hidden', '@swagger')
