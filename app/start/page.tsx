"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function StartPage() {
  const [company, setCompany] = useState("");
  const router = useRouter();

  async function handleStart() {
    if (!company) {
      alert("Enter company name");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Not logged in");
      return;
    }

    const { data, error } = await supabase
      .from("companies")
      .insert({
        name: company,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem("company", data.id);
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md text-center">

        <h1 className="text-2xl font-bold mb-2">Welcome to CobSpot CRM</h1>

        <p className="text-gray-500 mb-6">
          Smart retail management for your inventory, sales, and customers.
        </p>

        <input
          type="text"
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="Enter Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <button
          onClick={handleStart}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          Start
        </button>

      </div>
    </div>
  );
}