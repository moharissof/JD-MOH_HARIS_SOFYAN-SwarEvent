"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Event {
  id?: string
  title: string
  description?: string
  thumbnail?: string
  category: "ONLINE" | "OFFLINE"
  isPaid: boolean
  price?: number
  date: string
  location?: string
  linkMeet?: string
  webinarData?: string
  detailEvent?: string
}

interface EventFormProps {
  event?: Event
  organizerId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function EventForm({ event, organizerId, onSuccess, onCancel }: EventFormProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    category: event?.category || "OFFLINE",
    isPaid: event?.isPaid ?? true,
    price: event?.price || "",
    date: event?.date ? new Date(event.date).toISOString().slice(0, 16) : "",
    location: event?.location || "",
    linkMeet: event?.linkMeet || "",
    webinarData: event?.webinarData || "",
    detailEvent: event?.detailEvent || "",
  })

  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(event?.thumbnail || null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnail(file)
      const reader = new FileReader()
      reader.onload = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const submitData = new FormData()
      
      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          submitData.append(key, value.toString())
        }
      })
      
      submitData.append("organizerId", organizerId)
      
      if (thumbnail) {
        submitData.append("thumbnail", thumbnail)
      }

      const url = event ? `/api/events/${event.id}` : "/api/events"
      const method = event ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: submitData,
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: event ? "Event berhasil diperbarui" : "Event berhasil dibuat",
        })
        onSuccess?.()
      } else {
        toast({
          title: "Error!",
          description: result.error || "Terjadi kesalahan",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error!",
        description: "Terjadi kesalahan saat menyimpan event",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-8xl mx-auto">
      <CardHeader className="pb-8">
        <CardTitle className="text-2xl font-bold">{event ? "Edit Event" : "Buat Event Baru"}</CardTitle>
        <p className="text-muted-foreground">
          {event ? "Perbarui informasi event" : "Lengkapi form di bawah untuk membuat event baru"}
        </p>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Thumbnail Upload */}
          <div className="space-y-4">
            <Label htmlFor="thumbnail" className="text-base font-semibold">Thumbnail Event</Label>
            <div className="flex flex-col gap-6">
              {previewUrl && (
                <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-200">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer h-12 text-base"
              />
            </div>
          </div>

          {/* Basic Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-base font-semibold">Judul Event *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Masukkan judul event"
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Kategori Event *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Pilih kategori event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONLINE">Online</SelectItem>
                  <SelectItem value="OFFLINE">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-base font-semibold">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Masukkan deskripsi event"
              rows={4}
              className="text-base resize-none"
            />
          </div>

          {/* Date and Pricing Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="date" className="text-base font-semibold">Tanggal & Waktu *</Label>
              <Input
                id="date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Switch
                  id="isPaid"
                  checked={formData.isPaid}
                  onCheckedChange={(checked) => handleInputChange("isPaid", checked)}
                />
                <Label htmlFor="isPaid" className="text-base font-semibold">Event Berbayar</Label>
              </div>

              {formData.isPaid && (
                <div className="space-y-3">
                  <Label htmlFor="price" className="text-base font-semibold">Harga (Rp)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="Masukkan harga tiket"
                    min="0"
                    className="h-12 text-base"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Category-specific fields */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2">
              {formData.category === "OFFLINE" ? "Informasi Event Offline" : "Informasi Event Online"}
            </h3>
            
            {formData.category === "OFFLINE" ? (
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="location" className="text-base font-semibold">Lokasi *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Masukkan lokasi event"
                    required={formData.category === "OFFLINE"}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="detailEvent" className="text-base font-semibold">Detail Event</Label>
                  <Textarea
                    id="detailEvent"
                    value={formData.detailEvent}
                    onChange={(e) => handleInputChange("detailEvent", e.target.value)}
                    placeholder="Detail tambahan untuk event offline (rundown acara, fasilitas, dress code, dll.)"
                    rows={4}
                    className="text-base resize-none"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="linkMeet" className="text-base font-semibold">Link Meeting</Label>
                  <Input
                    id="linkMeet"
                    value={formData.linkMeet}
                    onChange={(e) => handleInputChange("linkMeet", e.target.value)}
                    placeholder="https://zoom.us/j/... atau platform meeting lainnya"
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="webinarData" className="text-base font-semibold">Data Webinar</Label>
                  <Textarea
                    id="webinarData"
                    value={formData.webinarData}
                    onChange={(e) => handleInputChange("webinarData", e.target.value)}
                    placeholder="Informasi materi, narasumber, agenda webinar, dll."
                    rows={4}
                    className="text-base resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-12 text-base font-semibold"
            >
              {isLoading ? "Menyimpan..." : event ? "Update Event" : "Buat Event"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 h-12 text-base font-semibold"
              >
                Batal
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
