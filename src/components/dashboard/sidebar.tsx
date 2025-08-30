"use client"

import { BarChart3, FileText, GraduationCap, Home, SquareUserRound, CircleUserRound, ShieldUser, DatabaseZap   } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Events",
      icon: CircleUserRound,
      href: "/dashboard/events",
    },
    {
      title: "Tickets",
      icon: SquareUserRound,
      href: "/dashboard/tickets",
    },
    {
      title: "Users",
      icon: ShieldUser,
      href: "/dashboard/users",
    },
    {
      title: "Orders",
      icon: FileText,
      href: "/dashboard/orders",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
    },
    {
      title: "Settings",
      icon: DatabaseZap,
      href: "/dashboard/settings",
    },
  ]

  return (
    <div className="hidden md:flex flex-col w-[260px] bg-white p-5 shadow-sm h-full">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="w-10 h-10 bg-[#f2c14b] rounded-xl flex items-center justify-center">
          <GraduationCap className="text-black w-6 h-6" />
        </div>
        <div>
          <span className="font-bold text-gray-800 text-lg">SwarEvent</span>
          <p className="text-xs text-gray-500">Event Management</p>
        </div>
      </div>

      <div className="mt-8 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              isActive(item.href) ? "bg-[#f2c14b]/10 text-[#f2c14b]" : "text-gray-600 hover:bg-gray-50"
            } transition-all`}
          >
            <div className={`rounded-lg p-1.5 ${isActive(item.href) ? "bg-[#f2c14b]" : "bg-gray-100"}`}>
              <item.icon className={`w-4 h-4 ${isActive(item.href) ? "text-black" : "text-gray-600"}`} />
            </div>
            <span className="font-medium">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
