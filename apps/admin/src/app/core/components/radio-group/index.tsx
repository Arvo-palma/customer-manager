import { FormElement } from "../../types/theme-type"
import RadioGroupItem, { OptionType } from "./radio-group-item"

interface RadioGroupProps<T>
  extends Omit<FormElement<T>, "placeholder" | "onChange"> {
  onChange: (value: any) => void
  options: Array<OptionType<T>>
  direction?: "horizontal" | "vertical"
}

const RadioGroup = <T extends unknown>({
  id,
  testId,
  value,
  onChange,
  options = [],
  direction = "horizontal",
  label,
  error
}: RadioGroupProps<T>) => {
  return (
    <div
      id={id}
      {...{ "data-test-id": testId }}
      className="flex flex-col gap-1"
    >
      {label && <label className="pb-1 text-md text-gray-700">{label}</label>}
      <div className={containerClassesMap[direction]}>
        {options?.map?.((option, index) => {
          const isChecked = value === option?.value
          return (
            <RadioGroupItem
              key={index}
              option={option}
              onChange={onChange}
              error={error}
              checked={isChecked}
            />
          )
        })}
      </div>
      {Boolean(error) && (
        <div className="flex flex-col h-0">
          <span className="text-danger-400 text-xs">*{error}</span>
        </div>
      )}
    </div>
  )
}

export default RadioGroup

const containerClassesMap = {
  horizontal: "gap-sm flex flex-row",
  vertical: "flex flex-col"
}
