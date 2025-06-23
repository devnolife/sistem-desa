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
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Search, FileText } from "lucide-react"

// Sample program data
const initialPrograms = [
  {
    id: 1,
    name: "Proyek Perbaikan Jalan",
    description: "Perbaikan jalan yang rusak di pusat desa",
    budget: 50000,
    status: "Menunggu Persetujuan",
    priority: "Tinggi",
    startDate: "2023-06-01",
    endDate: "2023-08-30",
    submittedBy: "Sekretaris",
    submittedDate: "2023-05-15",
  },
  {
    id: 2,
    name: "Kebun Komunitas",
    description: "Pengembangan kebun komunitas di area timur",
    budget: 15000,
    status: "Menunggu Persetujuan",
    priority: "Sedang",
    startDate: "2023-07-15",
    endDate: "2023-10-15",
    submittedBy: "Sekretaris",
    submittedDate: "2023-06-20",
  },
  {
    id: 3,
    name: "Renovasi Perpustakaan Umum",
    description: "Renovasi perpustakaan umum desa",
    budget: 35000,
    status: "Menunggu Persetujuan",
    priority: "Sedang",
    startDate: "2023-05-10",
    endDate: "2023-09-10",
    submittedBy: "Sekretaris",
    submittedDate: "2023-04-25",
  },
  {
    id: 4,
    name: "Pembangunan Pusat Pemuda",
    description: "Pembangunan pusat aktivitas pemuda baru",
    budget: 75000,
    status: "Menunggu Persetujuan",
    priority: "Rendah",
    startDate: "2023-08-01",
    endDate: "2024-02-28",
    submittedBy: "Sekretaris",
    submittedDate: "2023-07-10",
  },
]

export default function ProgramApproval() {
  const [programs, setPrograms] = useState(initialPrograms)
  const [searchTerm, setSearchTerm] = useState("")
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false)
  const [currentProgram, setCurrentProgram] = useState<any>(null)
  const [approvalReason, setApprovalReason] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  // Filter programs based on search term
  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pending programs
  const pendingPrograms = filteredPrograms.filter((program) => program.status === "Menunggu Persetujuan")

  // Approved programs
  const approvedPrograms = filteredPrograms.filter((program) => program.status === "Disetujui")

  // Rejected programs
  const rejectedPrograms = filteredPrograms.filter((program) => program.status === "Ditolak")

  // Approve program
  const handleApproveProgram = () => {
    setPrograms(
      programs.map((program) => (program.id === currentProgram.id ? { ...program, status: "Disetujui" } : program)),
    )
    setIsViewDetailsOpen(false)
    setApprovalReason("")
  }

  // Reject program
  const handleRejectProgram = () => {
    setPrograms(
      programs.map((program) => (program.id === currentProgram.id ? { ...program, status: "Ditolak" } : program)),
    )
    setIsViewDetailsOpen(false)
    setRejectionReason("")
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
    <DashboardLayout role="village-head">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Persetujuan Program</h1>
          <p className="text-gray-500">Tinjau dan setujui atau tolak program desa yang diusulkan</p>
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
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="relative">
              Menunggu
              {pendingPrograms.length > 0 && <Badge className="ml-2 bg-yellow-500">{pendingPrograms.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="approved">Disetujui</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingPrograms.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <FileText className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">Tidak ada program yang menunggu persetujuan</p>
                </CardContent>
              </Card>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Program</TableHead>
                      <TableHead>Anggaran</TableHead>
                      <TableHead>Prioritas</TableHead>
                      <TableHead>Diajukan Oleh</TableHead>
                      <TableHead>Tanggal Pengajuan</TableHead>
                      <TableHead className="text-right">Tindakan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">{program.name}</TableCell>
                        <TableCell>Rp{program.budget.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(program.priority)}`}>
                            {program.priority}
                          </span>
                        </TableCell>
                        <TableCell>{program.submittedBy}</TableCell>
                        <TableCell>{new Date(program.submittedDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentProgram(program)
                              setIsViewDetailsOpen(true)
                            }}
                          >
                            Tinjau
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedPrograms.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <FileText className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">Tidak ada program yang disetujui</p>
                </CardContent>
              </Card>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Program</TableHead>
                      <TableHead>Anggaran</TableHead>
                      <TableHead>Prioritas</TableHead>
                      <TableHead>Jangka Waktu</TableHead>
                      <TableHead className="text-right">Tindakan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">{program.name}</TableCell>
                        <TableCell>Rp{program.budget.toLocaleString()}</TableCell>
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentProgram(program)
                              setIsViewDetailsOpen(true)
                            }}
                          >
                            Lihat Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedPrograms.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <FileText className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">Tidak ada program yang ditolak</p>
                </CardContent>
              </Card>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Program</TableHead>
                      <TableHead>Anggaran</TableHead>
                      <TableHead>Prioritas</TableHead>
                      <TableHead>Diajukan Oleh</TableHead>
                      <TableHead className="text-right">Tindakan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejectedPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">{program.name}</TableCell>
                        <TableCell>Rp{program.budget.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(program.priority)}`}>
                            {program.priority}
                          </span>
                        </TableCell>
                        <TableCell>{program.submittedBy}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentProgram(program)
                              setIsViewDetailsOpen(true)
                            }}
                          >
                            Lihat Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Program Details Dialog */}
        <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Detail Program</DialogTitle>
              <DialogDescription>Tinjau detail program dan buat keputusan</DialogDescription>
            </DialogHeader>
            {currentProgram && (
              <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">{currentProgram.name}</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Deskripsi:</span>
                        <p className="mt-1">{currentProgram.description}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Anggaran:</span>
                        <p className="mt-1">Rp{currentProgram.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Prioritas:</span>
                        <p className="mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(currentProgram.priority)}`}
                          >
                            {currentProgram.priority}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Jadwal & Pengajuan</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Tanggal Mulai:</span>
                        <p className="mt-1">{new Date(currentProgram.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Tanggal Selesai:</span>
                        <p className="mt-1">{new Date(currentProgram.endDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Diajukan Oleh:</span>
                        <p className="mt-1">{currentProgram.submittedBy}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Tanggal Pengajuan:</span>
                        <p className="mt-1">{new Date(currentProgram.submittedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {currentProgram.status === "Menunggu Persetujuan" && (
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Setujui Program
                          </CardTitle>
                          <CardDescription>Setujui program ini untuk implementasi</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Input
                            placeholder="Alasan persetujuan (opsional)"
                            value={approvalReason}
                            onChange={(e) => setApprovalReason(e.target.value)}
                          />
                          <Button className="w-full mt-4" onClick={handleApproveProgram}>
                            Setujui Program
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center">
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            Tolak Program
                          </CardTitle>
                          <CardDescription>Tolak program ini dengan umpan balik</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Input
                            placeholder="Alasan penolakan (diperlukan)"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                          />
                          <Button variant="outline" className="w-full mt-4" onClick={handleRejectProgram}>
                            Tolak Program
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {currentProgram.status !== "Menunggu Persetujuan" && (
                  <div className="mt-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center">
                          {currentProgram.status === "Disetujui" ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                          )}
                          Status: {currentProgram.status}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          Program ini telah {currentProgram.status.toLowerCase()}.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
