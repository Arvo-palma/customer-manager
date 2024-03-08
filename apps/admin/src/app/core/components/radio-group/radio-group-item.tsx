
import React from "react";
import { classNameBuilder } from "../../helpers/class-name-builder";

export interface OptionType<T> {
  id: string | number;
  value: T;
  label: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
}

interface RadioGroupItemProps<T> {
  option: OptionType<T>;
  onChange?: (value: any) => void;
  checked: boolean;
  error?: string;
}

const RadioGroupItem = <T,>({
  option,
  onChange,
  checked,
  error,
}: RadioGroupItemProps<T>) => {
  const id = Boolean(option?.id) ? String(option?.id) : undefined;
  return (
    <div className="flex flex-row items-center gap-xs">
      <input
        id={id}
        type="radio"
        disabled={option?.disabled}
        checked={checked}
        onChange={() => {
          onChange?.(option?.value);
        }}
        className={classNameBuilder(
          inputClasses,
          !option?.disabled && !error ? inputDefaultClasses : "",
          !option?.disabled && error ? inputErrorClasses : "",
          option?.disabled ? inputDisabledClasses : ""
        )}
      />
      <label
        htmlFor={id}
        className={classNameBuilder(
          labelClasses,
          !option?.disabled && !error ? labelDefaultClasses : "",
          !option?.disabled && error ? labelErrorClasses : "",
          option?.disabled ? labelDisabledClasses : "",
          checked ? "font-semibold" : "font-normal"
        )}
      >
        {option?.label}
      </label>
    </div>
  );
};

export default RadioGroupItem;

const inputClasses = "h-4 w-4";
const inputDisabledClasses = "border-gray-300";
const inputDefaultClasses =
  "border-gray-700 focus-visible:ring-1 focus-visible:ring-info-600";
const inputErrorClasses =
  "border-danger-600 focus-visible:ring-1 focus-visible:ring-danger-600";

const labelClasses = "text-base";
const labelDisabledClasses = "text-gray-300";
const labelDefaultClasses = "text-gray-700";
const labelErrorClasses = "text-danger-600";
