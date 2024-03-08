"use client"
import HomeIcon from "@core/assets/icons/home.svg"
import PlusIcon from "@core/assets/icons/plus.svg"
import React from "react"
import { classNameBuilder } from "../helpers/class-name-builder"
import Sidebar from "./sidebar"
import { Column, Row, Text } from "."

export interface WebpageProps {
  children?: JSX.Element | JSX.Element[]
  title?: string
  className?: string
}
const Webpage: React.FC<WebpageProps> = ({ children, title, className }) => {
  return (
    <main className="flex">
      <Sidebar
        logo={<></>}
        items={[
          { icon: <HomeIcon />, label: "Principal", href: "/" },
          {
            icon: <PlusIcon />,
            label: "Produtos",
            items: [
              {
                label: "Característica",
                href: "/characteristics/new"
              },
              {
                label: "Categoria",
                href: "/categories/new"
              },
              {
                label: "Marca",
                href: "/brands/new"
              }
            ]
          }
        ]}
      />
      <Column className="w-full min-h-screen">
        <Row className="border-b items-center px-8 h-16">
          <Text color="700" fontWeight="bold" size="lg">{title}</Text>
        </Row>
        <Column className={classNameBuilder(className ?? "w-full")}>
          {children}
        </Column>
      </Column>
    </main>
  )
}

export default Webpage
