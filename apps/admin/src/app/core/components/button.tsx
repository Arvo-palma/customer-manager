import React from "react"
import { Intent, Size } from "../types/theme-type"

export type ButtonVariant = "solid" | "outline" | "ghost"
export type ButtonShape = "pill" | "rounded"

export type ButtonProps = {
  label: string
  icon?: React.ReactNode
  intent?: Intent
  variant?: ButtonVariant
  pending?: boolean
  disabled?: boolean
  size?: Size
  type?: "submit" | "button"
  shape?: ButtonShape
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
  grow?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  intent = "secondary",
  variant = "solid",
  pending,
  disabled,
  size = "md",
  type,
  shape = "rounded",
  onClick,
  grow
}) => {
  return (
    <button
      tabIndex={pending || disabled ? -1 : undefined}
      type={type}
      disabled={disabled}
      onClick={(event) => {
        if (pending) {
          return
        }
        onClick?.(event)
      }}
      className={[
        "relative transition outline-none focus-visible:ring-4",
        grow ? "flex-1" : "",
        sizeClassMap[size],
        shapeClassMap[shape],
        variantClassMap[variant][intent] || "",
        !pending && !disabled ? enabledVariantClassMap[variant][intent] : "",
        pending ? pendingClasses : "",
        disabled ? disabledClasses : "",
        disabled ? variantDisabledClassMap[variant][intent] || "" : ""
      ].join(" ")}
    >
      {pending && (
        <div className="flex flex-col absolute inset-0 items-center justify-center">
          <Spinner
            className={["text-current", spinnerSizeMap[size]].join(" ")}
          />
        </div>
      )}
      <div
        className={`flex flex-row items-center justify-center gap-xs ${
          pending ? "invisible" : ""
        }`}
      >
        {icon}
        {label}
      </div>
    </button>
  )
}

export default Button

const sizeClassMap: Record<Size, string> = {
  xs: "px-2.5 py-1.5 min-h-[1.875rem]",
  sm: "px-3 py-2 min-h-[2.25rem]",
  md: "px-4 py-2.5 min-h-[2.5rem]",
  lg: "px-4 py-3 min-h-[2.938rem]",
  xl: "px-6 py-3.5 min-h-[3.188rem]"
}

const shapeClassMap: Record<ButtonShape, string> = {
  rounded: "rounded-md",
  pill: "rounded-[2rem]"
}

const enabledVariantClassMap: Record<ButtonVariant, Record<Intent, string>> = {
  solid: {
    primary:
      "hover:bg-primary-700 active:bg-primary-400 focus:ring-primary-300",
    secondary: "hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-500",
    danger: "hover:bg-danger-700 active:bg-danger-400 focus:ring-danger-300",
    accent: "hover:bg-accent-700 active:bg-accent-400 focus:ring-accent-300",
    info: "hover:bg-info-700 active:bg-info-400 focus:ring-info-300",
    success:
      "hover:bg-success-700 active:bg-success-400 focus:ring-success-300",
    warning: "hover:bg-warning-700 active:bg-warning-400 focus:ring-warning-300"
  },
  outline: {
    primary:
      "hover:bg-primary-100 active:bg-primary-300 focus:ring-primary-300",
    secondary:
      "hover:bg-secondary-300 active:bg-secondary-400 focus:ring-secondary-300",
    danger: "hover:bg-danger-100 active:bg-danger-200 focus:ring-danger-300",
    accent: "hover:bg-accent-200 active:bg-accent-100 focus:ring-accent-300",
    info: "hover:bg-info-100 active:bg-info-200 focus:ring-info-300",
    success:
      "hover:bg-success-100 active:bg-success-200 focus:ring-success-300",
    warning: "hover:bg-warning-100 active:bg-warning-200 focus:ring-warning-300"
  },
  ghost: {
    primary:
      "hover:bg-primary-100 active:bg-primary-300 focus:ring-primary-300",
    secondary:
      "hover:bg-secondary-200 active:bg-secondary-400 focus:ring-secondary-300",
    danger: "hover:bg-danger-100 active:bg-danger-200 focus:ring-danger-300",
    accent: "hover:bg-accent-100 active:bg-accent-200 focus:ring-accent-300",
    info: "hover:bg-info-100 active:bg-info-200 focus:ring-info-300",
    success:
      "hover:bg-success-100 active:bg-success-200 focus:ring-success-300",
    warning: "hover:bg-warning-100 active:bg-warning-200 focus:ring-warning-300"
  }
}

const variantClassMap: Record<ButtonVariant, Record<Intent, string>> = {
  solid: {
    primary: "bg-primary-500 text-white shadow",
    secondary: "bg-gray-200 text-gray-700 shadow",
    danger: "bg-danger-500 text-white shadow",
    accent: "bg-accent-500 text-white shadow",
    info: "bg-info-500 text-white shadow",
    success: "bg-success-500 text-white shadow",
    warning: "bg-warning-500 text-white shadow"
  },
  outline: {
    primary: "border border-primary-500 bg-white text-primary-500",
    secondary: "border border-secondary-300 bg-white text-secondary-700",
    danger: "border border-danger-500 bg-white text-danger-500",
    accent: "border border-accent-500 bg-white text-accent-500",
    info: "border border-info-500 bg-white text-info-500",
    success: "border border-success-500 bg-white text-success-500",
    warning: "border border-warning-500 bg-white text-warning-500"
  },
  ghost: {
    primary: "text-primary-500",
    secondary: "text-secondary-700",
    danger: "text-danger-500",
    accent: "text-accent-500",
    info: "text-info-500",
    success: "text-success-500",
    warning: "text-warning-500"
  }
}

const pendingClasses = "cursor-progress"
const disabledClasses =
  "disabled:text-opacity-50 disabled:border-dashed disabled:shadow-none disabled:cursor-not-allowed"
const variantDisabledClassMap: Record<ButtonVariant, Record<Intent, string>> = {
  solid: {
    primary: "disabled:bg-primary-200",
    secondary: "disabled:bg-secondary-200",
    danger: "disabled:bg-danger-200",
    accent: "disabled:bg-accent-200",
    info: "disabled:bg-info-200",
    success: "disabled:bg-success-200",
    warning: "disabled:bg-warning-200"
  },
  outline: {
    primary: "disabled:bg-white disabled:text-primary-500",
    secondary: "disabled:bg-white disabled:text-secondary-500",
    danger: "disabled:bg-white disabled:text-danger-500",
    accent: "disabled:bg-white disabled:text-accent-500",
    info: "disabled:bg-white disabled:text-info-500",
    success: "disabled:bg-white disabled:text-success-500",
    warning: "disabled:bg-white disabled:text-warning-500"
  },
  ghost: {
    primary: "disabled:bg-primary-50",
    secondary: "disabled:bg-secondary-50",
    danger: "disabled:bg-danger-50",
    info: "disabled:bg-info-50",
    accent: "disabled:bg-accent-50",
    success: "disabled:bg-success-50",
    warning: "disabled:bg-warning-50"
  }
}

//By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
function Spinner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={className}
    >
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="2">
          <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  )
}

const spinnerSizeMap: Record<Size, string> = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-7 h-7",
  xl: "w-8 h-8"
}
