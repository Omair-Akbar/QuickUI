"use client"

import { createContext, useState, useContext } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import FloatingRobot from "@/components/floating-robot"

// Create context with default values
export const RobotContext = createContext({
  isFollowing: false,
  setIsFollowing: (value: boolean) => {},
  originalPosition: { x: 0, y: 0 },
  setOriginalPosition: (position: { x: number; y: number }) => {},
})

// Custom hook to use the robot context
export const useRobot = () => useContext(RobotContext)

export function RobotProvider({ children }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 })

  return (
    <RobotContext.Provider
      value={{
        isFollowing,
        setIsFollowing,
        originalPosition,
        setOriginalPosition,
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        {children}
        <FloatingRobot />
      </ThemeProvider>
    </RobotContext.Provider>
  )
}

