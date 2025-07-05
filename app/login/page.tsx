"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import RobotCanvas from "@/components/robot-model"
import OauthLogin from "@/components/OauthLogin"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (email === "admin@123" && password === "admin") router.push("/admin")
    else router.push("/client")
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

          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-white/70 mb-8">Sign in to your account to continue</p>

         <OauthLogin/>

          <div className="relative mb-6 flex items-center">
            <div className="flex-grow border-t border-[#6E00FF]/20"></div>
            <span className="flex-shrink mx-4 text-white/50 text-sm">or continue with</span>
            <div className="flex-grow border-t border-[#6E00FF]/20"></div>
          </div>

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
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-[#6E00FF] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-[#1A1A1A] border-[#6E00FF]/30 text-white focus:border-[#6E00FF] focus:ring-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm text-white/70">
                  Remember me for 30 days
                </Label>
              </div>

              <Button type="submit" className="w-full bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white">
                Sign in
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-white/70">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#6E00FF] hover:underline">
              Sign up
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
