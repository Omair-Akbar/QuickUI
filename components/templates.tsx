import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Templates() {
  const templates = [
    {
      title: "Nebula Dashboard",
      category: "Admin",
      image: "/placeholder.svg?height=300&width=400",
      price: "$49",
      rating: 4.8,
      reviews: 124,
      featured: true,
    },
    {
      title: "Quantum E-commerce",
      category: "E-commerce",
      image: "/placeholder.svg?height=300&width=400",
      price: "$59",
      rating: 4.9,
      reviews: 87,
      featured: false,
    },
    {
      title: "Pulse Portfolio",
      category: "Portfolio",
      image: "/placeholder.svg?height=300&width=400",
      price: "$39",
      rating: 4.7,
      reviews: 56,
      featured: false,
    },
    {
      title: "Nova Blog",
      category: "Blog",
      image: "/placeholder.svg?height=300&width=400",
      price: "$45",
      rating: 4.6,
      reviews: 92,
      featured: true,
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular <span className="text-[#6E00FF]">Templates</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl">
              Discover our most loved templates crafted by top developers.
            </p>
          </div>
          <Button className="mt-6 md:mt-0 bg-transparent border border-[#6E00FF] text-white hover:bg-[#6E00FF]/10">
            View All Templates
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] border border-[#6E00FF]/20 rounded-xl overflow-hidden hover:border-[#6E00FF]/50 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {template.featured && <Badge className="absolute top-3 left-3 bg-[#6E00FF]">Featured</Badge>}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white/50">{template.category}</span>
                  <span className="font-bold text-lg">{template.price}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{template.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(template.rating) ? "text-[#6E00FF]" : "text-gray-600"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-white/70">({template.reviews})</span>
                  </div>
                  <Button size="sm" className="bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white">
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

