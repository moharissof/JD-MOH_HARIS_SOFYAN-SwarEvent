"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"


interface BobotMahasiswa {
  id: string
  nama: string
  bobot: number
  createdAt: Date
  updatedAt: Date
}

interface BobotMahasiswaModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  bobot: BobotMahasiswa | null
  onSubmit: (data: { nama: string; bobot: number }) => void
  existingTotal: number
}

export function BobotMahasiswaModal({
  isOpen,
  onOpenChange,
  bobot,
  onSubmit,
  existingTotal,
}: BobotMahasiswaModalProps) {
  const [formData, setFormData] = useState<{ nama: string; bobot: number }>({
    nama: "",
    bobot: 0,
  })
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Reset form when dialog opens or bobot changes
  useEffect(() => {
    if (bobot) {
      setFormData({
        nama: bobot.nama,
        bobot: bobot.bobot,
      })
    } else {
      setFormData({
        nama: "",
        bobot: 0,
      })
    }
  }, [bobot, isOpen])

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "bobot" 
        ? typeof value === "string" 
          ? Number.parseFloat(value) || 0 
          : Number(value)
        : String(value)
    }))
  }

  const handleSubmit = async () => {
    // Validate form
    if (!formData.nama.trim()) {
      toast({
        title: "Nama kriteria diperlukan",
        description: "Silakan masukkan nama kriteria penilaian",
        variant: "destructive",
      })
      return
    }

    if (formData.bobot <= 0) {
      toast({
        title: "Bobot tidak valid",
        description: "Bobot harus lebih besar dari 0",
        variant: "destructive",
      })
      return
    }

    const newTotal = existingTotal + formData.bobot
    if (newTotal > 100) {
      toast({
        title: "Total bobot melebihi 100%",
        description: `Total bobot akan menjadi ${newTotal}%. Maksimal total bobot adalah 100%`,
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Error saving bobot:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // Calculate new total after changes
  const newTotal = existingTotal + formData.bobot

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{bobot ? "Edit Kriteria Penilaian" : "Tambah Kriteria Penilaian Baru"}</DialogTitle>
          <DialogDescription>
            {bobot
              ? "Edit kriteria dan bobot penilaian yang sudah ada."
              : "Tambahkan kriteria dan bobot penilaian baru untuk mahasiswa."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nama" className="text-right">
              Nama Bobot <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nama"
              value={formData.nama}
              onChange={(e) => handleChange("nama", e.target.value)}
              className="col-span-3"
              placeholder="Masukkan nama kriteria penilaian"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bobot" className="text-right">
              Bobot <span className="text-red-500">*</span>
            </Label>
            <Input
              id="bobot"
              type="number"
              min="0"
              max="100"
              value={formData.bobot}
              onChange={(e) => handleChange("bobot", e.target.value)}
              className="col-span-3"
              placeholder="Masukkan bobot penilaian (dalam persen)"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving || newTotal > 100}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : bobot ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Kriteria"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}