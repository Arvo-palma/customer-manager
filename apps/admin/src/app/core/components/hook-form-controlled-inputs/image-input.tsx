import PhotographImage from "@core/assets/images/photograph.png"
import { Column, FileInput, FileInputProps, Row, Text } from "@core/components"
import Image from "next/image"
import React from "react"
import { UseControllerProps, useController } from "react-hook-form"
import UploadIcon from "@core/assets/icons/upload.svg"

export const ImageInput: React.FC<
  Omit<FileInputProps, "value" | "accept" | "children"> &
    UseControllerProps<any>
> = ({
  name,
  control,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  ...inputProps
}) => {
  const {
    field: { ref, value, ...fieldProps }
  } = useController({
    name,
    control,
    defaultValue,
    disabled,
    rules,
    shouldUnregister
  })
  return (
    <FileInput accept=".jpg,.png,.svg,.gif" {...inputProps} {...fieldProps}>
      <Column className="items-center">
        <Image className="opacity-20 mb-2" src={PhotographImage} alt="PNG" />
        <Text color="300">JPG, PNG, SVG ou GIF</Text>
        <Row className="text-danger-500 items-center gap-x-2 mt-4">
          <UploadIcon />
          <Text color="current">Selecionar</Text>
        </Row>
      </Column>
    </FileInput>
  )
}

export default ImageInput
