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

// Banyuwangi destination data
const destinationData: Record<string, DestinationData> = {
  "kawah-ijen": {
    id: "1",
    name: "Kawah Ijen",
    category: "Wisata Alam",
    location: "Banyuwangi, Jawa Timur",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&q=80",
    description: "Kawah vulkanik dengan fenomena blue fire dan danau asam terbesar di dunia.",
    fullDescription: "Kawah Ijen adalah salah satu keajaiban alam Banyuwangi yang terkenal dengan fenomena blue fire yang langka di dunia. Kawah ini memiliki danau asam terbesar di dunia dengan warna hijau tosca yang menakjubkan. Para wisatawan dapat menyaksikan aktivitas penambang belerang tradisional yang masih berlangsung hingga saat ini. Pemandangan sunrise dari puncak Ijen menjadi pengalaman yang tak terlupakan.",
    highlights: [
      "Blue fire phenomenon (api biru) yang langka",
      "Danau asam terbesar di dunia",
      "Sunrise viewing spektakuler",
      "Aktivitas penambang belerang tradisional",
      "Trekking menantang dengan pemandangan indah",
    ],
    facilities: [
      "Pos Paltuding (Base Camp)",
      "Toilet Umum", 
      "Warung Makan",
      "Area Parkir",
      "Pos Kesehatan",
      "Guide Lokal",
    ],
    ticketTypes: [
      { 
        name: "Tiket Masuk Reguler", 
        price: 35000, 
        benefits: ["Akses ke kawah Ijen", "Parkir kendaraan", "Peta jalur trekking"] 
      },
      { 
        name: "Paket Blue Fire Tour", 
        price: 450000, 
        benefits: ["Tiket masuk", "Guide profesional", "Masker & senter", "Transport dari Banyuwangi", "Breakfast"] 
      },
      {
        name: "Ijen Premium Experience",
        price: 750000,
        benefits: [
          "Private guide",
          "Transport AC dari hotel",
          "Peralatan safety lengkap",
          "Dokumentasi foto",
          "Breakfast & lunch",
          "Certificate of achievement",
        ],
      },
    ],
    rating: 4.8,
    reviews: 1247,
    tags: ["Wisata Alam", "Vulkan", "Blue Fire", "Sunrise", "Trekking"],
    openingHours: "00:30 - 14:00 WIB",
    bestTimeToVisit: "Dini hari (02:00 - 05:00) untuk melihat blue fire dan sunrise",
  },
  "pantai-red-island": {
    id: "2",
    name: "Pantai Red Island",
    category: "Pantai",
    location: "Pesanggaran, Banyuwangi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center&q=80",
    description: "Pantai dengan pasir merah unik dan spot surfing terbaik di Banyuwangi.",
    fullDescription: "Pantai Red Island atau Pulau Merah adalah destinasi pantai ikonik Banyuwangi yang terkenal dengan pasir berwarna kemerahan dan ombak yang cocok untuk surfing. Pantai ini mendapat namanya dari sebuah bukit kecil yang menyerupai pulau dengan tanah berwarna merah. Sunset di Red Island sangat memukau dan menjadi favorit para fotografer. Pantai ini juga menjadi venue berbagai kompetisi surfing nasional dan internasional.",
    highlights: [
      "Pasir pantai berwarna merah yang unik",
      "Spot surfing terbaik di Jawa Timur",
      "Sunset viewing yang spektakuler",
      "Bukit Red Island yang ikonik",
      "Kompetisi surfing internasional",
    ],
    facilities: [
      "Tempat Parkir Luas",
      "Toilet & Shower",
      "Warung Makanan & Minuman",
      "Penyewaan Papan Surf",
      "Homestay",
      "Musholla",
    ],
    ticketTypes: [
      { 
        name: "Tiket Masuk Reguler", 
        price: 10000, 
        benefits: ["Akses ke pantai", "Parkir motor", "Spot foto unlimited"] 
      },
      { 
        name: "Paket Surfing Lesson", 
        price: 200000, 
        benefits: ["Tiket masuk", "Rental papan surf", "Instruktur profesional", "2 jam lesson", "Safety equipment"] 
      },
      {
        name: "Red Island Sunset Package",
        price: 150000,
        benefits: [
          "Tiket masuk",
          "Spot terbaik untuk sunset",
          "Welcome drink",
          "Snack lokal",
          "Foto session dengan fotografer",
        ],
      },
    ],
    rating: 4.6,
    reviews: 892,
    tags: ["Pantai", "Surfing", "Sunset", "Fotografi", "Pasir Merah"],
    openingHours: "24 Jam",
    bestTimeToVisit: "Sore hari (16:00 - 18:30) untuk sunset atau pagi (06:00 - 10:00) untuk surfing",
  },
  "taman-nasional-baluran": {
    id: "3", 
    name: "Taman Nasional Baluran",
    category: "Wisata Alam",
    location: "Situbondo - Banyuwangi",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&h=600&fit=crop&crop=center&q=80",
    description: "Sabana Afrika di Jawa dengan berbagai satwa langka dan pemandangan yang eksotis.",
    fullDescription: "Taman Nasional Baluran dijuluki 'Africa van Java' karena memiliki ekosistem sabana yang mirip dengan Afrika. Taman nasional ini memiliki keanekaragaman hayati yang tinggi dengan berbagai satwa langka seperti banteng, rusa, macan tutul, dan burung-burung eksotis. Pemandangan sabana yang luas dengan Gunung Baluran sebagai latar belakang menciptakan panorama yang menakjubkan, terutama saat musim kemarau.",
    highlights: [
      "Sabana eksotis 'Africa van Java'",
      "Banteng Jawa dan rusa dalam habitat asli",
      "Pantai Bama dengan hutan mangrove",
      "Bird watching dengan 155 spesies burung",
      "Trekking dan safari photography",
    ],
    facilities: [
      "Visitor Center & Museum",
      "Jalur Trekking",
      "Menara Pandang",
      "Area Camping",
      "Toilet Umum",
      "Kantin",
    ],
    ticketTypes: [
      { 
        name: "Tiket Masuk Domestik", 
        price: 18000, 
        benefits: ["Akses taman nasional", "Peta lokasi", "Brosur informasi satwa"] 
      },
      { 
        name: "Paket Safari Tour", 
        price: 300000, 
        benefits: ["Tiket masuk", "Jeep safari", "Guide ranger", "Lunch box", "Binocular"] 
      },
      {
        name: "Baluran Overnight Package",
        price: 500000,
        benefits: [
          "Tiket masuk 2 hari",
          "Camping equipment",
          "3x meals",
          "Night safari",
          "Professional guide",
          "Wildlife photography tips",
        ],
      },
    ],
    rating: 4.7,
    reviews: 634,
    tags: ["Taman Nasional", "Safari", "Satwa Langka", "Sabana", "Banteng"],
    openingHours: "07:00 - 17:00 WIB",
    bestTimeToVisit: "Musim kemarau (April - Oktober) untuk pemandangan sabana terbaik",
  },
  "pantai-sukamade": {
    id: "4",
    name: "Pantai Sukamade", 
    category: "Konservasi",
    location: "Meru Betiri, Banyuwangi",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&crop=center&q=80",
    description: "Pantai konservasi penyu dengan pengalaman melihat penyu bertelur secara langsung.",
    fullDescription: "Pantai Sukamade adalah salah satu pantai konservasi penyu terpenting di Indonesia yang terletak di dalam kawasan Taman Nasional Meru Betiri. Pantai ini menjadi tempat bertelurnya empat spesies penyu langka termasuk penyu belimbing, penyu hijau, penyu sisik, dan penyu lekang. Wisatawan dapat menyaksikan proses penyu bertelur dan pelepasan tukik ke laut, menciptakan pengalaman yang mendidik dan tak terlupakan.",
    highlights: [
      "Konservasi penyu langka Indonesia",
      "Pengalaman melihat penyu bertelur",
      "Pelepasan tukik ke laut lepas",
      "Hutan hujan tropis yang asri",
      "Edukasi konservasi lingkungan",
    ],
    facilities: [
      "Pusat Konservasi Penyu",
      "Guest House",
      "Warung Sederhana",
      "Guide Ranger",
      "Musholla",
      "Toilet Umum",
    ],
    ticketTypes: [
      { 
        name: "Tiket Masuk + Edukasi", 
        price: 25000, 
        benefits: ["Akses pantai", "Tour edukasi konservasi", "Sertifikat partisipasi"] 
      },
      { 
        name: "Turtle Watching Tour", 
        price: 350000, 
        benefits: ["Tiket masuk", "Menginap 1 malam", "3x meals", "Guide ranger", "Pengalaman turtle watching"] 
      },
      {
        name: "Conservation Experience",
        price: 600000,
        benefits: [
          "Program 2 hari 1 malam",
          "Partisipasi konservasi langsung",
          "Certificate of participation",
          "All meals included",
          "Transport dalam taman",
          "Dokumentasi kegiatan",
        ],
      },
    ],
    rating: 4.9,
    reviews: 456,
    tags: ["Konservasi", "Penyu", "Edukasi", "Alam", "Meru Betiri"],
    openingHours: "08:00 - 17:00 WIB (Turtle watching: 19:00 - 06:00)",
    bestTimeToVisit: "Malam hari (20:00 - 05:00) untuk melihat penyu bertelur",
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
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/tickets" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Kembali ke Destinasi</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button 
                onClick={openCart}
                className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <ShoppingCart className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">{totalItems}</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
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
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
              <Image src={destination.image || "/placeholder.svg"} alt={destination.name} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  {destination.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm text-white p-4 rounded-xl">
                  <h1 className="text-2xl font-bold mb-2">{destination.name}</h1>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>{destination.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center justify-between mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">{destination.rating}</span>
                  <span className="text-gray-600 ml-2">({destination.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= destination.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="w-5 h-5 mr-3 text-[#f2c14b]" />
                  <span className="font-semibold text-gray-900">Jam Operasional</span>
                </div>
                <p className="text-gray-600 ml-8">{destination.openingHours}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="w-5 h-5 mr-3 text-[#f2c14b]" />
                  <span className="font-semibold text-gray-900">Waktu Terbaik</span>
                </div>
                <p className="text-gray-600 ml-8">{destination.bestTimeToVisit}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {destination.tags.map((tag, index) => (
                <span key={index} className="bg-[#f2c14b]/10 text-[#f2c14b] px-4 py-2 rounded-full text-sm font-medium border border-[#f2c14b]/20">
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tentang {destination.name}</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{destination.fullDescription}</p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Yang Bisa Anda Nikmati</h3>
              <div className="space-y-3">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fasilitas yang Tersedia</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {destination.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Ticket Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-6 bg-[#f2c14b] rounded mr-3"></span>
                  Pilih Paket Wisata
                </h3>

                {/* Ticket Types */}
                <div className="space-y-4 mb-6">
                  {destination.ticketTypes.map((ticket, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedTicketType === index
                          ? "border-[#f2c14b] bg-[#f2c14b]/5 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedTicketType(index)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900 text-lg">{ticket.name}</h4>
                        <div className="text-right">
                          <p className="font-bold text-xl text-gray-900">Rp {ticket.price.toLocaleString("id-ID")}</p>
                          {ticket.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              Rp {ticket.originalPrice.toLocaleString("id-ID")}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {ticket.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Jumlah Tiket</label>
                  <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-white transition-colors font-bold text-lg"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-white transition-colors font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t-2 border-gray-100 pt-6 mb-6">
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <span className="text-lg font-semibold text-gray-900">Total Pembayaran</span>
                    <span className="text-2xl font-bold text-[#f2c14b]">
                      Rp {(destination.ticketTypes[selectedTicketType].price * quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-[#f2c14b] to-[#e6b143] hover:from-[#e6b143] hover:to-[#d4a73c] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Tambah ke Keranjang
                </button>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-xs text-gray-600 text-center leading-relaxed">
                    <span className="font-semibold">Catatan:</span> Dengan membeli tiket, Anda menyetujui syarat dan ketentuan yang berlaku. Tiket berlaku sesuai tanggal yang dipilih.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CartSidebar />
    </div>
  )
}