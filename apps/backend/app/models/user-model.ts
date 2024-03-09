import { column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel } from './base-model'

export default class User extends BaseModel {
  @column()
  public name: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public coordX: number

  @column()
  public coordY: number
}
