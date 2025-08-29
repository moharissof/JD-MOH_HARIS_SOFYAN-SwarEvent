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
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image className="h-8 w-auto" src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&q=80" alt="Tokoevent" width={300} height={200} />
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
              href="/partnership"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium font-quicksand"
            >
              Partnership
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

          <div className="hidden md:flex md:items-center">
            <Link
              href="/sell-tickets"
              className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium font-quicksand text-black bg-[#f2c14b] hover:bg-[#e6b143] transition-colors"
            >
              Jual Tiket
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
            <Link
              href="/sell-tickets"
              className="bg-[#f2c14b] text-black block px-3 py-2 rounded-md text-base font-medium font-quicksand"
            >
              Jual Tiket
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
