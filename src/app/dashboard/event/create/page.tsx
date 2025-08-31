/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { EventForm } from "@/components/dashboard/EventForm"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserData } from "@/hooks/use-user-data"
import { useAuth } from "@/context/AuthContext"

export default function CreateEventPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { userData, loading: userLoading, error, isOrganizer, organizerId } = useUserData()

  const handleSuccess = () => {
    router.push("/dashboard/event")
  }

  const handleCancel = () => {
    router.push("/dashboard/event")
  }

  // Show loading state
  if (authLoading || userLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Buat Event Baru</h1>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error or redirect if not authenticated
  if (!user) {
    router.push("/login")
    return null
  }

  // Show error if user data failed to load
  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Error</h1>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  // Check if user is organizer
  if (!isOrganizer || !organizerId) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
            <p className="text-red-600">Anda harus memiliki role ORGANIZER untuk membuat event.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Buat Event Baru</h1>
          <p className="text-gray-600">Buat event online atau offline baru</p>
        </div>
      </div>

      <EventForm
        organizerId={organizerId}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  )
}
