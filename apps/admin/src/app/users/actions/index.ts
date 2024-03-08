import { handleError } from "@/app/core/helpers/handle-error"
import { UsersFormType } from "../new/page"

export const BRANDS_PATH = "brands"

export const updateUsers = async (brands: UsersFormType) => {
  try {
    return brands
  } catch (error) {
    throw handleError(error)
  }
}
