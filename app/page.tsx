"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [stock, setStock] = useState(0);
  const [sales, setSales] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const companyId = localStorage.getItem("company");

    if (!companyId) {
      router.push("/start");
      return;
    }

    fetchData(companyId);
  }

  async function fetchData(companyId: string) {
    const { data: products } = await supabase
      .from("products")
      .select("stock")
      .eq("company_id", companyId);

    const totalStock =
      products?.reduce((sum, p) => sum + p.stock, 0) || 0;

    setStock(totalStock);

    const { data: salesData } = await supabase
      .from("sales")
      .select("total_price")
      .eq("company_id", companyId);

    const totalSales =
      salesData?.reduce((sum, s) => sum + s.total_price, 0) || 0;

    setSales(totalSales);

    const { data: expenseData } = await supabase
      .from("expenses")
      .select("amount")
      .eq("company_id", companyId);

    const totalExpenses =
      expenseData?.reduce((sum, e) => sum + e.amount, 0) || 0;

    setExpenses(totalExpenses);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Stock</p>
          <h2 className="text-xl font-bold">{stock}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Sales</p>
          <h2 className="text-xl font-bold">₦{sales.toLocaleString()}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Expenses</p>
          <h2 className="text-xl font-bold">₦{expenses.toLocaleString()}</h2>
        </div>

      </div>
    </div>
  );
}