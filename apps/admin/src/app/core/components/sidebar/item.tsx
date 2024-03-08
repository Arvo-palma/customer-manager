import { usePathname } from "next/navigation"
import React from "react"
import { Flex, Row, Show, Text } from ".."
import { classNameBuilder } from "../../helpers/class-name-builder"
import Link from "../link"

export interface ItemProps {
  label: string
  href: string
  icon?: JSX.Element
  expanded?: boolean
  active?: boolean
  className?: string
}
export const Item: React.FC<ItemProps> = ({
  label,
  href,
  icon,
  expanded,
  active: activeProp,
  className
}) => {
  const pathname = usePathname()
  const active = activeProp ?? pathname === href
  return (
    <Link href={href}>
      <Row
        className={classNameBuilder(
          "w-full h-16 border-l-4 items-center gap-x-4 px-4",
          active
            ? "bg-primary-100 border-primary-500"
            : "border-transparent hover:bg-gray-100",
          expanded ? "" : "justify-center",
          className
        )}
      >
        <Show when={!!icon}>
          <Flex
            className={classNameBuilder(
              "w-md h-md shrink-0 justify-center items-center",
              active ? "text-primary-500" : "text-gray-900"
            )}
          >
            {icon}
          </Flex>
        </Show>
        <Show when={expanded}>
          <Text color="900" size="xs" fontWeight={active ? "bold" : "regular"}>
            {label}
          </Text>
        </Show>
      </Row>
    </Link>
  )
}
