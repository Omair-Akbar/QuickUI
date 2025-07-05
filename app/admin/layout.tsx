import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuickUI Admin Dashboard",
  description: "Admin dashboard for QuickUI platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SidebarProvider>
            {/* <div className="min-h-screen"> */}
              <AdminSidebar />
              <main className="flex-1">{children}</main>
            {/* </div> */}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
    // <div className="bg-orange-50 w-full h-screen">

    // </div>
  )
}


import './globals.css'