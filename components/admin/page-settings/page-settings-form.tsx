"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const aboutUsSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  subtitle: z.string().min(2, {
    message: "Subtitle must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
})

const contactUsSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  subtitle: z.string().min(2, {
    message: "Subtitle must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(5, {
    message: "Phone must be at least 5 characters.",
  }),
})

const privacySchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  lastUpdated: z.string().min(2, {
    message: "Last updated date is required.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
})

const termsSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  lastUpdated: z.string().min(2, {
    message: "Last updated date is required.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
})

const defaultValues = {
  about: {
    title: "About QuickUI",
    subtitle: "The Ultimate Template Marketplace",
    content:
      "QuickUI is a premium marketplace for high-quality UI templates and components. Our platform connects talented designers with developers and businesses looking for professional design solutions. Founded in 2020, we've grown to serve thousands of customers worldwide with our curated collection of templates.",
  },
  contact: {
    title: "Contact Us",
    subtitle: "Get in touch with our team",
    address: "123 Design Street, Creative City, 10001",
    email: "support@quickui.com",
    phone: "+1 (555) 123-4567",
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "2023-12-01",
    content:
      "This Privacy Policy describes how QuickUI collects, uses, and discloses your personal information when you visit our website, use our services, or otherwise interact with us. By using QuickUI, you agree to the collection and use of information in accordance with this policy.",
  },
  terms: {
    title: "Terms of Service",
    lastUpdated: "2023-12-01",
    content:
      "These Terms of Service govern your use of the QuickUI platform and provide information about the QuickUI Service, outlined below. When you create a QuickUI account or use QuickUI, you agree to these terms.",
  },
}

interface PageSettingsFormProps {
  type: "about" | "contact" | "privacy" | "terms"
}

export function PageSettingsForm({ type }: PageSettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const schema =
    type === "about"
      ? aboutUsSchema
      : type === "contact"
        ? contactUsSchema
        : type === "privacy"
          ? privacySchema
          : termsSchema

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues[type] as any,
  })

  function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Page updated",
        description: `The ${type} page has been updated successfully.`,
      })
      console.log(values)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter page title" {...field} />
              </FormControl>
              <FormDescription>This is the main title that appears at the top of the page.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === "about" || type === "contact" ? (
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input placeholder="Enter page subtitle" {...field} />
                </FormControl>
                <FormDescription>A brief description that appears below the title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="lastUpdated"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Updated</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>The date when this policy was last updated.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {type === "contact" ? (
          <>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter contact email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This email will be displayed on the contact page and used for receiving inquiries.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter page content" className="min-h-[300px]" {...field} />
                </FormControl>
                <FormDescription>The main content of the page. You can use markdown for formatting.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  )
}
