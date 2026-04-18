"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  stock: number;
};

type Sale = {
  total_price: number;
};

type Expense = {
  amount: number;
};

export default function Dashboard() {
  const [stock, setStock] = useState(0);
  const [sales, setSales] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: products } = await supabase
      .from("products")
      .select("stock");

    const totalStock =
      products?.reduce((sum, p) => sum + p.stock, 0) || 0;

    setStock(totalStock);

    const { data: salesData } = await supabase
      .from("sales")
      .select("total_price");

    const totalSales =
      salesData?.reduce((sum, s) => sum + s.total_price, 0) || 0;

    setSales(totalSales);

    const { data: expenseData } = await supabase
      .from("expenses")
      .select("amount");

    const totalExpenses =
      expenseData?.reduce((sum, e) => sum + e.amount, 0) || 0;

    setExpenses(totalExpenses);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <p className="text-gray-500">Total Stock</p>
          <h2 className="text-xl font-bold">{stock}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <p className="text-gray-500">Total Sales</p>
          <h2 className="text-xl font-bold">₦{sales.toLocaleString()}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <p className="text-gray-500">Expenses</p>
          <h2 className="text-xl font-bold">₦{expenses.toLocaleString()}</h2>
        </div>

      </div>
    </div>
  );
}