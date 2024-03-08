
import React from "react";
import { Flex, Column, Show } from ".";
import { classNameBuilder } from "../helpers/class-name-builder";

export type InputWrapperDirection = "column" | "row";
export interface InputWrapperProps {
  label?: string;
  error?: string;
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
  labelFor?: string;
  direction?: InputWrapperDirection;
}
export const InputWrapper: React.FC<InputWrapperProps> = (props) => {
  return (
    <Flex
      className={classNameBuilder(
        props.direction === "row"
          ? "flex-row gap-xs"
          : "flex-col items-start",
        props.className
      )}
    >
      <Show when={!!props.label}>
        <label
          htmlFor={props.labelFor}
          className={classNameBuilder(
            "text-sm mb-1",
            'after:ml-0.5 after:text-danger-300 after:content-["*"]',
            props.error ? "text-danger-400" : "text-gray-700",
            !props.required && "after:hidden"
          )}
        >
          {props.label}
        </label>
      </Show>
      <Column className="w-full">
        {props.children}
        <span className="h-0 mt-1 text-danger-400 text-xs">
          {props.error ? "*" + props.error : null}
        </span>
      </Column>
    </Flex>
  );
};

export default InputWrapper;
