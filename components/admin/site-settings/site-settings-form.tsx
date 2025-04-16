"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Upload } from "lucide-react"

const siteSettingsSchema = z.object({
  siteName: z.string().min(2, {
    message: "Site name must be at least 2 characters.",
  }),
  siteTagline: z.string().min(2, {
    message: "Site tagline must be at least 2 characters.",
  }),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
})

export function SiteSettingsForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof siteSettingsSchema>>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteName: "QuickUI",
      siteTagline: "The Ultimate Template Marketplace",
      primaryColor: "#6E00FF",
      secondaryColor: "#9B51E0",
      accentColor: "#F43F5E",
      backgroundColor: "#121212",
    },
  })

  function onSubmit(values: z.infer<typeof siteSettingsSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings updated",
        description: "Your site settings have been updated successfully.",
      })
      console.log(values)
    }, 1000)
  }

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="siteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter site name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will appear in the browser tab and throughout the site.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="siteTagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Tagline</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter site tagline" {...field} />
                  </FormControl>
                  <FormDescription>A short description of your site that appears in the header.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Logo & Favicon</h3>
              <Separator />

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <FormLabel>Site Logo</FormLabel>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed">
                      <img src="/placeholder.svg" alt="Logo preview" className="h-12 w-12" />
                    </div>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Recommended size: 200x50px. Max file size: 2MB.</p>
                </div>

                <div>
                  <FormLabel>Favicon</FormLabel>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed">
                      <img src="/placeholder.svg" alt="Favicon preview" className="h-8 w-8" />
                    </div>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Favicon
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Recommended size: 32x32px. Max file size: 1MB.</p>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="appearance">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="primaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Color</FormLabel>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: field.value }} />
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Color</FormLabel>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: field.value }} />
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accentColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accent Color</FormLabel>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: field.value }} />
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: field.value }} />
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Theme Preview</h3>
              <Separator />

              <div className="rounded-lg border p-4">
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md" style={{ backgroundColor: form.watch("primaryColor") }} />
                    <div>
                      <div className="text-sm font-medium">Primary Color</div>
                      <div className="text-xs text-muted-foreground">{form.watch("primaryColor")}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md" style={{ backgroundColor: form.watch("secondaryColor") }} />
                    <div>
                      <div className="text-sm font-medium">Secondary Color</div>
                      <div className="text-xs text-muted-foreground">{form.watch("secondaryColor")}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md" style={{ backgroundColor: form.watch("accentColor") }} />
                    <div>
                      <div className="text-sm font-medium">Accent Color</div>
                      <div className="text-xs text-muted-foreground">{form.watch("accentColor")}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="h-8 w-8 rounded-md border"
                      style={{ backgroundColor: form.watch("backgroundColor") }}
                    />
                    <div>
                      <div className="text-sm font-medium">Background Color</div>
                      <div className="text-xs text-muted-foreground">{form.watch("backgroundColor")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}
