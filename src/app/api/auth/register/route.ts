import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName, userType, phone, ...organizerData } = body

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    const supabase = await createClient()

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error("Supabase auth error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!data.user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // Determine role based on userType
    const role: "USER" | "ORGANIZER" = userType === "partner" ? "ORGANIZER" : "USER"

    // Prepare user data
    const userData = {
      id: data.user.id,
      email: email.toLowerCase(),
      password: password, // In production, you might want to hash this
      name: fullName,
      role: role,
      phone: phone || null,
      // Organizer-specific fields (will be null for regular users)
      companyName: userType === "partner" ? (organizerData.companyName || null) : null,
      companyAddress: userType === "partner" ? (organizerData.companyAddress || null) : null,
      companyType: userType === "partner" ? (organizerData.companyType || null) : null,
      businessLicense: userType === "partner" ? (organizerData.businessLicense || null) : null,
      bankAccount: userType === "partner" ? (organizerData.bankAccount || null) : null,
      bankName: userType === "partner" ? (organizerData.bankName || null) : null,
      accountHolder: userType === "partner" ? (organizerData.accountHolder || null) : null,
      description: userType === "partner" ? (organizerData.description || null) : null
    }

    // Save user data to User table using Prisma
    const user = await prisma.user.create({
      data: userData
    })

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
