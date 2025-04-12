"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Upload, ShoppingCart, Users, Megaphone, Settings, LogOut, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  {
    title: "Dashboard",
    href: "/client/",
    icon: LayoutDashboard,
  },
  {
    title: "My Templates",
    href: "/client/templates",
    icon: Package,
  },
  {
    title: "Upload Template",
    href: "/client/upload",
    icon: Upload,
  },
  {
    title: "Purchases",
    href: "/client/purchases",
    icon: ShoppingCart,
  },
  {
    title: "Affiliate",
    href: "/client/affiliate",
    icon: Users,
  },
  {
    title: "Promote Template",
    href: "/client/promote",
    icon: Megaphone,
  },
  {
    title: "Profile Settings",
    href: "/client/settings",
    icon: Settings,
  },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-10">
        <div className="flex flex-col flex-grow border-r border-[#2a2a2a] bg-[#121212] overflow-y-auto">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-[#2a2a2a]">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#6E00FF] to-[#9D50FF] bg-clip-text text-transparent">
                QuickUI
              </span>
            </Link>
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    pathname === item.href
                      ? "bg-[#1E1E1E] text-[#6E00FF] shadow-[0_0_10px_rgba(110,0,255,0.3)]"
                      : "text-gray-300 hover:bg-[#1E1E1E] hover:text-[#6E00FF]",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-[#6E00FF] hover:bg-[#1E1E1E]"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-[#121212] border-b border-[#2a2a2a]">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#6E00FF] to-[#9D50FF] bg-clip-text text-transparent">
              QuickUI
            </span>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-[#121212] border-r border-[#2a2a2a]">
              <div className="flex flex-col h-full">
                <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-[#2a2a2a]">
                  <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#6E00FF] to-[#9D50FF] bg-clip-text text-transparent">
                      QuickUI
                    </span>
                  </Link>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                        pathname === item.href
                          ? "bg-[#1E1E1E] text-[#6E00FF] shadow-[0_0_10px_rgba(110,0,255,0.3)]"
                          : "text-gray-300 hover:bg-[#1E1E1E] hover:text-[#6E00FF]",
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t border-[#2a2a2a]">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-[#6E00FF] hover:bg-[#1E1E1E]"
                    onClick={() => setOpen(false)}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0">{children}</main>
      </div>
    </div>
  )
}
