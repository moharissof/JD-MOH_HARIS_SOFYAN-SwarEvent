"use client"

import React from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, User, Clock, Star, Share2, Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useState } from "react"
import CartSidebar from "@/components/ticket/CartSidebar"

// Type definitions
interface TicketType {
  name: string
  price: number
  originalPrice?: number
  benefits: string[]
}

interface DestinationData {
  id: string
  name: string
  category: string
  location: string
  image: string
  description: string
  fullDescription: string
  highlights: string[]
  facilities: string[]
  ticketTypes: TicketType[]
  rating: number
  reviews: number
  tags: string[]
  openingHours: string
  bestTimeToVisit: string
}

// Destination data - in a real app, this would come from a database or API
const destinationData: Record<string, DestinationData> = {
  "pantai-parangtritis": {
    id: "1",
    name: "Pantai Parangtritis",
    category: "Pantai",
    location: "Yogyakarta",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&q=80",
    description: "Pantai yang terkenal dengan ombak besar dan sunset yang indah di Yogyakarta.",
    fullDescription: "Pantai Parangtritis adalah salah satu pantai paling terkenal di Yogyakarta yang menawarkan pemandangan sunset yang menakjubkan. Pantai ini terkenal dengan legenda Nyi Roro Kidul dan menawarkan berbagai aktivitas wisata seperti naik andong, ATV, dan paralayang. Dengan hamparan pasir hitam yang luas dan ombak yang besar, pantai ini menjadi destinasi favorit wisatawan lokal dan mancanegara.",
    highlights: [
      "Sunset terindah di Yogyakarta",
      "Legenda Nyi Roro Kidul",
      "Aktivitas ATV dan paralayang",
      "Naik andong di tepi pantai",
      "Gumuk pasir (sand dune)",
    ],
    facilities: [
      "Tempat Parkir",
      "Toilet Umum", 
      "Warung Makan",
      "Penyewaan ATV",
      "Area Camping",
      "Masjid",
    ],
    ticketTypes: [
      { 
        name: "Tiket Masuk Reguler", 
        price: 25000, 
        benefits: ["Akses ke pantai", "Parkir kendaraan", "Toilet umum"] 
      },
      { 
        name: "Paket ATV 30 Menit", 
        price: 150000, 
        benefits: ["Tiket masuk", "Rental ATV 30 menit", "Helm safety", "Pemandu"] 
      },
      {
        name: "Paket Sunset Premium",
        price: 200000,
        benefits: [
          "Tiket masuk",
          "Spot foto terbaik",
          "Welcome drink",
          "Naik andong",
          "Guide professional",
        ],
      },
    ],
    rating: 4.5,
    reviews: 234,
    tags: ["Pantai", "Sunset", "Yogyakarta", "Wisata Alam"],
    openingHours: "24 Jam",
    bestTimeToVisit: "Sore hari (16:00 - 18:00) untuk menikmati sunset",
  },
  "candi-borobudur": {
    id: "2",
    name: "Candi Borobudur",
    category: "Budaya",
    location: "Magelang",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop&crop=center&q=80",
    description: "Candi Buddha terbesar di dunia yang merupakan warisan dunia UNESCO.",
    fullDescription: "Candi Borobudur adalah mahakarya arsitektur Buddha yang dibangun pada abad ke-8-9 Masehi. Sebagai salah satu keajaiban dunia dan situs warisan dunia UNESCO, candi ini menawarkan pengalaman spiritual dan sejarah yang mendalam. Dengan struktur yang terdiri dari 9 tingkat dan lebih dari 2.600 panel relief, Borobudur menceritakan kisah perjalanan spiritual Buddha.",
    highlights: [
      "Situs Warisan Dunia UNESCO",
      "Arsitektur Buddha terbesar di dunia", 
      "2.600+ panel relief bersejarah",
      "Sunrise viewing yang spektakuler",
      "Museum Borobudur",
    ],
    facilities: [
      "Museum",
      "Audio Guide",
      "Tempat Parkir",
      "Toilet Umum",
      "Food Court",
      "Souvenir Shop",
    ],
    ticketTypes: [
      { 
        name: "Tiket Domestik", 
        price: 50000, 
        benefits: ["Akses ke candi", "Audio guide bahasa Indonesia", "Booklet informasi"] 
      },
      { 
        name: "Paket Sunrise", 
        price: 450000, 
        benefits: ["Akses sunrise viewing", "Transport shuttle", "Breakfast", "Professional guide"] 
      },
      {
        name: "Borobudur Premium Experience",
        price: 750000,
        benefits: [
          "Priority access",
          "Private guide",
          "Museum tour",
          "Traditional lunch",
          "Cultural workshop",
          "Souvenir package",
        ],
      },
    ],
    rating: 4.8,
    reviews: 512,
    tags: ["Budaya", "UNESCO", "Magelang", "Sejarah"],
    openingHours: "06:00 - 17:00 WIB",
    bestTimeToVisit: "Pagi hari (06:00 - 10:00) atau sore hari (15:00 - 17:00)",
  },
}

interface DestinationDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const { slug } = React.use(params)
  const destination = destinationData[slug as keyof typeof destinationData]
  const { addItem, openCart, totalItems } = useCart()
  const [selectedTicketType, setSelectedTicketType] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!destination) {
    notFound()
  }

  const handleAddToCart = () => {
    const ticketType = destination.ticketTypes[selectedTicketType]
    addItem({
      id: `${destination.id}-${selectedTicketType}`,
      title: `${destination.name} - ${ticketType.name}`,
      price: ticketType.price,
      image: destination.image,
      category: destination.category,
      date: "Fleksibel",
      location: destination.location,
      organizer: "Pengelola Wisata",
    })
    openCart()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/tickets" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali ke Tickets
            </Link>
            <div className="flex items-center space-x-4">
              <button 
                onClick={openCart}
                className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">{totalItems}</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-red-500">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Destination Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
              <Image src={destination.image || "/placeholder.svg"} alt={destination.name} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {destination.category}
                </span>
              </div>
            </div>

            {/* Destination Info */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{destination.name}</h1>

              <div className="flex items-center space-x-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{destination.rating}</span>
                  <span className="ml-1">({destination.reviews} reviews)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-[#f2c14b]" />
                  <div>
                    <p className="font-medium">Lokasi</p>
                    <p className="text-sm">{destination.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-[#f2c14b]" />
                  <div>
                    <p className="font-medium">Jam Operasional</p>
                    <p className="text-sm">{destination.openingHours}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-[#f2c14b]" />
                  <div>
                    <p className="font-medium">Waktu Terbaik</p>
                    <p className="text-sm">{destination.bestTimeToVisit}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-3 text-[#f2c14b]" />
                  <div>
                    <p className="font-medium">Kategori</p>
                    <p className="text-sm">Wisata {destination.category}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {destination.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Destinasi</h2>
              <p className="text-gray-600 mb-4">{destination.description}</p>
              <p className="text-gray-600 mb-6">{destination.fullDescription}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Highlights</h3>
              <ul className="space-y-2">
                {destination.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-[#f2c14b] rounded-full mr-3"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Facilities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Fasilitas</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {destination.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Ticket Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pilih Tiket</h3>

                {/* Ticket Types */}
                <div className="space-y-3 mb-6">
                  {destination.ticketTypes.map((ticket, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedTicketType === index
                          ? "border-[#f2c14b] bg-[#f2c14b]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedTicketType(index)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{ticket.name}</h4>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">Rp {ticket.price.toLocaleString("id-ID")}</p>
                          {ticket.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              Rp {ticket.originalPrice.toLocaleString("id-ID")}
                            </p>
                          )}
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {ticket.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Tiket</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      Rp {(destination.ticketTypes[selectedTicketType].price * quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#f2c14b] hover:bg-[#f2c14b]/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Tambah ke Keranjang
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Dengan membeli tiket, Anda menyetujui syarat dan ketentuan yang berlaku
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CartSidebar />
    </div>
  )
}
