import { DashboardLayout } from "@/components/dashboard-layout"
import { ReportsTabs } from "@/components/reports-tabs"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">View sales and expense reports</p>
        </div>
        <ReportsTabs />
      </div>
    </DashboardLayout>
  )
}
