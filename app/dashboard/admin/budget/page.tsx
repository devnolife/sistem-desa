"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  DollarSign,
  PieChart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BarChart,
  Download,
  Plus,
  Edit,
  Trash2,
  Calculator,
  Target,
  Activity
} from "lucide-react"
import { sampleBudgetCategories, sampleComplaints, getBudgetUtilization } from "@/lib/data"
import { COMPLAINT_CATEGORIES, BUDGET_2025 } from "@/lib/types"

export default function BudgetManagementPage() {
  const [budgets, setBudgets] = useState(sampleBudgetCategories)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [allocationAmount, setAllocationAmount] = useState("")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.totalBudget, 0)
  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocatedBudget, 0)
  const totalRemaining = budgets.reduce((sum, budget) => sum + budget.remainingBudget, 0)
  const utilizationPercent = getBudgetUtilization()

  // Get complaints by category for cost estimation
  const getComplaintsByCategory = (category: string) => {
    return sampleComplaints.filter(c => c.category === category)
  }

  const allocateBudget = () => {
    if (!selectedCategory || !allocationAmount || !description) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field",
        variant: "destructive"
      })
      return
    }

    const amount = parseInt(allocationAmount)
    const categoryBudget = budgets.find(b => b.category === selectedCategory)

    if (!categoryBudget || amount > categoryBudget.remainingBudget) {
      toast({
        title: "Error",
        description: "Jumlah alokasi melebihi sisa anggaran kategori",
        variant: "destructive"
      })
      return
    }

    // Update budget allocation
    setBudgets(prev => prev.map(budget => {
      if (budget.category === selectedCategory) {
        return {
          ...budget,
          allocatedBudget: budget.allocatedBudget + amount,
          remainingBudget: budget.remainingBudget - amount
        }
      }
      return budget
    }))

    toast({
      title: "Alokasi Berhasil",
      description: `Rp ${amount.toLocaleString('id-ID')} telah dialokasikan untuk ${COMPLAINT_CATEGORIES[selectedCategory]}`
    })

    // Reset form
    setSelectedCategory("")
    setAllocationAmount("")
    setDescription("")
  }

  const exportBudgetReport = (format: 'excel' | 'pdf') => {
    toast({
      title: "Export Berhasil",
      description: `Laporan anggaran telah diekspor ke format ${format.toUpperCase()}`
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fasilitas_kesehatan':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'pendidikan':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'ekonomi':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'infrastruktur':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'partisipasi_masyarakat':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getUtilizationColor = (percentage: number) => {
    if (percentage < 50) return 'text-green-600'
    if (percentage < 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Anggaran 2025</h1>
          <p className="text-gray-500">
            Kelola alokasi anggaran desa berdasarkan kategori keluhan dan prioritas penanganan
          </p>
        </div>

        {/* Budget Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Anggaran 2025</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(totalBudget / 1000000000).toFixed(1)}M
              </div>
              <p className="text-xs text-gray-500">Anggaran keseluruhan tahun 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Telah Dialokasikan</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(totalAllocated / 1000000000).toFixed(1)}M
              </div>
              <p className="text-xs text-gray-500">
                <span className={getUtilizationColor(utilizationPercent)}>
                  {utilizationPercent.toFixed(1)}%
                </span> dari total anggaran
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sisa Anggaran</CardTitle>
              <PieChart className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(totalRemaining / 1000000000).toFixed(1)}M
              </div>
              <p className="text-xs text-gray-500">Tersedia untuk alokasi baru</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Keluhan Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sampleComplaints.filter(c => !c.allocatedBudget).length}
              </div>
              <p className="text-xs text-gray-500">Belum mendapat alokasi anggaran</p>
            </CardContent>
          </Card>
        </div>

        {/* Utilization Alert */}
        {utilizationPercent > 80 && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Peringatan:</strong> Utilisasi anggaran sudah mencapai {utilizationPercent.toFixed(1)}%.
              Pertimbangkan untuk meninjau alokasi atau mengajukan tambahan anggaran.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Budget Allocation Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Alokasi Anggaran Baru
                </CardTitle>
                <CardDescription>
                  Alokasikan anggaran untuk penanganan keluhan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Kategori Keluhan</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(COMPLAINT_CATEGORIES).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="amount">Jumlah Alokasi (Rp)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Masukkan jumlah"
                    value={allocationAmount}
                    onChange={(e) => setAllocationAmount(e.target.value)}
                  />
                  {selectedCategory && (
                    <p className="text-xs text-gray-500 mt-1">
                      Sisa anggaran: Rp {budgets.find(b => b.category === selectedCategory)?.remainingBudget.toLocaleString('id-ID')}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Input
                    id="description"
                    placeholder="Tujuan alokasi anggaran"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <Button onClick={allocateBudget} className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Alokasikan Anggaran
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Budget Categories Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Anggaran per Kategori 2025
                </CardTitle>
                <CardDescription>
                  Distribusi dan utilisasi anggaran berdasarkan kategori keluhan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgets.map((budget) => {
                    const complaints = getComplaintsByCategory(budget.category)
                    const utilizationPercentage = (budget.allocatedBudget / budget.totalBudget) * 100

                    return (
                      <div key={budget.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge className={`border ${getCategoryColor(budget.category)}`}>
                              {COMPLAINT_CATEGORIES[budget.category]}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {complaints.length} keluhan
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              {utilizationPercentage.toFixed(1)}%
                            </div>
                            <div className="text-xs text-gray-500">Terpakai</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-gray-600">Total Anggaran</p>
                            <p className="font-bold">
                              Rp {budget.totalBudget.toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Dialokasikan</p>
                            <p className="font-bold text-orange-600">
                              Rp {budget.allocatedBudget.toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Sisa</p>
                            <p className="font-bold text-green-600">
                              Rp {budget.remainingBudget.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Progress Utilisasi</span>
                            <span className="text-sm">{utilizationPercentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={utilizationPercentage} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            Estimasi biaya per keluhan: Rp {complaints.length > 0 ? (budget.allocatedBudget / complaints.length).toLocaleString('id-ID') : '0'}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Target className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Budget Tracking & Analytics */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Utilisasi Bulanan
              </CardTitle>
              <CardDescription>
                Tren penggunaan anggaran per bulan dalam tahun 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Januari', 'Februari', 'Maret', 'April', 'Mei'].map((month, index) => {
                  const usage = Math.random() * 15 + 5 // Random 5-20%
                  return (
                    <div key={month} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{month}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={usage} className="w-24" />
                        <span className="text-sm w-12">{usage.toFixed(1)}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    Rp {(totalAllocated / 5 / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-sm text-gray-500">Rata-rata per bulan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Alokasi Terbaru
              </CardTitle>
              <CardDescription>
                Riwayat alokasi anggaran untuk penanganan keluhan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleComplaints
                  .filter(c => c.allocatedBudget)
                  .slice(0, 5)
                  .map((complaint) => (
                    <div key={complaint.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{complaint.title}</h4>
                        <p className="text-xs text-gray-500">
                          {complaint.submittedDate.toLocaleDateString('id-ID')} • {COMPLAINT_CATEGORIES[complaint.category]}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-600">
                          Rp {complaint.allocatedBudget?.toLocaleString('id-ID')}
                        </div>
                        <div className="text-xs text-gray-500">Dialokasikan</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export & Reporting */}
        <Card className="border border-slate-200 bg-slate-50">
          <CardHeader>
            <CardTitle className="text-slate-800">Laporan Anggaran</CardTitle>
            <CardDescription className="text-slate-600">
              Export laporan anggaran untuk dokumentasi dan audit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-600">
                  {budgets.length}
                </div>
                <p className="text-sm text-slate-700">Kategori Anggaran</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-600">
                  {sampleComplaints.filter(c => c.allocatedBudget).length}
                </div>
                <p className="text-sm text-slate-700">Keluhan Teralokasi</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-600">
                  Rp {((totalAllocated / sampleComplaints.filter(c => c.allocatedBudget).length) / 1000000).toFixed(1)}M
                </div>
                <p className="text-sm text-slate-700">Rata-rata per Keluhan</p>
              </div>
            </div>
            <div className="flex gap-2 pt-4 border-t border-slate-200 mt-4">
              <Button
                onClick={() => exportBudgetReport('excel')}
                variant="outline"
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
              <Button
                onClick={() => exportBudgetReport('pdf')}
                variant="outline"
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 
