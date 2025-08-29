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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Status } from "@/types"
import { format } from "date-fns"

interface Periode {
  id?: string
  name: string
  startDate: Date
  endDate: Date
  status: Status
  createdAt?: Date
  updatedAt?: Date
}

interface PeriodeModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  periode: Periode | null
  onSubmit: (data: Periode) => void
}

export function PeriodeModal({ isOpen, onOpenChange, periode, onSubmit }: PeriodeModalProps) {
  const [formData, setFormData] = useState<Periode>({
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    status: Status.Aktif,
  })
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Reset form when dialog opens or periode changes
  useEffect(() => {
    if (periode) {
      setFormData({
        id: periode.id,
        name: periode.name,
        startDate: periode.startDate,
        endDate: periode.endDate,
        status: periode.status,
        createdAt: periode.createdAt,
        updatedAt: periode.updatedAt,
      })
    } else {
      setFormData({
        name: "",
        startDate: new Date(),
        endDate: new Date(),
        status: Status.Aktif,
      })
    }
  }, [periode, isOpen])

  const handleChange = (field: keyof Periode, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: new Date(value),
    }))
  }

  const handleSubmit = async () => {
    // Validate form
    if (!formData.name) {
      toast({
        title: "Nama periode diperlukan",
        description: "Silakan masukkan nama periode",
        variant: "destructive",
      })
      return
    }

    if (formData.endDate < formData.startDate) {
      toast({
        title: "Tanggal tidak valid",
        description: "Tanggal selesai harus setelah tanggal mulai",
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
        description: periode ? "Data periode berhasil diperbarui" : "Periode baru berhasil ditambahkan",
      })
    } catch (error) {
      console.error("Error saving periode:", error)
      toast({
        title: "Error",
        description: "Gagal menyimpan data periode",
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
          <DialogTitle>{periode ? "Edit Data Periode" : "Tambah Periode Baru"}</DialogTitle>
          <DialogDescription>
            {periode ? "Edit informasi periode yang sudah ada." : "Tambahkan data periode baru ke dalam sistem."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nama <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
              placeholder="Masukkan nama periode"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Tanggal Mulai <span className="text-red-500">*</span>
            </Label>
            <Input
              id="startDate"
              type="date"
              value={format(formData.startDate, "yyyy-MM-dd")}
              onChange={(e) => handleDateChange("startDate", e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              Tanggal Selesai <span className="text-red-500">*</span>
            </Label>
            <Input
              id="endDate"
              type="date"
              value={format(formData.endDate, "yyyy-MM-dd")}
              onChange={(e) => handleDateChange("endDate", e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value as Status)}>
              <SelectTrigger id="status" className="col-span-3">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Status.Aktif}>Aktif</SelectItem>
                <SelectItem value={Status.NonAktif}>Non Aktif</SelectItem>
              </SelectContent>
            </Select>
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
            ) : periode ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Periode"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
