"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MessageSquare, Send, Eye } from "lucide-react"

// Sample complaint data
const initialComplaints = [
  {
    id: 1,
    title: "Lampu Jalan Tidak Berfungsi",
    description: "Lampu jalan di dekat rumah #45 sudah mati selama seminggu.",
    category: "Infrastruktur",
    status: "Tertunda",
    date: "2023-07-10",
    response: "",
  },
  {
    id: 2,
    title: "Masalah Pengumpulan Sampah",
    description: "Sampah belum diambil di area kami selama dua minggu terakhir.",
    category: "Sanitasi",
    status: "Dalam Proses",
    date: "2023-07-05",
    response: "Kami telah memberi tahu departemen sanitasi. Mereka akan mengatasi masalah ini dalam 3 hari.",
  },
  {
    id: 3,
    title: "Keluhan Kebisingan",
    description: "Kebisingan berlebihan dari lokasi konstruksi selama jam malam.",
    category: "Kebisingan",
    status: "Selesai",
    date: "2023-06-20",
    response: "Perusahaan konstruksi telah diperintahkan untuk membatasi jam kerja dari 8 pagi hingga 6 sore saja.",
  },
]

export default function ComplaintSubmission() {
  const [complaints, setComplaints] = useState(initialComplaints)
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false)
  const [currentComplaint, setCurrentComplaint] = useState<any>(null)
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: "",
    category: "Infrastruktur",
  })

  // Submit new complaint
  const handleSubmitComplaint = () => {
    const id = complaints.length > 0 ? Math.max(...complaints.map((complaint) => complaint.id)) + 1 : 1
    const date = new Date().toISOString().split("T")[0]

    setComplaints([
      ...complaints,
      {
        id,
        ...newComplaint,
        status: "Tertunda",
        date,
        response: "",
      },
    ])

    setNewComplaint({
      title: "",
      description: "",
      category: "Infrastruktur",
    })
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tertunda":
        return "bg-yellow-100 text-yellow-800"
      case "Dalam Proses":
        return "bg-blue-100 text-blue-800"
      case "Selesai":
        return "bg-green-100 text-green-800"
      case "Ditolak":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout role="resident">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ajukan Keluhan</h1>
          <p className="text-gray-500">Ajukan dan lacak keluhan Anda kepada administrasi desa</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Keluhan Baru</CardTitle>
              <CardDescription>Isi formulir di bawah ini untuk mengajukan keluhan baru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Keluhan</Label>
                  <Input
                    id="title"
                    placeholder="Judul singkat keluhan Anda"
                    value={newComplaint.title}
                    onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select
                    defaultValue={newComplaint.category}
                    onValueChange={(value) => setNewComplaint({ ...newComplaint, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Infrastruktur">Infrastruktur</SelectItem>
                      <SelectItem value="Sanitasi">Sanitasi</SelectItem>
                      <SelectItem value="Air">Air</SelectItem>
                      <SelectItem value="Listrik">Listrik</SelectItem>
                      <SelectItem value="Kebisingan">Kebisingan</SelectItem>
                      <SelectItem value="Lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    placeholder="Berikan detail tentang keluhan Anda"
                    rows={5}
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full gap-2"
                onClick={handleSubmitComplaint}
                disabled={!newComplaint.title || !newComplaint.description}
              >
                <Send className="h-4 w-4" />
                Ajukan Keluhan
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keluhan Anda</CardTitle>
              <CardDescription>Lacak status keluhan yang telah Anda ajukan</CardDescription>
            </CardHeader>
            <CardContent>
              {complaints.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">Anda belum mengajukan keluhan apa pun</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Tindakan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-medium">{complaint.title}</TableCell>
                        <TableCell>{new Date(complaint.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setCurrentComplaint(complaint)
                              setIsViewDetailsOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Lihat detail</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Complaint Details Dialog */}
        <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detail Keluhan</DialogTitle>
              <DialogDescription>Lihat detail dan status keluhan Anda</DialogDescription>
            </DialogHeader>
            {currentComplaint && (
              <div className="py-4 space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{currentComplaint.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(currentComplaint.status)}`}>
                      {currentComplaint.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      Diajukan pada {new Date(currentComplaint.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Kategori</h4>
                  <p>{currentComplaint.category}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Deskripsi</h4>
                  <p className="mt-1">{currentComplaint.description}</p>
                </div>

                {currentComplaint.response && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-medium text-gray-500">Tanggapan Resmi</h4>
                    <p className="mt-1">{currentComplaint.response}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsViewDetailsOpen(false)}>Tutup</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
