import React from "react"
import {
  Column,
  Flex,
  InputWrapper,
  InputWrapperDirection,
  Show,
  Text
} from "@core/components"
import { classNameBuilder } from "@core/helpers/class-name-builder"
import { FormElement } from "@core/types/theme-type"
import Image from "next/image"

export interface FileInputProps
  extends Omit<FormElement<FileList | null>, "value" | "onChange"> {
  onChange?: (value: FileList | null) => void
  direction?: InputWrapperDirection
  accept?: string
  children?: JSX.Element
  className?: { input?: string; wrapper?: string }
}
export const FileInput: React.FC<FileInputProps> = ({
  id,
  testId,
  label,
  placeholder,
  accept = "image/*",
  error,
  required,
  disabled,
  grow,
  direction,
  children,
  className,
  onChange,
  ...inputProps
}) => {
  const [dragActive, setDragActive] = React.useState(false)
  const handleDrag: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragover" || e.type === "dragenter") {
      setDragActive(true)
    }
    if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const [previewInfo, setPreviewInfo] = React.useState({} as File)
  const previewRef = React.useRef<any>(null)
  const createPreview = (file?: File) => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current)
      previewRef.current = null
    }
    if (file) {
      previewRef.current = URL.createObjectURL(file)
      setPreviewInfo(file)
    }
  }
  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    createPreview(e.dataTransfer?.files?.[0])
    onChange?.(e.dataTransfer.files)
  }
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    createPreview(e.target?.files?.[0])
    onChange?.(e.target.files)
  }

  const inputRef = React.useRef<any>(null)
  return (
    <InputWrapper
      label={label}
      labelFor={id}
      className={className?.wrapper}
      error={error}
      direction={direction}
      required={required}
    >
      <Flex
        className={classNameBuilder(
          "relative items-center justify-center rounded outline-none p-3 border overflow-hidden bg-white",
          !error && !disabled ? defaultClasses : "",
          !disabled && error ? errorClasses : "",
          disabled ? disabledClasses : "",
          className?.input ?? "w-full h-[200px]"
        )}
      >
        <Show when={!previewRef.current}>{children}</Show>
        <Show when={previewRef.current}>
          <Column className="relative w-full h-full justify-end">
            <Image
              className="object-contain pb-6"
              fill
              src={previewRef.current || ""}
              alt={previewInfo?.name || ""}
            />
            <Text size="xs" align="center" color="900">
              {previewInfo?.name}
            </Text>
          </Column>
        </Show>
        <div
          className={classNameBuilder(
            "absolute inset-0 cursor-pointer",
            dragActive ? "bg-secondary-900/10" : ""
          )}
          onClick={() => inputRef.current.click()}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        />
        <input
          id={id}
          type="file"
          accept={accept}
          {...{ "data-test-id": testId }}
          {...inputProps}
          onChange={handleOnChange}
          disabled={disabled}
          required={required}
          className="hidden"
          ref={inputRef}
        />
      </Flex>
    </InputWrapper>
  )
}

const defaultClasses =
  "border-gray-300 focus:border-primary-500 focus-visible:ring-1 focus:ring-primary-500"
const errorClasses =
  "border-danger-300 focus:border-danger-500 focus-visible:ring-1 focus:ring-danger-500"
const disabledClasses = "cursor-not-allowed bg-gray-50 border-gray-200"

export default FileInput
