import ChevronRightIcon from "@core/assets/icons/chevron-right.svg"
import React from "react"
import { Column, Flex } from ".."
import { classNameBuilder } from "../../helpers/class-name-builder"
import { Accordion, AccordionProps } from "./accordion"
import { Item, ItemProps } from "./item"

export interface SidebarProps {
  logo: JSX.Element | { full: JSX.Element; collapsed: JSX.Element }
  items: (ItemProps | AccordionProps)[]
  className?: string
}
const Sidebar: React.FC<SidebarProps> = ({
  logo: logoProp,
  items,
  className
}) => {
  const [expanded, setExpanded] = React.useState(false)
  const logo =
    (logoProp as any)?.full && (logoProp as any)?.collapsed
      ? expanded
        ? (logoProp as any).full
        : (logoProp as any).collapsed
      : logoProp
  return (
    <Column
      className={classNameBuilder(
        "h-screen bg-white",
        "transition-all duration-200 ease-in-out",
        expanded ? "max-w-[280px]" : "max-w-[72px]",
        className
      )}
    >
      <Flex className="relative py-4 items-center justify-center">
        {logo}
        <button
          className="flex absolute w-8 h-8 justify-center items-center bg-white -right-4 rounded-full border-2 border-primary-100"
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronRightIcon
            className={classNameBuilder(
              "text-gray-900",
              expanded ? "rotate-180" : ""
            )}
          />
        </button>
      </Flex>
      {items?.map((item, index) => {
        const ItemToRender = (item as AccordionProps)?.items ? Accordion : Item
        return (
          <ItemToRender key={index} expanded={expanded} {...(item as any)} />
        )
      })}
    </Column>
  )
}

export default Sidebar
