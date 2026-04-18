import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "COB Inventory",
  description: "Inventory and Sales App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">

        <div className="flex min-h-screen">

          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col p-6">
            <h1 className="text-2xl font-bold mb-8">COB Inventory</h1>

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

          {/* Main Section */}
          <div className="flex-1 flex flex-col">

            {/* Top Bar */}
            <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
              <h2 className="font-semibold text-lg">Dashboard</h2>
              <span className="text-sm text-gray-500">Welcome, COB</span>
            </header>

            {/* Page Content */}
            <main className="p-6">
              {children}
            </main>

          </div>

        </div>

      </body>
    </html>
  );
}