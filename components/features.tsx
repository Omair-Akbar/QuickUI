"use client"

import type React from "react"

import { useState, useRef } from "react"
import { CheckCircle, Zap, Palette, Shield, Star, Code } from "lucide-react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <div
      ref={cardRef}
      className="bg-[#1A1A1A] border border-[#6E00FF]/20 rounded-xl p-6 hover:border-[#6E00FF]/50 transition-all duration-300 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none w-32 h-32 rounded-full bg-[#6E00FF]/20 blur-xl transition-transform duration-100"
          style={{
            transform: `translate(${mousePosition.x - 64}px, ${mousePosition.y - 64}px)`,
          }}
        />
      )}
      <div className="relative z-10">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </div>
  )
}

export default function Features() {
  const features = [
    {
      icon: <Palette className="w-10 h-10 text-[#6E00FF]" />,
      title: "Modern Designs",
      description: "Access beautifully crafted templates with modern aesthetics and responsive layouts.",
    },
    {
      icon: <Code className="w-10 h-10 text-[#6E00FF]" />,
      title: "Clean Code",
      description: "All templates feature well-structured, documented code following best practices.",
    },
    {
      icon: <Zap className="w-10 h-10 text-[#6E00FF]" />,
      title: "Performance Optimized",
      description: "Built for speed with optimized assets and efficient rendering techniques.",
    },
    {
      icon: <Shield className="w-10 h-10 text-[#6E00FF]" />,
      title: "Secure Transactions",
      description: "Buy and sell with confidence through our secure payment processing.",
    },
    {
      icon: <Star className="w-10 h-10 text-[#6E00FF]" />,
      title: "User Reviews",
      description: "Make informed decisions with authentic reviews from real developers.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-[#6E00FF]" />,
      title: "Live Previews",
      description: "Test templates in real-time before making your purchase decision.",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-[#6E00FF]">QuickUI</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our platform offers everything you need to find the perfect template or monetize your design skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  )
}
