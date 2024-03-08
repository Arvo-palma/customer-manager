import type { Config } from "tailwindcss"
const colors = require("tailwindcss/colors")

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      primary: colors.indigo,
      secondary: colors.slate,
      accent: colors.fuchsia,
      danger: colors.rose,
      warning: colors.amber,
      info: colors.blue,
      success: colors.green
    },
    extend: {
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem"
      },
      minWidth: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem"
      },
      minHeight: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem"
      }
    }
  },
  plugins: []
}
export default config
