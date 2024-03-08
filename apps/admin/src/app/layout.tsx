import { Inter } from "next/font/google"
import React from "react"
import "./globals.css"
import QueryClientProvider from "./core/providers/query-client-provider"
import { Metadata } from "next"
import { AuthProvider } from "./login/providers/auth-provider"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { PrivateRoute } from "@core/components"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin"
  // description: ""
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
          <AuthProvider>
            <PrivateRoute>{children}</PrivateRoute>
            <ToastContainer />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
