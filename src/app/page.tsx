import Navigation from "@/components/home/Navigation"
import HeroSection from "@/components/home/HeroSection"
import EventCategories from "@/components/home/EventCategory"
import EventCard from "@/components/home/EventCard"
import Link from "next/link"
import Image from "next/image"

const ongoingEvents = [
  {
    title: "TUTTI 2025 : An Annual Concert",
    category: "Cinema",
    categoryColor: "bg-blue-100 text-blue-800",
    location: "Goethe Haus Jakarta",
    date: "October 25, 2025",
    organizer: "Sonore",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center&q=80",
    href: "/tutti-2025-1",
  },
  {
    title: "INSYFEST 2025",
    category: "Hiburan",
    categoryColor: "bg-blue-100 text-blue-800",
    location: "UNIVERSITAS BUANA PERJUANGAN KARAWANG",
    date: "September 1, 2025",
    organizer: "INSYFEST",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop&crop=center&q=80",
    href: "/insyfest-2025-5",
  },
  {
    title: 'Nongan Village Festival "SARASAMI"',
    category: "Hiburan",
    categoryColor: "bg-blue-100 text-blue-800",
    location: "LAPANGAN DESA NONGAN",
    date: "October 12, 2025",
    organizer: "NVF",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop&crop=center&q=80",
    href: "/nongan-village-festi",
  },
  {
    title: "Anniversary Pasukan Suka Konser",
    category: "Hiburan",
    categoryColor: "bg-blue-100 text-blue-800",
    location: "Semu Coffe, Srengseng, Jakarta Barat",
    date: "September 9, 2025",
    organizer: "sambat event organizer",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop&crop=center&q=80",
    href: "/anniversary-pasukan",
  },
  {
    title: "Malam Keakraban Siswa",
    category: "Hiburan",
    categoryColor: "bg-blue-100 text-blue-800",
    location: "Graha RMC",
    date: "October 25, 2025",
    organizer: "HIMAPRODI SI ITB STIKOM",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop&crop=center&q=80",
    href: "/malam-keakraban",
  },
]

const pastEvents = [
  {
    title: "The Beatles Music Celebration",
    category: "Musik",
    categoryColor: "bg-green-100 text-green-800",
    location: "The Plaza Music Hall",
    date: "September 20, 2024",
    organizer: "Music Festival Indonesia",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop&crop=center&q=80",
    href: "#",
    isEnded: true,
  },
  {
    title: "Harmony and Wellness Meditation Concert",
    category: "Wellness",
    categoryColor: "bg-purple-100 text-purple-800",
    location: "Banyuwangi Cultural Center",
    date: "August 15, 2024",
    organizer: "Wellness Community Banyuwangi",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop&crop=center&q=80",
    href: "#",
    isEnded: true,
  },
  {
    title: "Family Gathering & Fun Day",
    category: "Keluarga",
    categoryColor: "bg-orange-100 text-orange-800",
    location: "Banyuwangi Beach Resort",
    date: "July 10, 2024",
    organizer: "Community Connect Banyuwangi",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop&crop=center&q=80",
    href: "#",
    isEnded: true,
  },
  {
    title: "Theater Tepi Waktu by Fellowship Program",
    category: "Hiburan",
    categoryColor: "bg-pink-100 text-pink-800",
    location: "Salihara Arts Center",
    date: "April 12, 2025",
    organizer: "Fellowship UAG",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop&crop=center&q=80",
    href: "#",
    isEnded: true,
  },
]

const destinations = [
  { name: "PAPUA", image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=250&fit=crop&crop=center&q=80" },
  { name: "KALIMANTAN", image: "https://images.unsplash.com/photo-1570214476695-19bd467e6f2a?w=400&h=250&fit=crop&crop=center&q=80" },
  { name: "BALI", image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=250&fit=crop&crop=center&q=80" },
  { name: "SURABAYA", image: "https://images.unsplash.com/photo-1555400242-17f22ac8b9e0?w=400&h=250&fit=crop&crop=center&q=80" },
  { name: "DI YOGYAKARTA", image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop&crop=center&q=80" },
  { name: "BANDUNG", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=250&fit=crop&crop=center&q=80" },
  { name: "DKI JAKARTA", image: "https://images.unsplash.com/photo-1555400243-4-5dd2c80d1b9c?w=400&h=250&fit=crop&crop=center&q=80" },
]


const clients = [
  { name: "Arkaya", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=120&fit=crop&crop=center&q=80" },
  { name: "AMK Fest", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&h=120&fit=crop&crop=center&q=80" },
  { name: "Artspirasi", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=120&fit=crop&crop=center&q=80" },
  { name: "Delusi", image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=200&h=120&fit=crop&crop=center&q=80" },
  { name: "Diesteria", image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=120&fit=crop&crop=center&q=80" },
  { name: "Greatfest", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=200&h=120&fit=crop&crop=center&q=80" },
  { name: "Hanami", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=120&fit=crop&crop=center&q=80" },
  { name: "Kramat", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=120&fit=crop&crop=center&q=80" },
  { name: "Kemenkop UKM", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=120&fit=crop&crop=center&q=80" },
  { name: "Inbis Bali", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=200&h=120&fit=crop&crop=center&q=80" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-800">
      <Navigation />
      <HeroSection />
      <EventCategories />

      {/* Ongoing Events */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Sedang berjalan</h2>
            <Link href="/events" className="text-gray-600 hover:text-gray-800 font-medium text-sm flex items-center">
              Lihat semua <span className="ml-1">›</span>
            </Link>
          </div>
          <p className="text-gray-500 mb-8">Temukan event yang paling banyak dicari</p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {ongoingEvents.map((event, index) => (
              <div key={index} className="h-full">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Past Events */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Event berlalu</h2>
            <Link href="/events" className="text-[#f2c14b] hover:text-[#e6b143] font-medium">
              Lihat semua →
            </Link>
          </div>
          <p className="text-gray-500 mb-8">Kami sudah menyukseskan banyak event - event di Indonesia</p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pastEvents.map((event, index) => (
              <div key={index} className="h-full">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Destinations */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Destinasi Event</h2>
          <p className="text-gray-500 mb-8">Temukan event - event besar di daerahmu</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {destinations.map((destination, index) => (
              <Link key={index} href="#" className="destination-card h-32">
                <Image
                  className="w-full h-full object-cover"
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  width={200}
                  height={128}
                />
                <h3 className="font-medium">{destination.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>


      {/* Clients Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Klien kami</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Klien kami beragam dan merupakan event - event besar yang tersebar di seluruh nusantara
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
              {clients.map((client, index) => (
                <div key={index} className="col-span-1 flex justify-center">
                  <Image
                    className="h-20 client-logo"
                    src={client.image || "/placeholder.svg"}
                    alt={client.name}
                    width={120}
                    height={80}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="bg-[#f2c14b]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ingin tau lebih banyak keuntungan Tokoevent?
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-6 text-white/90">
                Gabung bersama ratusan event organizer yang sudah menjual tiket konser, seminar, dan festival lewat
                Tokoevent. Tanpa potongan, bisa pakai QR, dan gratis tiket gelang!
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/sell-tickets"
                className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#f2c14b] bg-white hover:bg-gray-50"
              >
                Mulai Jual Tiket
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10"
              >
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Image
                  className="h-10 w-auto"
                  src="/images/Logo.png"
                  alt="SwarEvent"
                  width={120}
                  height={40}
                />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Platform terpercaya untuk membeli tiket event, konser, workshop, dan webinar terbaik di Banyuwangi dan sekitarnya.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <Link href="https://www.instagram.com/swarevent" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </Link>
                <Link href="https://www.facebook.com/swarevent" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
                <Link href="https://twitter.com/swarevent" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
                <Link href="https://wa.me/6281238169667" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">WhatsApp</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Menu Utama
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Event
                  </Link>
                </li>
                <li>
                  <Link href="/partnership" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    Partnership
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Hubungi Kami
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Layanan
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/how-to-sell" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                    Cara Jual Tiket
                  </Link>
                </li>
                <li>
                  <Link href="/how-to-buy" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    Cara Beli Tiket
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    Biaya & Harga
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-1.106-1.106A6.003 6.003 0 004 10c0 .639.099 1.255.283 1.836l1.615-1.615zM9.7 4.836A4.002 4.002 0 0110 8c.617 0 1.191-.146 1.7-.408l1.263 1.263a6.003 6.003 0 01-2.549 4.098L9.7 4.836zm5.872-1.414a6.003 6.003 0 01-2.83 10.638L9.7 4.836a4.002 4.002 0 011.562-1.414z" clipRule="evenodd" />
                    </svg>
                    Bantuan
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Kontak
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div>
                    <p className="text-gray-300 text-sm">WhatsApp</p>
                    <p className="text-white font-medium">+62 812 3816 9667</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="text-gray-300 text-sm">Email</p>
                    <p className="text-white font-medium">info@swarevent.com</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-gray-300 text-sm">Alamat</p>
                    <p className="text-white font-medium">Banyuwangi, Jawa Timur</p>
                  </div>
                </li>
              </ul>

              {/* Certification */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center space-x-3">
                  <Image
                    className="h-8 w-auto opacity-70"
                    src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=60&q=80"
                    alt="Verified"
                    width={60}
                    height={32}
                  />
                  <div>
                    <p className="text-xs text-gray-400">
                      <Link href="#" className="hover:underline">
                        Terdaftar & Terpercaya
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-gray-400 text-sm">© 2025 SwarEvent. All rights reserved.</p>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Platform Aman & Terpercaya</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end space-x-6">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Kebijakan Privasi
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Syarat & Ketentuan
                </Link>
                <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}