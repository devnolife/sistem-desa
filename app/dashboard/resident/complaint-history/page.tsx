"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { sampleComplaints } from "@/lib/data"
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUSES, URGENCY_LEVELS, type Complaint } from "@/lib/types"
import { useMemo, useState } from "react"
import { CalendarDays, Filter, Search } from "lucide-react"

type StatusKey = keyof typeof COMPLAINT_STATUSES | "semua"
type CategoryKey = keyof typeof COMPLAINT_CATEGORIES | "semua"
type UrgencyKey = keyof typeof URGENCY_LEVELS | "semua"

export default function ResidentComplaintHistoryPage() {
  // Anggap user saat ini memiliki residentId '1'
  const residentId = '1'
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<StatusKey>("semua")
  const [category, setCategory] = useState<CategoryKey>("semua")
  const [urgency, setUrgency] = useState<UrgencyKey>("semua")

  const getStatusBadgeColor = (value: Complaint["status"]) => {
    switch (value) {
      case "diajukan":
        return "bg-blue-100 text-blue-800"
      case "dalam_tinjauan":
        return "bg-yellow-100 text-yellow-800"
      case "disetujui":
        return "bg-green-100 text-green-800"
      case "ditolak":
        return "bg-red-100 text-red-800"
      case "dalam_proses":
        return "bg-orange-100 text-orange-800"
      case "selesai":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filtered = useMemo(() => {
    let data = sampleComplaints.filter((c) => c.residentId === residentId)
    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      )
    }
    if (status !== "semua") data = data.filter((c) => c.status === status)
    if (category !== "semua") data = data.filter((c) => c.category === category)
    if (urgency !== "semua") data = data.filter((c) => c.urgencyLevel === urgency)
    data.sort((a, b) => b.submittedDate.getTime() - a.submittedDate.getTime())
    return data
  }, [search, status, category, urgency])

  const counts = useMemo(() => {
    const mine = sampleComplaints.filter((c) => c.residentId === residentId)
    return {
      total: mine.length,
      selesai: mine.filter((c) => c.status === 'selesai').length,
      ditolak: mine.filter((c) => c.status === 'ditolak').length,
    }
  }, [])

  return (
    <DashboardLayout role="penduduk">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Riwayat Keluhan</h1>
          <p className="text-gray-500">Lihat status dan detail keluhan yang pernah diajukan</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total</CardTitle>
              <CardDescription>Semua keluhan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Selesai</CardTitle>
              <CardDescription>Telah ditangani</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.selesai}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Ditolak</CardTitle>
              <CardDescription>Keputusan akhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.ditolak}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">Daftar Keluhan Saya</CardTitle>
            <CardDescription>Hasil: {filtered.length} item</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-12 items-end mb-4">
              <div className="md:col-span-4">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input placeholder="Cari judul/isi..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>
              <div className="md:col-span-3">
                <Select value={status} onValueChange={(v) => setStatus(v as StatusKey)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Status</SelectItem>
                    {Object.keys(COMPLAINT_STATUSES).map((k) => (
                      <SelectItem key={k} value={k}>{COMPLAINT_STATUSES[k as keyof typeof COMPLAINT_STATUSES]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <Select value={category} onValueChange={(v) => setCategory(v as CategoryKey)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Kategori</SelectItem>
                    {Object.keys(COMPLAINT_CATEGORIES).map((k) => (
                      <SelectItem key={k} value={k}>{COMPLAINT_CATEGORIES[k as keyof typeof COMPLAINT_CATEGORIES]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button variant="outline" className="gap-2" onClick={() => { setSearch(""); setStatus("semua"); setCategory("semua"); setUrgency("semua") }}>
                  <Filter className="h-4 w-4" /> Reset
                </Button>
              </div>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="font-medium line-clamp-1">{c.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">{c.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CalendarDays className="h-4 w-4" />
                          {c.submittedDate.toLocaleDateString("id-ID")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{COMPLAINT_CATEGORIES[c.category]}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(c.status)}>{COMPLAINT_STATUSES[c.status]}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}


