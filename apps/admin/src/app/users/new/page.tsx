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
import Webpage from "@core/components/webpage"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { createUser } from "../actions"

// export const metadata: Metadata = {
//   title: "Nova marca"
// }

export type UserFormType = {
  name: string
  email: string
  phone: string
  coordX: number
  coordY: number
}

export interface UsersPageProps {}
const UsersPage: React.FC<UsersPageProps> = ({}) => {
  const { mutate } = useMutation({
    mutationFn: createUser
  })

  const { handleSubmit, register, control } = useForm<UserFormType>()
  const onSubmit: SubmitHandler<UserFormType> = (values) => {
    mutate(values)
  }

  const inputContainerGeneralClasses: ColumnProps["className"] = "p-4"

  const textInputGeneralClasses: TextInputProps["className"] = {
    input: "w-full max-w-[400px] ml-4",
    wrapper: "justify-center"
  }

  return (
    <Webpage title="New client" className="w-full h-full bg-gray-100">
      <Column className="bg-white h-full w-full max-w-[900px] self-center p-8">
        <Form className="divide-y" onSubmit={handleSubmit(onSubmit)}>
          <Column className={inputContainerGeneralClasses}>
            <TextInput
              label="Name"
              direction="row"
              className={textInputGeneralClasses}
              {...register("name")}
            />
          </Column>
          <Column className={inputContainerGeneralClasses}>
            <TextInput
              label="Email"
              direction="row"
              className={textInputGeneralClasses}
              {...register("email")}
            />
          </Column>
          <Column className={inputContainerGeneralClasses}>
            <TextInput
              label="Phone"
              direction="row"
              className={textInputGeneralClasses}
              {...register("phone")}
            />
          </Column>
          <Row className="p-4 gap-2 justify-center">
            <TextInput
              label="Coordinates"
              direction="row"
              placeholder="X"
              className={{
                input: "w-full max-w-[50px]",
                wrapper: ""
              }}
              {...register("coordX")}
            />
            <TextInput
              direction="row"
              placeholder="Y"
              className={{
                input: "w-full max-w-[50px]",
                wrapper: ""
              }}
              {...register("coordY")}
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
