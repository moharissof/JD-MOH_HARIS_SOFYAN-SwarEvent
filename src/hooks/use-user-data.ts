"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

interface UserData {
  id: string
  name: string
  email: string
  role: "USER" | "ORGANIZER" | "ADMIN"
  companyName?: string
  companyAddress?: string
  companyType?: string
  businessLicense?: string
  bankAccount?: string
  bankName?: string
  accountHolder?: string
  description?: string
}

export function useUserData() {
  const { user } = useAuth()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        setUserData(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/user?email=${encodeURIComponent(user.email)}`)
        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }

        const data = await response.json()
        setUserData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user data")
        setUserData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user?.email])

  return {
    userData,
    loading,
    error,
    isOrganizer: userData?.role === "ORGANIZER",
    organizerId: userData?.role === "ORGANIZER" ? userData.id : null,
  }
}
