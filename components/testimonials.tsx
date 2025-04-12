"use client"

import { useState, useEffect } from "react"
import Marquee from "react-fast-marquee"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const TestimonialCard = ({ name, role, avatar, content }) => {
  return (
    <Card className="bg-[#1A1A1A] border-[#6E00FF]/20 border transition-all duration-300 h-full mx-2 min-w-[280px] sm:min-w-[320px] md:min-w-[350px]">
      <CardContent className="p-4 sm:p-6 h-full flex flex-col">
        <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#6E00FF]/50 mb-3 sm:mb-4 flex-shrink-0" />
        <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base flex-grow">{content}</p>
        <div className="flex items-center mt-auto">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4 border border-[#6E00FF]/30">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-[#6E00FF]/20 text-[#6E00FF] text-xs sm:text-sm">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-sm sm:text-base text-white">{name}</h4>
            <p className="text-xs sm:text-sm text-white/50">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(30)

  // Adjust speed based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSpeed(40)
      } else if (window.innerWidth >= 768) {
        setSpeed(35)
      } else {
        setSpeed(30)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "QuickUI has completely transformed how I build projects. The templates are not only beautiful but also incredibly well-structured. I've saved countless hours of development time.",
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "As a designer who codes, I've found QuickUI templates to be the perfect starting point. The attention to detail and design consistency is impressive. I've also made a nice side income selling my own templates!",
    },
    {
      name: "Michael Rodriguez",
      role: "Full Stack Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The quality of code in these templates is outstanding. Clean, well-documented, and following best practices. I've learned a lot just by studying how they're built.",
    },
    {
      name: "Emily Wong",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "QuickUI has helped our team launch MVPs much faster. The templates are flexible enough to customize to our needs but structured enough to maintain consistency.",
    },
    {
      name: "David Park",
      role: "Startup Founder",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "As a non-technical founder, QuickUI templates have been a game-changer. I can now prototype ideas quickly without always relying on my development team.",
    },
  ]

  // Duplicate testimonials to ensure continuous flow
  const extendedTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-[#6E00FF]/30 blur-[100px] transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            What Our <span className="text-[#6E00FF]">Users</span> Say
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Join thousands of satisfied developers and designers who've found success with QuickUI.
          </p>
        </div>

        <div className="relative">
          <Marquee speed={speed} pauseOnHover pauseOnClick gradient={false} play={!isPaused} className="py-4">
            {extendedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                name={testimonial.name}
                role={testimonial.role}
                avatar={testimonial.avatar}
                content={testimonial.content}
              />
            ))}
          </Marquee>

          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setIsPaused(!isPaused)}
              variant="outline"
              size="icon"
              className="rounded-full bg-[#1A1A1A] border-[#6E00FF]/30 hover:bg-[#6E00FF]/10 hover:border-[#6E00FF]/50"
              aria-label={isPaused ? "Play testimonials" : "Pause testimonials"}
            >
              {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
