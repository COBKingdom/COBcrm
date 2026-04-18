"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

type Sale = {
  id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  payment_type: string;
  customer_name: string;
  phone: string;
  created_at: string;
  product: {
    name: string;
  };
};

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [payment, setPayment] = useState("cash");

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*");
    if (data) setProducts(data);
  }

  async function fetchSales() {
    const { data } = await supabase
      .from("sales")
      .select(`
        id,
        quantity,
        unit_price,
        total_price,
        payment_type,
        customer_name,
        phone,
        created_at,
        product:products(name)
      `)
      .order("created_at", { ascending: false });

    if (data) setSales(data as any);
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
      customer_name: customerName,
      phone: phone,
    });

    await supabase
      .from("products")
      .update({ stock: product.stock - quantity })
      .eq("id", product.id);

    alert("Sale recorded");

    fetchProducts();
    fetchSales();

    setCustomerName("");
    setPhone("");
    setProductId("");
    setQuantity(1);
    setUnitPrice(0);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sales</h1>

      {/* FORM */}
      <form onSubmit={handleSale} className="space-y-4 max-w-md mb-8">

        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
        />

        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
        />

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

        <input
          type="number"
          className="w-full p-2 border rounded-lg"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
        />

        <input
          type="number"
          className="w-full p-2 border rounded-lg"
          value={unitPrice}
          onChange={(e) => setUnitPrice(Number(e.target.value))}
          placeholder="Unit Price"
        />

        <div className="bg-gray-100 p-3 rounded-lg font-semibold">
          Total: ₦{total}
        </div>

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

      {/* HISTORY */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-bold mb-4">Sales History</h2>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th>Customer</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {sales.map(s => (
              <tr key={s.id} className="border-b">
                <td>{s.customer_name}</td>
                <td>{s.phone}</td>
                <td>{s.product?.name}</td>
                <td>{s.quantity}</td>
                <td>₦{s.unit_price}</td>
                <td>₦{s.total_price}</td>
                <td>{s.payment_type}</td>
                <td>
                  {new Date(s.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}