import { handleError } from "@/app/core/helpers/handle-error"
import axios from "axios"
import { UserFormType } from "../new/page"

export const USERS_PATH = "users"

export const createUser = async (user: UserFormType) => {
  const options = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/admin/user`,
    data: user
  }
  try {
    const { data } = await axios.request(options)
    return data
  } catch (error) {
    throw handleError(error)
  }
}
