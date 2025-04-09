"use client"

import type React from "react"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import FloatingRobot from "@/components/floating-robot"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isRobotFollowing, setIsRobotFollowing] = useState(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {children}
      <FloatingRobot isFollowing={isRobotFollowing} setIsFollowing={setIsRobotFollowing} />
    </ThemeProvider>
  )
}

