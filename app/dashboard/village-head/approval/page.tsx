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
import { AlertCircle, Ban, CalendarDays, Check, CheckCircle, ClipboardList, MapPin, Search, User } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type StatusKey = keyof typeof COMPLAINT_STATUSES | "semua"
type CategoryKey = keyof typeof COMPLAINT_CATEGORIES | "semua"
type UrgencyKey = keyof typeof URGENCY_LEVELS | "semua"

export default function VillageHeadApprovalPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<CategoryKey>("semua")
  const [urgency, setUrgency] = useState<UrgencyKey>("semua")
  const [onlyPending, setOnlyPending] = useState<boolean>(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [notes, setNotes] = useState("")
  const { toast } = useToast()
  const params = useSearchParams()
  const router = useRouter()

  const initialSelected = params.get("selected")

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

  const data = useMemo(() => {
    let list = [...sampleComplaints]
    if (onlyPending) {
      list = list.filter((c) => ["diajukan", "dalam_tinjauan"].includes(c.status))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.residentName.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      )
    }
    if (category !== "semua") list = list.filter((c) => c.category === category)
    if (urgency !== "semua") list = list.filter((c) => c.urgencyLevel === urgency)
    list.sort((a, b) => b.submittedDate.getTime() - a.submittedDate.getTime())
    return list
  }, [search, category, urgency, onlyPending])

  const selectedComplaint = useMemo(
    () => data.find((c) => c.id === (selectedId ?? initialSelected ?? "")) ?? null,
    [data, selectedId, initialSelected]
  )

  const pendingCount = useMemo(
    () => sampleComplaints.filter((c) => ["diajukan", "dalam_tinjauan"].includes(c.status)).length,
    []
  )

  const handleDecision = (decision: "approve" | "reject") => {
    if (!selectedComplaint) return
    if (decision === "approve") {
      toast({ title: "Keluhan disetujui", description: `"${selectedComplaint.title}" berhasil disetujui.` })
    } else {
      toast({ title: "Keluhan ditolak", description: `"${selectedComplaint.title}" ditolak.`, variant: "destructive" as any })
    }
    setNotes("")
    router.replace("/dashboard/village-head/approval")
  }

  return (
    <DashboardLayout role="kepala_desa">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Persetujuan Keluhan</h1>
          <p className="text-gray-500">Tinjau detail keluhan dan putuskan untuk menyetujui atau menolak</p>
        </div>

        <div className="grid gap-4 md:grid-cols-12">
          <Card className="md:col-span-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Filter</CardTitle>
              <CardDescription>Persempit daftar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input placeholder="Cari keluhan..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div>
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
              <div>
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
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Hanya yang pending</div>
                <Button variant={onlyPending ? "default" : "outline"} size="sm" onClick={() => setOnlyPending((v) => !v)}>
                  Pending ({pendingCount})
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-8 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2"><ClipboardList className="h-5 w-5" /> Daftar untuk Persetujuan</CardTitle>
              <CardDescription>Hasil: {data.length} item</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Judul</TableHead>
                        <TableHead>Pelapor</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((c) => (
                        <TableRow key={c.id} className={selectedComplaint?.id === c.id ? "bg-green-50" : undefined} onClick={() => setSelectedId(c.id)}>
                          <TableCell>
                            <div className="font-medium line-clamp-1">{c.title}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                              <Badge variant="outline">{COMPLAINT_CATEGORIES[c.category]}</Badge>
                              <Badge className={getUrgencyBadgeColor(c.urgencyLevel)}>{URGENCY_LEVELS[c.urgencyLevel]}</Badge>
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
                          <TableCell className="text-right">
                            <Badge className={getStatusBadgeColor(c.status)}>{COMPLAINT_STATUSES[c.status]}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="border rounded-lg p-4 space-y-4">
                  {selectedComplaint ? (
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold leading-tight">{selectedComplaint.title}</h3>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <Badge variant="outline">{COMPLAINT_CATEGORIES[selectedComplaint.category]}</Badge>
                            <Badge className={getUrgencyBadgeColor(selectedComplaint.urgencyLevel)}>
                              {URGENCY_LEVELS[selectedComplaint.urgencyLevel]}
                            </Badge>
                            <Badge className={getStatusBadgeColor(selectedComplaint.status)}>
                              {COMPLAINT_STATUSES[selectedComplaint.status]}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                        <div className="flex items-center gap-2"><User className="h-4 w-4" /> {selectedComplaint.residentName}</div>
                        <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {selectedComplaint.submittedDate.toLocaleDateString("id-ID")}</div>
                        <div className="flex items-center gap-2 col-span-2"><MapPin className="h-4 w-4" /> {selectedComplaint.location}</div>
                      </div>
                      <div>
                        <Label>Deskripsi</Label>
                        <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">{selectedComplaint.description}</p>
                      </div>
                      <div>
                        <Label>Catatan Kepala Desa</Label>
                        <Input placeholder="Tambahkan catatan keputusan..." value={notes} onChange={(e) => setNotes(e.target.value)} />
                      </div>
                      <div className="flex gap-2">
                        <Button className="gap-2" onClick={() => handleDecision("approve")}>
                          <Check className="h-4 w-4" /> Setujui
                        </Button>
                        <Button variant="outline" className="gap-2" onClick={() => handleDecision("reject")}>
                          <Ban className="h-4 w-4" /> Tolak
                        </Button>
                      </div>
                      {selectedComplaint.urgencyLevel === "sangat_mendesak" && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          Perhatian: urgensi sangat tinggi, pertimbangkan tindakan cepat.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">Pilih satu keluhan dari tabel untuk melihat detail dan tindakan.</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}


