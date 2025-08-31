/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Calendar, User, ShoppingCart, ChevronLeft, ChevronRight, X } from "lucide-react"
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
  destination?: string
}

const events: Event[] = [
  {
    id: "1",
    title: "Festival Gandrung Sewu 2025",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Budaya",
    location: "Pantai Boom Banyuwangi",
    date: "12 Agustus 2025",
    organizer: "Pemkab Banyuwangi",
    price: 50000,
    isPopular: true,
    destination: "Pantai Boom"
  },
  {
    id: "2",
    title: "Banyuwangi Festival 2025",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Hiburan",
    location: "Alun-alun Banyuwangi",
    date: "1 September 2025",
    organizer: "Dinas Pariwisata BWI",
    price: 75000,
    isPopular: true,
    destination: "Alun-alun"
  },
  {
    id: "3",
    title: "Ijen Festival 2025",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Wisata",
    location: "Kawah Ijen Banyuwangi",
    date: "15 Oktober 2025",
    organizer: "Ijen Tourism Board",
    price: 150000,
    originalPrice: 200000,
    destination: "Kawah Ijen"
  },
  {
    id: "4",
    title: "Konser Dangdut Koplo Osing",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Musik",
    location: "Stadion Diponegoro Banyuwangi",
    date: "20 September 2025",
    organizer: "Sanggar Osing BWI",
    price: 100000,
    destination: "Stadion Diponegoro"
  },
  {
    id: "5",
    title: "Festival Kuliner Using",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Kuliner",
    location: "Taman Blambangan",
    date: "5 November 2025",
    organizer: "Komunitas Kuliner BWI",
    price: 25000,
    destination: "Taman Blambangan"
  },
  {
    id: "6",
    title: "Banyuwangi Jazz Festival 2025",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Musik",
    location: "Pantai Grand Watu Dodol",
    date: "20 November 2025",
    organizer: "Jazz Lovers Banyuwangi",
    price: 300000,
    originalPrice: 350000,
    isPopular: true,
    destination: "Watu Dodol"
  },
  {
    id: "7",
    title: "Pertunjukan Wayang Kulit",
    image: "https://images.unsplash.com/photo-1573511860302-28c524319d2a?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Budaya",
    location: "Pendopo Kabupaten Banyuwangi",
    date: "10 Oktober 2025",
    organizer: "Dinas Kebudayaan BWI",
    price: 30000,
    destination: "Alun-alun"
  },
  {
    id: "8",
    title: "Workshop Fotografi Sunrise Ijen",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Workshop",
    location: "Basecamp Ijen Banyuwangi",
    date: "12 September 2025",
    organizer: "Foto Komunitas BWI",
    price: 200000,
    isPopular: true,
    destination: "Kawah Ijen"
  },
  {
    id: "9",
    title: "Festival Pantai Sukamade",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Wisata",
    location: "Pantai Sukamade Banyuwangi",
    date: "25 November 2025",
    organizer: "Taman Nasional Meru Betiri",
    price: 100000,
    originalPrice: 125000,
    isPopular: true,
    destination: "Pantai Sukamade"
  },
  {
    id: "10",
    title: "Turnamen Futsal Piala Bupati",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Olahraga",
    location: "GOR Tawang Alun Banyuwangi",
    date: "3 Oktober 2025",
    organizer: "KONI Banyuwangi",
    price: 15000,
    destination: "Tawang Alun"
  },
  {
    id: "11",
    title: "Seminar Pariwisata Digital",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Teknologi",
    location: "Hotel Santika Banyuwangi",
    date: "8 Oktober 2025",
    organizer: "Disparbud Banyuwangi",
    price: 150000,
    destination: "Hotel Santika"
  },
  {
    id: "12",
    title: "Pameran Batik Gajah Oling",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Seni",
    location: "Museum Blambangan",
    date: "18 November 2025",
    organizer: "Dekranasda Banyuwangi",
    price: 20000,
    destination: "Museum Blambangan"
  },
  {
    id: "13",
    title: "Festival Kopi Kalibendo",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Kuliner",
    location: "Perkebunan Kopi Kalibendo",
    date: "5 Desember 2025",
    organizer: "Petani Kopi Kalibendo",
    price: 35000,
    isPopular: true,
    destination: "Kalibendo"
  },
  {
    id: "14",
    title: "Konser Musik Tradisional Using",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Musik",
    location: "Gedung Kesenian Banyuwangi",
    date: "22 Oktober 2025",
    organizer: "Sanggar Seni Using",
    price: 50000,
    destination: "Gedung Kesenian"
  },
  {
    id: "15",
    title: "Pameran UMKM Banyuwangi",
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Ekonomi",
    location: "Banyuwangi Mall",
    date: "28 September 2025",
    organizer: "Dinas Koperasi UMKM",
    price: 10000,
    destination: "Banyuwangi Mall"
  },
  {
    id: "16",
    title: "Marathon Sunrise Ijen",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Olahraga",
    location: "Start: Alun-alun, Finish: Ijen",
    date: "14 November 2025",
    organizer: "Running Community BWI",
    price: 75000,
    destination: "Kawah Ijen"
  },
]

const categories = ["Semua", "Budaya", "Hiburan", "Musik", "Wisata", "Kuliner", "Workshop", "Seni", "Teknologi", "Olahraga", "Ekonomi"]

const destinations = ["Semua Lokasi", "Kawah Ijen", "Pantai Boom", "Pantai Sukamade", "Watu Dodol", "Alun-alun", "Taman Blambangan", "Museum Blambangan", "Kalibendo", "Tawang Alun", "Hotel Santika", "Gedung Kesenian", "Banyuwangi Mall", "Stadion Diponegoro"]

const priceRanges = [
  { label: "Semua Harga", min: 0, max: Infinity },
  { label: "Gratis", min: 0, max: 0 },
  { label: "< Rp 50.000", min: 0, max: 50000 },
  { label: "Rp 50.000 - Rp 100.000", min: 50000, max: 100000 },
  { label: "Rp 100.000 - Rp 200.000", min: 100000, max: 200000 },
  { label: "> Rp 200.000", min: 200000, max: Infinity },
]

const dates = [
  "Semua Tanggal",
  "Hari Ini",
  "Minggu Ini", 
  "Bulan Ini",
  "3 Bulan ke Depan"
]

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedDestination, setSelectedDestination] = useState("Semua Lokasi")
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [selectedDate, setSelectedDate] = useState("Semua Tanggal")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const { addItem, isInCart, totalItems, openCart } = useCart()

  const itemsPerPage = 8

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "Semua" || event.category === selectedCategory
    
    const matchesDestination = selectedDestination === "Semua Lokasi" || event.destination === selectedDestination
    
    const priceRange = priceRanges[selectedPriceRange]
    const matchesPrice = event.price >= priceRange.min && event.price <= priceRange.max
    
    // Date filtering logic (simplified)
    let matchesDate = true
    if (selectedDate !== "Semua Tanggal") {
      // Add date filtering logic based on selected date filter
      // This is a simplified version - you can expand this based on your needs
      matchesDate = true
    }
    
    return matchesSearch && matchesCategory && matchesDestination && matchesPrice && matchesDate
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleDestinationChange = (destination: string) => {
    setSelectedDestination(destination)
    setCurrentPage(1)
  }

  const handlePriceRangeChange = (index: number) => {
    setSelectedPriceRange(index)
    setCurrentPage(1)
  }

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Semua")
    setSelectedDestination("Semua Lokasi")
    setSelectedPriceRange(0)
    setSelectedDate("Semua Tanggal")
    setCurrentPage(1)
  }

  const hasActiveFilters = selectedCategory !== "Semua" || selectedDestination !== "Semua Lokasi" || selectedPriceRange !== 0 || selectedDate !== "Semua Tanggal" || searchTerm !== ""

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Banyuwangi</h1>
              <p className="text-gray-600">Temukan dan beli tiket event terbaik di Banyuwangi</p>
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

          {/* Search and Filter Toggle */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Cari event atau lokasi di Banyuwangi..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button 
              variant="outline" 
              className="h-12 px-6 bg-transparent"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter {hasActiveFilters && <span className="ml-1 bg-blue-600 text-white text-xs rounded-full w-2 h-2"></span>}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Filter Event</h3>
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Hapus Semua Filter
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Destination Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destinasi</label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {destinations.map((destination) => (
                      <option key={destination} value={destination}>
                        {destination}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => handlePriceRangeChange(parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priceRanges.map((range, index) => (
                      <option key={index} value={index}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {dates.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="newest">Terbaru</option>
                    <option value="price-low">Harga Terendah</option>
                    <option value="price-high">Harga Tertinggi</option>
                    <option value="popular">Paling Popular</option>
                    <option value="date">Tanggal Event</option>
                  </select>
                </div>
              </div>
            </div>
          )}

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

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Filter aktif:</span>
              {selectedCategory !== "Semua" && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Kategori: {selectedCategory}
                  <button 
                    onClick={() => handleCategoryChange("Semua")}
                    className="ml-1 hover:bg-blue-200 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedDestination !== "Semua Lokasi" && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Lokasi: {selectedDestination}
                  <button 
                    onClick={() => handleDestinationChange("Semua Lokasi")}
                    className="ml-1 hover:bg-green-200 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedPriceRange !== 0 && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Harga: {priceRanges[selectedPriceRange].label}
                  <button 
                    onClick={() => handlePriceRangeChange(0)}
                    className="ml-1 hover:bg-purple-200 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedDate !== "Semua Tanggal" && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Tanggal: {selectedDate}
                  <button 
                    onClick={() => handleDateChange("Semua Tanggal")}
                    className="ml-1 hover:bg-orange-200 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  Pencarian: "{searchTerm}"
                  <button 
                    onClick={() => handleSearchChange("")}
                    className="ml-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
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
                {event.destination && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/90 text-gray-800 hover:bg-white/90">{event.destination}</Badge>
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
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Sebelumnya
                </Button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const showPage = 
                      pageNum === 1 || 
                      pageNum === totalPages || 
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)

                    if (!showPage) {
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
            <p className="text-gray-400 mb-4">Coba ubah kata kunci pencarian atau filter</p>
            {hasActiveFilters && (
              <Button onClick={clearAllFilters} variant="outline">
                Hapus Semua Filter
              </Button>
            )}
          </div>
        )}
      </div>
      
      <CartSidebar />
    </div>
  )
}