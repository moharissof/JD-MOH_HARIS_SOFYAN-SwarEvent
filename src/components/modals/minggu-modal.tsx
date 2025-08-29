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

interface Minggu {
  id: string
  minggu: number
  createdAt: Date
  updatedAt: Date
}

interface MingguModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  minggu: Minggu | null
  onSubmit: (data: { minggu: number }) => void
}

export function MingguModal({ isOpen, onOpenChange, minggu, onSubmit }: MingguModalProps) {
  const [formData, setFormData] = useState<{ minggu: number }>({
    minggu: 0,
  })
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Reset form when dialog opens or minggu changes
  useEffect(() => {
    if (minggu) {
      setFormData({
        minggu: minggu.minggu,
      })
    } else {
      setFormData({
        minggu: 0,
      })
    }
  }, [minggu, isOpen])

  const handleChange = (value: string) => {
    const mingguValue = Number.parseInt(value, 10)
    setFormData({
      minggu: isNaN(mingguValue) ? 0 : mingguValue,
    })
  }

  const handleSubmit = async () => {
    // Validate form
    if (formData.minggu <= 0) {
      toast({
        title: "Nomor minggu tidak valid",
        description: "Nomor minggu harus lebih besar dari 0",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Error saving minggu:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{minggu ? "Edit Data Minggu" : "Tambah Minggu Baru"}</DialogTitle>
          <DialogDescription>
            {minggu ? "Edit informasi minggu yang sudah ada." : "Tambahkan data minggu baru ke dalam sistem."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minggu" className="text-right">
              Minggu <span className="text-red-500">*</span>
            </Label>
            <Input
              id="minggu"
              type="number"
              min="1"
              value={formData.minggu}
              onChange={(e) => handleChange(e.target.value)}
              className="col-span-3"
              placeholder="Masukkan nomor minggu"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSaving || formData.minggu <= 0}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : minggu ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Minggu"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
