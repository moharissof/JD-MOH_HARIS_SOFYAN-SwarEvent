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
import { Loader2 } from 'lucide-react'

interface Dosen {
  id?: string
  nama: string
  nidn: string
  createdAt?: Date
  updatedAt?: Date
}

interface DosenModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  dosen: Dosen | null
  onSubmit: (data: Dosen) => void
}

export function DosenModal({ isOpen, onOpenChange, dosen, onSubmit }: DosenModalProps) {
  const [formData, setFormData] = useState<Dosen>({
    nama: "",
    nidn: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Reset form when dialog opens or dosen changes
  useEffect(() => {
    if (dosen) {
      setFormData({
        id: dosen.id,
        nama: dosen.nama,
        nidn: dosen.nidn,
        createdAt: dosen.createdAt,
        updatedAt: dosen.updatedAt,
      })
    } else {
      setFormData({
        nama: "",
        nidn: "",
      })
    }
  }, [dosen, isOpen])

  const handleChange = (field: keyof Dosen, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    // Validate form
    if (!formData.nama) {
      toast({
        title: "Nama diperlukan",
        description: "Silakan masukkan nama dosen",
        variant: "destructive",
      })
      return
    }

    if (!formData.nidn) {
      toast({
        title: "NIDN diperlukan",
        description: "Silakan masukkan NIDN dosen",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      await onSubmit(formData)
      onOpenChange(false)
      toast({
        title: "Berhasil",
        description: dosen ? "Data dosen berhasil diperbarui" : "Dosen baru berhasil ditambahkan",
      })
    } catch (error) {
      console.error("Error saving dosen:", error)
      toast({
        title: "Error",
        description: "Gagal menyimpan data dosen",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{dosen ? "Edit Data Dosen" : "Tambah Dosen Baru"}</DialogTitle>
          <DialogDescription>
            {dosen ? "Edit informasi dosen yang sudah ada." : "Tambahkan data dosen baru ke dalam sistem."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nama" className="text-right">
              Nama <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nama"
              value={formData.nama}
              onChange={(e) => handleChange("nama", e.target.value)}
              className="col-span-3"
              placeholder="Masukkan nama dosen"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nidn" className="text-right">
              NIDN <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nidn"
              value={formData.nidn}
              onChange={(e) => handleChange("nidn", e.target.value)}
              className="col-span-3"
              placeholder="Nomor Induk Dosen Nasional"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : dosen ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Dosen"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
