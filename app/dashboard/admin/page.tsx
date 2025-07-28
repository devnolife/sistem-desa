import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import {
  Users,
  Database,
  Brain,
  Target,
  DollarSign,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  BarChart,
  Settings,
  Upload,
  PieChart,
  Activity,
  FileText
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { sampleComplaints, sampleBudgetCategories, sampleUsers, getBudgetUtilization, getComplaintStats } from "@/lib/data"
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUSES, PRIORITY_LEVELS } from "@/lib/types"

export default function AdminDashboard() {
  const stats = getComplaintStats()
  const budgetUtilization = getBudgetUtilization()

  // Calculate additional statistics
  const totalUsers = sampleUsers.length
  const activeUsers = sampleUsers.filter(user => user.isActive).length
  const totalBudget = sampleBudgetCategories.reduce((sum, cat) => sum + cat.totalBudget, 0)
  const allocatedBudget = sampleBudgetCategories.reduce((sum, cat) => sum + cat.allocatedBudget, 0)

  // Recent activities (simulation)
  const recentActivities = [
    {
      type: 'complaint',
      title: 'Keluhan baru diterima',
      description: 'Jalan Rusak Parah di Jl. Merdeka',
      time: '5 menit yang lalu',
      priority: 'tinggi'
    },
    {
      type: 'user',
      title: 'Pengguna baru terdaftar',
      description: 'Ahmad Fauzi telah menyelesaikan registrasi',
      time: '15 menit yang lalu',
      priority: 'normal'
    },
    {
      type: 'analysis',
      title: 'Analisis ML selesai',
      description: 'Klasifikasi Naive Bayes untuk 10 keluhan',
      time: '30 menit yang lalu',
      priority: 'sedang'
    },
    {
      type: 'budget',
      title: 'Anggaran dialokasikan',
      description: 'Rp 15,000,000 untuk perbaikan infrastruktur',
      time: '1 jam yang lalu',
      priority: 'sedang'
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'complaint':
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case 'user':
        return <Users className="h-4 w-4 text-green-600" />
      case 'analysis':
        return <Brain className="h-4 w-4 text-purple-600" />
      case 'budget':
        return <DollarSign className="h-4 w-4 text-orange-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'tinggi':
        return 'bg-red-100 text-red-800'
      case 'sedang':
        return 'bg-yellow-100 text-yellow-800'
      case 'rendah':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrator</h1>
          <p className="text-gray-500">
            Kelola sistem, pengguna, dan analisis machine learning untuk klasifikasi keluhan desa
          </p>
        </div>

        {/* Main Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Keluhan</CardTitle>
              <MessageSquare className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-600">+{stats.pending}</span> menunggu tinjauan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-600">{activeUsers}</span> pengguna aktif
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Anggaran 2025</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(totalBudget / 1000000000).toFixed(1)}M
              </div>
              <p className="text-xs text-gray-500">
                <span className="text-orange-600">{budgetUtilization.toFixed(1)}%</span> terpakai
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Prioritas Tinggi</CardTitle>
              <AlertCircle className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.highPriority}</div>
              <p className="text-xs text-gray-500">Memerlukan tindakan segera</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-slate-600" />
                Manajemen Pengguna
              </CardTitle>
              <CardDescription>
                Kelola akun pengguna, verifikasi registrasi, dan pengaturan peran
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{activeUsers}</span> dari <span className="font-medium">{totalUsers}</span> aktif
                </div>
                <Badge variant="outline">{((activeUsers / totalUsers) * 100).toFixed(0)}%</Badge>
              </div>
              <Link href="/dashboard/admin/users">
                <Button className="w-full">
                  Kelola Pengguna
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Analisis Machine Learning
              </CardTitle>
              <CardDescription>
                Konfigurasi Chi-Square dan Naive Bayes untuk klasifikasi prioritas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{stats.highPriority + stats.mediumPriority}</span> telah diklasifikasi
                </div>
                <Badge className="bg-purple-100 text-purple-800">ML Aktif</Badge>
              </div>
              <Link href="/dashboard/admin/chi-square">
                <Button variant="outline" className="w-full">
                  Mulai Analisis
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Anggaran 2025
              </CardTitle>
              <CardDescription>
                Kelola alokasi anggaran untuk penyelesaian keluhan berdasarkan kategori
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  Rp <span className="font-medium">{(allocatedBudget / 1000000).toFixed(0)}M</span> dialokasikan
                </div>
                <Badge variant="outline">{budgetUtilization.toFixed(1)}%</Badge>
              </div>
              <Link href="/dashboard/admin/budget">
                <Button variant="outline" className="w-full">
                  Kelola Anggaran
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Status Keluhan</CardTitle>
              <CardDescription>Overview status keluhan yang masuk sistem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Diajukan</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(stats.pending / stats.total) * 100} className="w-24" />
                    <span className="text-sm text-gray-500">{stats.pending}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Disetujui</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(stats.approved / stats.total) * 100} className="w-24" />
                    <span className="text-sm text-gray-500">{stats.approved}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dalam Proses</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(stats.inProgress / stats.total) * 100} className="w-24" />
                    <span className="text-sm text-gray-500">{stats.inProgress}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Selesai</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(stats.completed / stats.total) * 100} className="w-24" />
                    <span className="text-sm text-gray-500">{stats.completed}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/dashboard/admin/analysis">
                  <Button variant="outline" className="w-full gap-2">
                    <BarChart className="h-4 w-4" />
                    Lihat Laporan Detail
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Anggaran per Kategori</CardTitle>
              <CardDescription>Alokasi anggaran 2025 berdasarkan kategori keluhan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleBudgetCategories.map((budget) => (
                  <div key={budget.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {COMPLAINT_CATEGORIES[budget.category]}
                    </span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(budget.allocatedBudget / budget.totalBudget) * 100}
                        className="w-24"
                      />
                      <span className="text-sm text-gray-500">
                        {((budget.allocatedBudget / budget.totalBudget) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/dashboard/admin/financial-reports">
                  <Button variant="outline" className="w-full gap-2">
                    <PieChart className="h-4 w-4" />
                    Laporan Keuangan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Log aktivitas sistem dan tindakan pengguna</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200">
                  <div className="mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <Badge className={`text-xs ${getPriorityColor(activity.priority)}`}>
                        {activity.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Tools */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Database className="h-5 w-5" />
                Manajemen Data
              </CardTitle>
              <CardDescription className="text-blue-600">
                Upload dan kelola dataset untuk analisis machine learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• Upload CSV, Excel, JSON</p>
                <p>• Validasi format data</p>
                <p>• Backup dan restore</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href="/dashboard/admin/data-management" className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    Kelola Data
                  </Button>
                </Link>
                <Link href="/dashboard/admin/upload">
                  <Button size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Target className="h-5 w-5" />
                ML Classification
              </CardTitle>
              <CardDescription className="text-purple-600">
                Konfigurasi model Naive Bayes untuk klasifikasi prioritas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-purple-700">
                <p>• Bobot kriteria dinamis</p>
                <p>• Akurasi model real-time</p>
                <p>• Confusion matrix</p>
              </div>
              <div className="mt-4">
                <Link href="/dashboard/admin/naive-bayes">
                  <Button variant="outline" className="w-full" size="sm">
                    Konfigurasi Model
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Settings className="h-5 w-5" />
                Pengaturan Sistem
              </CardTitle>
              <CardDescription className="text-gray-600">
                Konfigurasi sistem dan pengaturan administratif
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Pengaturan notifikasi</p>
                <p>• Backup otomatis</p>
                <p>• Log sistem</p>
              </div>
              <div className="mt-4">
                <Link href="/dashboard/admin/settings">
                  <Button variant="outline" className="w-full" size="sm">
                    Pengaturan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Information */}
        <Card className="border border-slate-200 bg-slate-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-slate-800 mb-2">Sistem Manajemen Keluhan Desa 2025</h3>
              <p className="text-sm text-slate-600 mb-4">
                Platform terintegrasi dengan Machine Learning untuk klasifikasi dan prioritas keluhan
              </p>
              <div className="flex justify-center gap-6 text-xs text-slate-500">
                <span>✓ Chi-Square Feature Selection</span>
                <span>✓ Naive Bayes Classification</span>
                <span>✓ Real-time Analytics</span>
                <span>✓ Budget Management 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
