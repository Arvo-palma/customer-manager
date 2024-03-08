import { RoleType } from 'app/models/user-model'

type CreateUserInput = {
  name: string
  email: string
  role: RoleType
  avatar: string
  password: string
  temporaryPassword: string
}

export default CreateUserInput
