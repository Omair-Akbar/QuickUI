"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import logo from "@/public/logo.png"
import RobotCanvas from "@/components/robot-model"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // Handle signup logic here
    console.log({ name, email, password })
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <Image src={logo || "/placeholder.svg"} alt="QuickUI Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-white">QuickUI</span>
          </div>

          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-white/70 mb-8">Sign up to get started with QuickUI</p>

          <div className="flex gap-4 mb-6">
            <Button
              variant="outline"
              className="w-full border-[#6E00FF]/30 hover:bg-[#6E00FF]/10 text-white bg-transparent"
              onClick={() => console.log("Google signup")}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </Button>
          </div>

          <div className="relative mb-6 flex items-center">
            <div className="flex-grow border-t border-[#6E00FF]/20"></div>
            <span className="flex-shrink mx-4 text-white/50 text-sm">or continue with</span>
            <div className="flex-grow border-t border-[#6E00FF]/20"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="bg-[#1A1A1A] border-[#6E00FF]/30 text-white focus:border-[#6E00FF] focus:ring-0"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-[#1A1A1A] border-[#6E00FF]/30 text-white focus:border-[#6E00FF] focus:ring-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-white/50">Must be at least 8 characters</p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm text-white/70">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#7f21f9] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#6E00FF] hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white">
                Create account
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-white/70">
            Already have an account?{" "}
            <Link href="/login" className="text-[#6E00FF] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - 3D Robot */}
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
