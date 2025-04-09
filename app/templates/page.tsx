"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, Search, Star } from "lucide-react"

export default function TemplatesPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || "all"
  const [searchTerm, setSearchTerm] = useState("")

  const templates = [
    {
      id: 1,
      title: "Modern Dashboard",
      description: "A sleek dashboard template with analytics and user management.",
      image: "/placeholder.svg?height=200&width=300",
      category: "dashboard",
      price: 49,
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      title: "E-commerce Store",
      description: "Complete e-commerce solution with product listings and checkout.",
      image: "/placeholder.svg?height=200&width=300",
      category: "ecommerce",
      price: 69,
      rating: 4.9,
      reviews: 87,
    },
    {
      id: 3,
      title: "Portfolio Landing",
      description: "Showcase your work with this elegant portfolio template.",
      image: "/placeholder.svg?height=200&width=300",
      category: "landingpage",
      price: 39,
      rating: 4.7,
      reviews: 56,
    },
    {
      id: 4,
      title: "Blog Platform",
      description: "Modern blog with rich text editing and comment system.",
      image: "/placeholder.svg?height=200&width=300",
      category: "blog",
      price: 59,
      rating: 4.6,
      reviews: 42,
    },
    {
      id: 5,
      title: "Admin Panel",
      description: "Comprehensive admin interface with user management and settings.",
      image: "/placeholder.svg?height=200&width=300",
      category: "dashboard",
      price: 79,
      rating: 4.9,
      reviews: 103,
    },
    {
      id: 6,
      title: "Product Landing",
      description: "Showcase your product with this conversion-optimized landing page.",
      image: "/placeholder.svg?height=200&width=300",
      category: "landingpage",
      price: 49,
      rating: 4.8,
      reviews: 68,
    },
  ]

  const filteredTemplates = query === "all" ? templates : templates.filter((template) => template.category === query)

  const searchedTemplates = searchTerm
    ? filteredTemplates.filter(
        (template) =>
          template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : filteredTemplates

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Browse <span className="text-[#6E00FF]">Templates</span>
            </h1>
            <p className="text-white/70">Find the perfect template for your next project</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Search templates..."
                className="pl-10 bg-[#1A1A1A] border-[#6E00FF]/30 text-white focus:border-[#6E00FF] focus:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-[#6E00FF]/30 text-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue={query === "all" ? "all" : query} className="mb-8">
          <TabsList className="bg-[#1A1A1A] border border-[#6E00FF]/20">
            <TabsTrigger value="all" asChild>
              <Link href="/templates?query=all">All</Link>
            </TabsTrigger>
            <TabsTrigger value="landingpage" asChild>
              <Link href="/templates?query=landingpage">Landing Pages</Link>
            </TabsTrigger>
            <TabsTrigger value="dashboard" asChild>
              <Link href="/templates?query=dashboard">Dashboards</Link>
            </TabsTrigger>
            <TabsTrigger value="ecommerce" asChild>
              <Link href="/templates?query=ecommerce">E-commerce</Link>
            </TabsTrigger>
            <TabsTrigger value="blog" asChild>
              <Link href="/templates?query=blog">Blog</Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="landingpage" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ecommerce" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function TemplateCard({ template }) {
  return (
    <Card className="bg-[#1A1A1A] border-[#6E00FF]/20 overflow-hidden hover:border-[#6E00FF]/50 transition-all duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={template.image || "/placeholder.svg"}
          alt={template.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-[#6E00FF]">{template.category}</Badge>
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-bold mb-2">{template.title}</h3>
        <p className="text-white/70 mb-4">{template.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium">{template.rating}</span>
            <span className="text-sm text-white/50 ml-1">({template.reviews})</span>
          </div>
          <span className="font-bold text-lg">${template.price}</span>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex justify-between">
        <Button variant="outline" className="border-[#6E00FF]/30 text-white w-[48%]">
          Preview
        </Button>
        <Button className="bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white w-[48%]">Buy Now</Button>
      </CardFooter>
    </Card>
  )
}
