import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Eye, FileEdit, MoreVertical, Plus, Search, Trash2 } from "lucide-react"

// Sample template data
const templates = [
  {
    id: 1,
    title: "Dashboard Pro",
    status: "published",
    price: 49.99,
    sales: 87,
    lastUpdated: "2023-12-15",
  },
  {
    id: 2,
    title: "E-commerce Kit",
    status: "published",
    price: 59.99,
    sales: 64,
    lastUpdated: "2024-01-20",
  },
  {
    id: 3,
    title: "Portfolio Template",
    status: "draft",
    price: 29.99,
    sales: 0,
    lastUpdated: "2024-02-05",
  },
  {
    id: 4,
    title: "Blog System",
    status: "published",
    price: 39.99,
    sales: 42,
    lastUpdated: "2024-01-10",
  },
  {
    id: 5,
    title: "Admin Panel",
    status: "draft",
    price: 69.99,
    sales: 0,
    lastUpdated: "2024-02-18",
  },
  {
    id: 6,
    title: "Landing Page Builder",
    status: "published",
    price: 34.99,
    sales: 56,
    lastUpdated: "2023-11-30",
  },
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Templates</h2>
          <p className="text-muted-foreground">Manage and track all your templates in one place.</p>
        </div>
        <Button className="bg-[#6E00FF] hover:bg-[#5500CC] transition-all duration-200">
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search templates..." className="pl-8 bg-[#1E1E1E] border-[#2a2a2a]" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1E1E1E] hover:text-[#6E00FF]">
            All
          </Button>
          <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1E1E1E] hover:text-[#6E00FF]">
            Published
          </Button>
          <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1E1E1E] hover:text-[#6E00FF]">
            Drafts
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="bg-[#1E1E1E] border-[#2a2a2a] overflow-hidden glow-effect">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="aspect-video w-full md:w-48 bg-[#2a2a2a] flex items-center justify-center">
                  <span className="text-lg font-medium gradient-text">{template.title}</span>
                </div>
                <div className="flex flex-1 flex-col md:flex-row">
                  <div className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">{template.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={template.status === "published" ? "default" : "outline"}
                            className={
                              template.status === "published"
                                ? "bg-[#6E00FF] hover:bg-[#5500CC]"
                                : "text-muted-foreground"
                            }
                          >
                            {template.status === "published" ? "Published" : "Draft"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">Last updated: {template.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">${template.price}</div>
                          <div className="text-sm text-muted-foreground">{template.sales} sales</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="hover:bg-[#2a2a2a] hover:text-[#6E00FF]">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:bg-[#2a2a2a] hover:text-[#6E00FF]">
                            <FileEdit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="hover:bg-[#2a2a2a] hover:text-[#6E00FF]">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#1E1E1E] border-[#2a2a2a]">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-[#2a2a2a]" />
                              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">
                                {template.status === "published" ? "Unpublish" : "Publish"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">Promote</DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-[#2a2a2a]" />
                              <DropdownMenuItem className="text-destructive hover:bg-destructive/10 cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
