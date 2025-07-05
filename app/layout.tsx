import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "QuickUI",
  description: "Discover high-quality, customizable templates built by expert developers.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#121212" />
      </head>
      <body className="min-h-screen bg-[#121212] text-white" suppressHydrationWarning> {/* <--- Add this here */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}