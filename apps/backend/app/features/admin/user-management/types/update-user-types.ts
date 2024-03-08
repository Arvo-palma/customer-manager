import { RoleType } from 'app/models/user-model'

type UpdateUserInput = {
  id: string
  name: string
  email: string
  role: RoleType
  avatar: string
  password: string
  temporaryPassword: string
}

export default UpdateUserInput
