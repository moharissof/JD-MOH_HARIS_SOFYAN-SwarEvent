"use client"

import { DestinationForm } from "@/components/dashboard/DestinationForm"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useUserData } from "@/hooks/use-user-data"

export default function CreateDestinationPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { loading: userLoading, error, isOrganizer, organizerId } = useUserData()

  const handleSuccess = () => {
    router.push("/dashboard/destination")
  }

  const handleCancel = () => {
    router.push("/dashboard/destination")
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
            <h1 className="text-3xl font-bold text-gray-900">Tambah Destinasi Baru</h1>
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
            <p className="text-red-600">Anda harus memiliki role ORGANIZER untuk membuat destinasi.</p>
          </div>
        </div>
      </div>
    )
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Tambah Destinasi Baru</h1>
          <p className="text-gray-600">Tambahkan destinasi wisata baru</p>
        </div>
      </div>

      <DestinationForm
        organizerId={organizerId}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  )
}
