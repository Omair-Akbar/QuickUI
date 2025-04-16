import { DashboardHeader } from "@/components/admin/dashboard/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TopTemplatesTable } from "@/components/admin/stats/top-templates-table"
import { TopUsersTable } from "@/components/admin/stats/top-users-table"
import { StatsOverview } from "@/components/admin/stats/stats-overview"

export default function StatsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Top Stats" description="View top performing templates and users." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,429</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,589</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89,234</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,853</div>
            <p className="text-xs text-muted-foreground">+7% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Monthly template sales and downloads.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <StatsOverview />
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates">Top Templates</TabsTrigger>
          <TabsTrigger value="users">Top Users</TabsTrigger>
        </TabsList>
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Top Templates</CardTitle>
              <CardDescription>The most downloaded and purchased templates.</CardDescription>
            </CardHeader>
            <CardContent>
              <TopTemplatesTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Top Users</CardTitle>
              <CardDescription>Users with the highest earnings and sales.</CardDescription>
            </CardHeader>
            <CardContent>
              <TopUsersTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
