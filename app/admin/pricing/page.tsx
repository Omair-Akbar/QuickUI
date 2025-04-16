import { DashboardHeader } from "@/components/admin/dashboard/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard/dashboard-shell"
import { PricingPlansTable } from "@/components/admin/pricing/pricing-plans-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CouponsTable } from "@/components/admin/pricing/coupons-table"

export default function PricingPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Pricing Plans"
        description="Manage pricing tiers for template promotion and offer discounts."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Plan
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plans">Pricing Plans</TabsTrigger>
          <TabsTrigger value="coupons">Coupon Codes</TabsTrigger>
        </TabsList>
        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Plans</CardTitle>
              <CardDescription>Manage pricing tiers for template promotion.</CardDescription>
            </CardHeader>
            <CardContent>
              <PricingPlansTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="coupons">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Coupon Codes</CardTitle>
                <CardDescription>Create and manage discount coupon codes.</CardDescription>
              </div>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Coupon
              </Button>
            </CardHeader>
            <CardContent>
              <CouponsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
