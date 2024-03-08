import Database, {
  SimplePaginatorContract,
  TransactionClientContract,
} from '@ioc:Adonis/Lucid/Database'
import { LucidRow, ModelAttributes, ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import CustomHttpException from 'app/exceptions/custom-http-exceptions'
import { BaseModel } from 'app/models/base-model'
import { DateTime } from 'luxon'
import PaginateType from '../types/paginate-type'

export default class BaseRepository<Model extends typeof BaseModel> {
  protected trx: TransactionClientContract | undefined
  constructor(private model: Model) {}

  public async create(
    props: Partial<ModelAttributes<InstanceType<Model>>>
  ): Promise<InstanceType<Model>> {
    return this.model.create(props, { client: this.trx })
  }

  public async update(
    id: string,
    props: Partial<ModelAttributes<InstanceType<Model>>>
  ): Promise<InstanceType<Model> | null> {
    const row = await this.model.find(id)
    if (!row) return null
    row.merge(props)
    if (this.trx) {
      row.useTransaction(this.trx)
    }
    return row.save()
  }

  public async paginate(
    paginate: PaginateType,
    filters?: Record<string, any>
  ): Promise<
    InstanceType<Model> extends LucidRow
      ? ModelPaginatorContract<InstanceType<Model>>
      : SimplePaginatorContract<InstanceType<Model>>
  > {
    const { page, limit } = paginate
    const query = this.model.query({ client: this.trx })
    if (filters) {
      Object.keys(filters).map((key) => {
        query.where(key, filters[key])
      })
    }
    return query.paginate(page, limit)
  }

  public async find(id: string): Promise<InstanceType<Model> | null> {
    return this.model.find(id, { client: this.trx })
  }

  public async findBy(key: string, value: any): Promise<InstanceType<Model> | null> {
    return this.model.findBy(key, value, { client: this.trx })
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const row = await this.find(id)
      if (!row) return false
      row.deletedAt = DateTime.now()
      if (this.trx) {
        row.useTransaction(this.trx)
      }
      await row.save()
    } catch (error) {
      //TODO - implements Sentry handle
      throw new CustomHttpException(500, 'Data could not be deleted')
    }
    return true
  }

  public async startTransaction(): Promise<void> {
    this.trx = await Database.transaction()
  }

  public async commitTransaction(): Promise<void> {
    if (this.trx) {
      await this.trx.commit()
      this.trx = undefined
    }
  }

  public async rollbackTransaction(): Promise<void> {
    if (this.trx) {
      await this.trx.rollback()
      this.trx = undefined
    }
  }
}
