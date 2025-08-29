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
import { Program, Status } from "@/types"

interface Mahasiswa {
  id?: string
  nama: string
  nim: string
  prodi?: string
  program: Program
  status: Status
  createdAt?: Date
  updatedAt?: Date
}

interface MahasiswaModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  mahasiswa: Mahasiswa | null
  onSubmit: (data: Mahasiswa) => void
}

export function MahasiswaModal({ isOpen, onOpenChange, mahasiswa, onSubmit }: MahasiswaModalProps) {
  const [formData, setFormData] = useState<Mahasiswa>({
    nama: "",
    nim: "",
    prodi: "",
    program: Program.MBKM,
    status: Status.Aktif,
  })
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Reset form when dialog opens or mahasiswa changes
  useEffect(() => {
    if (mahasiswa) {
      setFormData({
        id: mahasiswa.id,
        nama: mahasiswa.nama,
        nim: mahasiswa.nim,
        prodi: mahasiswa.prodi || "",
        program: mahasiswa.program,
        status: mahasiswa.status,
        createdAt: mahasiswa.createdAt,
        updatedAt: mahasiswa.updatedAt,
      })
    } else {
      setFormData({
        nama: "",
        nim: "",
        prodi: "",
        program: Program.MBKM,
        status: Status.Aktif,
      })
    }
  }, [mahasiswa, isOpen])

  const handleChange = (field: keyof Mahasiswa, value: unknown) => {
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
        description: "Silakan masukkan nama mahasiswa",
        variant: "destructive",
      })
      return
    }

    if (!formData.nim) {
      toast({
        title: "NIM diperlukan",
        description: "Silakan masukkan NIM mahasiswa",
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
        description: mahasiswa ? "Data mahasiswa berhasil diperbarui" : "Mahasiswa baru berhasil ditambahkan",
      })
    } catch (error) {
      console.error("Error saving mahasiswa:", error)
      toast({
        title: "Error",
        description: "Gagal menyimpan data mahasiswa",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const prodiOptions = [
    "S1 - Teknik Informatika",
    "D3 - Manajemen Informatika",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mahasiswa ? "Edit Data Mahasiswa" : "Tambah Mahasiswa Baru"}</DialogTitle>
          <DialogDescription>
            {mahasiswa ? "Edit informasi mahasiswa yang sudah ada." : "Tambahkan data mahasiswa baru ke dalam sistem."}
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
              placeholder="Masukkan nama mahasiswa"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nim" className="text-right">
              NIM <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nim"
              value={formData.nim}
              onChange={(e) => handleChange("nim", e.target.value)}
              className="col-span-3"
              placeholder="Nomor Induk Mahasiswa"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prodi" className="text-right">
              Program Studi
            </Label>
            <Select value={formData.prodi || ""} onValueChange={(value) => handleChange("prodi", value)}>
              <SelectTrigger id="prodi" className="col-span-3">
                <SelectValue placeholder="Pilih program studi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Tidak Ada</SelectItem>
                {prodiOptions.map((prodi) => (
                  <SelectItem key={prodi} value={prodi}>
                    {prodi}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="program" className="text-right">
              Program <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.program} onValueChange={(value) => handleChange("program", value as Program)}>
              <SelectTrigger id="program" className="col-span-3">
                <SelectValue placeholder="Pilih program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Program.MBKM}>MBKM</SelectItem>
                <SelectItem value={Program.PKL}>PKL</SelectItem>
                <SelectItem value={Program.KKN}>KKN</SelectItem>
              </SelectContent>
            </Select>
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
            ) : mahasiswa ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Mahasiswa"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
