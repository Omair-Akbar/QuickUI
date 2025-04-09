"use client"

import { createContext, useState } from "react"

export const RobotContext = createContext({
  isRobotFollowing: false,
  setIsRobotFollowing: (value: boolean) => {},
})

export function RobotProvider({ children }) {
  const [isRobotFollowing, setIsRobotFollowing] = useState(false)

  return <RobotContext.Provider value={{ isRobotFollowing, setIsRobotFollowing }}>{children}</RobotContext.Provider>
}

