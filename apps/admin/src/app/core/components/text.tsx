import React from "react"
import { classNameBuilder } from "../helpers/class-name-builder"
import { TextSize } from "../types/theme-type"

type FontWeightType =
  | "thin"
  | "light"
  | "regular"
  | "semibold"
  | "bold"
  | "extrabold"
type TransformType = "uppercase" | "capitalize" | "lowercase" | "none"
type AlignType = "left" | "center" | "justify" | "right"
type ColorType =
  | "current"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"

interface TextProps {
  size?: TextSize
  fontWeight?: FontWeightType
  transform?: TransformType
  align?: AlignType
  color?: ColorType
  children: React.ReactNode
}

export const Text: React.FC<TextProps> = ({
  size = "md",
  fontWeight = "regular",
  transform = "none",
  align = "left",
  color = "500",
  children
}) => {
  return (
    <span
      className={classNameBuilder(
        "inline-block",
        textSizeMap[size],
        textColorMap[color],
        fontWeightMap[fontWeight],
        transformMap[transform],
        alignMap[align]
      )}
    >
      {children}
    </span>
  )
}

export default Text

const fontWeightMap: Record<FontWeightType, string> = {
  thin: "font-thin",
  light: "font-light",
  regular: "font-normal",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold"
}

const textColorMap: Record<ColorType, string> = {
  current: "text-current",
  300: "text-gray-300",
  400: "text-gray-400",
  500: "text-gray-500",
  600: "text-gray-600",
  700: "text-gray-700",
  800: "text-gray-800",
  900: "text-gray-900"
}

const transformMap: Record<TransformType, string> = {
  uppercase: "uppercase",
  capitalize: "capitalize",
  lowercase: "lowercase",
  none: ""
}

const alignMap: Record<AlignType, string> = {
  left: "text-left",
  center: "text-center",
  justify: "text-justify",
  right: "text-right"
}

const textSizeMap: Record<TextSize, string> = {
  xs: "text-[0.875rem] leading-[1.25rem]",
  sm: "text-[1rem] leading-[1.5rem]",
  md: "text-[1.125rem] leading-[1.75rem]",
  lg: "text-[1.25rem] leading-[1.75rem]",
  xl: "text-[1.5rem] leading-[2rem]",
  "2xl": "text-[1.625rem] leading-[2rem]",
  "3xl": "text-[2rem] leading-[2.25rem]",
  "4xl": "text-[2.375rem] leading-[2.5rem]",
  "5xl": "text-[3.125rem] leading-none",
  "6xl": "text-[3.875rem] leading-none",
  "7xl": "text-[4.5rem] leading-none",
  "8xl": "text-[6.125rem] leading-none",
  "9xl": "text-[8.125rem] leading-none"
}
