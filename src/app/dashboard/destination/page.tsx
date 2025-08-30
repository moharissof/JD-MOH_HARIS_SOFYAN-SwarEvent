/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Plus, Trash, MapPin, Clock } from "lucide-react"
import { DataTableCard } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Destination {
  id?: string
  name: string
  description?: string
  thumbnail?: string
  location: string
  openHours?: string
  organizerId: string
  tickets?: DestinationTicket[]
  createdAt?: string
  updatedAt?: string
}

interface DestinationTicket {
  id: string
  name: string
  price: number
  stock: number
}

export default function DestinationsPage() {
  const [destinationsList, setDestinationsList] = useState<Destination[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Fetch destinations data
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/destinations")
        if (!response.ok) {
          throw new Error("Failed to fetch destinations data")
        }
        const data = await response.json()
        setDestinationsList(data)
      } catch {
        toast({
          title: "Error",
          description: "Gagal memuat data destinasi",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  const handleAddDestination = () => {
    router.push("/dashboard/destination/create")
  }

  const handleEditDestination = (destination: Destination) => {
    router.push(`/dashboard/destination/edit/${destination.id}`)
  }

  const handleDeleteDestination = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus destinasi ini?")) return

    try {
      const response = await fetch(`/api/destinations/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete destination")
      }

      setDestinationsList(destinationsList.filter((destination) => destination.id !== id))
      router.refresh()

      toast({
        title: "Success",
        description: "Destinasi berhasil dihapus",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menghapus destinasi",
        variant: "destructive",
      })
    }
  }

  const columns: ColumnDef<Destination>[] = [
    {
      accessorKey: "name",
      header: "Destinasi",
      cell: ({ row }) => {
        const destination = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
              {destination.thumbnail ? (
                <img
                  src={destination.thumbnail}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <span className="font-medium text-gray-800">{destination.name}</span>
              {destination.description && (
                <div className="text-sm text-gray-500 max-w-xs truncate mt-1">
                  {destination.description}
                </div>
              )}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "location",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <MapPin className="mr-2 h-4 w-4" />
            Lokasi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="max-w-[200px] truncate">{row.original.location}</div>
      },
    },
    {
      accessorKey: "openHours",
      header: "Jam Operasional",
      cell: ({ row }) => {
        const openHours = row.original.openHours
        return (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{openHours || "Tidak ditentukan"}</span>
          </div>
        )
      },
    },
    {
      id: "tickets",
      header: "Tiket",
      cell: ({ row }) => {
        const tickets = row.original.tickets || []
        return (
          <div className="text-sm">
            {tickets.length > 0 ? (
              <Badge variant="outline">{tickets.length} jenis tiket</Badge>
            ) : (
              <span className="text-gray-500">Belum ada tiket</span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Dibuat",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt!)
        return (
          <div className="text-sm text-gray-500">
            {date.toLocaleDateString("id-ID")}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const destination = row.original
        return (
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => handleEditDestination(destination)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => handleDeleteDestination(destination.id!)}
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
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Destinasi</h1>
          <p className="text-gray-600 mt-1">Kelola destinasi wisata Anda</p>
        </div>
        <Button onClick={handleAddDestination} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Destinasi
        </Button>
      </div>

      <DataTableCard
        columns={columns}
        data={destinationsList}
        searchColumn="name"
        searchPlaceholder="Cari destinasi..."
        title="Daftar Destinasi"
        description="Kelola semua destinasi wisata yang telah dibuat"
        pageSize={10}
        isLoading={isLoading}
      />
    </div>
  )
}
