import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import logo from "@/public/logo.png"
import text from "@/public/quickui.png"

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <Link href={href} className="text-white/50 hover:text-[#6E00FF] transition-colors">
    {icon}
    <span className="sr-only">{label}</span>
  </Link>
)

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <li>
    <Link href={href} className="text-white/70 hover:text-[#6E00FF] transition-colors">
      {children}
    </Link>
  </li>
)

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#6E00FF]/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 relative">
                <Image src={logo} alt="QuickUI Logo" fill className="object-contain" />
              </div>
              <div className="h-6 w-24 relative">
                <Image src={text} alt="QuickUI" fill className="object-contain" />
              </div>
            </div>
            <p className="text-white/70 mb-6">
              Modern template marketplace for Next.js and React developers. Find the perfect theme for your next
              project.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} label="Facebook" />
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} label="Twitter" />
              <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} label="Instagram" />
              <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} label="GitHub" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/templates">Templates</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/login">Sign In</FooterLink>
              <FooterLink href="/signup">Sign Up</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Resources</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Support</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Community</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Subscribe</h3>
            <p className="text-white/70 mb-4">Get the latest updates and offers directly to your inbox.</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-[#1A1A1A] border-[#6E00FF]/30 text-white focus:border-transparent focus:ring-0 focus:outline-none"
              />
              <Button className="bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white relative overflow-hidden group">
                <span className="relative z-10">Subscribe</span>
                <span className="absolute inset-0 border border-white/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute inset-0 overflow-hidden">
                  <span className="absolute top-0 left-[-100%] h-[2px] w-[200%] bg-gradient-to-r from-transparent via-white to-transparent group-hover:animate-[moveRight_2s_linear_infinite]"></span>
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#6E00FF]/20 pt-8 mt-8 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} QuickUI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
