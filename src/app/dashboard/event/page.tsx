/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Plus, Trash, Calendar, MapPin, Globe } from "lucide-react"
import { DataTableCard } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Event {
  id?: string
  title: string
  description?: string
  category: "ONLINE" | "OFFLINE"
  isPaid: boolean
  price?: number
  date: string
  location?: string
  linkMeet?: string
  webinarData?: string
  detailEvent?: string
  organizerId: string
  tickets?: Ticket[]
  createdAt?: string
  updatedAt?: string
}

interface Ticket {
  id: string
  name: string
  price: number
  stock: number
}

export default function EventsPage() {
  const [eventsList, setEventsList] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Fetch events data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events")
        if (!response.ok) {
          throw new Error("Failed to fetch events data")
        }
        const data = await response.json()
        setEventsList(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal memuat data event",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleAddEvent = () => {
    router.push("/dashboard/event/create")
  }

  const handleEditEvent = (event: Event) => {
    router.push(`/dashboard/event/edit/${event.id}`)
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus event ini?")) return

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete event")
      }

      setEventsList(eventsList.filter((event) => event.id !== id))
      router.refresh()

      toast({
        title: "Success",
        description: "Event berhasil dihapus",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menghapus event",
        variant: "destructive",
      })
    }
  }

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "title",
      header: "Event",
      cell: ({ row }) => {
        const event = row.original
        return (
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                event.category === "ONLINE" ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              {event.category === "ONLINE" ? (
                <Globe className="h-5 w-5 text-blue-600" />
              ) : (
                <MapPin className="h-5 w-5 text-green-600" />
              )}
            </div>
            <div>
              <span className="font-medium text-gray-800">{event.title}</span>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={event.category === "ONLINE" ? "default" : "secondary"}>{event.category}</Badge>
                <Badge variant={event.isPaid ? "destructive" : "outline"}>
                  {event.isPaid ? `Rp ${event.price?.toLocaleString()}` : "Gratis"}
                </Badge>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <Calendar className="mr-2 h-4 w-4" />
            Tanggal
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.original.date)
        return (
          <div>
            <div className="font-medium">{date.toLocaleDateString("id-ID")}</div>
            <div className="text-sm text-gray-500">
              {date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "location",
      header: "Lokasi/Link",
      cell: ({ row }) => {
        const event = row.original
        return (
          <div className="max-w-[200px] truncate">{event.category === "ONLINE" ? event.linkMeet : event.location}</div>
        )
      },
    },
    {
      id: "tickets",
      header: "Tiket",
      cell: ({ row }) => {
        const tickets = row.original.tickets || []
        return <div className="text-sm">{tickets.length > 0 ? `${tickets.length} jenis tiket` : "Belum ada tiket"}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const event = row.original
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditEvent(event)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => handleDeleteEvent(event.id!)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Event</h1>
          <p className="text-gray-600 mt-1">Kelola event online dan offline Anda</p>
        </div>
        <Button onClick={handleAddEvent} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Event
        </Button>
      </div>

      <DataTableCard
        columns={columns}
        data={eventsList}
        searchColumn="title"
        searchPlaceholder="Cari event..."
        title="Daftar Event"
        description="Kelola semua event yang telah dibuat"
        pageSize={10}
        isLoading={isLoading}
      />


    </div>
  )
}
