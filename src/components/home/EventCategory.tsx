import Link from "next/link"
import { Mic, Book, Users, Briefcase, UmbrellaOff as UmbrellaBeach, Film, Package } from "lucide-react"

const categories = [
  { name: "Hiburan", icon: Mic, href: "/c/entertainment" },
  { name: "Edukasi", icon: Book, href: "/c/education" },
  { name: "Olahraga", icon: Users, href: "/c/sport" },
  { name: "Bisnis", icon: Briefcase, href: "/c/business" },
  { name: "Tempat Wisata", icon: UmbrellaBeach, href: "/c/experience" },
  { name: "Cinema", icon: Film, href: "/c/cinema" },
  { name: "Lainnya", icon: Package, href: "/c/other" },
]

export default function EventCategories() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link
                key={category.name}
                href={category.href}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-800 shadow-sm hover:bg-gray-100"
              >
                <IconComponent className="w-4 h-4 mr-2 text-[#f2c14b]" />
                {category.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
