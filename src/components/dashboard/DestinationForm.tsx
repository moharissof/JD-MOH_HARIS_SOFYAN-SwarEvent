"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Destination {
  id?: string
  name: string
  description?: string
  thumbnail?: string
  location: string
  openHours?: string
}

interface DestinationFormProps {
  destination?: Destination
  organizerId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function DestinationForm({ destination, organizerId, onSuccess, onCancel }: DestinationFormProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    name: destination?.name || "",
    description: destination?.description || "",
    location: destination?.location || "",
    openHours: destination?.openHours || "",
  })

  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(destination?.thumbnail || null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
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

      const url = destination ? `/api/destinations/${destination.id}` : "/api/destinations"
      const method = destination ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: submitData,
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: destination ? "Destinasi berhasil diperbarui" : "Destinasi berhasil dibuat",
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
        description: "Terjadi kesalahan saat menyimpan destinasi",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-8xl mx-auto">
      <CardHeader className="pb-8">
        <CardTitle className="text-2xl font-bold">{destination ? "Edit Destinasi" : "Buat Destinasi Baru"}</CardTitle>
        <p className="text-muted-foreground">
          {destination ? "Perbarui informasi destinasi" : "Lengkapi form di bawah untuk membuat destinasi baru"}
        </p>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Thumbnail Upload */}
          <div className="space-y-4">
            <Label htmlFor="thumbnail" className="text-base font-semibold">Thumbnail Destinasi</Label>
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
              <Label htmlFor="name" className="text-base font-semibold">Nama Destinasi *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Masukkan nama destinasi"
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="openHours" className="text-base font-semibold">Jam Operasional</Label>
              <Input
                id="openHours"
                value={formData.openHours}
                onChange={(e) => handleInputChange("openHours", e.target.value)}
                placeholder="Contoh: 08.00 - 17.00"
                className="h-12 text-base"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="location" className="text-base font-semibold">Lokasi *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Masukkan alamat lengkap destinasi"
              required
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-base font-semibold">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Masukkan deskripsi destinasi, fasilitas yang tersedia, daya tarik utama, dll."
              rows={6}
              className="text-base resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-12 text-base font-semibold"
            >
              {isLoading ? "Menyimpan..." : destination ? "Update Destinasi" : "Buat Destinasi"}
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
