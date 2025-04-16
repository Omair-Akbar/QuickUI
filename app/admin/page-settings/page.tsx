import { DashboardHeader } from "@/components/admin/dashboard/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard/dashboard-shell"
import { PageSettingsForm } from "@/components/admin/page-settings/page-settings-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PageSettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Page Settings"
        description="Edit content of About Us, Contact Us, Privacy Policy and manage contact email address."
      />

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about">About Us</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Us Page</CardTitle>
              <CardDescription>Edit the content of your About Us page.</CardDescription>
            </CardHeader>
            <CardContent>
              <PageSettingsForm type="about" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us Page</CardTitle>
              <CardDescription>
                Edit the content of your Contact Us page and manage contact email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PageSettingsForm type="contact" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
              <CardDescription>Edit your Privacy Policy content.</CardDescription>
            </CardHeader>
            <CardContent>
              <PageSettingsForm type="privacy" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="terms">
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
              <CardDescription>Edit your Terms of Service content.</CardDescription>
            </CardHeader>
            <CardContent>
              <PageSettingsForm type="terms" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
