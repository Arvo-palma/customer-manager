import { handleError } from "@/app/core/helpers/handle-error"
import { UserFormType } from "../new/page"

export const USERS_PATH = "users"

export const createUser = async (user: UserFormType) => {
  try {
    return user
  } catch (error) {
    throw handleError(error)
  }
}
