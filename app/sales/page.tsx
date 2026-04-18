"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [payment, setPayment] = useState("cash");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*");
    if (data) setProducts(data);
  }

  function handleProductChange(id: string) {
    setProductId(id);
    const product = products.find(p => p.id === id);
    if (product) {
      setUnitPrice(product.price);
    }
  }

  const total = unitPrice * quantity;

  async function handleSale(e: React.FormEvent) {
    e.preventDefault();

    const product = products.find(p => p.id === productId);
    if (!product) return alert("Select product");

    if (product.stock < quantity) {
      return alert("Not enough stock");
    }

    await supabase.from("sales").insert({
      product_id: product.id,
      quantity,
      unit_price: unitPrice,
      discount: 0,
      total_price: total,
      payment_type: payment,
    });

    await supabase
      .from("products")
      .update({ stock: product.stock - quantity })
      .eq("id", product.id);

    alert("Sale recorded");

    fetchProducts();
    setProductId("");
    setQuantity(1);
    setUnitPrice(0);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Record Sale</h1>

      <form onSubmit={handleSale} className="space-y-4 max-w-md">

        {/* Product */}
        <select
          className="w-full p-2 border rounded-lg"
          value={productId}
          onChange={(e) => handleProductChange(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} (Stock: {p.stock})
            </option>
          ))}
        </select>

        {/* Quantity */}
        <input
          type="number"
          className="w-full p-2 border rounded-lg"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          placeholder="Quantity"
        />

        {/* Unit Price */}
        <input
          type="number"
          className="w-full p-2 border rounded-lg"
          value={unitPrice}
          onChange={(e) => setUnitPrice(Number(e.target.value))}
          placeholder="Price per unit"
        />

        {/* Total Display */}
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-gray-500">Total Amount</p>
          <h2 className="text-xl font-bold">₦{total}</h2>
        </div>

        {/* Payment */}
        <select
          className="w-full p-2 border rounded-lg"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="transfer">Transfer</option>
          <option value="debt">Debt</option>
        </select>

        <button className="bg-black text-white px-4 py-2 rounded-lg">
          Record Sale
        </button>

      </form>
    </div>
  );
}