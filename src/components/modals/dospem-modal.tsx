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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, X } from "lucide-react"
import type { Program } from "@/types"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

interface Dosen {
  id: string
  nama: string
  nidn: string
}

interface Mahasiswa {
  id: string
  nama: string
  nim: string
  prodi?: string
  program: Program
}

interface Periode {
  id: string
  name: string
  startDate: Date
  endDate: Date
}

interface Dospem {
  id?: string
  dosenId: string
  mahasiswaId: string
  periodeId: string
  dosen?: Dosen
  mahasiswa?: Mahasiswa
  periode?: Periode
  createdAt?: Date
  updatedAt?: Date
}

interface BatchDospemFormData {
  dosenId: string
  mahasiswaIds: string[]
  periodeId: string
}

interface DospemModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  dospem: Dospem | null
  dosenList: Dosen[]
  mahasiswaList: Mahasiswa[]
  periodeList: Periode[]
  onSubmit: (data: Dospem | BatchDospemFormData) => void
  existingAssignments: Dospem[]
}

export function DospemModal({
  isOpen,
  onOpenChange,
  dospem,
  dosenList,
  mahasiswaList,
  periodeList,
  onSubmit,
  existingAssignments,
}: DospemModalProps) {
  const [formData, setFormData] = useState<BatchDospemFormData>({
    dosenId: "",
    mahasiswaIds: [],
    periodeId: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProgram, setSelectedProgram] = useState<string>("all")
  const { toast } = useToast()

  // Reset form when dialog opens or dospem changes
  useEffect(() => {
    if (dospem) {
      setFormData({
        dosenId: dospem.dosenId,
        mahasiswaIds: [dospem.mahasiswaId],
        periodeId: dospem.periodeId,
      })
      setIsEditMode(true)
    } else {
      setFormData({
        dosenId: "",
        mahasiswaIds: [],
        periodeId: periodeList.length > 0 ? periodeList[0].id : "",
      })
      setIsEditMode(false)
    }
    setSearchQuery("")
    setSelectedProgram("all")
  }, [dospem, isOpen, periodeList])

  const handleChange = (field: keyof BatchDospemFormData, value: unknown) => {
    if (field === "periodeId") {
      // When period changes, reset selected students to avoid conflicts
      setFormData((prev) => ({
        ...prev,
        [field]: value as string,
        mahasiswaIds: [],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleToggleStudent = (studentId: string) => {
    setFormData((prev) => {
      if (prev.mahasiswaIds.includes(studentId)) {
        return {
          ...prev,
          mahasiswaIds: prev.mahasiswaIds.filter((id) => id !== studentId),
        }
      } else {
        return {
          ...prev,
          mahasiswaIds: [...prev.mahasiswaIds, studentId],
        }
      }
    })
  }

  const handleRemoveStudent = (studentId: string) => {
    setFormData((prev) => ({
      ...prev,
      mahasiswaIds: prev.mahasiswaIds.filter((id) => id !== studentId),
    }))
  }

  const isStudentAssigned = (studentId: string) => {
    if (!formData.periodeId) return false

    return existingAssignments.some(
      (assignment) =>
        assignment.mahasiswaId === studentId &&
        assignment.periodeId === formData.periodeId &&
        (!dospem || assignment.id !== dospem.id),
    )
  }

  const handleSubmit = async () => {
    // Validate form
    if (!formData.dosenId) {
      toast({
        title: "Dosen diperlukan",
        description: "Silakan pilih dosen pembimbing",
        variant: "destructive",
      })
      return
    }

    if (formData.mahasiswaIds.length === 0) {
      toast({
        title: "Mahasiswa diperlukan",
        description: "Silakan pilih minimal satu mahasiswa",
        variant: "destructive",
      })
      return
    }

    if (!formData.periodeId) {
      toast({
        title: "Periode diperlukan",
        description: "Silakan pilih periode",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      if (isEditMode) {
        // In edit mode, we're only editing a single assignment
        await onSubmit({
          id: dospem?.id,
          dosenId: formData.dosenId,
          mahasiswaId: formData.mahasiswaIds[0],
          periodeId: formData.periodeId,
        })
      } else {
        // In add mode, we're creating multiple assignments
        await onSubmit(formData)
      }
    } catch (error) {
      console.error("Error saving dospem:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // Get student details for display
  const getStudentDetails = (id: string) => {
    const student = mahasiswaList.find((m) => m.id === id)
    if (!student) return null
    return student
  }

  // Filter available students (not yet assigned for the selected period)
  const getAvailableStudents = () => {
    if (!formData.periodeId) return []

    let filteredStudents = mahasiswaList.filter(
      (student) => !isStudentAssigned(student.id) || (dospem && dospem.mahasiswaId === student.id),
    )

    // Filter by program if selected
    if (selectedProgram !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.program === selectedProgram)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredStudents = filteredStudents.filter(
        (student) =>
          student.nama.toLowerCase().includes(query) ||
          student.nim.toLowerCase().includes(query) ||
          (student.prodi && student.prodi.toLowerCase().includes(query)),
      )
    }

    return filteredStudents
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Data Pembimbing" : "Tambah Pembimbing Baru"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Edit penugasan dosen pembimbing untuk mahasiswa."
              : "Tambahkan penugasan dosen pembimbing baru untuk satu atau beberapa mahasiswa sekaligus."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dosen" className="text-right">
              Dosen <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.dosenId} onValueChange={(value) => handleChange("dosenId", value)}>
              <SelectTrigger id="dosen" className="col-span-3">
                <SelectValue placeholder="Pilih dosen pembimbing" />
              </SelectTrigger>
              <SelectContent>
                {dosenList.map((dosen) => (
                  <SelectItem key={dosen.id} value={dosen.id}>
                    {dosen.nama} - {dosen.nidn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="periode" className="text-right">
              Periode <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.periodeId}
              onValueChange={(value) => handleChange("periodeId", value)}
              disabled={isEditMode} // Disable if editing
            >
              <SelectTrigger id="periode" className="col-span-3">
                <SelectValue placeholder="Pilih periode" />
              </SelectTrigger>
              <SelectContent>
                {periodeList.map((periode) => (
                  <SelectItem key={periode.id} value={periode.id}>
                    {periode.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isEditMode ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mahasiswa" className="text-right">
                Mahasiswa <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.mahasiswaIds[0]}
                onValueChange={(value) => handleChange("mahasiswaIds", [value])}
                disabled={true} // Always disable in edit mode
              >
                <SelectTrigger id="mahasiswa" className="col-span-3">
                  <SelectValue placeholder="Pilih mahasiswa" />
                </SelectTrigger>
                <SelectContent>
                  {mahasiswaList.map((mahasiswa) => (
                    <SelectItem key={mahasiswa.id} value={mahasiswa.id}>
                      {mahasiswa.nama} - {mahasiswa.nim} ({mahasiswa.program})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  Mahasiswa <span className="text-red-500">*</span>
                </Label>
                <div className="col-span-3 space-y-4">
                  {formData.mahasiswaIds.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.mahasiswaIds.map((studentId) => {
                        const student = getStudentDetails(studentId)
                        if (!student) return null

                        return (
                          <Badge key={studentId} variant="secondary" className="pl-2 pr-1 py-1">
                            <span className="mr-1">
                              {student.nama} ({student.nim})
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => handleRemoveStudent(studentId)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        )
                      })}
                    </div>
                  )}

                  {formData.periodeId ? (
                    <>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Cari mahasiswa..."
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Semua Program</SelectItem>
                            <SelectItem value="MBKM">MBKM</SelectItem>
                            <SelectItem value="PKL">PKL</SelectItem>
                            <SelectItem value="KKN">KKN</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <ScrollArea className="h-[200px] border rounded-md p-2">
                        <div className="space-y-2">
                          {getAvailableStudents().map((student) => {
                            const isSelected = formData.mahasiswaIds.includes(student.id)
                            const isDisabled = isStudentAssigned(student.id)

                            return (
                              <div key={student.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`student-${student.id}`}
                                  checked={isSelected}
                                  onCheckedChange={() => handleToggleStudent(student.id)}
                                  disabled={isDisabled}
                                />
                                <Label
                                  htmlFor={`student-${student.id}`}
                                  className={`text-sm ${isDisabled ? "text-gray-400" : ""}`}
                                >
                                  {student.nama} - {student.nim} ({student.program})
                                  {isDisabled && (
                                    <span className="ml-2 text-xs text-red-500">(Sudah memiliki pembimbing)</span>
                                  )}
                                </Label>
                              </div>
                            )
                          })}
                          {getAvailableStudents().length === 0 && (
                            <div className="text-center py-4 text-gray-500">
                              {searchQuery
                                ? "Tidak ada mahasiswa yang sesuai dengan pencarian"
                                : "Tidak ada mahasiswa yang tersedia"}
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Pilih periode terlebih dahulu untuk melihat daftar mahasiswa yang tersedia.
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">{formData.mahasiswaIds.length} mahasiswa dipilih</div>
                </div>
              </div>
            </>
          )}
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
            ) : isEditMode ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Pembimbing"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
