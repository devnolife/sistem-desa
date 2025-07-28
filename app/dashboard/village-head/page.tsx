import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import {
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Target,
  Brain,
  Activity,
  BarChart,
  FileText,
  PieChart,
  TrendingUp,
  Download,
  Filter
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sampleComplaints, samplePriorityPrograms, getComplaintStats } from "@/lib/data"
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUSES, PRIORITY_LEVELS } from "@/lib/types"

export default function VillageHeadDashboard() {
  const stats = getComplaintStats()

  // Filter complaints that need review
  const pendingComplaints = sampleComplaints.filter(c =>
    ['diajukan', 'dalam_tinjauan'].includes(c.status)
  ).slice(0, 5)

  // High priority complaints requiring immediate attention
  const highPriorityComplaints = sampleComplaints.filter(c =>
    c.priority === 'tinggi' && c.status !== 'selesai'
  )

  // ML Classification results simulation
  const classificationResults = sampleComplaints
    .filter(c => c.priority)
    .map(complaint => ({
      ...complaint,
      confidence: 0.75 + Math.random() * 0.2 // Simulate confidence scores
    }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'diajukan':
        return 'bg-blue-100 text-blue-800'
      case 'dalam_tinjauan':
        return 'bg-yellow-100 text-yellow-800'
      case 'disetujui':
        return 'bg-green-100 text-green-800'
      case 'ditolak':
        return 'bg-red-100 text-red-800'
      case 'dalam_proses':
        return 'bg-orange-100 text-orange-800'
      case 'selesai':
        return 'bg-emerald-100 text-emerald-800'
      default:
        return 'bg-gray-100 text-gray-800'
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

  return (
    <DashboardLayout role="kepala_desa">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Kepala Desa</h1>
          <p className="text-gray-500">
            Review keluhan, analisis klasifikasi ML, dan kelola program prioritas desa
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Menunggu Review</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingComplaints.length}</div>
              <p className="text-xs text-gray-500">Keluhan memerlukan keputusan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Prioritas Tinggi</CardTitle>
              <AlertCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highPriorityComplaints.length}</div>
              <p className="text-xs text-gray-500">Memerlukan tindakan segera</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Disetujui</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approved + stats.inProgress}</div>
              <p className="text-xs text-gray-500">Keluhan dalam penanganan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Program Aktif</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{samplePriorityPrograms.length}</div>
              <p className="text-xs text-gray-500">Program prioritas berjalan</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 border-green-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                Review Keluhan
              </CardTitle>
              <CardDescription>
                Tinjau dan buat keputusan untuk keluhan yang masuk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{pendingComplaints.length}</span> keluhan pending
                </div>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  Perlu Review
                </Badge>
              </div>
              <Link href="/dashboard/village-head/complaints">
                <Button className="w-full">
                  Review Keluhan
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Klasifikasi ML
              </CardTitle>
              <CardDescription>
                Lihat hasil analisis machine learning untuk prioritas keluhan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{classificationResults.length}</span> diklasifikasi
                </div>
                <Badge className="bg-purple-100 text-purple-800">ML Aktif</Badge>
              </div>
              <Link href="/dashboard/village-head/classification">
                <Button variant="outline" className="w-full">
                  Lihat Klasifikasi
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Program Prioritas
              </CardTitle>
              <CardDescription>
                Kelola program-program prioritas berdasarkan hasil analisis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{samplePriorityPrograms.length}</span> program aktif
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Prioritas
                </Badge>
              </div>
              <Link href="/dashboard/village-head/programs">
                <Button variant="outline" className="w-full">
                  Kelola Program
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Hasil Program Prioritas Section */}
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Target className="h-5 w-5" />
              Hasil Program Prioritas
            </CardTitle>
            <CardDescription>
              Ranking program berdasarkan klasifikasi machine learning dan analisis prioritas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Priority Distribution */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {samplePriorityPrograms.filter(p => p.priority === 'tinggi').length}
                  </div>
                  <p className="text-sm text-red-700">Prioritas Tinggi</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {samplePriorityPrograms.filter(p => p.priority === 'sedang').length}
                  </div>
                  <p className="text-sm text-yellow-700">Prioritas Sedang</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {samplePriorityPrograms.filter(p => p.priority === 'rendah').length}
                  </div>
                  <p className="text-sm text-green-700">Prioritas Rendah</p>
                </div>
              </div>

              {/* Program List with Borders */}
              <div className="space-y-4">
                {samplePriorityPrograms.map((program, index) => (
                  <div
                    key={program.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 rounded-full p-2">
                          <span className="text-sm font-bold text-green-600">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{program.name}</h4>
                          <p className="text-sm text-gray-600">
                            {COMPLAINT_CATEGORIES[program.category]}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`border ${getPriorityColor(program.priority)}`}>
                          {PRIORITY_LEVELS[program.priority]}
                        </Badge>
                        <Badge variant="outline" className={
                          program.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }>
                          {program.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Anggaran Dialokasikan</p>
                        <p className="text-lg font-bold text-green-600">
                          Rp {program.budgetAllocation.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Status Program</p>
                        <p className="text-lg font-bold">
                          {program.status === 'aktif' ? 'Berjalan' : program.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Confidence Score</p>
                        <p className="text-lg font-bold text-purple-600">
                          {(program.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Keluhan Terkait</p>
                        <p className="text-lg font-bold">
                          {program.relatedComplaints.length} keluhan
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-600">
                          Progress Confidence:
                        </div>
                        <Progress value={program.confidence * 100} className="w-32" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Detail
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Export Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Excel
                </Button>
                <Button variant="outline" className="flex-1">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Prioritas
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Klasifikasi Machine Learning
              </CardTitle>
              <CardDescription>
                10 keluhan teratas berdasarkan confidence score klasifikasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classificationResults.slice(0, 5).map((result, index) => (
                  <div key={result.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{result.title}</h4>
                      <p className="text-xs text-gray-500">
                        {COMPLAINT_CATEGORIES[result.category]}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`text-xs ${getPriorityColor(result.priority)}`}>
                        {PRIORITY_LEVELS[result.priority!]}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-bold">
                          {(result.confidence * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">confidence</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/dashboard/village-head/classification">
                  <Button variant="outline" className="w-full gap-2">
                    <BarChart className="h-4 w-4" />
                    Lihat Semua Hasil
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Keluhan Memerlukan Keputusan
              </CardTitle>
              <CardDescription>
                Keluhan yang menunggu persetujuan atau tinjauan lebih lanjut
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingComplaints.map((complaint) => (
                  <div key={complaint.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{complaint.title}</h4>
                      <p className="text-xs text-gray-500">
                        {complaint.submittedDate.toLocaleDateString('id-ID')} • {complaint.residentName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getStatusColor(complaint.status)}`}>
                        {COMPLAINT_STATUSES[complaint.status]}
                      </Badge>
                      {complaint.urgencyLevel === 'sangat_mendesak' && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/dashboard/village-head/approval">
                  <Button variant="outline" className="w-full gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Review Semua Keluhan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Summary */}
        <Card className="border border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Ringkasan Analytics</CardTitle>
            <CardDescription className="text-blue-600">
              Insight berdasarkan data dan machine learning classification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {((stats.highPriority / stats.total) * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-blue-700">Keluhan Prioritas Tinggi</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {((classificationResults.length / stats.total) * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-blue-700">Sudah Diklasifikasi ML</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {(classificationResults.reduce((sum, r) => sum + r.confidence, 0) / classificationResults.length * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-blue-700">Rata-rata Confidence</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <Link href="/dashboard/village-head/analytics">
                <Button variant="outline" className="w-full gap-2">
                  <PieChart className="h-4 w-4" />
                  Dashboard Analytics Lengkap
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
