import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Navbar />
       <Hero />
      <Features />
      {/* <Testimonials /> */}
      <FAQ />
      <Footer />
      
    </main>
  )
}
