'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      })
      if (!res.ok) throw new Error("Registration failed")
      router.push("/login")
    } catch (err) {
      setError("An error occurred during registration. Try another email.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark">
      <form
        onSubmit={handleRegister}
        className="bg-white/90 shadow-xl rounded-2xl p-8 space-y-6 w-full max-w-sm border border-brand-yellow"
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mb-4 text-brand-blue hover:text-brand-yellow hover:underline text-sm flex items-center gap-1 font-medium transition"
        >
          <span className="text-lg">←</span> Back
        </button>
        <h1 className="text-3xl font-extrabold mb-2 text-center text-brand-dark drop-shadow">
          Sign Up
        </h1>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="w-full border border-brand-yellow focus:border-brand-blue p-2 rounded-lg outline-none transition"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            autoFocus
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-brand-yellow focus:border-brand-blue p-2 rounded-lg outline-none transition"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-brand-yellow focus:border-brand-blue p-2 rounded-lg outline-none transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-brand-yellow focus:border-brand-blue p-2 rounded-lg outline-none transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border border-brand-yellow focus:border-brand-blue p-2 rounded-lg outline-none transition"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500 text-xs text-center">{error}</div>}
        <Button
          type="submit"
          className="w-full bg-brand-yellow text-brand-dark font-semibold py-2 rounded-lg hover:bg-brand-blue hover:text-white transition"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        <div className="text-center text-sm text-gray-500 pt-3">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-brand-blue hover:text-brand-yellow font-medium underline transition"
          >
            Log in
          </a>
        </div>
      </form>
    </div>
  )
}
