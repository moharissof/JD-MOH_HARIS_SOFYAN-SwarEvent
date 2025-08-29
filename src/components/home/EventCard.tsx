"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, User, ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/context/CartContext"

interface EventCardProps {
  id?: string
  title: string
  category: string
  categoryColor: string
  location: string
  date: string
  organizer: string
  image: string
  href: string
  price?: number
  originalPrice?: number
  isEnded?: boolean
  showCartButton?: boolean
}

export default function EventCard({
  id,
  title,
  category,
  categoryColor,
  location,
  date,
  organizer,
  image,
  href,
  price,
  originalPrice,
  isEnded = false,
  showCartButton = false,
}: EventCardProps) {
  const { addItem, isInCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (id && price) {
      addItem({
        id,
        title,
        image,
        price,
        originalPrice,
        location,
        date,
        organizer,
        category,
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const inCart = id ? isInCart(id) : false

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <div className="relative">
        <Image
          className="w-full h-48 object-cover"
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={192}
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {category}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight min-h-[3.5rem]">{title}</h3>

        <div className="space-y-2 flex-grow">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">{organizer}</span>
          </div>
        </div>

        {price && (
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="font-bold text-lg text-gray-900">{formatPrice(price)}</div>
              {originalPrice && <div className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</div>}
            </div>
          </div>
        )}

        <div className="pt-2 mt-auto">
          {isEnded ? (
            <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 w-full justify-center">
              Event Berakhir
            </span>
          ) : showCartButton && price && id ? (
            <div className="flex gap-2">
              <Link
                href={href}
                className="flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-lg text-sm font-semibold text-black bg-[#f2c14b] hover:bg-[#e6b143] transition-colors duration-200"
              >
                Detail Event
              </Link>
              <button
                onClick={handleAddToCart}
                disabled={inCart}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center gap-2 ${
                  inCart
                    ? "bg-green-100 text-green-800 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {inCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Ditambahkan
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Keranjang
                  </>
                )}
              </button>
            </div>
          ) : (
            <Link
              href={href}
              className="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-lg text-sm font-semibold text-black bg-[#f2c14b] hover:bg-[#e6b143] transition-colors duration-200"
            >
              Beli Tiket
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
