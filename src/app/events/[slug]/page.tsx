"use client"

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
}

// Event data - in a real app, this would come from a database or API
const eventData: Record<string, EventData> = {
  "tutti-2025-1": {
    id: "tutti-2025-1",
    title: "TUTTI 2025 : An Annual Concert",
    category: "Cinema",
    location: "Goethe Haus Jakarta",
    date: "October 25, 2025",
    time: "19:00 WIB",
    organizer: "Sonore",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&crop=center&q=80",
    price: 150000,
    originalPrice: 200000,
    description:
      "TUTTI 2025 adalah konser tahunan yang menampilkan kolaborasi musik klasik dan kontemporer. Acara ini menghadirkan musisi-musisi terbaik Indonesia dalam satu panggung yang megah di Goethe Haus Jakarta.",
    fullDescription:
      "Bergabunglah dengan kami dalam TUTTI 2025, sebuah pengalaman musik yang tak terlupakan. Konser ini menampilkan orkestra lengkap dengan repertoar yang beragam, mulai dari karya klasik hingga aransemen modern dari lagu-lagu populer. Dengan venue yang intimate di Goethe Haus Jakarta, setiap penonton akan merasakan kedekatan dengan para musisi dan kualitas suara yang luar biasa.",
    highlights: [
      "Orkestra lengkap dengan 50+ musisi",
      "Repertoar klasik dan kontemporer",
      "Venue intimate dengan akustik terbaik",
      "Meet & greet dengan konduktor",
      "Merchandise eksklusif",
    ],
    schedule: [
      { time: "18:00", activity: "Pintu masuk dibuka" },
      { time: "18:30", activity: "Pre-show entertainment" },
      { time: "19:00", activity: "Konser dimulai - Bagian I" },
      { time: "20:00", activity: "Intermisi (15 menit)" },
      { time: "20:15", activity: "Konser Bagian II" },
      { time: "21:30", activity: "Penutupan & Meet & Greet" },
    ],
    venue: {
      name: "Goethe Haus Jakarta",
      address: "Jl. Sam Ratulangi No.9, Menteng, Jakarta Pusat",
      capacity: "300 seats",
      facilities: ["AC", "Parking", "Wheelchair Access", "Cafe"],
    },
    ticketTypes: [
      { name: "Regular", price: 150000, originalPrice: 200000, benefits: ["Akses konser", "Program booklet"] },
      { name: "VIP", price: 300000, originalPrice: undefined, benefits: ["Akses konser", "Program booklet", "Meet & greet", "Merchandise"] },
      {
        name: "VVIP",
        price: 500000,
        originalPrice: undefined,
        benefits: [
          "Akses konser",
          "Program booklet",
          "Meet & greet",
          "Merchandise",
          "Reserved front seats",
          "Welcome drink",
        ],
      },
    ],
    rating: 4.8,
    reviews: 124,
    tags: ["Musik Klasik", "Orkestra", "Annual Event", "Jakarta"],
  },
  "insyfest-2025-5": {
    id: "insyfest-2025-5",
    title: "INSYFEST 2025",
    category: "Hiburan",
    location: "UNIVERSITAS BUANA PERJUANGAN KARAWANG",
    date: "September 1, 2025",
    time: "16:00 WIB",
    organizer: "INSYFEST",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop&crop=center&q=80",
    price: 75000,
    description:
      "Festival musik dan seni terbesar di Karawang yang menghadirkan artis lokal dan nasional dalam satu panggung.",
    fullDescription:
      "INSYFEST 2025 adalah festival musik dan seni yang diselenggarakan oleh mahasiswa Universitas Buana Perjuangan Karawang. Festival ini menampilkan berbagai genre musik dari indie, pop, rock, hingga elektronik dengan lineup artis yang menarik.",
    highlights: [
      "Lineup artis lokal dan nasional",
      "Food court dengan berbagai kuliner",
      "Art exhibition dan workshop",
      "Games dan doorprize menarik",
      "Merchandise official",
    ],
    schedule: [
      { time: "16:00", activity: "Gates open & Registration" },
      { time: "17:00", activity: "Opening ceremony" },
      { time: "17:30", activity: "Local band performances" },
      { time: "19:00", activity: "Main stage - National artists" },
      { time: "22:00", activity: "Closing ceremony" },
    ],
    venue: {
      name: "Universitas Buana Perjuangan Karawang",
      address: "Jl. HS. Ronggo Waluyo, Karawang",
      capacity: "2000 people",
      facilities: ["Outdoor Stage", "Food Court", "Parking", "Security"],
    },
    ticketTypes: [
      { name: "Early Bird", price: 75000, originalPrice: undefined, benefits: ["Festival access", "Welcome kit", "Sticker pack"] },
      { name: "Regular", price: 100000, originalPrice: undefined, benefits: ["Festival access", "Welcome kit"] },
      {
        name: "VIP",
        price: 200000,
        originalPrice: undefined,
        benefits: ["Festival access", "Welcome kit", "VIP area", "Meet & greet", "Exclusive merchandise"],
      },
    ],
    rating: 4.6,
    reviews: 89,
    tags: ["Music Festival", "University Event", "Karawang", "Youth"],
  },
  // Add more events as needed
}

interface EventDetailPageProps {
  params: {
    slug: string
  }
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = params
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
            {/* Event Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>
            </div>

            {/* Event Info */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>

              <div className="flex items-center space-x-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{event.rating}</span>
                  <span className="ml-1">({event.reviews} reviews)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-[#f2c14b]" />
                  <div>
                    <p className="font-medium">{event.date}</p>
                    <p className="text-sm">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-[#f2c14b]" />
                  <div>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-sm">{event.venue.address}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-3 text-[#f2c14b]" />
                  <div>
                    <p className="font-medium">Organizer</p>
                    <p className="text-sm">{event.organizer}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-[#f2c14b]" />
                  <div>
                    <p className="font-medium">Capacity</p>
                    <p className="text-sm">{event.venue.capacity}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {event.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Event</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-gray-600 mb-6">{event.fullDescription}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Highlights</h3>
              <ul className="space-y-2">
                {event.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-[#f2c14b] rounded-full mr-3"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Jadwal Acara</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 text-[#f2c14b] font-semibold">{item.time}</div>
                    <div className="text-gray-700">{item.activity}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Informasi Venue</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{event.venue.name}</h3>
                <p className="text-gray-600 mb-4">{event.venue.address}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {event.venue.facilities.map((facility, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg text-center">
                      {facility}
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pilih Tiket</h3>

                {/* Ticket Types */}
                <div className="space-y-3 mb-6">
                  {event.ticketTypes.map((ticket, index) => (
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
                      Rp {(event.ticketTypes[selectedTicketType].price * quantity).toLocaleString("id-ID")}
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
