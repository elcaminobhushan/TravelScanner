"use client"

import { useState, useContext } from "react"
import Link from "next/link"
import { Search, Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { CompareContext } from "@/context/compare-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { packagesToCompare } = useContext(CompareContext)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block text-xl font-bold text-teal-600">HolidayCompare</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-teal-600",
                  pathname === item.href ? "text-teal-600" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search destinations..."
                className="w-[200px] rounded-md pl-8 lg:w-[280px]"
              />
            </div>

            {/* Compare button */}
            {packagesToCompare.length > 0 && (
              <Link href="/compare">
                <Button variant="outline" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Compare</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-xs text-white">
                    {packagesToCompare.length}
                  </span>
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 md:hidden">
          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search destinations..." className="w-full rounded-md pl-8" />
            </div>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-teal-600",
                    pathname === item.href ? "text-teal-600" : "text-muted-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {packagesToCompare.length > 0 && (
                <Link
                  href="/compare"
                  className="flex items-center gap-2 text-sm font-medium text-teal-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Compare ({packagesToCompare.length})</span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
