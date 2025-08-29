import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, User } from "lucide-react"

interface EventCardProps {
  title: string
  category: string
  categoryColor: string
  location: string
  date: string
  organizer: string
  image: string
  href: string
  isEnded?: boolean
}

export default function EventCard({
  title,
  category,
  categoryColor,
  location,
  date,
  organizer,
  image,
  href,
  isEnded = false,
}: EventCardProps) {
  return (
    <div className="event-card bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        className="w-full h-48 object-cover"
        src={image || "/placeholder.svg"}
        alt={title}
        width={400}
        height={192}
      />
      <div className="p-4">
        <div className="flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
            {category}
          </span>
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {location}
        </p>
        <p className="mt-1 text-sm text-gray-500 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {date}
        </p>
        <p className="mt-1 text-sm text-gray-500 flex items-center">
          <User className="w-4 h-4 mr-2" />
          {organizer}
        </p>
        <div className="mt-4">
          {isEnded ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Event Berakhir
            </span>
          ) : (
            <Link
              href={href}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#f2c14b] hover:bg-[#e6b143]"
            >
              Beli Tiket
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
    