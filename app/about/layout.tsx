import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
