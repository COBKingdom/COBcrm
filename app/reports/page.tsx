"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Sale = {
  total_price: number;
  created_at: string;
};

export default function ReportsPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTodaySales();
  }, []);

  async function fetchTodaySales() {
    const today = new Date().toISOString().split("T")[0];

    const { data } = await supabase
      .from("sales")
      .select("total_price, created_at")
      .gte("created_at", today);

    if (data) {
      setSales(data);

      const sum = data.reduce((acc, s) => acc + s.total_price, 0);
      setTotal(sum);
    }
  }

  function sendWhatsApp() {
    const message = `
📊 COB CRM DAILY REPORT

Total Sales: ₦${total.toLocaleString()}
Number of Transactions: ${sales.length}

Generated on: ${new Date().toLocaleDateString()}
`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <p className="text-gray-500">Today's Sales</p>
        <h2 className="text-2xl font-bold">₦{total.toLocaleString()}</h2>
        <p className="text-sm text-gray-500">
          {sales.length} transactions
        </p>
      </div>

      <button
        onClick={sendWhatsApp}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Send to WhatsApp
      </button>
    </div>
  );
}