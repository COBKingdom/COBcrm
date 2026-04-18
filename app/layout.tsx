import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "COB CRM",
  description: "Inventory and Sales System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">

        {/* MOBILE TOP BAR */}
        <div className="md:hidden bg-black text-white p-4 flex justify-between items-center">
          <h1 className="font-bold text-lg">COB CRM</h1>
        </div>

        {/* MOBILE NAV */}
        <div className="md:hidden flex justify-around bg-white shadow p-2 text-sm">
          <Link href="/">Dashboard</Link>
          <Link href="/sales">Sales</Link>
          <Link href="/inventory">Inventory</Link>
          <Link href="/expenses">Expenses</Link>
        </div>

        <div className="flex min-h-screen">

          {/* SIDEBAR (DESKTOP ONLY) */}
          <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col p-6">
            <h1 className="text-2xl font-bold mb-8">COB CRM</h1>

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

          {/* MAIN CONTENT */}
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}