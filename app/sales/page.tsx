"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SalesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [payment, setPayment] = useState("cash");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const companyId = localStorage.getItem("company");

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("company_id", companyId);

    if (data) setProducts(data);
  }

  function handleProductChange(id: string) {
    setProductId(id);
    const product = products.find(p => p.id === id);
    if (product) setUnitPrice(product.price);
  }

  const total = unitPrice * quantity;

  async function handleSale(e: React.FormEvent) {
    e.preventDefault();

    const companyId = localStorage.getItem("company");

    const product = products.find(p => p.id === productId);
    if (!product) return alert("Select product");

    await supabase.from("sales").insert({
      product_id: product.id,
      quantity,
      unit_price: unitPrice,
      total_price: total,
      payment_type: payment,
      company_id: companyId,
    });

    await supabase
      .from("products")
      .update({ stock: product.stock - quantity })
      .eq("id", product.id);

    alert("Sale recorded");

    fetchProducts();
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Sales</h1>

      <form onSubmit={handleSale} className="space-y-4">

        <select
          className="w-full p-2 border rounded"
          onChange={(e) => handleProductChange(e.target.value)}
        >
          <option>Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="w-full p-2 border rounded"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <input
          type="number"
          className="w-full p-2 border rounded"
          value={unitPrice}
          onChange={(e) => setUnitPrice(Number(e.target.value))}
        />

        <p>Total: ₦{total}</p>

        <button className="bg-black text-white px-4 py-2 rounded">
          Save Sale
        </button>

      </form>
    </div>
  );
}