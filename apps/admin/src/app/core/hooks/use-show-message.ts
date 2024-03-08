import { toast, useToast } from "react-toastify"

type ToastFunctionType = (message?: string) => void
type UseToastType = () => {
  showSuccess: ToastFunctionType
  showError: ToastFunctionType
}

export const useShowMessage: UseToastType = () => {
  const showSuccess: ToastFunctionType = (message) => {
    if (message) toast.success(message)
  }
  const showError: ToastFunctionType = (message) => {
    if (message) toast.error(message)
  }
  return { showSuccess, showError }
}
