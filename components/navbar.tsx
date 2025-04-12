"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import logo from "@/public/logo.png"
import text from "@/public/quickui.png"


interface NavLinkProps {
  href: string
  children: React.ReactNode
  dropdownItems?: { title: string; href: string }[]
  isActive?: boolean
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, dropdownItems, isActive }) => {
  if (dropdownItems && dropdownItems.length > 0) {
    return (
      <div className="relative group">
        <Link href={href} className={`${isActive ? "text-white" : "text-white/80"} hover:text-white transition-colors`}>
          {children}
        </Link>
        <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="bg-[#121212] border border-[#6E00FF]/30 rounded-md shadow-lg py-1">
            {dropdownItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-white/80 hover:text-white hover:bg-[#6E00FF]/20 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={href} className={`${isActive ? "text-white" : "text-white/80"} hover:text-white transition-colors`}>
      {children}
    </Link>
  )
}

// Animated button component using only Tailwind


const AnimatedButton: React.FC<{
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
  href?: string
}> = ({ children, className = "", variant = "default", href }) => {
  const baseClasses = `relative inline-flex items-center justify-center h-10 px-6 py-2 rounded-md overflow-hidden transition-all duration-300 group ${className}`

  const variantClasses =
    variant === "default"
      ? "bg-[#6E00FF] text-white hover:bg-[#6E00FF]/90"
      : "border border-[#6E00FF] text-white hover:bg-[#6E00FF]/10"

  const content = (
    <>
      {/* Glow effect on hover */}
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      {/* Subtle border on hover */}
      <span className="absolute inset-0 border border-white/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="relative z-10">{children}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses}`}>
        {content}
      </Link>
    )
  }

  return (
    <Button className={`${baseClasses} ${variantClasses}`}>
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
    { title: "Landing Pages", href: "/templates?query=landingpage" },
    { title: "Dashboards", href: "/templates?query=dashboard" },
    { title: "E-commerce", href: "/templates?query=ecommerce" },
    { title: "Blogs", href: "/templates?query=blog" },
  ]

  const pricingDropdownItems = [
    { title: "Personal", href: "/pricing#personal" },
    { title: "Team", href: "/pricing#team" },
    { title: "Enterprise", href: "/pricing#enterprise" },
  ]

  const aboutDropdownItems = [
    { title: "Our Story", href: "/about#story" },
    { title: "Team", href: "/about#team" },
    { title: "Careers", href: "/about#careers" },
  ]

  const homeDropdownItems = [
    { title: "Features", href: "/#features" },
    { title: "Testimonials", href: "/#testimonials" },
    { title: "FAQ", href: "/#faq" },
  ]

  return (
    <nav
      className={`absolute top-0 left-0 right-0 z-50 ${scrolled ? "bg-[#121212]" : "bg-[#121212]/80"} backdrop-blur-md border-b border-[#6E00FF]/20 transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image src={logo} alt="QuickUI Logo" fill className="object-contain" />
              </div>
              <div className="h-6 w-24 relative">
                <Image src={text} alt="QuickUI" fill className="object-contain" />
              </div>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/" dropdownItems={homeDropdownItems} isActive={pathname === "/"}>
            Home
          </NavLink>
          <NavLink
            href="/templates"
            dropdownItems={templateDropdownItems}
            isActive={pathname === "/templates" || pathname.startsWith("/templates?")}
          >
            Templates
          </NavLink>
          <NavLink href="/pricing" dropdownItems={pricingDropdownItems} isActive={pathname === "/pricing"}>
            Pricing
          </NavLink>
          <NavLink href="/about" dropdownItems={aboutDropdownItems} isActive={pathname === "/about"}>
            About
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <AnimatedButton href="/signup">Get Started</AnimatedButton>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121212] border-b border-[#6E00FF]/20">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className={`block py-2 ${pathname === "/" ? "text-white" : "text-white/80"} hover:text-white`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/templates"
              className={`block py-2 ${pathname === "/templates" || pathname.startsWith("/templates?") ? "text-white" : "text-white/80"} hover:text-white`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              href="/pricing"
              className={`block py-2 ${pathname === "/pricing" ? "text-white" : "text-white/80"} hover:text-white`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`block py-2 ${pathname === "/about" ? "text-white" : "text-white/80"} hover:text-white`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 border-t border-[#6E00FF]/20 flex flex-col gap-3">
              <Button variant="ghost" className="justify-center text-white hover:text-white hover:bg-white/10" asChild>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button className="bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white justify-center" asChild>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
