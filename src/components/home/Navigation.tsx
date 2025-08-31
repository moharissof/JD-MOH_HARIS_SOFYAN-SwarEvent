"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Function to check if route is active
  const isActiveRoute = (route: string) => {
    if (route === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(route)
  }

  // Function to get link classes based on active state
  const getLinkClasses = (route: string, isMobile = false) => {
    const baseClasses = isMobile 
      ? "block px-3 py-2 rounded-md text-base font-medium font-quicksand"
      : "inline-flex items-center px-1 pt-1 text-sm font-medium font-quicksand"
    
    if (isActiveRoute(route)) {
      return `${baseClasses} text-[#f2c14b]`
    }
    return `${baseClasses} text-gray-500 hover:text-gray-900`
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image className="h-10 w-auto" src="/images/Logo.png" alt="SwarEvent" width={300} height={200} />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className={getLinkClasses("/")}
            >
              Beranda
            </Link>
            <Link
              href="/tickets"
              className={getLinkClasses("/tickets")}
            >
              Ticket
            </Link>
            <Link
              href="/mitra"
              className={getLinkClasses("/mitra")}
            >
              Info Kemitraan
            </Link>
            <Link
              href="/contact"
              className={getLinkClasses("/contact")}
            >
              Hubungi Kami
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/login"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-4 py-2 text-sm font-medium font-quicksand transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium font-quicksand text-black bg-gradient-to-r from-[#f2c14b] to-[#e6b143] hover:from-[#e6b143] hover:to-[#d4a139] transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Daftar
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#f2c14b]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link 
              href="/" 
              className={getLinkClasses("/", true)}
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              href="/tickets"
              className={getLinkClasses("/tickets", true)}
              onClick={() => setIsMenuOpen(false)}
            >
              Ticket
            </Link>
            <Link
              href="/mitra"
              className={getLinkClasses("/affiliate", true)}
              onClick={() => setIsMenuOpen(false)}
            >
              Info Kemitraan
            </Link>
            <Link
              href="/contact"
              className={getLinkClasses("/contact", true)}
              onClick={() => setIsMenuOpen(false)}
            >
              Hubungi Kami
            </Link>
            <div className="px-3 py-2">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-900 text-center py-2 rounded-md text-base font-medium font-quicksand border border-gray-300 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-[#f2c14b] to-[#e6b143] text-black text-center py-2 rounded-md text-base font-medium font-quicksand hover:from-[#e6b143] hover:to-[#d4a139] transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}