"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { sampleComplaints } from "@/lib/data"
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUSES, URGENCY_LEVELS, type Complaint } from "@/lib/types"
import { useMemo, useState } from "react"
import { AlertCircle, CheckCircle, Filter, LayoutGrid, List, Search, User, CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"

type StatusKey = keyof typeof COMPLAINT_STATUSES | "semua"
type CategoryKey = keyof typeof COMPLAINT_CATEGORIES | "semua"
type UrgencyKey = keyof typeof URGENCY_LEVELS | "semua"

export default function VillageHeadComplaintsPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<StatusKey>("semua")
  const [category, setCategory] = useState<CategoryKey>("semua")
  const [urgency, setUrgency] = useState<UrgencyKey>("semua")
  const [view, setView] = useState<"table" | "grid">("table")
  const [sortBy, setSortBy] = useState<"tanggal_desc" | "tanggal_asc" | "urgensi" | "status">("tanggal_desc")

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

  const getUrgencyBadgeColor = (value: Complaint["urgencyLevel"]) => {
    switch (value) {
      case "sangat_mendesak":
        return "bg-red-100 text-red-800"
      case "mendesak":
        return "bg-amber-100 text-amber-800"
      case "normal":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filtered = useMemo(() => {
    let data = [...sampleComplaints]

    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.residentName.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      )
    }
    if (status !== "semua") {
      data = data.filter((c) => c.status === status)
    }
    if (category !== "semua") {
      data = data.filter((c) => c.category === category)
    }
    if (urgency !== "semua") {
      data = data.filter((c) => c.urgencyLevel === urgency)
    }

    switch (sortBy) {
      case "tanggal_desc":
        data.sort((a, b) => b.submittedDate.getTime() - a.submittedDate.getTime())
        break
      case "tanggal_asc":
        data.sort((a, b) => a.submittedDate.getTime() - b.submittedDate.getTime())
        break
      case "urgensi": {
        const order: Record<string, number> = { sangat_mendesak: 0, mendesak: 1, normal: 2 }
        data.sort((a, b) => order[a.urgencyLevel] - order[b.urgencyLevel])
        break
      }
      case "status": {
        const order: Record<string, number> = {
          diajukan: 0,
          dalam_tinjauan: 1,
          disetujui: 2,
          dalam_proses: 3,
          selesai: 4,
          ditolak: 5,
        }
        data.sort((a, b) => (order[a.status] ?? 99) - (order[b.status] ?? 99))
        break
      }
    }

    return data
  }, [search, status, category, urgency, sortBy])

  const pendingCount = useMemo(
    () => sampleComplaints.filter((c) => ["diajukan", "dalam_tinjauan"].includes(c.status)).length,
    []
  )

  return (
    <DashboardLayout role="kepala_desa">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Keluhan</h1>
          <p className="text-gray-500">Cari, filter, dan tinjau keluhan warga dengan cepat</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="md:col-span-4">
            <CardContent className="pt-6">
              <div className="grid gap-3 md:grid-cols-12 items-end">
                <div className="md:col-span-4">
                  <Label className="sr-only">Cari</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Cari judul, pelapor, lokasi..."
                      className="pl-8"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-xs text-gray-500">Status</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as StatusKey)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semua">Semua</SelectItem>
                      {Object.keys(COMPLAINT_STATUSES).map((key) => (
                        <SelectItem key={key} value={key}>
                          {COMPLAINT_STATUSES[key as keyof typeof COMPLAINT_STATUSES]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-xs text-gray-500">Kategori</Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as CategoryKey)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semua">Semua</SelectItem>
                      {Object.keys(COMPLAINT_CATEGORIES).map((key) => (
                        <SelectItem key={key} value={key}>
                          {COMPLAINT_CATEGORIES[key as keyof typeof COMPLAINT_CATEGORIES]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-xs text-gray-500">Urgensi</Label>
                  <Select value={urgency} onValueChange={(v) => setUrgency(v as UrgencyKey)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua urgensi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semua">Semua</SelectItem>
                      {Object.keys(URGENCY_LEVELS).map((key) => (
                        <SelectItem key={key} value={key}>
                          {URGENCY_LEVELS[key as keyof typeof URGENCY_LEVELS]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Urutkan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tanggal_desc">Terbaru</SelectItem>
                      <SelectItem value="tanggal_asc">Terlama</SelectItem>
                      <SelectItem value="urgensi">Urgensi</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2" onClick={() => { setSearch(""); setStatus("semua"); setCategory("semua"); setUrgency("semua"); setSortBy("tanggal_desc") }}>
                    <Filter className="h-4 w-4" /> Reset
                  </Button>
                  <div className="ml-auto hidden md:flex gap-1">
                    <Button variant={view === "table" ? "default" : "outline"} size="icon" onClick={() => setView("table")}>
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")}>
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Keluhan</CardTitle>
              <CardDescription>Semua status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sampleComplaints.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Perlu Tinjauan</CardTitle>
              <CardDescription>Menunggu keputusan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                {pendingCount}
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Tampilan</CardTitle>
              <CardDescription>Kustomisasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant={view === "table" ? "default" : "outline"} className="gap-2" onClick={() => setView("table")}>
                  <List className="h-4 w-4" /> Tabel
                </Button>
                <Button variant={view === "grid" ? "default" : "outline"} className="gap-2" onClick={() => setView("grid")}>
                  <LayoutGrid className="h-4 w-4" /> Kartu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {view === "table" ? (
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Daftar Keluhan</CardTitle>
              <CardDescription>Hasil: {filtered.length} item</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Pelapor</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Urgensi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="font-medium line-clamp-1">{c.title}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <Badge variant="outline">{COMPLAINT_CATEGORIES[c.category]}</Badge>
                          <div className="flex items-center gap-1 text-gray-500">
                            <MapPin className="h-3 w-3" /> {c.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{c.residentName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CalendarDays className="h-4 w-4" />
                          {c.submittedDate.toLocaleDateString("id-ID")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getUrgencyBadgeColor(c.urgencyLevel)}>
                          {URGENCY_LEVELS[c.urgencyLevel]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(c.status)}>
                          {COMPLAINT_STATUSES[c.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/village-head/approval?selected=${c.id}`}>
                            <Button variant="outline" size="sm" className="gap-2">
                              <CheckCircle className="h-4 w-4" /> Review
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <Card key={c.id} className="hover:shadow-md transition-shadow border-2 border-gray-200">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-base line-clamp-2">{c.title}</CardTitle>
                      <CardDescription className="mt-1 text-xs">
                        {COMPLAINT_CATEGORIES[c.category]}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusBadgeColor(c.status)}>
                      {COMPLAINT_STATUSES[c.status]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <User className="h-4 w-4" /> {c.residentName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CalendarDays className="h-4 w-4" /> {c.submittedDate.toLocaleDateString("id-ID")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="h-4 w-4" /> {c.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{URGENCY_LEVELS[c.urgencyLevel]}</Badge>
                  </div>
                  <div className="pt-2 flex gap-2">
                    <Link href={`/dashboard/village-head/approval?selected=${c.id}`} className="flex-1">
                      <Button variant="outline" className="w-full gap-2">
                        <CheckCircle className="h-4 w-4" /> Review
                      </Button>
                    </Link>
                    <Link href={`/dashboard/village-head/approval`} className="flex-1">
                      <Button className="w-full" variant="default">Ajukan</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}


