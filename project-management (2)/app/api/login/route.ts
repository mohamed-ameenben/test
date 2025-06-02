import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import bcrypt from "bcryptjs"

const USERS_FILE = path.resolve(process.cwd(), "users.json")

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  let users: { email: string; password: string }[] = []
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"))
  }

  const user = users.find(u => u.email === email)
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  // Vérifie le mot de passe hashé !
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  return NextResponse.json({ success: true, user: { email } })
}