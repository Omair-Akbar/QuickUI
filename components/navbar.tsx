"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, FileText, DollarSign, Info, ChevronDown } from "lucide-react"
import logo from "@/public/logo.png"
import text from "@/public/quickui.png"
import { motion, AnimatePresence } from "framer-motion"

// Animated Menu Button Component
const AnimatedMenuButton: React.FC<{
  isOpen: boolean
  onClick: () => void
}> = ({ isOpen, onClick }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white hover:bg-white/10 rounded-full relative w-10 h-10"
      onClick={onClick}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <span
          className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
          }`}
        />
      </div>
    </Button>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  icon: React.ReactNode
  dropdownItems?: { title: string; href: string; description?: string }[]
  isActive?: boolean
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon, dropdownItems, isActive }) => {
  const [isHovered, setIsHovered] = useState(false)

  if (dropdownItems && dropdownItems.length > 0) {
    return (
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Link
          href={href}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
            isActive
              ? "bg-[#6E00FF]/20 text-white shadow-lg shadow-[#6E00FF]/20"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <span className="text-lg">{icon}</span>
          <span className="hidden lg:block">{children}</span>
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block"
          >
            <ChevronDown size={14} className="ml-1" />
          </motion.div>
        </Link>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{
                duration: 0.2,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="absolute left-0 mt-2 w-64 z-50"
            >
              <motion.div
                initial={{ backdropFilter: "blur(0px)" }}
                animate={{ backdropFilter: "blur(12px)" }}
                className="bg-[#121212]/80 backdrop-blur-md border border-[#6E00FF]/30 rounded-2xl shadow-2xl shadow-[#6E00FF]/20 overflow-hidden"
              >
                <div className="p-2">
                  {dropdownItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.2,
                      }}
                    >
                      <Link
                        href={item.href}
                        className="group block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-[#6E00FF]/20 transition-all duration-200 relative overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#6E00FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          layoutId={`dropdown-bg-${item.href}`}
                        />
                        <div className="relative z-10">
                          <div className="font-medium text-sm">{item.title}</div>
                          {item.description && <div className="text-xs text-white/60 mt-1">{item.description}</div>}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative gradient border */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6E00FF]/20 via-transparent to-[#6E00FF]/20 pointer-events-none"
                  style={{ padding: "1px" }}
                >
                  <div className="w-full h-full bg-[#121212]/80 rounded-2xl" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        isActive
          ? "bg-[#6E00FF]/20 text-white shadow-lg shadow-[#6E00FF]/20"
          : "text-white/80 hover:text-white hover:bg-white/10"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="hidden lg:block">{children}</span>
    </Link>
  )
}

// Animated button component using only Tailwind
const AnimatedButton: React.FC<{
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
  href?: string
  onClick?: () => void
}> = ({ children, className = "", variant = "default", href, onClick }) => {
  const baseClasses = `relative inline-flex items-center justify-center h-10 px-6 py-2 rounded-full overflow-hidden transition-all duration-300 group ${className}`
  const variantClasses =
    variant === "default"
      ? "bg-[#6E00FF] text-white hover:bg-[#6E00FF]/90 shadow-lg shadow-[#6E00FF]/20"
      : "border border-[#6E00FF] text-white hover:bg-[#6E00FF]/10"

  const content = (
    <>
      {/* Glow effect on hover */}
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      {/* Subtle border on hover */}
      <span className="absolute inset-0 border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">{children}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <Button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      {content}
    </Button>
  )
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const templateDropdownItems = [
    { title: "Landing Pages", href: "/templates?query=landingpage", description: "Beautiful landing page templates" },
    { title: "Dashboards", href: "/templates?query=dashboard", description: "Admin and analytics dashboards" },
    { title: "E-commerce", href: "/templates?query=ecommerce", description: "Online store templates" },
    { title: "Blogs", href: "/templates?query=blog", description: "Blog and content templates" },
  ]

  const pricingDropdownItems = [
    { title: "Personal", href: "/pricing#personal", description: "Perfect for individuals" },
    { title: "Team", href: "/pricing#team", description: "Collaborate with your team" },
    { title: "Enterprise", href: "/pricing#enterprise", description: "Advanced features & support" },
  ]

  const aboutDropdownItems = [
    { title: "Our Story", href: "/about#story", description: "Learn about our journey" },
    { title: "Team", href: "/about#team", description: "Meet the people behind QuickUI" },
    { title: "Careers", href: "/about#careers", description: "Join our growing team" },
  ]

  const homeDropdownItems = [
    { title: "Features", href: "/#features", description: "Explore what we offer" },
    { title: "Testimonials", href: "/#testimonials", description: "What our users say" },
    { title: "FAQ", href: "/#faq", description: "Frequently asked questions" },
  ]

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={`
          bg-[#121212]/80 backdrop-blur-md border border-[#6E00FF]/20 
          rounded-full shadow-2xl shadow-[#6E00FF]/10 transition-all duration-300
          ${scrolled ? "bg-[#121212]/90" : "bg-[#121212]/80"}
        `}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 relative">
                  <Image src={logo || "/placeholder.svg"} alt="QuickUI Logo" fill className="object-contain" />
                </div>
                <div className="h-6 w-24 relative hidden sm:block">
                  <Image src={text || "/placeholder.svg"} alt="QuickUI" fill className="object-contain" />
                </div>
              </div>
            </Link>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-full p-1">
            <NavLink href="/" icon={<Home size={18} />} dropdownItems={homeDropdownItems} isActive={pathname === "/"}>
              Home
            </NavLink>
            <NavLink
              href="/templates"
              icon={<FileText size={18} />}
              dropdownItems={templateDropdownItems}
              isActive={pathname === "/templates" || pathname.startsWith("/templates?")}
            >
              Templates
            </NavLink>
            <NavLink
              href="/pricing"
              icon={<DollarSign size={18} />}
              dropdownItems={pricingDropdownItems}
              isActive={pathname === "/pricing"}
            >
              Pricing
            </NavLink>
            <NavLink
              href="/about"
              icon={<Info size={18} />}
              dropdownItems={aboutDropdownItems}
              isActive={pathname === "/about"}
            >
              About
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 rounded-full" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <AnimatedButton href="/signup">Get Started</AnimatedButton>
          </div>

          {/* Mobile Sign In and Menu buttons */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/10 rounded-full text-sm px-3 py-1.5"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <AnimatedMenuButton isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
          </div>
        </div>

        {/* Mobile Rectangle Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 right-4 w-64 bg-[#121212]/90 backdrop-blur-md border border-[#6E00FF]/30 rounded-2xl shadow-2xl shadow-[#6E00FF]/20 z-50 md:hidden"
            >
              <div className="p-4">
                {/* Navigation Items with icons on right */}
                <div className="space-y-2">
                  <Link
                    href="/"
                    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 group text-white/80 hover:text-white hover:bg-white/10`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Home</span>
                    <div
                      className={`p-2 rounded-full transition-all duration-300 group-hover:bg-white/20`}
                    >
                      <Home size={18} />
                    </div>
                  </Link>
                  <Link
                    href="/templates"
                    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                      pathname === "/templates" || pathname.startsWith("/templates?")
                        ? "bg-[#6E00FF]/20 text-white shadow-lg shadow-[#6E00FF]/20"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Templates</span>
                    <div
                      className={`p-2 rounded-full transition-all duration-300 group-hover:bg-white/20`}
                    >
                      <FileText size={18} />
                    </div>
                  </Link>
                  <Link
                    href="/pricing"
                    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                      pathname === "/pricing"
                        ? "bg-[#6E00FF]/20 text-white shadow-lg shadow-[#6E00FF]/20"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Pricing</span>
                    <div
                      className={`p-2 rounded-full transition-all duration-300 group-hover:bg-white/20 `}
                    >
                      <DollarSign size={18} />
                    </div>
                  </Link>
                  <Link
                    href="/about"
                    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                      pathname === "/about"
                        ? "bg-[#6E00FF]/20 text-white shadow-lg shadow-[#6E00FF]/20"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">About</span>
                    <div
                      className={`p-2 rounded-full transition-all duration-300 group-hover:bg-white/20
                      `}
                    >
                      <Info size={18} />
                    </div>
                  </Link>
                </div>

                {/* Get Started Button */}
                <div className="mt-4 pt-4 border-t border-[#6E00FF]/20">
                  <AnimatedButton
                    href="/signup"
                    className="w-full justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  )
}
