"use client"

import { Sidebar } from "./sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="md:ml-64">
        <div className="p-6 pt-20 md:pt-6">
          {children}
        </div>
      </main>
    </div>
  )
}
