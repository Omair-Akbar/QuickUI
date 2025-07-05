"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle } from "lucide-react"
import RobotCanvas from "@/components/robot-model"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle password reset logic here
    console.log({ email })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[#6E00FF] flex items-center justify-center">
              <span className="font-bold text-white">QU</span>
            </div>
            <span className="text-xl font-bold text-white">QuickUI</span>
          </div>

          {!submitted ? (
            <>
              <h1 className="text-3xl font-bold mb-2">Forgot password?</h1>
              <p className="text-white/70 mb-8">No worries, we'll send you reset instructions.</p>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="bg-[#1A1A1A] border-[#6E00FF]/30 text-white focus:border-[#6E00FF] focus:ring-0"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white">
                    Send reset instructions
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-[#6E00FF]" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Check your email</h1>
              <p className="text-white/70 mb-8">
                We've sent a password reset link to <span className="text-white">{email}</span>
              </p>
              <p className="text-white/70 mb-8">
                Didn't receive the email? Check your spam folder or{" "}
                <button className="text-[#6E00FF] hover:underline" onClick={() => setSubmitted(false)}>
                  try another email address
                </button>
              </p>
            </div>
          )}

          <div className="mt-8">
            <Link href="/login" className="flex items-center text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block w-1/2 relative">
        {/* Background effects - same as hero */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]" />
        </div>

        {/* 3D Robot Container */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <RobotCanvas className="w-full h-full max-w-lg" />
        </div>
      </div>
    </div>
  )
}

