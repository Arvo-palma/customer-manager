"use client"
import { Button, Column, Form, TextInput } from "@core/components"
import Webpage from "@core/components/webpage"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { updateUsers } from "../actions"

// export const metadata: Metadata = {
//   title: "Nova marca"
// }

export type UsersFormType = {
  name: string
  image: File
}

export interface UsersPageProps {}
const UsersPage: React.FC<UsersPageProps> = ({}) => {
  const { mutate } = useMutation({
    mutationFn: updateUsers
  })

  const { handleSubmit, register, control } = useForm<UsersFormType>()
  const onSubmit: SubmitHandler<UsersFormType> = (values) => {
    mutate(values)
  }
  return (
    <Webpage title="Novo usuário" className="w-full h-full bg-gray-100">
      <Column className="bg-white h-full w-full max-w-[900px] self-center p-8">
        <Form className="divide-y" onSubmit={handleSubmit(onSubmit)}>
          <Column className="pb-8">
            <TextInput
              label="Nome"
              direction="row"
              className={{
                input: "w-full max-w-[400px] self-end"
              }}
              {...register("name")}
            />
          </Column>
          <Column className="pb-8">
            <TextInput
              label="Email"
              direction="row"
              className={{
                input: "w-full max-w-[400px] self-end"
              }}
              {...register("email")}
            />
          </Column>
            <Column className="pb-8">
            <TextInput
              label="Telefone"
              direction="row"
              className={{
                input: "w-full max-w-[400px] self-end"
              }}
              {...register("phone")}
            />
          </Column>
          <Column className="pt-8">
            <Button intent="primary" label="Salvar" />
          </Column>
        </Form>
      </Column>
    </Webpage>
  )
}

export default UsersPage
