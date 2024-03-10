import { Metadata } from "next"
import { Inter } from "next/font/google"
import React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import QueryClientProvider from "./core/providers/query-client-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Customer manager"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          {children}
          <ToastContainer />
        </QueryClientProvider>
      </body>
    </html>
  )
}
