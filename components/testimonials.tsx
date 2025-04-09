import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function Testimonials() {
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
  ]

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-[#6E00FF]">Users</span> Say
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Join thousands of satisfied developers and designers who've found success with QuickUI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-[#1A1A1A] border-[#6E00FF]/20 hover:border-[#6E00FF]/50 transition-all duration-300"
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-[#6E00FF]/50 mb-4" />
                <p className="text-white/80 mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4 border border-[#6E00FF]/30">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-[#6E00FF]/20 text-[#6E00FF]">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-white/50">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

