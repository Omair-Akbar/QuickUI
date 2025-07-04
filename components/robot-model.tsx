"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, useAnimations } from "@react-three/drei"

function RobotModel({ mousePosition }: { mousePosition: any }) {
  const group = useRef()
  const { scene, animations } = useGLTF("/landingPageRobot.glb", true)
  const { actions, mixer } = useAnimations(animations, group)
  const modelRef = useRef()

  useEffect(() => {
    if (animations.length > 0) {
      const animationNames = Object.keys(actions)
      if (animationNames.length > 0) {
        const action = actions[animationNames[0]]
        if (action) {
          action.reset().fadeIn(0.5).play()
        }
      } else {
        animations.forEach((clip, index) => {
          const action = mixer.clipAction(clip)
          action.reset().fadeIn(0.5).play()
        })
      }
    }
  }, [scene, animations, actions, mixer])

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta)
    }
    if (modelRef.current && mousePosition) {
      const targetRotationY = (mousePosition.x / window.innerWidth - 0.5) * Math.PI * 0.5
      const targetRotationX = (mousePosition.y / window.innerHeight - 0.5) * Math.PI * 0.25

      modelRef.current.rotation.y += (targetRotationY - modelRef.current.rotation.y) * 0.05
      modelRef.current.rotation.x += (targetRotationX - modelRef.current.rotation.x) * 0.05
    }
  })

  return (
    <group ref={group}>
      <primitive ref={modelRef} object={scene} scale={2.4} position={[0, -1, 0]} />
    </group>
  )
}

export default function RobotCanvas({ className = "" }: { className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#6E00FF]/20 to-transparent rounded-full blur-md"></div>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <RobotModel mousePosition={mousePosition} />
        <Environment preset={"sunset"} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#121212] to-transparent"></div>
    </div>
  )
}
