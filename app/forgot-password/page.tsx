"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import RobotCanvas from "@/components/robot-model"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [step, setStep] = useState<"email" | "otp" | "success">("email")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [generatedOtp, setGeneratedOtp] = useState("")

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setGeneratedOtp(data.otp)
        setStep("otp")
      } else {
        setError(data.message || "Something went wrong")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        setStep("success")
      } else {
        setError(data.message || "Invalid OTP")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col md:flex-row overflow-hidden">
      {/* Left side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="w-full md:w-1/2 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-md bg-[#6E00FF] flex items-center justify-center">
              <span className="font-bold text-white">QU</span>
            </div>
            <span className="text-xl font-bold text-white">QuickUI</span>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === "email" && (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-bold mb-2">Forgot password?</h1>
                <p className="text-white/70 mb-8">No worries, we'll send you reset instructions.</p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <div>
                        <h4 className="text-red-400 font-medium text-sm">Error</h4>
                        <p className="text-red-300 text-sm">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleEmailSubmit}>
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
                    <Button
                      type="submit"
                      className="w-full bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send reset instructions"
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-bold mb-2">Enter verification code</h1>
                <p className="text-white/70 mb-4">
                  We've sent a 6-digit code to <span className="text-white">{email}</span>
                </p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                  <p className="text-blue-300 text-sm">
                    <strong>Development Mode:</strong> Your OTP is:{" "}
                    <span className="font-mono text-lg">{generatedOtp}</span>
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <div>
                        <h4 className="text-red-400 font-medium text-sm">Error</h4>
                        <p className="text-red-300 text-sm">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleOtpSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        className="bg-[#1A1A1A] border-[#6E00FF]/30 text-white focus:border-[#6E00FF] focus:ring-0 text-center text-2xl tracking-widest"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        maxLength={6}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="••••••••"
                        className="bg-[#1A1A1A] border-[#6E00FF]/30 text-white focus:border-[#6E00FF] focus:ring-0"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white"
                      disabled={isLoading || otp.length !== 6}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Reset password"
                      )}
                    </Button>
                  </div>
                </form>

                <button className="text-[#6E00FF] hover:underline text-sm mt-4" onClick={() => setStep("email")}>
                  Use different email
                </button>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success-step"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle className="h-16 w-16 text-[#6E00FF]" />
                  </motion.div>
                </div>
                <h1 className="text-3xl font-bold mb-2">Password reset successful</h1>
                <p className="text-white/70 mb-8">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
                <Link href="/login">
                  <Button className="w-full bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white">Continue to sign in</Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8">
            <Link href="/login" className="flex items-center text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Right side - 3D Robot */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
        className="hidden md:block w-1/2 relative"
      >
        <div className="absolute inset-0 z-0 opacity-30">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute inset-0 flex items-center justify-center p-12"
        >
          <RobotCanvas className="w-full h-full max-w-lg" />
        </motion.div>
      </motion.div>
    </div>
  )
}
