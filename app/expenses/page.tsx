import { DashboardLayout } from "@/components/dashboard-layout"
import { ExpensesForm } from "@/components/expenses-form"

export default function ExpensesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Expenses</h1>
          <p className="text-muted-foreground">Track your business expenses</p>
        </div>
        <ExpensesForm />
      </div>
    </DashboardLayout>
  )
}
