"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");

  const router = useRouter();

  // 🔹 LOGIN
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  }

  // 🔥 SIGNUP (UPDATED — AUTO COMPANY CREATION)
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!firstName || !lastName || !company) {
      alert("Fill all fields");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (user) {
      // Save profile
      await supabase.from("profiles").insert({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        company_name: company,
      });

      // Create company
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .insert({
          name: company,
          user_id: user.id,
        })
        .select()
        .single();

      if (companyError) {
        alert(companyError.message);
        return;
      }

      if (companyData) {
        localStorage.setItem("company", companyData.id);
      }

      alert("Signup successful. Please check your email to confirm your account.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">

        <h1 className="text-xl font-bold text-center mb-4">
          CobSpot CRM
        </h1>

        {/* TOGGLE */}
        <div className="flex mb-4">
          <button
            className={`flex-1 p-2 ${!isSignup ? "bg-black text-white" : "bg-gray-200"}`}
            onClick={() => setIsSignup(false)}
          >
            Login
          </button>

          <button
            className={`flex-1 p-2 ${isSignup ? "bg-black text-white" : "bg-gray-200"}`}
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </button>
        </div>

        {!isSignup ? (
          <form onSubmit={handleLogin} className="space-y-3">

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-black text-white py-2 rounded-lg">
              Login
            </button>

          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-3">

            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border rounded-lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border rounded-lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Company Name"
              className="w-full p-2 border rounded-lg"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-black text-white py-2 rounded-lg">
              Create Account
            </button>

          </form>
        )}

      </div>
    </div>
  );
}