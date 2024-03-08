import { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'
import { LucidRow, ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel } from 'app/models/base-model'
import BaseRepository from '../repositories/base-repository'
import PaginateType from '../types/paginate-type'

export default class BaseService<Model extends typeof BaseModel> {
  protected repo: BaseRepository<Model>
  constructor(private model: Model) {
    this.repo = new BaseRepository<Model>(this.model)
  }

  public async create(props: InstanceType<Model>): Promise<InstanceType<Model>> {
    return this.repo.create(props)
  }

  public async update(id: string, props: InstanceType<Model>): Promise<InstanceType<Model> | null> {
    return this.repo.update(id, props)
  }

  public async paginate(
    paginate: PaginateType,
    filters?: Record<string, any>[]
  ): Promise<
    InstanceType<Model> extends LucidRow
      ? ModelPaginatorContract<InstanceType<Model>>
      : SimplePaginatorContract<InstanceType<Model>>
  > {
    return this.repo.paginate(paginate, filters)
  }

  public async find(id: string): Promise<InstanceType<Model> | null> {
    return this.repo.find(id)
  }

  public async findBy(key: string, value: any): Promise<InstanceType<Model> | null> {
    return this.repo.findBy(key, value)
  }

  public async delete(id: string): Promise<boolean> {
    return this.repo.delete(id)
  }
}
