"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Upload, X } from "lucide-react"

export default function UploadPage() {
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [isPublished, setIsPublished] = useState(false)

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upload Template</h2>
        <p className="text-muted-foreground">Share your work with the QuickUI community.</p>
      </div>

      <Card className="bg-[#1E1E1E] border-[#2a2a2a]">
        <CardContent className="p-6">
          <form className="space-y-8">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Template Title</Label>
                  <Input id="title" placeholder="Enter template title" className="bg-[#121212] border-[#2a2a2a]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger className="bg-[#121212] border-[#2a2a2a]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E1E1E] border-[#2a2a2a]">
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="admin">Admin Panel</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your template..."
                  className="min-h-32 bg-[#121212] border-[#2a2a2a]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-[#6E00FF]">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  id="tags"
                  placeholder="Add tags (press Enter)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="bg-[#121212] border-[#2a2a2a]"
                />
                <p className="text-xs text-muted-foreground">
                  Press Enter to add a tag. Tags help users find your template.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Preview Image</Label>
                  <div className="border-2 border-dashed border-[#2a2a2a] rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-[#121212] hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-[#6E00FF]" />
                    <p className="text-sm text-center text-muted-foreground">
                      Drag & drop or click to upload preview image
                    </p>
                    <p className="text-xs text-center text-muted-foreground">Recommended size: 1200x800px, Max 5MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Template Files</Label>
                  <div className="border-2 border-dashed border-[#2a2a2a] rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-[#121212] hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-[#6E00FF]" />
                    <p className="text-sm text-center text-muted-foreground">
                      Drag & drop or click to upload template files
                    </p>
                    <p className="text-xs text-center text-muted-foreground">
                      Upload a ZIP file containing all template files, Max 50MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="demo">Demo URL</Label>
                  <Input id="demo" placeholder="https://example.com/demo" className="bg-[#121212] border-[#2a2a2a]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="29.99" className="bg-[#121212] border-[#2a2a2a]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Publish Template</Label>
                  <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {isPublished
                    ? "Your template will be immediately available for purchase."
                    : "Save as draft to publish later."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white">
                Cancel
              </Button>
              <Button className="bg-[#6E00FF] hover:bg-[#5500CC] transition-all duration-200">
                {isPublished ? "Publish Template" : "Save as Draft"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
