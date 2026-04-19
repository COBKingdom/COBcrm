"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [company, setCompany] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("company");
    if (saved) setCompany(saved);
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">

        {/* MOBILE TOP BAR */}
        <div className="md:hidden bg-black text-white p-4 flex items-center shadow">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-7 h-7" />
            <span className="font-bold text-lg">
              {company ? `CobSpot CRM - ${company}` : "CobSpot CRM"}
            </span>
          </div>
        </div>

        <div className="flex min-h-screen">

          {/* SIDEBAR */}
          <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col p-6">
            <div className="flex items-center gap-2 mb-8">
              <img src="/logo.png" className="w-8 h-8" />
              <span className="text-xl font-bold">
                {company ? `CobSpot CRM - ${company}` : "CobSpot CRM"}
              </span>
            </div>

            <nav className="flex flex-col gap-3">
              <Link href="/" className="hover:bg-gray-800 p-2 rounded-lg">
                Dashboard
              </Link>
              <Link href="/sales" className="hover:bg-gray-800 p-2 rounded-lg">
                Sales
              </Link>
              <Link href="/inventory" className="hover:bg-gray-800 p-2 rounded-lg">
                Inventory
              </Link>
              <Link href="/expenses" className="hover:bg-gray-800 p-2 rounded-lg">
                Expenses
              </Link>
              <Link href="/reports" className="hover:bg-gray-800 p-2 rounded-lg">
                Reports
              </Link>
            </nav>
          </aside>

          {/* MAIN */}
          <main className="flex-1 p-4 md:p-6 pb-20">
            {children}
          </main>
        </div>

        {/* MOBILE NAV */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2 text-xs">

          <Link href="/" className="flex flex-col items-center">
            <span>🏠</span>
            <span>Home</span>
          </Link>

          <Link href="/sales" className="flex flex-col items-center">
            <span>💰</span>
            <span>Sales</span>
          </Link>

          <Link href="/inventory" className="flex flex-col items-center">
            <span>📦</span>
            <span>Stock</span>
          </Link>

          <Link href="/expenses" className="flex flex-col items-center">
            <span>💸</span>
            <span>Expenses</span>
          </Link>

        </div>

      </body>
    </html>
  );
}