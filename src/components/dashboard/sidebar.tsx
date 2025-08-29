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
      title: "Mahasiswa",
      icon:  CircleUserRound,
      href: "/dashboard/mahasiswa",
    },
    {
      title: "Dosen",
      icon: SquareUserRound,
      href: "/dashboard/dosen",
    },
    {
      title: "Dospem",
      icon: ShieldUser,
      href: "/dashboard/dospem",
    },
    {
      title: "Penilaian",
      icon: FileText,
      href: "/penilaian",
    },
    {
      title: "Laporan",
      icon: BarChart3,  
      href: "/laporan/dospem",
    },
    {
      title: "Pengaturan",
      icon: DatabaseZap,
      href: "/dashboard/pengaturan",
    },
  ]

  return (
    <div className="hidden md:flex flex-col w-[260px] bg-white p-5 shadow-sm h-full">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <GraduationCap className="text-white w-6 h-6" />
        </div>
        <div>
          <span className="font-bold text-gray-800 text-lg">EduMonitor</span>
          <p className="text-xs text-gray-500">Sistem Monitoring Nilai</p>
        </div>
      </div>

      <div className="mt-8 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              isActive(item.href) ? "bg-blue-50 text-primary" : "text-gray-600 hover:bg-gray-50"
            } transition-all`}
          >
            <div className={`rounded-lg p-1.5 ${isActive(item.href) ? "bg-primary" : "bg-gray-100"}`}>
              <item.icon className={`w-4 h-4 ${isActive(item.href) ? "text-white" : "text-gray-600"}`} />
            </div>
            <span className="font-mediumc:\project\mbkm_renstra_management\public\images\orang.png">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
