import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingDown, Package, CreditCard } from "lucide-react"

const summaryData = [
  {
    title: "Total Sales",
    value: "₦1,250,000",
    icon: DollarSign,
    description: "+12% from last month",
  },
  {
    title: "Expenses",
    value: "₦320,000",
    icon: TrendingDown,
    description: "-5% from last month",
  },
  {
    title: "Stock Value",
    value: "₦2,450,000",
    icon: Package,
    description: "142 items in stock",
  },
  {
    title: "Outstanding Debts",
    value: "₦185,000",
    icon: CreditCard,
    description: "8 pending payments",
  },
]

export function SummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{item.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
