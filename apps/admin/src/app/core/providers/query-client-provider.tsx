"use client"
import {
  QueryClient,
  QueryClientProvider as TNQueryClientProvider
} from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import React from "react"

export interface QueryClientProviderProps {
  children: React.ReactNode
}
const QueryClientProvider: React.FC<QueryClientProviderProps> = ({
  children
}) => {
  const [client] = React.useState(new QueryClient())
  return (
    <TNQueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </TNQueryClientProvider>
  )
}

export default QueryClientProvider
