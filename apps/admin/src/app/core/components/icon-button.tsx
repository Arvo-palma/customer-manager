import { ButtonProps, ButtonShape, ButtonVariant } from ".";
import { Size, Intent } from "../types/theme-type";


interface IconButtonProps extends Omit<ButtonProps, "grow" | "label"> {}

function IconButton({
  icon,
  intent = "secondary",
  variant = "solid",
  pending,
  disabled,
  size = "md",
  type,
  shape = "rounded",
  onClick,
}: IconButtonProps) {
  return (
    <button
      tabIndex={pending || disabled ? -1 : undefined}
      type={type}
      disabled={disabled}
      onClick={(event) => {
        if (pending) {
          return;
        }
        onClick?.(event);
      }}
      className={[
        "relative transition outline-none focus-visible:ring-4",
        sizeClassMap[size],
        shapeClassMap[shape],
        variantClassMap[variant][intent] || "",
        !pending && !disabled ? enabledVariantClassMap[variant][intent] : "",
        pending ? pendingClasses : "",
        disabled ? disabledClasses : "",
        disabled ? variantDisabledClassMap[variant][intent] || "" : "",
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
      </div>
    </button>
  );
}

export default IconButton;

const sizeClassMap: Record<Size, string> = {
  xs: "px-1 w-6 h-6",
  sm: "px-2 w-8 h-8",
  md: "px-2 w-[2.375rem] h-[2.375rem]",
  lg: "px-2 w-12 h-12",
  xl: "px-4 w-14 h-14",
};

const shapeClassMap: Record<ButtonShape, string> = {
  pill: "rounded-full",
  rounded: "rounded",
};

const enabledVariantClassMap: Record<ButtonVariant, Record<Intent, string>> = {
  solid: {
    primary:
      "hover:bg-primary-700 focus:ring-primary-300 active:bg-primary-400",
    secondary: "hover:bg-gray-300 focus:ring-gray-500 active:bg-gray-400",
    accent: "hover:bg-accent-700 focus:ring-accent-300 active:bg-accent-400",
    success:
      "hover:bg-success-700 focus:ring-success-300 active:bg-success-400",
    danger: "hover:bg-danger-700 focus:ring-danger-300 active:bg-danger-400",
    warning:
      "hover:bg-warning-700 focus:ring-warning-300 active:bg-warning-400",
    info: "hover:bg-info-700 focus:ring-info-300 active:bg-info-400",
  },
  outline: {
    primary:
      "hover:bg-primary-100 focus:ring-primary-300 active:bg-primary-200",
    secondary:
      "hover:bg-secondary-100 focus:ring-secondary-300 active:bg-secondary-200",
    accent: "hover:bg-accent-100 focus:ring-accent-300 active:bg-accent-200",
    success:
      "hover:bg-success-100 focus:ring-success-300 active:bg-success-200",
    danger: "hover:bg-danger-100 focus:ring-danger-300 active:bg-danger-200",
    warning:
      "hover:bg-warning-100 focus:ring-warning-300 active:bg-warning-200",
    info: "hover:bg-info-100 focus:ring-info-300 active:bg-info-200",
  },
  ghost: {
    primary:
      "hover:bg-primary-100 active:bg-primary-200 focus:ring-primary-300",
    secondary:
      "hover:bg-secondary-100 active:bg-secondary-200 focus:ring-secondary-300",
    accent: "hover:bg-accent-100 active:bg-accent-200 focus:ring-accent-300",
    success:
      "hover:bg-success-100 active:bg-success-200 focus:ring-success-300",
    danger: "hover:bg-danger-100 active:bg-danger-200 focus:ring-danger-300",
    warning:
      "hover:bg-warning-100 active:bg-warning-200 focus:ring-warning-300",
    info: "hover:bg-info-100 active:bg-info-200 focus:ring-info-300",
  },
};

const variantClassMap: Record<ButtonVariant, Record<Intent, string>> = {
  solid: {
    primary: "bg-primary-500 text-white shadow",
    secondary: "bg-gray-200 text-gray-700 shadow",
    accent: "bg-accent-500 text-white shadow",
    success: "bg-success-500 text-white shadow",
    danger: "bg-danger-500 text-white shadow",
    warning: "bg-warning-500 text-white shadow",
    info: "bg-info-500 text-white shadow",
  },
  outline: {
    primary: "border border-primary-500 bg-white text-primary-500",
    secondary: "border border-secondary-500 bg-white text-secondary-500",
    accent: "border border-accent-500 bg-white text-accent-500",
    success: "border border-success-500 bg-white text-success-500",
    danger: "border border-danger-500 bg-white text-danger-500",
    warning: "border border-warning-500 bg-white text-warning-500",
    info: "border border-info-500 bg-white text-info-500",
  },
  ghost: {
    primary: "text-primary-500",
    secondary: "text-secondary-500",
    accent: "text-accent-500",
    success: "text-success-500",
    danger: "text-danger-500",
    warning: "text-warning-500",
    info: "text-info-500",
  },
};

const pendingClasses = "cursor-progress";
const disabledClasses =
  "disabled:text-opacity-50 disabled:border-dashed disabled:shadow-none disabled:cursor-not-allowed";
const variantDisabledClassMap: Record<ButtonVariant, Record<Intent, string>> = {
  solid: {
    primary: "disabled:bg-primary-200",
    secondary: "disabled:bg-secondary-200",
    accent: "disabled:bg-accent-200",
    success: "disabled:bg-success-200",
    danger: "disabled:bg-danger-200",
    warning: "disabled:bg-warning-200",
    info: "disabled:bg-info-200",
  },
  outline: {
    primary: "disabled:bg-white disabled:text-primary-500",
    secondary: "disabled:bg-white disabled:text-secondary-500",
    accent: "disabled:bg-white disabled:text-accent-500",
    success: "disabled:bg-white disabled:text-success-500",
    danger: "disabled:bg-white disabled:text-danger-500",
    warning: "disabled:bg-white disabled:text-warning-500",
    info: "disabled:bg-white disabled:text-info-500",
  },
  ghost: {
    primary: "disabled:bg-primary-50",
    secondary: "disabled:bg-secondary-50",
    accent: "disabled:bg-accent-50",
    success: "disabled:bg-success-50",
    danger: "disabled:bg-danger-50",
    warning: "disabled:bg-warning-50",
    info: "disabled:bg-info-50",
  },
};

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
  );
}

const spinnerSizeMap: Record<Size, string> = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-7 h-7",
  xl: "w-8 h-8",
};
