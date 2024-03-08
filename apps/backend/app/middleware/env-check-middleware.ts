import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EnvCheck {
  public async handle({}: HttpContextContract, next: () => Promise<void>) {
    const environment = process.env.NODE_ENV
    if (environment !== 'local') {
      throw new Exception('Invalid environment')
    }
    await next()
  }
}
