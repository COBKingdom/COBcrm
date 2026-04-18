"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const dailyData = [
  { date: "Apr 18, 2026", sales: "₦85,000", expenses: "₦12,000", profit: "₦73,000" },
  { date: "Apr 17, 2026", sales: "₦120,000", expenses: "₦8,500", profit: "₦111,500" },
  { date: "Apr 16, 2026", sales: "₦65,000", expenses: "₦15,000", profit: "₦50,000" },
]

const weeklyData = [
  { period: "Week 15", sales: "₦450,000", expenses: "₦85,000", profit: "₦365,000" },
  { period: "Week 14", sales: "₦380,000", expenses: "₦72,000", profit: "₦308,000" },
  { period: "Week 13", sales: "₦520,000", expenses: "₦95,000", profit: "₦425,000" },
]

const monthlyData = [
  { month: "April 2026", sales: "₦1,250,000", expenses: "₦320,000", profit: "₦930,000" },
  { month: "March 2026", sales: "₦1,180,000", expenses: "₦290,000", profit: "₦890,000" },
  { month: "February 2026", sales: "₦980,000", expenses: "₦250,000", profit: "₦730,000" },
]

export function ReportsTabs() {
  const [activeTab, setActiveTab] = useState("daily")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Expenses</TableHead>
                  <TableHead className="text-right">Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyData.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell className="font-medium">{row.date}</TableCell>
                    <TableCell>{row.sales}</TableCell>
                    <TableCell>{row.expenses}</TableCell>
                    <TableCell className="text-right">{row.profit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="weekly">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Expenses</TableHead>
                  <TableHead className="text-right">Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeklyData.map((row) => (
                  <TableRow key={row.period}>
                    <TableCell className="font-medium">{row.period}</TableCell>
                    <TableCell>{row.sales}</TableCell>
                    <TableCell>{row.expenses}</TableCell>
                    <TableCell className="text-right">{row.profit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="monthly">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Expenses</TableHead>
                  <TableHead className="text-right">Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyData.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell>{row.sales}</TableCell>
                    <TableCell>{row.expenses}</TableCell>
                    <TableCell className="text-right">{row.profit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
