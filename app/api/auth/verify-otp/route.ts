import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import connectDB from "@/lib/db"
import User from "@/lib/models/User"

// This should match the store from forgot-password route
// In production, use a shared Redis instance or database
const otpStore = new Map<string, { otp: string; expires: number }>()

export async function POST(request: Request) {
  try {
    const { email, otp, newPassword } = await request.json()

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ message: "Email, OTP, and new password are required" }, { status: 400 })
    }

    // Check if OTP exists and is valid
    const storedOtpData = otpStore.get(email)
    if (!storedOtpData) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 })
    }

    // Check if OTP has expired
    if (Date.now() > storedOtpData.expires) {
      otpStore.delete(email)
      return NextResponse.json({ message: "OTP has expired" }, { status: 400 })
    }

    // Verify OTP
    if (storedOtpData.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 })
    }

    // Validate new password
    if (newPassword.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 })
    }

    await connectDB()

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update user password
    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    )

    // Remove OTP from store
    otpStore.delete(email)

    console.log(`✅ Password successfully reset for ${email}`)

    return NextResponse.json({
      message: "Password reset successfully",
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
