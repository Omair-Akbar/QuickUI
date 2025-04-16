import { DashboardHeader } from "@/components/admin/dashboard/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard/dashboard-shell"
import { AffiliatesTable } from "@/components/admin/affiliates/affiliates-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function AffiliatesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Affiliates Management"
        description="Manage affiliate partners and track their performance."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Affiliate
        </Button>
      </DashboardHeader>
      <div className="grid gap-4">
        <AffiliatesTable />
      </div>
    </DashboardShell>
  )
}
