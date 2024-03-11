"use client"
import {
  Button,
  Column,
  ColumnProps,
  Form,
  Row,
  TextInput,
  TextInputProps
} from "@core/components"
import NumberInput from "@core/components/number-input"
import Webpage from "@core/components/webpage"
import { required } from "@core/helpers/react-hook-form-rules"
import { useForm } from "@core/hooks"
import { useShowMessage } from "@core/hooks/use-show-message"
import { ErrorType } from "@core/types/error-type"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React from "react"
import { SubmitHandler } from "react-hook-form"
import { createUser } from "../actions"

export type UserFormType = {
  name: string
  email: string
  phone: string
  coordX: number
  coordY: number
}

export interface UsersPageProps {}
const UsersPage: React.FC<UsersPageProps> = ({}) => {
  const router = useRouter()
  const { showError } = useShowMessage()

  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: () => router.push("/")
  })

  const { handleSubmit, register, getError } = useForm<UserFormType>()
  const onSubmit: SubmitHandler<UserFormType> = (values) => {
    mutate(values, {
      onError: (error) => showError((error as ErrorType).message)
    })
  }

  const inputContainerGeneralClasses: ColumnProps["className"] = "p-4"

  const textInputGeneralClasses: TextInputProps["className"] = {
    input: "w-full max-w-[400px] ml-4",
    wrapper: "justify-center"
  }

  return (
    <Webpage title="New customer" className="w-full h-full bg-gray-100">
      <Column className="bg-white h-full w-full max-w-[900px] self-center p-8">
        <Form className="divide-y" onSubmit={handleSubmit(onSubmit)}>
          <Column className={inputContainerGeneralClasses}>
            <TextInput
              label="Name"
              direction="row"
              required
              className={textInputGeneralClasses}
              error={getError("name")}
              {...register("name", { required })}
            />
          </Column>
          <Column className={inputContainerGeneralClasses}>
            <TextInput
              label="Email"
              direction="row"
              required
              className={textInputGeneralClasses}
              error={getError("email")}
              {...register("email", { required })}
            />
          </Column>
          <Column className={inputContainerGeneralClasses}>
            <TextInput
              label="Phone"
              direction="row"
              required
              className={textInputGeneralClasses}
              error={getError("phone")}
              {...register("phone", { required })}
            />
          </Column>
          <Row className="p-4 gap-2 justify-center">
            <NumberInput
              label="Coordinates"
              direction="row"
              placeholder="X"
              required
              className={{
                input: "w-full max-w-[70px]",
                wrapper: ""
              }}
              error={getError("coordX")}
              {...register("coordX", { required })}
            />
            <NumberInput
              direction="row"
              placeholder="Y"
              required
              className={{
                input: "w-full max-w-[70px]",
                wrapper: ""
              }}
              error={getError("coordY")}
              {...register("coordY", { required })}
            />
          </Row>
          <Column className={inputContainerGeneralClasses}>
            <Button intent="primary" label="Save" />
          </Column>
        </Form>
      </Column>
    </Webpage>
  )
}

export default UsersPage
