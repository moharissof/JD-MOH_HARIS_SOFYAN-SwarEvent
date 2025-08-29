"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image className="h-10 w-auto" src="/images/Logo.png" alt="Tokoevent" width={300} height={200} />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-[#f2c14b] inline-flex items-center px-1 pt-1 text-sm font-medium font-quicksand"
            >
              Beranda
            </Link>
            <Link
              href="/tickets"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium font-quicksand"
            >
              Ticket
            </Link>
            <Link
              href="/affiliate"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium font-quicksand"
            >
              Affiliate
            </Link>
            <Link
              href="/contact"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium font-quicksand"
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
            <Link href="/" className="text-[#f2c14b] block px-3 py-2 rounded-md text-base font-medium font-quicksand">
              Beranda
            </Link>
            <Link
              href="/partnership"
              className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium font-quicksand"
            >
              Partnership
            </Link>
            <Link
              href="/affiliate"
              className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium font-quicksand"
            >
              Affiliate
            </Link>
            <Link
              href="/contact"
              className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium font-quicksand"
            >
              Hubungi Kami
            </Link>
            <div className="px-3 py-2">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-900 text-center py-2 rounded-md text-base font-medium font-quicksand border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-[#f2c14b] to-[#e6b143] text-black text-center py-2 rounded-md text-base font-medium font-quicksand hover:from-[#e6b143] hover:to-[#d4a139] transition-all"
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
