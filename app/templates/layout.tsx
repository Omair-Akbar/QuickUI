import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TemplatesLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
