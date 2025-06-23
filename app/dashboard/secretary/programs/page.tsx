"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react"

// Sample program data
const initialPrograms = [
  {
    id: 1,
    name: "Proyek Perbaikan Jalan",
    description: "Perbaikan jalan yang rusak di pusat desa",
    budget: 50000,
    status: "Disetujui",
    priority: "Tinggi",
    startDate: "2023-06-01",
    endDate: "2023-08-30",
  },
  {
    id: 2,
    name: "Kebun Komunitas",
    description: "Pengembangan kebun komunitas di area timur",
    budget: 15000,
    status: "Tertunda",
    priority: "Sedang",
    startDate: "2023-07-15",
    endDate: "2023-10-15",
  },
  {
    id: 3,
    name: "Renovasi Perpustakaan Umum",
    description: "Renovasi perpustakaan umum desa",
    budget: 35000,
    status: "Dalam Proses",
    priority: "Sedang",
    startDate: "2023-05-10",
    endDate: "2023-09-10",
  },
  {
    id: 4,
    name: "Inisiatif Air Bersih",
    description: "Pemasangan filter air di area publik",
    budget: 25000,
    status: "Selesai",
    priority: "Tinggi",
    startDate: "2023-03-01",
    endDate: "2023-05-30",
  },
  {
    id: 5,
    name: "Pembangunan Pusat Pemuda",
    description: "Pembangunan pusat aktivitas pemuda baru",
    budget: 75000,
    status: "Ditolak",
    priority: "Rendah",
    startDate: "2023-08-01",
    endDate: "2024-02-28",
  },
]

export default function ProgramManagement() {
  const [programs, setPrograms] = useState(initialPrograms)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false)
  const [isEditProgramOpen, setIsEditProgramOpen] = useState(false)
  const [isDeleteProgramOpen, setIsDeleteProgramOpen] = useState(false)
  const [currentProgram, setCurrentProgram] = useState<any>(null)
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    budget: 0,
    status: "Tertunda",
    priority: "Sedang",
    startDate: "",
    endDate: "",
  })

  // Filter programs based on search term
  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Add new program
  const handleAddProgram = () => {
    const id = programs.length > 0 ? Math.max(...programs.map((program) => program.id)) + 1 : 1
    setPrograms([...programs, { id, ...newProgram }])
    setNewProgram({
      name: "",
      description: "",
      budget: 0,
      status: "Tertunda",
      priority: "Sedang",
      startDate: "",
      endDate: "",
    })
    setIsAddProgramOpen(false)
  }

  // Edit program
  const handleEditProgram = () => {
    setPrograms(programs.map((program) => (program.id === currentProgram.id ? currentProgram : program)))
    setIsEditProgramOpen(false)
  }

  // Delete program
  const handleDeleteProgram = () => {
    setPrograms(programs.filter((program) => program.id !== currentProgram.id))
    setIsDeleteProgramOpen(false)
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disetujui":
        return "bg-green-100 text-green-800"
      case "Tertunda":
        return "bg-yellow-100 text-yellow-800"
      case "Dalam Proses":
        return "bg-blue-100 text-blue-800"
      case "Selesai":
        return "bg-purple-100 text-purple-800"
      case "Ditolak":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Tinggi":
        return "bg-red-100 text-red-800"
      case "Sedang":
        return "bg-blue-100 text-blue-800"
      case "Rendah":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout role="secretary">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manajemen Program</h1>
            <p className="text-gray-500">Kelola program pembangunan desa</p>
          </div>
          <Dialog open={isAddProgramOpen} onOpenChange={setIsAddProgramOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Tambah Program
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah Program Baru</DialogTitle>
                <DialogDescription>Buat program pembangunan desa baru.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Program</Label>
                  <Input
                    id="name"
                    value={newProgram.name}
                    onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="budget">Anggaran (dalam Rp)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={newProgram.budget.toString()}
                    onChange={(e) => setNewProgram({ ...newProgram, budget: Number(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Tanggal Mulai</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newProgram.startDate}
                      onChange={(e) => setNewProgram({ ...newProgram, startDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">Tanggal Selesai</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newProgram.endDate}
                      onChange={(e) => setNewProgram({ ...newProgram, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Prioritas</Label>
                  <Select
                    onValueChange={(value) => setNewProgram({ ...newProgram, priority: value })}
                    defaultValue={newProgram.priority}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tinggi">Tinggi</SelectItem>
                      <SelectItem value="Sedang">Sedang</SelectItem>
                      <SelectItem value="Rendah">Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProgramOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleAddProgram}>Tambah Program</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari program..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter berdasarkan status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="approved">Disetujui</SelectItem>
              <SelectItem value="pending">Tertunda</SelectItem>
              <SelectItem value="in-progress">Dalam Proses</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="rejected">Ditolak</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Program</TableHead>
                <TableHead>Anggaran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioritas</TableHead>
                <TableHead>Jangka Waktu</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>Rp{program.budget.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(program.priority)}`}>
                      {program.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div>{new Date(program.startDate).toLocaleDateString()} hingga</div>
                      <div>{new Date(program.endDate).toLocaleDateString()}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCurrentProgram(program)
                          setIsEditProgramOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCurrentProgram(program)
                          setIsDeleteProgramOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Hapus</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Edit Program Dialog */}
        <Dialog open={isEditProgramOpen} onOpenChange={setIsEditProgramOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Program</DialogTitle>
              <DialogDescription>Perbarui informasi dan status program.</DialogDescription>
            </DialogHeader>
            {currentProgram && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nama Program</Label>
                  <Input
                    id="edit-name"
                    value={currentProgram.name}
                    onChange={(e) => setCurrentProgram({ ...currentProgram, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Deskripsi</Label>
                  <Textarea
                    id="edit-description"
                    value={currentProgram.description}
                    onChange={(e) => setCurrentProgram({ ...currentProgram, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-budget">Anggaran (dalam Rp)</Label>
                  <Input
                    id="edit-budget"
                    type="number"
                    value={currentProgram.budget.toString()}
                    onChange={(e) => setCurrentProgram({ ...currentProgram, budget: Number(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-startDate">Tanggal Mulai</Label>
                    <Input
                      id="edit-startDate"
                      type="date"
                      value={currentProgram.startDate}
                      onChange={(e) => setCurrentProgram({ ...currentProgram, startDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-endDate">Tanggal Selesai</Label>
                    <Input
                      id="edit-endDate"
                      type="date"
                      value={currentProgram.endDate}
                      onChange={(e) => setCurrentProgram({ ...currentProgram, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    onValueChange={(value) => setCurrentProgram({ ...currentProgram, status: value })}
                    defaultValue={currentProgram.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disetujui">Disetujui</SelectItem>
                      <SelectItem value="Tertunda">Tertunda</SelectItem>
                      <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
                      <SelectItem value="Selesai">Selesai</SelectItem>
                      <SelectItem value="Ditolak">Ditolak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-priority">Prioritas</Label>
                  <Select
                    onValueChange={(value) => setCurrentProgram({ ...currentProgram, priority: value })}
                    defaultValue={currentProgram.priority}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tinggi">Tinggi</SelectItem>
                      <SelectItem value="Sedang">Sedang</SelectItem>
                      <SelectItem value="Rendah">Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditProgramOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleEditProgram}>Simpan Perubahan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Program Dialog */}
        <Dialog open={isDeleteProgramOpen} onOpenChange={setIsDeleteProgramOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hapus Program</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menghapus program ini? Tindakan ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>
            {currentProgram && (
              <div className="py-4">
                <p className="text-sm text-gray-500">
                  Anda akan menghapus program: <span className="font-medium">{currentProgram.name}</span>
                </p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteProgramOpen(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={handleDeleteProgram}>
                Hapus Program
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
