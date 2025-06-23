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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Pencil, Trash2, Search, Database, FileText, Users } from "lucide-react"

// Sample datasets
const initialDatasets = [
  {
    id: 1,
    name: "Data Demografi Desa 2023",
    type: "Demografi",
    source: "BPS",
    records: 1250,
    lastUpdated: "2023-07-15",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Data Anggaran Desa 2023",
    type: "Anggaran",
    source: "Keuangan Desa",
    records: 450,
    lastUpdated: "2023-07-10",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Data Program Desa 2023",
    type: "Program",
    source: "Sekretaris Desa",
    records: 35,
    lastUpdated: "2023-07-05",
    status: "Aktif",
  },
  {
    id: 4,
    name: "Data Keluhan Warga 2023",
    type: "Keluhan",
    source: "Portal Warga",
    records: 78,
    lastUpdated: "2023-07-01",
    status: "Aktif",
  },
  {
    id: 5,
    name: "Data Statistik Desa 2022",
    type: "Statistik",
    source: "BPS",
    records: 1100,
    lastUpdated: "2022-12-20",
    status: "Arsip",
  },
]

export default function DataManagement() {
  const [datasets, setDatasets] = useState(initialDatasets)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDatasetOpen, setIsAddDatasetOpen] = useState(false)
  const [isEditDatasetOpen, setIsEditDatasetOpen] = useState(false)
  const [isDeleteDatasetOpen, setIsDeleteDatasetOpen] = useState(false)
  const [currentDataset, setCurrentDataset] = useState<any>(null)
  const [newDataset, setNewDataset] = useState({
    name: "",
    type: "",
    source: "",
    records: 0,
    status: "Aktif",
  })

  // Filter datasets based on search term
  const filteredDatasets = datasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.source.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Add new dataset
  const handleAddDataset = () => {
    const id = datasets.length > 0 ? Math.max(...datasets.map((dataset) => dataset.id)) + 1 : 1
    const lastUpdated = new Date().toISOString().split("T")[0]
    setDatasets([...datasets, { id, ...newDataset, lastUpdated }])
    setNewDataset({
      name: "",
      type: "",
      source: "",
      records: 0,
      status: "Aktif",
    })
    setIsAddDatasetOpen(false)
  }

  // Edit dataset
  const handleEditDataset = () => {
    setDatasets(datasets.map((dataset) => (dataset.id === currentDataset.id ? currentDataset : dataset)))
    setIsEditDatasetOpen(false)
  }

  // Delete dataset
  const handleDeleteDataset = () => {
    setDatasets(datasets.filter((dataset) => dataset.id !== currentDataset.id))
    setIsDeleteDatasetOpen(false)
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pengelolaan Data</h1>
            <p className="text-gray-500">Kelola data desa dan input dari sumber eksternal</p>
          </div>
          <Dialog open={isAddDatasetOpen} onOpenChange={setIsAddDatasetOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Tambah Dataset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Dataset Baru</DialogTitle>
                <DialogDescription>Tambahkan dataset baru ke sistem.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Dataset</Label>
                  <Input
                    id="name"
                    value={newDataset.name}
                    onChange={(e) => setNewDataset({ ...newDataset, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Jenis Dataset</Label>
                  <Select onValueChange={(value) => setNewDataset({ ...newDataset, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Demografi">Demografi</SelectItem>
                      <SelectItem value="Anggaran">Anggaran</SelectItem>
                      <SelectItem value="Program">Program</SelectItem>
                      <SelectItem value="Keluhan">Keluhan</SelectItem>
                      <SelectItem value="Statistik">Statistik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="source">Sumber Data</Label>
                  <Input
                    id="source"
                    value={newDataset.source}
                    onChange={(e) => setNewDataset({ ...newDataset, source: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="records">Jumlah Catatan</Label>
                  <Input
                    id="records"
                    type="number"
                    value={newDataset.records.toString()}
                    onChange={(e) => setNewDataset({ ...newDataset, records: Number(e.target.value) })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDatasetOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleAddDataset}>Tambah Dataset</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="datasets">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="datasets">Dataset</TabsTrigger>
            <TabsTrigger value="sources">Sumber Data</TabsTrigger>
            <TabsTrigger value="import">Impor Data</TabsTrigger>
          </TabsList>

          <TabsContent value="datasets" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari dataset..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter berdasarkan jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="demografi">Demografi</SelectItem>
                  <SelectItem value="anggaran">Anggaran</SelectItem>
                  <SelectItem value="program">Program</SelectItem>
                  <SelectItem value="keluhan">Keluhan</SelectItem>
                  <SelectItem value="statistik">Statistik</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Dataset</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Sumber</TableHead>
                    <TableHead>Jumlah Catatan</TableHead>
                    <TableHead>Terakhir Diperbarui</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Tindakan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDatasets.map((dataset) => (
                    <TableRow key={dataset.id}>
                      <TableCell className="font-medium">{dataset.name}</TableCell>
                      <TableCell>{dataset.type}</TableCell>
                      <TableCell>{dataset.source}</TableCell>
                      <TableCell>{dataset.records.toLocaleString()}</TableCell>
                      <TableCell>{new Date(dataset.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            dataset.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {dataset.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setCurrentDataset(dataset)
                              setIsEditDatasetOpen(true)
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setCurrentDataset(dataset)
                              setIsDeleteDatasetOpen(true)
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
          </TabsContent>

          <TabsContent value="sources" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Badan Pusat Statistik (BPS)</CardTitle>
                  <CardDescription>Data statistik dan demografi resmi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">2 dataset aktif</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">2350 catatan</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">Terakhir diperbarui: 15 Juli 2023</p>
                    </div>
                    <Button className="w-full">Kelola Sumber</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Keuangan Desa</CardTitle>
                  <CardDescription>Data anggaran dan keuangan desa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">1 dataset aktif</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">450 catatan</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">Terakhir diperbarui: 10 Juli 2023</p>
                    </div>
                    <Button className="w-full">Kelola Sumber</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sekretaris Desa</CardTitle>
                  <CardDescription>Data program dan kegiatan desa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">1 dataset aktif</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">35 catatan</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">Terakhir diperbarui: 5 Juli 2023</p>
                    </div>
                    <Button className="w-full">Kelola Sumber</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Portal Warga</CardTitle>
                  <CardDescription>Data keluhan dan umpan balik warga</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">1 dataset aktif</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">78 catatan</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">Terakhir diperbarui: 1 Juli 2023</p>
                    </div>
                    <Button className="w-full">Kelola Sumber</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Impor Data</CardTitle>
                <CardDescription>Impor data dari berbagai sumber</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="import-file">Unggah File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <div className="flex flex-col items-center">
                        <FileText className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">
                          Seret dan lepas file di sini, atau klik untuk memilih file
                        </p>
                        <p className="text-xs text-gray-400">Mendukung CSV, Excel, atau JSON</p>
                      </div>
                      <Input id="import-file" type="file" className="hidden" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="import-type">Jenis Data</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis data" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="demografi">Data Demografi</SelectItem>
                        <SelectItem value="anggaran">Data Anggaran</SelectItem>
                        <SelectItem value="program">Data Program</SelectItem>
                        <SelectItem value="keluhan">Data Keluhan</SelectItem>
                        <SelectItem value="statistik">Data Statistik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="import-source">Sumber Data</Label>
                    <Input id="import-source" placeholder="Masukkan sumber data" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="import-description">Deskripsi</Label>
                    <Input id="import-description" placeholder="Masukkan deskripsi singkat" />
                  </div>

                  <Button className="w-full">Impor Data</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Dataset Dialog */}
        <Dialog open={isEditDatasetOpen} onOpenChange={setIsEditDatasetOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Dataset</DialogTitle>
              <DialogDescription>Perbarui informasi dataset.</DialogDescription>
            </DialogHeader>
            {currentDataset && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nama Dataset</Label>
                  <Input
                    id="edit-name"
                    value={currentDataset.name}
                    onChange={(e) => setCurrentDataset({ ...currentDataset, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Jenis Dataset</Label>
                  <Select
                    onValueChange={(value) => setCurrentDataset({ ...currentDataset, type: value })}
                    defaultValue={currentDataset.type}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Demografi">Demografi</SelectItem>
                      <SelectItem value="Anggaran">Anggaran</SelectItem>
                      <SelectItem value="Program">Program</SelectItem>
                      <SelectItem value="Keluhan">Keluhan</SelectItem>
                      <SelectItem value="Statistik">Statistik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-source">Sumber Data</Label>
                  <Input
                    id="edit-source"
                    value={currentDataset.source}
                    onChange={(e) => setCurrentDataset({ ...currentDataset, source: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-records">Jumlah Catatan</Label>
                  <Input
                    id="edit-records"
                    type="number"
                    value={currentDataset.records.toString()}
                    onChange={(e) => setCurrentDataset({ ...currentDataset, records: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    onValueChange={(value) => setCurrentDataset({ ...currentDataset, status: value })}
                    defaultValue={currentDataset.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aktif">Aktif</SelectItem>
                      <SelectItem value="Arsip">Arsip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDatasetOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleEditDataset}>Simpan Perubahan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dataset Dialog */}
        <Dialog open={isDeleteDatasetOpen} onOpenChange={setIsDeleteDatasetOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hapus Dataset</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menghapus dataset ini? Tindakan ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>
            {currentDataset && (
              <div className="py-4">
                <p className="text-sm text-gray-500">
                  Anda akan menghapus dataset: <span className="font-medium">{currentDataset.name}</span>
                </p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDatasetOpen(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={handleDeleteDataset}>
                Hapus Dataset
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
