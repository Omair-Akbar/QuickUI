import { DashboardHeader } from "@/components/admin/dashboard/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard/dashboard-shell"
import { PromotionsTable } from "@/components/admin/promotions/promotions-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function PromotionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Promotions Management"
        description="Approve or reject template promotion requests and view promoted templates."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Promotion
        </Button>
      </DashboardHeader>
      <div className="grid gap-4">
        <PromotionsTable />
      </div>
    </DashboardShell>
  )
}
