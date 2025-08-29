import Navigation from "@/components/home/Navigation"
import HeroSection from "@/components/home/HeroSection"
import BenefitsSection from "@/components/home/BenefitSection"
import EventCategories from "@/components/home/EventCategory"
import EventCard from "@/components/home/EventCard"
import Link from "next/link"
import Image from "next/image"

const ongoingEvents = [
  {
    title: "TUTTI 2025 : An Annual Concert",
    category: "Cinema",
    categoryColor: "bg-indigo-100 text-indigo-800",
    location: "Goethe Haus Jakarta",
    date: "October 25, 2025",
    organizer: "Sonore",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    href: "/tutti-2025-1",
  },
  {
    title: "INSYFEST 2025",
    category: "Hiburan",
    categoryColor: "bg-pink-100 text-pink-800",
    location: "UNIVERSITAS BUANA PERJUANGAN KARAWANG",
    date: "September 1, 2025",
    organizer: "INSYFEST",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80",
    href: "/insyfest-2025-5",
  },
  {
    title: "Nongan Village Festival 2025",
    category: "Hiburan",
    categoryColor: "bg-pink-100 text-pink-800",
    location: "LAPANGAN DESA NONGAN",
    date: "October 12, 2025",
    organizer: "NVF",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80",
    href: "/nongan-village-festi",
  },
  {
    title: "Anniversary Pasukan Suka Konser (PSK)",
    category: "Hiburan",
    categoryColor: "bg-pink-100 text-pink-800",
    location: "Semu Coffe, Srengseng, Jakarta Barat",
    date: "September 9, 2025",
    organizer: "sambat event organizer",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80",
    href: "/anniversary-pasukan",
  },
]

const pastEvents = [
  {
    title: "The Beatles Experience",
    category: "Hiburan",
    categoryColor: "bg-pink-100 text-pink-800",
    location: "Solo Cigar Lounge - Hotel Grand Sahid Jaya",
    date: "August 8, 2025",
    organizer: "HORAHORE!",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    href: "#",
    isEnded: true,
  },
  {
    title: "Mini Concert - Loving The Harmony",
    category: "Hiburan",
    categoryColor: "bg-pink-100 text-pink-800",
    location: "Auditorium IFI Yogyakarta",
    date: "August 8, 2025",
    organizer: "Loving The Harmony",
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=400&q=80",
    href: "#",
    isEnded: true,
  },
  {
    title: "FAMILY GATHERING EU JABODETABEK",
    category: "Hiburan",
    categoryColor: "bg-pink-100 text-pink-800",
    location: "Rumah Ceria Yatim Seribu Pulau",
    date: "February 21, 2025",
    organizer: "Putri Dwi Fajri",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80",
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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    href: "#",
    isEnded: true,
  },
]

const destinations = [
  { name: "PAPUA", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80" },
  { name: "KALIMANTAN", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80" },
  { name: "BALI", image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=200&q=80" },
  { name: "SURABAYA", image: "https://images.unsplash.com/photo-1555400570-4e1bae5e2c6f?w=200&q=80" },
  { name: "DI YOGYAKARTA", image: "https://images.unsplash.com/photo-1555993539-1732b0258011?w=200&q=80" },
  { name: "BANDUNG", image: "https://images.unsplash.com/photo-1562253518-8490c00b1b0d?w=200&q=80" },
  { name: "DKI JAKARTA", image: "https://images.unsplash.com/photo-1555993539-1732b0258011?w=200&q=80" },
]

const features = [
  {
    title: "Validasi Tiket QR",
    description:
      "Cukup scan barcode pakai HP atau Laptop. Fleksibel untuk banyak device, membuat prosesnya cepat dan nyaman untuk setiap acara",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&q=80",
  },
  {
    title: "Rekap Penjualan",
    description: "Data penjualan tiket lebih gampang dikelola dan analisis dengan format Excel yang downloadable",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&q=80",
  },
  {
    title: "Pembayaran Instant",
    description:
      "Pilihan yang lengkap Kartu Debit/Kredit, QRIS, Transfer Bank BRI, BCA, Mandiri, Dana, OVO, Indomaret, dan Alfamart",
    image: "https://images.unsplash.com/photo-1556742400-b5c8c4b9cc0b?w=80&q=80",
  },
  {
    title: "Sistem OTS (On the Spot)",
    description:
      "Fitur yang dirancang untuk memfasilitasi penjualan tiket langsung di lokasi acara secara efisien dan real-time",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=80&q=80",
  },
  {
    title: "Promosi Event",
    description:
      "Membantu acara kamu jadi lebih dikenal dan tiketnya cepat laku. Meta Ads (Facebook & Instagram) yang dikelola oleh tim profesional",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&q=80",
  },
  {
    title: "Free Tiket Gelang",
    description: "Tiket gelang secara gratis jika diperlukan untuk acara",
    image: "https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?w=80&q=80",
  },
]

const clients = [
  { name: "Arkaya", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&q=80" },
  { name: "AMK Fest", image: "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?w=120&q=80" },
  { name: "Artspirasi", image: "https://images.unsplash.com/photo-1611224923731-5a9e3c1c7729?w=120&q=80" },
  { name: "Delusi", image: "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?w=120&q=80" },
  { name: "Diesteria", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&q=80" },
  { name: "Greatfest", image: "https://images.unsplash.com/photo-1611224923731-5a9e3c1c7729?w=120&q=80" },
  { name: "Hanami", image: "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?w=120&q=80" },
  { name: "Kramat", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&q=80" },
  { name: "Kemenkop UKM", image: "https://images.unsplash.com/photo-1611224923731-5a9e3c1c7729?w=120&q=80" },
  { name: "Inbis Bali", image: "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?w=120&q=80" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-800">
      <Navigation />
      <HeroSection />
      <BenefitsSection />
      <EventCategories />

      {/* Ongoing Events */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Sedang berjalan</h2>
            <Link href="/events" className="text-[#f2c14b] hover:text-[#e6b143] font-medium">
              Lihat semua →
            </Link>
          </div>
          <p className="text-gray-500 mb-8">Temukan event yang paling banyak dicari</p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ongoingEvents.map((event, index) => (
              <EventCard key={index} {...event} />
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
              <EventCard key={index} {...event} />
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

      {/* Features Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Fitur Unggulan Kami</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Solusi lengkap untuk kebutuhan tiketing event kamu dengan fitur-fitur bermanfaat dan mudah digunakan
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow-sm">
                  <div className="-mt-6">
                    <Image
                      className="w-20 h-20 mx-auto rounded-lg object-cover"
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      width={80}
                      height={80}
                    />
                    <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">{feature.title}</h3>
                    <p className="mt-5 text-base text-gray-500 text-center">{feature.description}</p>
                  </div>
                </div>
              </div>
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
      <div className="bg-[#f2c14b]">
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
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2">
              <Image
                className="h-8"
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&q=80"
                alt="Tokoevent"
                width={120}
                height={32}
              />
              <p className="mt-4 text-sm text-gray-300">
                Solusi jualan tiket praktis, profesional, dan terpercaya. Cocok untuk konser, seminar, festival, dan
                acara komunitas.
              </p>
              <div className="mt-4">
                <Link href="https://www.instagram.com/tokoevent" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.367-.315-.49-.753-.49-1.243 0-.49.123-.928.49-1.243.369-.367.807-.49 1.297-.49s.928.123 1.297.49c.367.315.49.753.49 1.243 0 .49-.123.928-.49 1.243-.369.315-.807.49-1.297.49z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Informasi</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/" className="text-base text-gray-400 hover:text-white">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/partnership" className="text-base text-gray-400 hover:text-white">
                    Partnership
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate" className="text-base text-gray-400 hover:text-white">
                    Affiliate
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-base text-gray-400 hover:text-white">
                    Hubungi Kami
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Bisnis</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/how-to-sell" className="text-base text-gray-400 hover:text-white">
                    Cara Jual Tiket
                  </Link>
                </li>
                <li>
                  <Link href="/how-to-buy" className="text-base text-gray-400 hover:text-white">
                    Cara Beli Tiket
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-base text-gray-400 hover:text-white">
                    Biaya Tiket
                  </Link>
                </li>
                <li>
                  <Link href="/withdrawals" className="text-base text-gray-400 hover:text-white">
                    Penarikan Dana
                  </Link>
                </li>
                <li>
                  <Link href="/wristband" className="text-base text-gray-400 hover:text-white">
                    Tiket Gelang
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Info Kontak</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start">
                  <span className="text-base text-gray-400">+62 8123 8169 667 (WA Only)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-base text-gray-400">sales@tokoevent.com</span>
                </li>
              </ul>
              <div className="mt-8">
                <Image
                  className="h-12"
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&q=80"
                  alt="Kominfo"
                  width={120}
                  height={48}
                />
                <p className="mt-2 text-xs text-gray-400">
                  <Link href="#" className="hover:underline">
                    Terdaftar di Kementrian Komunikasi & Digital
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-base text-gray-400">© 2025 Tokoevent. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-6">
              <Link href="/privacy" className="text-base text-gray-400 hover:text-white">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="text-base text-gray-400 hover:text-white">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
