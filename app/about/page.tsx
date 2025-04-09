import Image from "next/image"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Alex founded QuickUI with a vision to make high-quality UI development accessible to everyone.",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Sarah Chen",
      role: "Lead Designer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sarah brings over a decade of UI/UX design experience to create beautiful, functional templates.",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Developer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael ensures all our templates follow best practices and are built with clean, maintainable code.",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-[#6E00FF]">QuickUI</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            We're on a mission to help developers and designers build beautiful, functional websites and applications
            faster.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-white/70 mb-4">
              QuickUI was founded in 2020 with a simple goal: to make high-quality UI development accessible to
              everyone. We noticed that developers were spending too much time reinventing the wheel, building the same
              components and layouts over and over again.
            </p>
            <p className="text-white/70 mb-4">
              We started by creating a small collection of React components that we used in our own projects. As word
              spread, more developers asked to use our components, and QuickUI was born.
            </p>
            <p className="text-white/70">
              Today, we're proud to serve thousands of developers and designers worldwide, helping them build better
              products faster. Our templates are used by freelancers, startups, and enterprise companies alike.
            </p>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Our team working" fill className="object-cover" />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1A1A1A] border border-[#6E00FF]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Quality First</h3>
              <p className="text-white/70">
                We believe in creating templates that not only look good but are built with clean, maintainable code
                that follows best practices.
              </p>
            </div>
            <div className="bg-[#1A1A1A] border border-[#6E00FF]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-white/70">
                We're committed to making our templates accessible to everyone, regardless of ability or disability.
              </p>
            </div>
            <div className="bg-[#1A1A1A] border border-[#6E00FF]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Community Driven</h3>
              <p className="text-white/70">
                We listen to our community and continuously improve our templates based on feedback and emerging best
                practices.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-[#1A1A1A] border border-[#6E00FF]/20 rounded-xl overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-[#6E00FF] mb-3">{member.role}</p>
                  <p className="text-white/70 mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a href={member.social.twitter} className="text-white/50 hover:text-[#6E00FF] transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href={member.social.linkedin} className="text-white/50 hover:text-[#6E00FF] transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={member.social.github} className="text-white/50 hover:text-[#6E00FF] transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
