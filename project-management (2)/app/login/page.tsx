'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useUser } from "../../context/UserContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useUser()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) throw new Error("Login failed")
      const data = await res.json()
      // On suppose que l'API retourne aussi le prénom et le nom
      setUser({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
      })
      router.push("/") // Redirect to home page on success
    } catch (err) {
      setError("Incorrect email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 shadow-xl rounded-2xl p-8 space-y-6 w-full max-w-sm border border-brand-yellow"
      >
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mb-4 text-brand-blue hover:text-brand-yellow hover:underline text-sm flex items-center gap-1 font-medium transition"
        >
          <span className="text-lg">←</span> Back
        </button>
        <h1 className="text-3xl font-extrabold text-center mb-2 text-brand-dark drop-shadow">
          Login
        </h1>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-brand-yellow focus:border-brand-blue p-2 rounded-lg outline-none transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-brand-yellow focus:border-brand-blue p-2 rounded-lg outline-none transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500 text-xs text-center">{error}</div>}
        <Button
          type="submit"
          className="w-full bg-brand-yellow text-brand-dark font-semibold py-2 rounded-lg hover:bg-brand-blue hover:text-white transition"
          disabled={loading}
        >
          {loading ? "Connecting..." : "Login"}
        </Button>
        <div className="text-center text-sm text-gray-500 pt-3">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-brand-blue hover:text-brand-yellow font-medium underline transition"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  )
}