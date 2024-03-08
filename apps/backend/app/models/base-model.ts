import {
  BaseModel as Base,
  beforeCreate,
  beforeFetch,
  beforeFind,
  beforePaginate,
  column,
  ModelObject,
  ModelQueryBuilderContract,
  SnakeCaseNamingStrategy,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { v4 } from 'uuid'

export class BaseModel extends Base {
  public static selfAssignPrimaryKey = true
  public static namingStrategy = new SnakeCaseNamingStrategy()

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({})
  public deletedAt: DateTime

  @beforeCreate()
  public static assignUuid(model: BaseModel) {
    model.id = v4()
  }

  @beforeFind()
  @beforeFetch()
  public static withoutSoftDeletesFind(query: ModelQueryBuilderContract<typeof BaseModel>) {
    //@ts-ignore
    if (!query.isRelatedQuery && !query.isRelatedPreloadQuery) {
      query.whereNull('deletedAt')
    }
  }

  @beforePaginate()
  public static withoutSoftDeletesPaginate([countQuery, query]: [
    ModelQueryBuilderContract<typeof BaseModel>,
    ModelQueryBuilderContract<typeof BaseModel>
  ]) {
    // @ts-ignore
    if (!query.isRelatedQuery && !query.isRelatedPreloadQuery) {
      countQuery.whereNull('deletedAt')
      query.whereNull('deletedAt')
    }
  }

  public toObject(): ModelObject {
    for (let prop in this.$preloaded) {
      if (this.$preloaded[prop] === null) delete this.$preloaded[prop]
    }
    return super.toObject()
  }

  public serialize(): ModelObject {
    const Model: any = this.constructor
    Object.keys(this.$attributes).map((key) => {
      const column = Model.$getColumn(key)
      if (column.serializeAs === null) {
        delete this.$attributes[key]
      }
    })
    return this.toObject()
  }
}
