"use client"
import { useAuthContext } from "@/app/login/providers/auth-provider"
import LogoutIcon from "@core/assets/icons/logout.svg"
import { classNameBuilder } from "@core/helpers/class-name-builder"
import React from "react"
import { Flex, Show, Text } from ".."

export interface LogoutButtonProps {
  expanded?: boolean
  className?: string
}
const LogoutButton: React.FC<LogoutButtonProps> = ({ expanded, className }) => {
  const { signOut } = useAuthContext()
  return (
    <button
      type="button"
      className={classNameBuilder(
        "flex flex-row w-full h-16 border-l-4 items-center gap-x-4 px-4 border-transparent hover:bg-gray-100 text-danger-600",
        expanded ? "" : "justify-center",
        className
      )}
      onClick={signOut}
    >
      <Flex className="w-md h-md shrink-0 justify-center items-center">
        <LogoutIcon />
      </Flex>
      <Show when={expanded}>
        <Text color="current" size="xs">
          Sair
        </Text>
      </Show>
    </button>
  )
}

export default LogoutButton
