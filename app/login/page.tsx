// "use client"

// import { useState, useTransition } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import RobotCanvas from "@/components/robot-model"
// import { authenticate , signInWithGoogle, signInWithGitHub} from "@/lib/auth/action"
// // 
// import { useActionState } from "react"

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [isPending, startTransition] = useTransition()
//   const [errorMessage, formAction] = useActionState(authenticate, undefined)

//   const handleGoogleSignIn = () => {
//     startTransition(async () => {
//       await signInWithGoogle()
//     })
//   }

//   const handleGitHubSignIn = () => {
//     startTransition(async () => {
//       await signInWithGitHub()
//     })
//   }

//   return (
//     <div className="min-h-screen bg-[#121212] text-white flex flex-col md:flex-row">
//       {/* Left side - Form */}
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
//         className="w-full md:w-1/2 flex items-center justify-center p-8"
//       >
//         <div className="w-full max-w-md">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="mb-8 flex items-center gap-2"
//           >
//             <div className="w-8 h-8 rounded-md bg-[#6E00FF] flex items-center justify-center">
//               <span className="font-bold text-white">QU</span>
//             </div>
//             <span className="text-xl font-bold text-white">QuickUI</span>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
//             <p className="text-white/70 mb-8">Sign in to your account to continue</p>
//           </motion.div>

//           {/* OAuth Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="flex flex-col md:flex-row gap-4 mb-6"
//           >
//             <Button
//               variant="outline"
//               className="w-full border-[#6E00FF]/30 hover:bg-[#6E00FF]/10 text-white bg-transparent"
//               onClick={handleGoogleSignIn}
//               disabled={isPending}
//             >
//               <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                 <path
//                   fill="currentColor"
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                 />
//               </svg>
//               Sign in with Google
//             </Button>
//             <Button
//               variant="outline"
//               className="w-full border-[#6E00FF]/30 hover:bg-[#6E00FF]/10 text-white bg-transparent"
//               onClick={handleGitHubSignIn}
//               disabled={isPending}
//             >
//               <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
//               </svg>
//               Sign in with GitHub
//             </Button>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//             className="relative mb-6 flex items-center"
//           >
//             <div className="flex-grow border-t border-[#6E00FF]/20"></div>
//             <span className="flex-shrink mx-4 text-white/50 text-sm">or continue with</span>
//             <div className="flex-grow border-t border-[#6E00FF]/20"></div>
//           </motion.div>

//           {/* Error Message */}
//           <AnimatePresence>
//             {errorMessage && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4"
//               >
//                 <div className="flex items-center gap-3">
//                   <AlertCircle className="h-5 w-5 text-red-400" />
//                   <div>
//                     <h4 className="text-red-400 font-medium text-sm">Error</h4>
//                     <p className="text-red-300 text-sm">{errorMessage}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <form action={formAction}>
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="name@example.com"
//                     className="bg-[#1A1A1A] border-[#6E00FF]/30 text-white focus:border-[#6E00FF] focus:ring-0"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="password">Password</Label>
//                     <Link href="/forgot-password" className="text-sm text-[#6E00FF] hover:underline">
//                       Forgot password?
//                     </Link>
//                   </div>
//                   <div className="relative">
//                     <Input
//                       id="password"
//                       name="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="••••••••"
//                       className="bg-[#1A1A1A] border-[#6E00FF]/30 text-white focus:border-[#6E00FF] focus:ring-0"
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Checkbox id="remember" />
//                   <Label htmlFor="remember" className="text-sm text-white/70">
//                     Remember me for 30 days
//                   </Label>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white"
//                   disabled={isPending}
//                 >
//                   {isPending ? (
//                     <>
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                       Signing in...
//                     </>
//                   ) : (
//                     "Sign in"
//                   )}
//                 </Button>
//               </div>
//             </form>

//             <p className="mt-6 text-center text-white/70">
//               Don't have an account?{" "}
//               <Link href="/signup" className="text-[#6E00FF] hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Right side - 3D Robot */}
//       <motion.div
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
//         className="hidden md:block w-1/2 relative"
//       >
//         <div className="absolute inset-0 z-0 opacity-30">
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]"
//           />
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 1, delay: 0.7 }}
//             className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]"
//           />
//         </div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="absolute inset-0 flex items-center justify-center p-12"
//         >
//           <RobotCanvas className="w-full h-full max-w-lg" />
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }


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
