import React from "react"
import { classNameBuilder } from "../helpers/class-name-builder"
import { FormElement } from "../types/theme-type"

export interface CheckboxProps<T = any>
  extends Omit<FormElement<T>, "grow" | "placeholder"> {}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  testId,
  label,
  error,
  disabled,
  value,
  onChange,
  ...props
}) => {
  const errorMessage = error ? "* " + error : ""
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center gap-xs">
        <input
          id={id}
          {...{ ["data-test-id"]: testId }}
          type="checkbox"
          checked={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e?.target?.checked, e)}
          className={[
            checkboxBaseClasses,
            disabled ? disabledClasses : "",
            error ? errorClasses : primaryClasses
          ].join(" ")}
          {...props}
          style={{ outline: "none !important" }}
        />
        <label
          htmlFor={id}
          className={classNameBuilder(
            labelClasses,
            !error && !disabled ? labelDefaultClasses : "",
            error && !disabled ? labelErrorClasses : "",
            disabled ? labelDisabledClasses : ""
          )}
        >
          {label}
        </label>
      </div>
      {errorMessage && (
        <div className="flex flex-col h-0">
          <span className="text-xs text-danger-400">{errorMessage}</span>
        </div>
      )}
    </div>
  )
}

export default Checkbox

const checkboxBaseClasses = `
  appearance-none cursor-pointer
  m-0 border transition-all rounded-[4px] translate-y-[-0.075em]
  grid 
  place-items-center
  before:scale-0
  before:origin-bottom-left
  before:transition-[100ms_transform_ease-in-out]
  checked:before:scale-100
  bg-gray-100
  focus:ring-transparent
  focus-visible:ring-2
  focus-visible:ring-offset-1
  w-[1rem] h-[1rem] before:clip-path-checkbox before:w-[0.650rem] before:h-[0.650rem]
`
const primaryClasses = ` 
  checked:bg-primary-500 focus-visible:ring-primary-500/50 text-primary-500
  before:checkIcon-checkbox before:bg-gray-100
`
const errorClasses = `
  checked:bg-danger-500 focus-visible:ring-danger-500/50 focus-visible:ring-danger-500/50 text-danger-500
  before:checkIcon-checkbox before:bg-gray-100
  `
const disabledClasses = `
  cursor-not-allowed checked:bg-gray-200 text-gray-500
`

const labelClasses = "text-base mb-0.5"
const labelErrorClasses = "text-danger-500/80"
const labelDisabledClasses = "cursor-not-allowed text-gray-400"
const labelDefaultClasses = "cursor-pointer text-gray-700"
