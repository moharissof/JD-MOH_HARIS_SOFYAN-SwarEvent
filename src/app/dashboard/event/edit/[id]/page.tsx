"use client"

import { useState, useEffect, use } from "react"
import { EventForm } from "@/components/dashboard/EventForm"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useUserData } from "@/hooks/use-user-data"
import { useAuth } from "@/context/AuthContext"

interface EditEventPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditEventPage({ params }: EditEventPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, loading: authLoading } = useAuth()
  const { loading: userLoading, error, isOrganizer, organizerId } = useUserData()
  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Unwrap the params Promise
  const { id } = use(params)

  useEffect(() => {
    const fetchEvent = async () => {
      if (!organizerId) return

      try {
        const response = await fetch(`/api/events/${id}`)
        if (response.ok) {
          const eventData = await response.json()
          // Check if the event belongs to the current organizer
          if (eventData.organizerId !== organizerId) {
            toast({
              title: "Access Denied",
              description: "Anda tidak memiliki akses untuk mengedit event ini",
              variant: "destructive",
            })
            router.push("/dashboard/event")
            return
          }
          setEvent(eventData)
        } else {
          toast({
            title: "Error",
            description: "Event tidak ditemukan",
            variant: "destructive",
          })
          router.push("/dashboard/event")
        }
      } catch {
        toast({
          title: "Error",
          description: "Gagal memuat data event",
          variant: "destructive",
        })
        router.push("/dashboard/event")
      } finally {
        setIsLoading(false)
      }
    }

    if (organizerId) {
      fetchEvent()
    }
  }, [id, router, toast, organizerId])

  const handleSuccess = () => {
    router.push("/dashboard/event")
  }

  const handleCancel = () => {
    router.push("/dashboard/event")
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
            <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
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
            <p className="text-red-600">Anda harus memiliki role ORGANIZER untuk mengedit event.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return null
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
          <p className="text-gray-600">Perbarui informasi event</p>
        </div>
      </div>

      <EventForm
        event={event}
        organizerId={organizerId}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  )
}
