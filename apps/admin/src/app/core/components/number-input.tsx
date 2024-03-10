import React from "react"
import { InputWrapper, InputWrapperDirection } from "."
import { classNameBuilder } from "../helpers/class-name-builder"
import { UncontrolledFormElement } from "../types/theme-type"

export interface NumberInputProps extends UncontrolledFormElement {
  direction?: InputWrapperDirection
  className?: { input?: string; wrapper?: string }
}

export const NumberInput: React.FC<NumberInputProps> = React.forwardRef(
  (
    {
      id,
      testId,
      label,
      grow,
      direction,
      disabled,
      required,
      error,
      className,
      ...inputProps
    },
    ref
  ) => {
    return (
      <InputWrapper
        label={label}
        labelFor={id}
        className={className?.wrapper}
        error={error}
        direction={direction}
        required={required}
      >
        <input
          id={id}
          type="number"
          max={100}
          min={-100}
          {...{ "data-test-id": testId }}
          {...inputProps}
          disabled={disabled}
          required={required}
          className={classNameBuilder(
            "inline rounded outline-none m-0 py-0 px-3 min-h-[38px] placeholder-gray-300 transition border",
            !error && !disabled ? defaultClasses : "",
            !disabled && error ? errorClasses : "",
            disabled ? disabledClasses : "",
            className?.input
          )}
          ref={ref}
        />
      </InputWrapper>
    )
  }
)

const defaultClasses =
  "border-gray-300 text-gray-700 focus:border-primary-500 focus-visible:ring-1 focus:ring-primary-500"
const errorClasses =
  "text-danger-500 border-danger-300 focus:border-danger-500 focus-visible:ring-1 focus:ring-danger-500"
const disabledClasses =
  "text-gray-300 cursor-not-allowed bg-gray-50 border-gray-200"

NumberInput.displayName = "NumberInput"
export default NumberInput
