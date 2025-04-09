import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PricingLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
