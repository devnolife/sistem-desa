import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import {
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  HelpCircle,
  ArrowRight,
  User,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  PlusCircle,
  Eye,
  Activity,
  Target
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sampleComplaints, getComplaintStats } from "@/lib/data"
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUSES, URGENCY_LEVELS } from "@/lib/types"

export default function ResidentDashboard() {
  // Simulate current user's complaints (in real app, filter by user ID)
  const userComplaints = sampleComplaints.filter(complaint =>
    complaint.residentId === '1' || complaint.residentId === '2' || complaint.residentId === '3'
  ).slice(0, 3) // Show only latest 3

  const stats = getComplaintStats()

  // Simulate user registration status
  const isRegistered = true // In real app, check if user has completed registration
  const userProfile = {
    name: "Andi Pratama",
    nik: "3201012501850001",
    isVerified: true
  }

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

  return (
    <DashboardLayout role="penduduk">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dasbor Penduduk</h1>
          <p className="text-gray-500">
            Selamat datang di Sistem Manajemen Keluhan Desa. Ajukan dan pantau keluhan Anda dengan mudah.
          </p>
        </div>

        {/* Registration Status Alert */}
        {!isRegistered && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Registrasi Diperlukan:</strong> Anda harus melengkapi registrasi penduduk terlebih dahulu sebelum dapat mengajukan keluhan.
              <Link href="/dashboard/resident/registration" className="ml-2 font-medium underline hover:no-underline">
                Lengkapi Registrasi →
              </Link>
            </AlertDescription>
          </Alert>
        )}

        {/* User Profile Status */}
        {isRegistered && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">Status Registrasi</h3>
                    <p className="text-sm text-green-700">
                      Selamat datang, {userProfile.name}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  {userProfile.isVerified ? "Terverifikasi" : "Menunggu Verifikasi"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Keluhan</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userComplaints.length}</div>
              <p className="text-xs text-gray-500">Keluhan yang telah Anda ajukan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Menunggu Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userComplaints.filter(c => ['diajukan', 'dalam_tinjauan'].includes(c.status)).length}
              </div>
              <p className="text-xs text-gray-500">Menunggu tinjauan Kepala Desa</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Dalam Proses</CardTitle>
              <Activity className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userComplaints.filter(c => ['disetujui', 'dalam_proses'].includes(c.status)).length}
              </div>
              <p className="text-xs text-gray-500">Sedang dalam penanganan</p>
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

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 border-purple-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-purple-600" />
                Ajukan Keluhan Baru
              </CardTitle>
              <CardDescription>
                Sampaikan keluhan atau masalah yang perlu ditangani pemerintah desa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/resident/complaint">
                <Button className="w-full">
                  Buat Keluhan Baru
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Pantau Status Keluhan
              </CardTitle>
              <CardDescription>
                Lihat perkembangan dan status terkini keluhan yang telah diajukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/resident/complaint-status">
                <Button variant="outline" className="w-full">
                  Lihat Status
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-green-600" />
                Bantuan & Kontak
              </CardTitle>
              <CardDescription>
                Hubungi administrator untuk bantuan atau informasi lebih lanjut
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/resident/contact">
                <Button variant="outline" className="w-full">
                  Hubungi Admin
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Complaints */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Keluhan Terbaru Anda</CardTitle>
              <CardDescription>Status keluhan yang paling baru diajukan</CardDescription>
            </CardHeader>
            <CardContent>
              {userComplaints.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Anda belum mengajukan keluhan</p>
                  <Link href="/dashboard/resident/complaint">
                    <Button>Ajukan Keluhan Pertama</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userComplaints.map((complaint) => (
                    <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm line-clamp-1">{complaint.title}</h4>
                        <Badge className={`text-xs ${getStatusColor(complaint.status)}`}>
                          {COMPLAINT_STATUSES[complaint.status]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {complaint.submittedDate.toLocaleDateString('id-ID')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {COMPLAINT_CATEGORIES[complaint.category]}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                        {complaint.description}
                      </p>
                      {complaint.adminNotes && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-3">
                          <p className="text-xs text-blue-800">
                            <strong>Catatan:</strong> {complaint.adminNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pt-2">
                    <Link href="/dashboard/resident/complaint-status">
                      <Button variant="outline" className="w-full gap-2">
                        <Eye className="h-4 w-4" />
                        Lihat Semua Keluhan
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Panduan Sistem</CardTitle>
              <CardDescription>Cara menggunakan sistem keluhan desa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                    <span className="text-xs font-bold text-purple-800">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Lengkapi Registrasi</p>
                    <p className="text-xs text-gray-500">Daftarkan data diri untuk verifikasi identitas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                    <span className="text-xs font-bold text-purple-800">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ajukan Keluhan</p>
                    <p className="text-xs text-gray-500">Sampaikan keluhan dengan lengkap dan sertakan foto bukti</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                    <span className="text-xs font-bold text-purple-800">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pantau Progress</p>
                    <p className="text-xs text-gray-500">Ikuti perkembangan penanganan keluhan Anda</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                    <span className="text-xs font-bold text-purple-800">4</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Terima Tanggapan</p>
                    <p className="text-xs text-gray-500">Dapatkan informasi penyelesaian dari pemerintah desa</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="border border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Kontak Penting Desa</CardTitle>
            <CardDescription className="text-blue-600">
              Informasi kontak untuk bantuan darurat atau konsultasi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Administrator</p>
                    <p className="text-sm text-blue-700">0812-3456-7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Email Resmi</p>
                    <p className="text-sm text-blue-700">admin@desa.go.id</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Alamat Kantor</p>
                    <p className="text-sm text-blue-700">Kantor Desa, Jl. Merdeka No. 1</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Jam Operasional</p>
                    <p className="text-sm text-blue-700">Senin-Jumat 08:00-16:00</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="border border-gray-200 bg-gray-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Sistem Manajemen Keluhan Desa 2025</h3>
              <p className="text-sm text-gray-600 mb-4">
                Sistem terintegrasi dengan Machine Learning untuk klasifikasi prioritas keluhan
              </p>
              <div className="flex justify-center gap-6 text-xs text-gray-500">
                <span>✓ Klasifikasi Otomatis</span>
                <span>✓ Tracking Real-time</span>
                <span>✓ Analisis Chi-Square</span>
                <span>✓ Naive Bayes ML</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
