"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment } from "@react-three/drei"
import { useRobot } from "@/components/robot-provider"

function RobotModel({ onClick }) {
  const { scene } = useGLTF("/following_robot.glb", true)
  const modelRef = useRef()

  // Update rotation to follow mouse movement
  useFrame((state) => {
    if (modelRef.current) {
      // Simple rotation animation
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -1, 0]} onClick={onClick} />
}

export default function FloatingRobot() {
  const { isFollowing, setIsFollowing, originalPosition } = useRobot()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 })
  const [isReturning, setIsReturning] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const animationRef = useRef(null)
  const isCloseEnoughRef = useRef(false)

  // Handle visibility with a delay when returning to original position
  useEffect(() => {
    if (isFollowing || isReturning) {
      setShouldRender(true)
    } else if (!isFollowing && !isReturning && isCloseEnoughRef.current) {
      // Add a small delay before hiding the robot to ensure the animation completes
      const timeout = setTimeout(() => {
        setShouldRender(false)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [isFollowing, isReturning])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Initialize robot position when it starts following
  useEffect(() => {
    if (isFollowing && robotPosition.x === 0 && robotPosition.y === 0) {
      setRobotPosition({ x: mousePosition.x, y: mousePosition.y })
    }
  }, [isFollowing, mousePosition, robotPosition])

  // Handle the state updates when robot reaches its original position
  useEffect(() => {
    if (isCloseEnoughRef.current) {
      // Use setTimeout to ensure we don't update state during render
      const timeout = setTimeout(() => {
        setIsReturning(false)
        setIsFollowing(false)
        isCloseEnoughRef.current = false
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [robotPosition, setIsFollowing])

  // Update robot position with smooth following
  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    if (!isFollowing && !isReturning) return

    const updatePosition = () => {
      if (isFollowing && !isReturning) {
        // Follow mouse
        setRobotPosition((prev) => ({
          x: prev.x + (mousePosition.x - prev.x) * 0.05,
          y: prev.y + (mousePosition.y - prev.y) * 0.05,
        }))
      } else if (isReturning) {
        // Return to original position
        setRobotPosition((prev) => {
          const newX = prev.x + (originalPosition.x - prev.x) * 0.05
          const newY = prev.y + (originalPosition.y - prev.y) * 0.05

          // Check if we're close enough to the original position
          const isCloseEnough = Math.abs(newX - originalPosition.x) < 5 && Math.abs(newY - originalPosition.y) < 5

          if (isCloseEnough) {
            isCloseEnoughRef.current = true
          }

          return { x: newX, y: newY }
        })
      }

      animationRef.current = requestAnimationFrame(updatePosition)
    }

    animationRef.current = requestAnimationFrame(updatePosition)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isFollowing, isReturning, mousePosition, originalPosition])

  // Handle robot click to return to original position
  const handleRobotClick = (e) => {
    e.stopPropagation()
    if (isFollowing) {
      setIsReturning(true)
    }
  }

  if (!shouldRender) return null

  return (
    <div
      className="fixed z-50 w-[300px] h-[300px] pointer-events-auto"
      style={{
        left: `${robotPosition.x - 150}px`,
        top: `${robotPosition.y - 150}px`,
        cursor: "pointer",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#6E00FF]/20 to-transparent rounded-full blur-md"></div>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <RobotModel onClick={handleRobotClick} />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

