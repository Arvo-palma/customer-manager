import React from "react"

export interface FormProps {
  onSubmit: () => void
  children: React.ReactNode
  submitOnPressEnter?: boolean
  className?: string
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  submitOnPressEnter,
  className = ""
}) => {
  return (
    <form
      noValidate
      className={`flex flex-col ${className}`}
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onSubmit()
      }}
      onKeyDown={(e) => {
        if (!submitOnPressEnter && e.code === "Enter") e.preventDefault()
      }}
    >
      {children}
    </form>
  )
}

export default Form
