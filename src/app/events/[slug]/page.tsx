"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, User, Clock, Star, Share2, Heart, ShoppingCart, Music, Camera, Users } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useState } from "react"
import CartSidebar from "@/components/ticket/CartSidebar"
import React from "react"

// Type definitions
interface TicketType {
  name: string
  price: number
  originalPrice?: number
  benefits: string[]
}

interface EventData {
  id: string
  title: string
  category: string
  location: string
  date: string
  time: string
  organizer: string
  image: string
  price: number
  originalPrice?: number
  description: string
  fullDescription: string
  highlights: string[]
  schedule: { time: string; activity: string }[]
  venue: {
    name: string
    address: string
    capacity: string
    facilities: string[]
  }
  ticketTypes: TicketType[]
  rating: number
  reviews: number
  tags: string[]
  featured?: boolean
}

// Banyuwangi event data
const eventData: Record<string, EventData> = {
  "banyuwangi-festival-2025": {
    id: "banyuwangi-festival-2025",
    title: "Banyuwangi Festival 2025",
    category: "Festival Budaya",
    location: "Alun-Alun Banyuwangi",
    date: "15 Agustus 2025",
    time: "16:00 WIB",
    organizer: "Pemkab Banyuwangi",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&crop=center&q=80",
    price: 25000,
    description: "Festival budaya terbesar di Banyuwangi yang merayakan kekayaan seni, budaya, dan kuliner lokal dengan pertunjukan spektakuler.",
    fullDescription: "Banyuwangi Festival 2025 adalah perayaan budaya tahunan yang menampilkan keindahan seni tradisional Osing, tari-tarian khas Banyuwangi, musik patrol, dan berbagai pertunjukan budaya lainnya. Festival ini juga menghadirkan pameran kuliner khas Banyuwangi, kerajinan lokal, dan workshop budaya yang menarik untuk seluruh keluarga.",
    highlights: [
      "Pertunjukan Tari Seblang dan Gandrung",
      "Parade budaya dengan kostum tradisional",
      "Festival kuliner khas Banyuwangi",
      "Workshop kerajinan batik dan anyaman",
      "Konser musik patrol dan campursari",
      "Pameran foto keindahan Banyuwangi",
    ],
    schedule: [
      { time: "16:00", activity: "Pembukaan & Parade Budaya" },
      { time: "17:00", activity: "Pertunjukan Tari Tradisional" },
      { time: "18:30", activity: "Festival Kuliner Dibuka" },
      { time: "19:00", activity: "Konser Musik Patrol" },
      { time: "20:30", activity: "Pertunjukan Gandrung" },
      { time: "21:30", activity: "Penutupan & Kembang Api" },
    ],
    venue: {
      name: "Alun-Alun Banyuwangi",
      address: "Jl. Ahmad Yani, Kertosari, Banyuwangi",
      capacity: "5000 orang",
      facilities: ["Panggung Utama", "Food Court", "Parkir", "Toilet Umum", "Medical Point", "Security 24 Jam"],
    },
    ticketTypes: [
      { 
        name: "Tiket Reguler", 
        price: 25000, 
        benefits: ["Akses festival", "Welcome drink", "Program booklet", "Sticker Banyuwangi"] 
      },
      { 
        name: "Tiket VIP", 
        price: 75000, 
        benefits: ["Akses festival", "VIP seating area", "Welcome package", "Makanan ringan", "Meet & greet dengan seniman"] 
      },
      {
        name: "Family Package",
        price: 150000,
        benefits: [
          "Akses festival untuk 4 orang",
          "Welcome package family",
          "Voucher kuliner Rp 50.000",
          "Foto keluarga gratis",
          "Souvenir eksklusif",
        ],
      },
    ],
    rating: 4.7,
    reviews: 342,
    tags: ["Festival", "Budaya Osing", "Kuliner", "Family Event", "Banyuwangi"],
    featured: true,
  },
  "ijen-crater-festival-2025": {
    id: "ijen-crater-festival-2025",
    title: "Ijen Crater Festival 2025",
    category: "Festival Alam",
    location: "Kawah Ijen, Banyuwangi",
    date: "20 September 2025",
    time: "03:00 WIB",
    organizer: "Ijen Tourism Board",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&q=80",
    price: 350000,
    originalPrice: 450000,
    description: "Festival unik yang menggabungkan keindahan alam Kawah Ijen dengan pertunjukan seni dan musik di ketinggian.",
    fullDescription: "Ijen Crater Festival adalah festival outdoor pertama di Indonesia yang diselenggarakan di kawasan Kawah Ijen. Peserta akan diajak mendaki gunung untuk menyaksikan fenomena blue fire, sunrise spectacular, dan menikmati pertunjukan musik akustik di puncak gunung. Festival ini menggabungkan petualangan alam dengan apresiasi seni.",
    highlights: [
      "Blue fire viewing experience",
      "Sunrise concert di puncak Ijen",
      "Acoustic performance dengan view kawah",
      "Photography workshop dengan mentor profesional",
      "Local mining culture experience",
      "Organic breakfast dengan view spektakuler",
    ],
    schedule: [
      { time: "03:00", activity: "Gathering & briefing safety" },
      { time: "03:30", activity: "Trekking dimulai menuju kawah" },
      { time: "05:00", activity: "Blue fire viewing" },
      { time: "06:30", activity: "Sunrise & acoustic concert" },
      { time: "08:00", activity: "Breakfast & photography session" },
      { time: "10:00", activity: "Descent & closing ceremony" },
    ],
    venue: {
      name: "Kawah Ijen",
      address: "Pos Paltuding, Licin, Banyuwangi",
      capacity: "200 orang",
      facilities: ["Base Camp", "Medical Team", "Professional Guide", "Safety Equipment", "Emergency Radio"],
    },
    ticketTypes: [
      { 
        name: "Adventure Package", 
        price: 350000, 
        originalPrice: 450000,
        benefits: ["Guide profesional", "Safety equipment", "Breakfast", "Certificate", "Souvenir eksklusif"] 
      },
      { 
        name: "Photography Package", 
        price: 500000, 
        benefits: ["Semua fasilitas Adventure", "Workshop fotografi", "Tripod rental", "Editing session", "Printed photo"] 
      },
      {
        name: "VIP Experience",
        price: 750000,
        benefits: [
          "Private guide",
          "Premium safety gear",
          "Drone photography",
          "Luxury breakfast setup",
          "Personal documentation",
          "Transport dari hotel",
        ],
      },
    ],
    rating: 4.9,
    reviews: 156,
    tags: ["Adventure", "Blue Fire", "Sunrise", "Photography", "Extreme Event"],
  },
  "red-island-surf-championship": {
    id: "red-island-surf-championship",
    title: "Red Island Surfing Championship 2025",
    category: "Olahraga",
    location: "Pantai Red Island, Banyuwangi",
    date: "10-12 Oktober 2025",
    time: "07:00 WIB",
    organizer: "Indonesian Surfing Association",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop&crop=center&q=80",
    price: 50000,
    description: "Kompetisi surfing nasional di pantai dengan ombak terbaik Jawa Timur, Red Island Banyuwangi.",
    fullDescription: "Red Island Surfing Championship adalah kompetisi surfing bergengsi yang mempertemukan surfer terbaik Indonesia. Pantai Red Island dengan ombak konsisten dan pemandangan yang menakjubkan menjadi venue perfect untuk championship ini. Selain kompetisi, ada juga surfing clinic, beach clean up, dan music festival.",
    highlights: [
      "Kompetisi surfing nasional dengan hadiah jutaan rupiah",
      "Surfing clinic dengan pro surfer",
      "Beach clean up movement",
      "Sunset music festival",
      "Local food festival",
      "Surfboard exhibition",
    ],
    schedule: [
      { time: "07:00", activity: "Registration & briefing" },
      { time: "08:00", activity: "Opening ceremony" },
      { time: "09:00", activity: "Qualifying rounds" },
      { time: "13:00", activity: "Lunch break & surfing clinic" },
      { time: "15:00", activity: "Semi finals" },
      { time: "17:00", activity: "Sunset music session" },
    ],
    venue: {
      name: "Pantai Red Island",
      address: "Pesanggaran, Banyuwangi",
      capacity: "3000 orang",
      facilities: ["Competition Area", "Spectator Stands", "Food Court", "Parking", "Medical Point", "Surf Shop"],
    },
    ticketTypes: [
      { 
        name: "Spectator Pass", 
        price: 50000, 
        benefits: ["Akses area kompetisi", "Program schedule", "Welcome drink", "Sticker Red Island"] 
      },
      { 
        name: "Surfer Package", 
        price: 200000, 
        benefits: ["Competition entry", "Official jersey", "Surfing clinic", "Lunch", "Certificate"] 
      },
      {
        name: "VIP Beach Pass",
        price: 150000,
        benefits: [
          "VIP viewing area",
          "Complimentary lunch",
          "Meet & greet dengan pro surfer",
          "Exclusive merchandise",
          "Photo session",
        ],
      },
    ],
    rating: 4.8,
    reviews: 267,
    tags: ["Surfing", "Competition", "Beach", "Sport", "Music Festival"],
  },
  "using-heritage-night": {
    id: "using-heritage-night", 
    title: "Using Heritage Night 2025",
    category: "Budaya",
    location: "Museum Blambangan, Banyuwangi",
    date: "5 November 2025",
    time: "19:00 WIB",
    organizer: "Yayasan Budaya Using",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center&q=80",
    price: 100000,
    description: "Malam apresiasi budaya Using dengan pertunjukan seni tradisional, pameran, dan kuliner heritage Banyuwangi.",
    fullDescription: "Using Heritage Night adalah event eksklusif yang menghadirkan kemewahan budaya Using dalam suasana yang intim dan berkelas. Pengunjung akan disuguhi pertunjukan seni tradisional berkualitas tinggi, pameran artefak budaya, workshop batik Using, dan fine dining dengan menu heritage Banyuwangi yang autentik.",
    highlights: [
      "Pertunjukan Seblang dan Gandrung eksklusif",
      "Pameran artefak budaya Using langka",
      "Workshop batik Using dengan master craftsman",
      "Heritage fine dining experience", 
      "Storytelling session tentang legenda Banyuwangi",
      "Live painting dengan tema Using",
    ],
    schedule: [
      { time: "19:00", activity: "Welcome ceremony & traditional welcome dance" },
      { time: "19:30", activity: "Museum tour & artifact exhibition" },
      { time: "20:15", activity: "Seblang performance" },
      { time: "21:00", activity: "Heritage dinner" },
      { time: "22:00", activity: "Gandrung & live music" },
      { time: "23:00", activity: "Closing & souvenir presentation" },
    ],
    venue: {
      name: "Museum Blambangan",
      address: "Jl. A. Yani No.2, Pengantigan, Banyuwangi",
      capacity: "150 orang",
      facilities: ["Museum Gallery", "Traditional Stage", "Dining Hall", "Workshop Area", "VIP Lounge", "Photo Studio"],
    },
    ticketTypes: [
      { 
        name: "Heritage Experience", 
        price: 100000, 
        benefits: ["Museum tour", "Cultural show", "Traditional dinner", "Workshop", "Souvenir batik"] 
      },
      { 
        name: "Collector Edition", 
        price: 200000, 
        benefits: ["Semua fasilitas Heritage", "Private guide", "Exclusive merchandise", "Photo session", "Certificate of appreciation"] 
      },
      {
        name: "Cultural Ambassador",
        price: 350000,
        benefits: [
          "VIP access semua area",
          "Meet & greet dengan seniman",
          "Limited edition batik Using",
          "Personal documentation",
          "Cultural consultation session",
          "Lifetime museum membership",
        ],
      },
    ],
    rating: 4.6,
    reviews: 89,
    tags: ["Heritage", "Museum", "Budaya Using", "Fine Dining", "Exclusive Event"],
  },
}

interface EventDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = React.use(params)
  const event = eventData[slug as keyof typeof eventData]
  const { addItem, openCart, totalItems } = useCart()
  const [selectedTicketType, setSelectedTicketType] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!event) {
    notFound()
  }

  const handleAddToCart = () => {
    const ticketType = event.ticketTypes[selectedTicketType]
    addItem({
      id: `${event.id}-${selectedTicketType}`,
      title: `${event.title} - ${ticketType.name}`,
      price: ticketType.price,
      image: event.image,
      category: event.category,
      date: event.date,
      location: event.location,
      organizer: event.organizer,
    })
    openCart()
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'festival budaya':
      case 'budaya':
        return <Users className="w-5 h-5" />
      case 'festival alam':
        return <Camera className="w-5 h-5" />
      case 'olahraga':
        return <Users className="w-5 h-5" />
      default:
        return <Music className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Festival Budaya': 'bg-purple-100 text-purple-800 border-purple-200',
      'Festival Alam': 'bg-green-100 text-green-800 border-green-200',
      'Olahraga': 'bg-blue-100 text-blue-800 border-blue-200',
      'Budaya': 'bg-orange-100 text-orange-800 border-orange-200',
      'default': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category] || colors.default
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/tickets" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Kembali ke Events</span>
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
            {/* Event Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getCategoryColor(event.category)} backdrop-blur-sm`}>
                  {getCategoryIcon(event.category)}
                  <span>{event.category}</span>
                </div>
              </div>
              {event.featured && (
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured Event
                  </span>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm text-white p-6 rounded-xl">
                  <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 mr-3 text-[#f2c14b]" />
                  <div>
                    <p className="font-bold text-gray-900">{event.date}</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="font-bold text-gray-900">{event.rating}</span>
                  <span className="text-gray-600 ml-1">({event.reviews} reviews)</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <User className="w-6 h-6 mr-3 text-[#f2c14b]" />
                  <div>
                    <p className="font-semibold text-gray-900">Organizer</p>
                    <p className="text-sm text-gray-600">{event.organizer}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#f2c14b]" />
                  <span className="text-gray-600">Capacity: {event.venue.capacity}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {event.tags.map((tag, index) => (
                <span key={index} className="bg-[#f2c14b]/10 text-[#f2c14b] px-4 py-2 rounded-full text-sm font-medium border border-[#f2c14b]/20">
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tentang Event</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{event.fullDescription}</p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Yang Bisa Anda Nikmati</h3>
              <div className="space-y-3">
                {event.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Jadwal Acara</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
                    <div className="w-20 text-[#f2c14b] font-bold text-lg mr-4">{item.time}</div>
                    <div className="text-gray-700 font-medium">{item.activity}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Venue</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{event.venue.name}</h3>
                <p className="text-gray-600 mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[#f2c14b]" />
                  {event.venue.address}
                </p>
                <h4 className="font-semibold text-gray-900 mb-3">Fasilitas yang Tersedia:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {event.venue.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-200">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Ticket Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-6 bg-[#f2c14b] rounded mr-3"></span>
                  Pilih Tiket Event
                </h3>

                {/* Ticket Types */}
                <div className="space-y-4 mb-6">
                  {event.ticketTypes.map((ticket, index) => (
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
                      Rp {(event.ticketTypes[selectedTicketType].price * quantity).toLocaleString("id-ID")}
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
