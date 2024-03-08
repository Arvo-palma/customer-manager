import PaginateType from 'app/features/base/types/paginate-type'

export type ListUsersInput = {
  criteria?: string
} & PaginateType
