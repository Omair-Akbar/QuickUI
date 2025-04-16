import { DashboardHeader } from "@/components/admin/dashboard/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard/dashboard-shell"
import { SiteSettingsForm } from "@/components/admin/site-settings/site-settings-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaintenanceModeForm } from "@/components/admin/site-settings/maintenance-mode-form"

export default function SiteSettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Site Settings" description="Manage site appearance, branding, and maintenance mode." />

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="branding">Branding & Appearance</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Mode</TabsTrigger>
        </TabsList>
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding & Appearance</CardTitle>
              <CardDescription>Manage your site's logo, favicon, and theme colors.</CardDescription>
            </CardHeader>
            <CardContent>
              <SiteSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>Enable maintenance mode when performing updates or maintenance.</CardDescription>
            </CardHeader>
            <CardContent>
              <MaintenanceModeForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
