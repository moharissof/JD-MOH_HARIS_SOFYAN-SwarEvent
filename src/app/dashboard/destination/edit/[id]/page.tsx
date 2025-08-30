"use client"

import { useState, useEffect, use } from "react"
import { DestinationForm } from "@/components/dashboard/DestinationForm"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"
import { useUserData } from "@/hooks/use-user-data"

interface EditDestinationPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditDestinationPage({ params }: EditDestinationPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, loading: authLoading } = useAuth()
  const { loading: userLoading, error, isOrganizer, organizerId } = useUserData()
  const [destination, setDestination] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Unwrap the params Promise
  const { id } = use(params)

  useEffect(() => {
    const fetchDestination = async () => {
      if (!organizerId) return

      try {
        const response = await fetch(`/api/destinations/${id}`)
        if (response.ok) {
          const destinationData = await response.json()
          // Check if the destination belongs to the current organizer
          if (destinationData.organizerId !== organizerId) {
            toast({
              title: "Access Denied",
              description: "Anda tidak memiliki akses untuk mengedit destinasi ini",
              variant: "destructive",
            })
            router.push("/dashboard/destination")
            return
          }
          setDestination(destinationData)
        } else {
          toast({
            title: "Error",
            description: "Destinasi tidak ditemukan",
            variant: "destructive",
          })
          router.push("/dashboard/destination")
        }
      } catch {
        toast({
          title: "Error",
          description: "Gagal memuat data destinasi",
          variant: "destructive",
        })
        router.push("/dashboard/destination")
      } finally {
        setIsLoading(false)
      }
    }

    if (organizerId) {
      fetchDestination()
    }
  }, [id, router, toast, organizerId])

  const handleSuccess = () => {
    router.push("/dashboard/destination")
  }

  const handleCancel = () => {
    router.push("/dashboard/destination")
  }

  // Show loading state
  if (authLoading || userLoading || isLoading) {
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
            <h1 className="text-3xl font-bold text-gray-900">Edit Destinasi</h1>
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
            <p className="text-red-600">Anda harus memiliki role ORGANIZER untuk mengedit destinasi.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!destination) {
    return null
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Destinasi</h1>
          <p className="text-gray-600">Perbarui informasi destinasi</p>
        </div>
      </div>

      <DestinationForm
        destination={destination}
        organizerId={organizerId}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  )
}
