import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/admin/dashboard/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard/dashboard-shell"
import { TemplatesTable } from "@/components/admin/templates/templates-table"
import { PlusCircle } from "lucide-react"

export default function TemplatesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Templates Management" description="Manage all templates on the platform.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Template
        </Button>
      </DashboardHeader>
      <div className="grid gap-4">
        <TemplatesTable />
      </div>
    </DashboardShell>
  )
}
