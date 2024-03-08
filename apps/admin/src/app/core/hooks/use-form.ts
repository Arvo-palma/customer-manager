import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  useForm as useHookForm
} from "react-hook-form"

export const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TTransformedValues extends FieldValues | undefined = undefined
>(
  props?: UseFormProps<TFieldValues, TContext>
) => {
  const values = useHookForm<TFieldValues, TContext, TTransformedValues>(props)
  const getError = (name: keyof TFieldValues) => {
    return values.formState.errors[name]?.message
  }
  values
  return { ...values, getError }
}
