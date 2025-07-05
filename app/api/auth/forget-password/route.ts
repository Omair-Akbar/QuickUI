import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/lib/models/User"

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map<string, { otp: string; expires: number }>()

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    await connectDB()

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { message: "If an account with this email exists, we've sent reset instructions." },
        { status: 200 },
      )
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP with 10-minute expiration
    otpStore.set(email, {
      otp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
    })

    // In development, log the OTP to console
    console.log(`🔐 Password reset OTP for ${email}: ${otp}`)

    return NextResponse.json({
      message: "Reset instructions sent to your email",
      otp, // Remove this in production
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
