"use client"

import type React from "react"

import axios from "axios"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle, Check } from "lucide-react"
import logo from "@/public/logo.png"
import RobotCanvas from "@/components/robot-model"
import OauthLogin from "@/components/OauthLogin"


// Animated Button Component
const AnimatedButton: React.FC<{
  children: React.ReactNode
  className?: string
  type?: "button" | "submit"
  disabled?: boolean
  isLoading?: boolean
  onClick?: () => void
}> = ({ children, className = "", type = "button", disabled = false, isLoading = false, onClick }) => {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      <Button
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={`relative overflow-hidden bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white transition-all duration-300 ${className}`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating account...</span>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          whileHover={{ opacity: 0.1 }}
        />
      </Button>
    </motion.div>
  )
}

// Error Alert Component
const ErrorAlert: React.FC<{ message: string }> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4"
    >
      <div className="flex items-center gap-3">
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <AlertCircle className="h-5 w-5 text-red-400" />
        </motion.div>
        <div>
          <h4 className="text-red-400 font-medium text-sm">Error</h4>
          <p className="text-red-300 text-sm">{message}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Success Alert Component
const SuccessAlert: React.FC<{ message: string }> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4"
    >
      <div className="flex items-center gap-3">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: "backOut" }}>
          <CheckCircle className="h-5 w-5 text-green-400" />
        </motion.div>
        <div>
          <h4 className="text-green-400 font-medium text-sm">Success</h4>
          <p className="text-green-300 text-sm">{message}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Animated Input Component
const AnimatedInput: React.FC<{
  id: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  hasError?: boolean
}> = ({ id, type, placeholder, value, onChange, required = false, hasError = false }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`border-none ring-0 outline-none bg-[#1A1A1A] border-[#6E00FF]/30 text-white focus:border-[#6E00FF] focus:ring-0 transition-all duration-300 ${hasError ? "border-red-500/50 focus:border-red-500" : ""
          } ${isFocused ? "shadow-lg shadow-[#6E00FF]/20" : ""}`}
      />
    </motion.div>
  )
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [checked, setChecked] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    password?: string
  }>({})

  const validateForm = () => {
    const errors: typeof fieldErrors = {}

    if (!name.trim()) {
      errors.name = "Full name is required"
    }

    if (!email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setError("")
    setSuccess("")

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      console.log({ name, email, password })

      const response = await axios.post("/api/user/signup", {
        name,
        email,
        password,
      })

      console.log(response)

      // Show success message from API
      setSuccess(response.data.message || "Account created successfully!")

      // Clear form
      setName("")
      setEmail("")
      setPassword("")
      setFieldErrors({})
    } catch (err: any) {
      console.error("Signup error:", err)

      // Handle API error responses
      if (err.response?.data) {
        const errorData = err.response.data

        // Handle validation errors with specific field errors
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const newFieldErrors: typeof fieldErrors = {}
          errorData.errors.forEach((error: any) => {
            if (error.field && error.message) {
              newFieldErrors[error.field as keyof typeof fieldErrors] = error.message
            }
          })
          setFieldErrors(newFieldErrors)
          setError("Please fix the errors below")
        } else {
          // Handle general API errors
          setError(errorData.message || "Something went wrong")
        }
      } else if (err.code === "ERR_NETWORK") {
        setError("Network error. Please check your connection and try again")
      } else {
        setError("Something went wrong. Please try again later")
      }
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
            <div className="w-8 h-8 relative">
              <Image src={logo || "/placeholder.svg"} alt="QuickUI Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-white">QuickUI</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-3xl font-bold mb-2">Create an account</h1>
            <p className="text-white/70 mb-8">Sign up to get started with QuickUI</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <OauthLogin />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative mb-6 flex items-center"
          >
            <div className="flex-grow border-t border-[#6E00FF]/20"></div>
            <span className="flex-shrink mx-4 text-white/50 text-sm">or continue with</span>
            <div className="flex-grow border-t border-[#6E00FF]/20"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Error and Success Messages */}
            <AnimatePresence>
              {error && <ErrorAlert message={error} />}
              {success && <SuccessAlert message={success} />}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name">Full Name</Label>
                  <AnimatedInput
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    hasError={!!fieldErrors.name}
                  />
                  <AnimatePresence>
                    {fieldErrors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-red-400"
                      >
                        {fieldErrors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email">Email</Label>
                  <AnimatedInput
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    hasError={!!fieldErrors.email}
                  />
                  <AnimatePresence>
                    {fieldErrors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-red-400"
                      >
                        {fieldErrors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <AnimatedInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      hasError={!!fieldErrors.password}
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-3 top-1/3 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <AnimatePresence mode="wait">
                        {showPassword ? (
                          <motion.div
                            key="hide"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                          >
                            <EyeOff className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="show"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Eye className="h-4 w-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {fieldErrors.password ? (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-red-400"
                      >
                        {fieldErrors.password}
                      </motion.p>
                    ) : (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-white/50">
                        Must be at least 8 characters
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.0 }}
                  className="flex items-start space-x-3"
                >
                  {/* Custom Checkbox */}
                  <div
                    onClick={() => setChecked((prev) => !prev)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${checked ? "bg-[#6E00FF] border-[#6E00FF]" : "bg-transparent border-white/30"
                      }`}
                  >
                    <AnimatePresence>
                      {checked && (
                        <motion.div
                          key="check-icon"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Check size={16} className="text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Label */}
                  <label htmlFor="terms" className="text-sm text-white/70 cursor-pointer" onClick={() => setChecked((prev) => !prev)}>
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#6E00FF] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#6E00FF] hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.1 }}
                >
                  <AnimatedButton type="submit" className="w-full" disabled={isLoading} isLoading={isLoading}>
                    Create account
                  </AnimatedButton>
                </motion.div>
              </div>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-6 text-center text-white/70"
            >
              Already have an account?{" "}
              <Link href="/login" className="text-[#6E00FF] hover:underline">
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - 3D Robot */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
        className="hidden md:block w-1/2 relative"
      >
        {/* Background effects - same as hero */}
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

        {/* 3D Robot Container */}
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
