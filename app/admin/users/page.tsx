import { DashboardHeader } from "@/components/admin/dashboard/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard/dashboard-shell"
import { UsersTable } from "@/components/admin/users/users-table"

export default function UsersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Users Management" description="Manage all users on the platform." />
      <div className="grid gap-4">
        <UsersTable />
      </div>
    </DashboardShell>
  )
}
