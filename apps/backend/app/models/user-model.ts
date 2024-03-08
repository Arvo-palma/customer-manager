import Hash from '@ioc:Adonis/Core/Hash'
import { beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel } from './base-model'

export enum RoleType {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  USER = 'USER',
}

export default class User extends BaseModel {
  @column()
  public name: string

  @column()
  public email: string

  @column()
  public role: RoleType

  @column()
  public avatar: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public temporaryPassword: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
