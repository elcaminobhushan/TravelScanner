import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CompareProvider } from "@/context/compare-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Holiday Compare - Find Your Perfect Vacation",
  description: "Compare thousands of holiday packages to find the best deals for your dream vacation.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <CompareProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CompareProvider>
      </body>
    </html>
  )
}
