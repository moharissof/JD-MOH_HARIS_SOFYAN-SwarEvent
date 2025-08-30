"use client"

import { Bell, ChevronDown, Menu } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface HeaderProps {
  toggleMobileSidebar?: () => void
  user: User | null
}

export default function Header({ toggleMobileSidebar, user}: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const router = useRouter()


  const handleLogout = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    
    if (!error) {
      router.push('/login')
    }
  }

  return (
    <div className="bg-white border-b border-gray-100 py-5">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden bg-gray-100 rounded-lg p-2"
            onClick={toggleMobileSidebar}
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="md:hidden">
            <h1 className="text-gray-800 text-lg font-semibold">SwarEvent</h1>
          </div>

          
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="bg-gray-100 rounded-lg p-2 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-[#f2c14b] text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <div className="relative">
            <button
              className="flex items-center gap-3"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            > 
              <Image
                src={user?.user_metadata?.avatar_url || "/images/orang.png"}
                alt="User"
                width={40}
                height={40}
                className="rounded-xl border-2 border-gray-200"
              />
              <div className="hidden md:block text-gray-800">
                <p className="text-sm font-medium">
                  {user?.user_metadata?.full_name || 'Admin'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || 'admin@gmail.com'}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profil
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Pengaturan
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}