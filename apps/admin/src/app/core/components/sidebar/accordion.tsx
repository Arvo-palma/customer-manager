import ChevronDownIcon from "@core/assets/icons/chevron-down.svg"
import ChevronRightIcon from "@core/assets/icons/chevron-right.svg"
import { Disclosure, Popover, Transition } from "@headlessui/react"
import React from "react"
import { Flex, Row, Text } from ".."
import { classNameBuilder } from "../../helpers/class-name-builder"
import { Item, ItemProps } from "./item"
import { usePathname } from "next/navigation"

export interface AccordionProps {
  label: string
  items: Omit<ItemProps, "expanded">[]
  icon?: JSX.Element
  expanded?: boolean
  active?: boolean
  className?: string
}
export const Accordion: React.FC<AccordionProps> = ({
  label,
  items,
  icon,
  expanded,
  active: activeProp,
  className
}) => {
  const pathname = usePathname()
  const active = activeProp ?? items.some((item) => item.href === pathname)
  if (expanded)
    return (
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button>
              <Row
                className={classNameBuilder(
                  "w-full h-16 border-l-4 items-center gap-x-4 px-4",
                  active
                    ? "bg-primary-100 border-primary-500"
                    : "border-transparent hover:bg-gray-100",
                  className
                )}
              >
                <Flex
                  className={classNameBuilder(
                    "w-md h-md shrink-0 justify-center items-center",
                    active ? "text-primary-500" : "text-gray-900"
                  )}
                >
                  {icon}
                </Flex>
                <Text
                  color="900"
                  size="xs"
                  fontWeight={active ? "bold" : "regular"}
                >
                  {label}
                </Text>
                <Flex
                  className={classNameBuilder(
                    "ml-auto",
                    "transition-all duration-200 ease-in-out",
                    open ? "rotate-180" : ""
                  )}
                >
                  <ChevronDownIcon className="w-md h-md text-gray-400" />
                </Flex>
              </Row>
            </Disclosure.Button>
            <Transition
              enter="transition-opacity duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Disclosure.Panel>
                {items?.map((option, index) => (
                  <Item key={index} {...option} expanded />
                ))}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    )
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="w-full">
            <Row
              className={classNameBuilder(
                "w-full h-16 border-l-4 items-center justify-center gap-x-4 px-4",
                active
                  ? "bg-primary-100 border-primary-500"
                  : "border-transparent hover:bg-gray-100",
                className
              )}
            >
              <Flex
                className={classNameBuilder(
                  "w-md h-md shrink-0 justify-center items-center",
                  active ? "text-primary-500" : "text-gray-900"
                )}
              >
                {icon}
              </Flex>
              <Flex
                className={classNameBuilder(
                  "absolute justify-center right-0",
                  "transition-all duration-200 ease-in-out",
                  open ? "rotate-180" : ""
                )}
              >
                <ChevronRightIcon className="w-md h-md scale-75 text-gray-400 ml-auto" />
              </Flex>
            </Row>
          </Popover.Button>
          <Transition
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel className="absolute bg-white left-full top-0">
              {items?.map((option, index) => (
                <Item key={index} {...option} expanded />
              ))}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
