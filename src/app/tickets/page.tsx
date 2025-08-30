"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Calendar, User, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/CartContext"
import Navigation from "@/components/home/Navigation"
import Image from "next/image"
import CartSidebar from "@/components/ticket/CartSidebar"

interface Event {
  id: string
  title: string
  image: string
  category: string
  location: string
  date: string
  organizer: string
  price: number
  originalPrice?: number
  isPopular?: boolean
}

const events: Event[] = [
  {
    id: "1",
    title: "TUTTI 2025: An Annual Concert",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Cinema",
    location: "Goethe Haus Jakarta",
    date: "October 25, 2025",
    organizer: "Sonore",
    price: 150000,
    originalPrice: 200000,
    isPopular: true,
  },
  {
    id: "2",
    title: "INSYFEST 2025",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Hiburan",
    location: "UNIVERSITAS BUANA PERJUANGAN",
    date: "September 1, 2025",
    organizer: "INSYFEST",
    price: 75000,
    isPopular: true,
  },
  {
    id: "3",
    title: 'Nongan Village Festival "SARASAMI"',
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Hiburan",
    location: "LAPANGAN DESA NONGAN",
    date: "October 12, 2025",
    organizer: "NVF",
    price: 50000,
  },
  {
    id: "4",
    title: "Anniversary Pasukan Suka Konser",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Hiburan",
    location: "Semu Coffe, Srengseng, Jakarta",
    date: "September 9, 2025",
    organizer: "sambat event organizer",
    price: 100000,
  },
  {
    id: "5",
    title: "Malam Keakraban Siswa",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Hiburan",
    location: "Graha RMC",
    date: "October 25, 2025",
    organizer: "HIMAPRODI SI ITB STIKOM",
    price: 25000,
  },
  {
    id: "6",
    title: "Jakarta Music Festival 2025",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Musik",
    location: "Gelora Bung Karno",
    date: "November 15, 2025",
    organizer: "JMF Organizer",
    price: 300000,
    originalPrice: 350000,
    isPopular: true,
  },
  {
    id: "7",
    title: "Stand Up Comedy Night",
    image: "https://images.unsplash.com/photo-1573511860302-28c524319d2a?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Komedi",
    location: "Taman Ismail Marzuki",
    date: "October 30, 2025",
    organizer: "Comedy Central",
    price: 125000,
  },
  {
    id: "8",
    title: "Tech Conference Indonesia",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Teknologi",
    location: "Jakarta Convention Center",
    date: "December 5, 2025",
    organizer: "Tech Indo",
    price: 500000,
    isPopular: true,
  },
  {
    id: "9",
    title: "Banyuwangi Jazz Festival 2025",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Musik",
    location: "Pantai Boom Banyuwangi",
    date: "November 20, 2025",
    organizer: "Jazz Lovers Banyuwangi",
    price: 200000,
    originalPrice: 250000,
    isPopular: true,
  },
  {
    id: "10",
    title: "Workshop Fotografi Landscape",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Workshop",
    location: "Kawah Ijen Banyuwangi",
    date: "September 15, 2025",
    organizer: "Photo Community BWI",
    price: 150000,
  },
  {
    id: "11",
    title: "Seminar Digital Marketing",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Teknologi",
    location: "Hotel Grand Inna Banyuwangi",
    date: "October 5, 2025",
    organizer: "Digital Marketing Hub",
    price: 300000,
  },
  {
    id: "12",
    title: "Pagelaran Wayang Kulit",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Budaya",
    location: "Pendopo Kabupaten Banyuwangi",
    date: "November 10, 2025",
    organizer: "Dinas Kebudayaan BWI",
    price: 50000,
  },
  {
    id: "13",
    title: "Festival Kuliner Nusantara",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Kuliner",
    location: "Alun-alun Banyuwangi",
    date: "December 15, 2025",
    organizer: "Komunitas Kuliner BWI",
    price: 25000,
    isPopular: true,
  },
  {
    id: "14",
    title: "Konser Dangdut Koplo",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Musik",
    location: "Stadion Diponegoro",
    date: "October 20, 2025",
    organizer: "Dangdut Lovers",
    price: 75000,
  },
  {
    id: "15",
    title: "Exhibition Batik Modern",
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Seni",
    location: "Museum Batik Banyuwangi",
    date: "September 25, 2025",
    organizer: "Batik Heritage Foundation",
    price: 30000,
  },
  {
    id: "16",
    title: "Turnamen Futsal Antar Kampung",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Olahraga",
    location: "GOR Tawang Alun",
    date: "November 30, 2025",
    organizer: "KONI Banyuwangi",
    price: 15000,
  },
]

const categories = ["Semua", "Cinema", "Hiburan", "Musik", "Komedi", "Teknologi", "Workshop", "Budaya", "Kuliner", "Seni", "Olahraga"]

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [currentPage, setCurrentPage] = useState(1)
  const { addItem, isInCart, totalItems, openCart } = useCart()

  const itemsPerPage = 8 // Jumlah items per halaman

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

  // Reset to page 1 when search or category changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleAddToCart = (event: Event) => {
    addItem({
      id: event.id,
      title: event.title,
      image: event.image,
      price: event.price,
      originalPrice: event.originalPrice,
      location: event.location,
      date: event.date,
      organizer: event.organizer,
      category: event.category,
    })
    // Auto-open cart after adding item
    setTimeout(() => {
      openCart()
    }, 100)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
   
    <div className="min-h-screen bg-white">
    <Navigation />
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Semua Tiket Event</h1>
              <p className="text-gray-600">Temukan dan beli tiket event favoritmu</p>
            </div>
            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">{totalItems}</span>
              <span className="text-gray-600">item</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Cari event atau lokasi..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="h-12 px-6 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full ${
                  selectedCategory === category ? "bg-[#f2c14b] hover:bg-[#f2c14b]/90 text-black" : "hover:bg-gray-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col"
            >
              <div className="relative">
                <Image 
                  src={event.image || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&crop=center&q=80"} 
                  alt={event.title} 
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{event.category}</Badge>
                </div>
                {event.isPopular && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Popular</Badge>
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] leading-tight">{event.title}</h3>

                <div className="space-y-2 mb-4 flex-grow">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{event.organizer}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-lg text-gray-900">{formatPrice(event.price)}</div>
                    {event.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">{formatPrice(event.originalPrice)}</div>
                    )}
                  </div>
                </div>

                <div className="mt-auto">
                  <Button
                    className="w-full bg-[#f2c14b] hover:bg-[#f2c14b]/90 text-black"
                    onClick={() => handleAddToCart(event)}
                    disabled={isInCart(event.id)}
                  >
                    {isInCart(event.id) ? "Sudah di Keranjang" : "Tambah ke Keranjang"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results Info and Pagination */}
        {filteredEvents.length > 0 && (
          <div className="mt-8">
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)} dari {filteredEvents.length} event
              </p>
              <p className="text-gray-600">
                Halaman {currentPage} dari {totalPages}
              </p>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Sebelumnya
                </Button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    // Show first page, last page, current page, and pages around current page
                    const showPage = 
                      pageNum === 1 || 
                      pageNum === totalPages || 
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)

                    if (!showPage) {
                      // Show ellipsis
                      if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return (
                          <span key={pageNum} className="px-3 py-2 text-gray-500">
                            ...
                          </span>
                        )
                      }
                      return null
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 min-w-[40px] ${
                          currentPage === pageNum 
                            ? "bg-[#f2c14b] hover:bg-[#f2c14b]/90 text-black" 
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2"
                >
                  Selanjutnya
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada event yang ditemukan</p>
            <p className="text-gray-400">Coba ubah kata kunci pencarian atau filter kategori</p>
          </div>
        )}
      </div>
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  )
}