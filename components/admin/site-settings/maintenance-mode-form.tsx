"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

const maintenanceSchema = z.object({
  enabled: z.boolean(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  scheduledStart: z.string().optional(),
  scheduledEnd: z.string().optional(),
  allowAdminAccess: z.boolean(),
})

export function MaintenanceModeForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof maintenanceSchema>>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      enabled: false,
      title: "We'll be back soon!",
      message: "We're currently performing scheduled maintenance. Please check back shortly.",
      scheduledStart: "",
      scheduledEnd: "",
      allowAdminAccess: true,
    },
  })

  const watchEnabled = form.watch("enabled")

  function onSubmit(values: z.infer<typeof maintenanceSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: values.enabled ? "Maintenance mode enabled" : "Maintenance mode disabled",
        description: values.enabled
          ? "Your site is now in maintenance mode."
          : "Your site is now accessible to all users.",
      })
      console.log(values)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Maintenance Mode</FormLabel>
                <FormDescription>When enabled, your site will display a maintenance page to visitors.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {watchEnabled && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Enabling maintenance mode will make your site inaccessible to regular users. Only administrators will be
              able to access the site if you enable admin access below.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Maintenance Page Content</h3>
          <Separator />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter maintenance page title" {...field} />
                </FormControl>
                <FormDescription>This will be displayed as the main heading on the maintenance page.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter maintenance message" className="min-h-[100px]" {...field} />
                </FormControl>
                <FormDescription>
                  Explain to your users why the site is in maintenance mode and when they can expect it to be back.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Schedule (Optional)</h3>
          <Separator />

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="scheduledStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormDescription>When maintenance mode should automatically start.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scheduledEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormDescription>When maintenance mode should automatically end.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="allowAdminAccess"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Allow Admin Access</FormLabel>
                <FormDescription>
                  When enabled, administrators can still access the site during maintenance.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  )
}
