"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Search,
  Filter,
  CalendarDays,
  MapPin,
  User
} from "lucide-react"
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUSES, URGENCY_LEVELS, PRIORITY_LEVELS } from "@/lib/types"
import { sampleComplaints } from "@/lib/data"

export default function ComplaintStatusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // In real app, filter by current user's complaints
  const userComplaints = sampleComplaints.filter(complaint =>
    complaint.residentId === '1' || complaint.residentId === '2' || complaint.residentId === '3'
  )

  // Filter complaints based on search and status
  const filteredComplaints = userComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'diajukan':
        return <Clock className="h-4 w-4" />
      case 'dalam_tinjauan':
        return <Eye className="h-4 w-4" />
      case 'disetujui':
        return <CheckCircle className="h-4 w-4" />
      case 'ditolak':
        return <XCircle className="h-4 w-4" />
      case 'dalam_proses':
        return <AlertCircle className="h-4 w-4" />
      case 'selesai':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'diajukan':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'dalam_tinjauan':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'disetujui':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'ditolak':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'dalam_proses':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'selesai':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'tinggi':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'sedang':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rendah':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'diajukan':
        return 20
      case 'dalam_tinjauan':
        return 40
      case 'disetujui':
        return 60
      case 'dalam_proses':
        return 80
      case 'selesai':
        return 100
      case 'ditolak':
        return 100
      default:
        return 0
    }
  }

  const getStatusSteps = (status: string) => {
    const steps = [
      { key: 'diajukan', label: 'Diajukan', completed: true },
      { key: 'dalam_tinjauan', label: 'Dalam Tinjauan', completed: false },
      { key: 'disetujui', label: 'Disetujui', completed: false },
      { key: 'dalam_proses', label: 'Dalam Proses', completed: false },
      { key: 'selesai', label: 'Selesai', completed: false }
    ]

    const statusIndex = steps.findIndex(step => step.key === status)
    return steps.map((step, index) => ({
      ...step,
      completed: index <= statusIndex && status !== 'ditolak',
      current: step.key === status
    }))
  }

  return (
    <DashboardLayout role="penduduk">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Status Keluhan</h1>
          <p className="text-gray-500 mt-2">
            Pantau status dan perkembangan keluhan yang telah Anda ajukan
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Keluhan</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userComplaints.length}</div>
              <p className="text-xs text-gray-500">Keluhan yang pernah diajukan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userComplaints.filter(c => ['diajukan', 'dalam_tinjauan'].includes(c.status)).length}
              </div>
              <p className="text-xs text-gray-500">Menunggu tindakan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Dalam Proses</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userComplaints.filter(c => ['disetujui', 'dalam_proses'].includes(c.status)).length}
              </div>
              <p className="text-xs text-gray-500">Sedang ditangani</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Selesai</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userComplaints.filter(c => c.status === 'selesai').length}
              </div>
              <p className="text-xs text-gray-500">Telah diselesaikan</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Cari keluhan berdasarkan judul atau deskripsi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  {Object.entries(COMPLAINT_STATUSES).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-500 mb-2">
                  {searchTerm || statusFilter !== "all" ? "Tidak ada keluhan yang sesuai" : "Belum ada keluhan"}
                </h3>
                <p className="text-gray-400 text-center mb-4">
                  {searchTerm || statusFilter !== "all"
                    ? "Coba ubah kata kunci pencarian atau filter yang digunakan"
                    : "Anda belum pernah mengajukan keluhan. Mulai ajukan keluhan pertama Anda."
                  }
                </p>
                {(!searchTerm && statusFilter === "all") && (
                  <Button asChild>
                    <a href="/dashboard/resident/complaint">Ajukan Keluhan Pertama</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="border-2 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{complaint.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {complaint.submittedDate.toLocaleDateString('id-ID')}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {complaint.location}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {complaint.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <Badge className={`${getStatusColor(complaint.status)} border`}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(complaint.status)}
                          {COMPLAINT_STATUSES[complaint.status]}
                        </span>
                      </Badge>
                      {complaint.priority && (
                        <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                          {PRIORITY_LEVELS[complaint.priority]}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">
                        {COMPLAINT_CATEGORIES[complaint.category]}
                      </Badge>
                      <span className="text-sm text-orange-600 font-medium">
                        {URGENCY_LEVELS[complaint.urgencyLevel]}
                      </span>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedComplaint(complaint)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Lihat Detail
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detail Keluhan</DialogTitle>
                          <DialogDescription>
                            Informasi lengkap dan status terkini keluhan Anda
                          </DialogDescription>
                        </DialogHeader>

                        {selectedComplaint && (
                          <div className="space-y-6">
                            {/* Complaint Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-gray-700">ID Keluhan</h4>
                                <p className="text-sm">{selectedComplaint.id}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-700">Status Saat Ini</h4>
                                <Badge className={`${getStatusColor(selectedComplaint.status)} border mt-1`}>
                                  {COMPLAINT_STATUSES[selectedComplaint.status]}
                                </Badge>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-700">Kategori</h4>
                                <p className="text-sm">{COMPLAINT_CATEGORIES[selectedComplaint.category]}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-700">Tingkat Urgensi</h4>
                                <p className="text-sm">{URGENCY_LEVELS[selectedComplaint.urgencyLevel]}</p>
                              </div>
                            </div>

                            {/* Progress Tracker */}
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-3">Status Progress</h4>
                              <div className="space-y-3">
                                {getStatusSteps(selectedComplaint.status).map((step, index) => (
                                  <div key={step.key} className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full border-2 ${step.completed
                                        ? 'bg-green-500 border-green-500'
                                        : step.current
                                          ? 'bg-blue-500 border-blue-500'
                                          : 'border-gray-300'
                                      }`} />
                                    <span className={`text-sm ${step.completed || step.current ? 'font-medium' : 'text-gray-500'
                                      }`}>
                                      {step.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Description */}
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Deskripsi Lengkap</h4>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {selectedComplaint.description}
                              </p>
                            </div>

                            {/* Admin Notes */}
                            {selectedComplaint.adminNotes && (
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Catatan Admin</h4>
                                <Alert>
                                  <AlertCircle className="h-4 w-4" />
                                  <AlertDescription>
                                    {selectedComplaint.adminNotes}
                                  </AlertDescription>
                                </Alert>
                              </div>
                            )}

                            {/* Budget Info */}
                            {selectedComplaint.allocatedBudget && (
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-gray-700">Estimasi Biaya</h4>
                                  <p className="text-sm">
                                    {selectedComplaint.estimatedCost
                                      ? `Rp ${selectedComplaint.estimatedCost.toLocaleString('id-ID')}`
                                      : 'Belum ditentukan'
                                    }
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-700">Anggaran Dialokasikan</h4>
                                  <p className="text-sm text-green-600 font-medium">
                                    Rp {selectedComplaint.allocatedBudget.toLocaleString('id-ID')}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Timeline */}
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Timeline</h4>
                              <div className="text-sm space-y-1">
                                <p><strong>Diajukan:</strong> {selectedComplaint.submittedDate.toLocaleString('id-ID')}</p>
                                {selectedComplaint.reviewedDate && (
                                  <p><strong>Ditinjau:</strong> {selectedComplaint.reviewedDate.toLocaleString('id-ID')}</p>
                                )}
                                {selectedComplaint.completionDate && (
                                  <p><strong>Diselesaikan:</strong> {selectedComplaint.completionDate.toLocaleString('id-ID')}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{getProgressPercentage(complaint.status)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${complaint.status === 'ditolak' ? 'bg-red-500' : 'bg-blue-500'
                          }`}
                        style={{ width: `${getProgressPercentage(complaint.status)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Action Button */}
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="pt-6 text-center">
            <h3 className="font-semibold text-purple-800 mb-2">Punya Keluhan Baru?</h3>
            <p className="text-sm text-purple-700 mb-4">
              Sampaikan keluhan atau masalah lainnya yang perlu ditangani pemerintah desa
            </p>
            <Button asChild>
              <a href="/dashboard/resident/complaint">Ajukan Keluhan Baru</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 
