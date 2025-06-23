import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { FileText, MessageSquare, CheckCircle, Clock, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ResidentDashboard() {
  return (
    <DashboardLayout role="resident">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dasbor Warga Desa</h1>
        <p className="text-gray-500">Selamat datang di sistem manajemen desa. Ajukan keluhan dan lihat program desa.</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Keluhan</CardTitle>
              <MessageSquare className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-500">Keluhan yang telah Anda ajukan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Keluhan Tertunda</CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-gray-500">Menunggu tanggapan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Keluhan Selesai</CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-gray-500">Telah ditanggapi dan diselesaikan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Program Aktif</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">Program desa yang sedang berjalan</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Keluhan Terbaru Anda</CardTitle>
              <CardDescription>Status keluhan yang telah Anda ajukan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Lampu Jalan Tidak Berfungsi",
                    date: "15 Juli 2023",
                    status: "Tertunda",
                  },
                  {
                    title: "Masalah Pengumpulan Sampah",
                    date: "10 Juli 2023",
                    status: "Dalam Proses",
                  },
                  {
                    title: "Keluhan Kebisingan",
                    date: "5 Juli 2023",
                    status: "Selesai",
                  },
                ].map((complaint, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{complaint.title}</p>
                      <p className="text-xs text-gray-500">{complaint.date}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        complaint.status === "Tertunda"
                          ? "bg-yellow-100 text-yellow-800"
                          : complaint.status === "Dalam Proses"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/resident/complaint">
                  <Button variant="outline" className="w-full">
                    Ajukan Keluhan Baru
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Program Desa Terbaru</CardTitle>
              <CardDescription>Program desa yang sedang berjalan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Proyek Perbaikan Jalan",
                    date: "Mulai: 1 Juni 2023",
                    status: "Dalam Proses",
                  },
                  {
                    name: "Kebun Komunitas",
                    date: "Mulai: 15 Juli 2023",
                    status: "Baru Dimulai",
                  },
                  {
                    name: "Renovasi Perpustakaan Umum",
                    date: "Mulai: 10 Mei 2023",
                    status: "Dalam Proses",
                  },
                  {
                    name: "Inisiatif Air Bersih",
                    date: "Mulai: 1 Maret 2023",
                    status: "Hampir Selesai",
                  },
                ].map((program, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{program.name}</p>
                      <p className="text-xs text-gray-500">{program.date}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        program.status === "Baru Dimulai"
                          ? "bg-blue-100 text-blue-800"
                          : program.status === "Dalam Proses"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {program.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/resident/programs">
                  <Button variant="outline" className="w-full">
                    Lihat Semua Program
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Panduan Pengajuan Keluhan</CardTitle>
              <CardDescription>Cara mengajukan keluhan dengan efektif</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                    <span className="text-xs font-bold text-purple-800">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Berikan judul yang jelas</p>
                    <p className="text-xs text-gray-500">Judul yang spesifik membantu petugas memahami keluhan Anda</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                    <span className="text-xs font-bold text-purple-800">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jelaskan detail masalah</p>
                    <p className="text-xs text-gray-500">Berikan informasi lengkap tentang masalah yang Anda alami</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                    <span className="text-xs font-bold text-purple-800">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pilih kategori yang tepat</p>
                    <p className="text-xs text-gray-500">
                      Kategori yang tepat memastikan keluhan Anda ditangani oleh petugas yang sesuai
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/dashboard/resident/help">
                  <Button variant="outline" className="w-full gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Bantuan Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pengumuman Desa</CardTitle>
              <CardDescription>Informasi penting dari pemerintah desa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Jadwal Pemadaman Listrik",
                    date: "15 Juli 2023",
                    description: "Pemadaman listrik terjadwal pada tanggal 20 Juli 2023 pukul 09.00-12.00",
                  },
                  {
                    title: "Gotong Royong Desa",
                    date: "10 Juli 2023",
                    description: "Kegiatan gotong royong akan dilaksanakan pada hari Minggu, 23 Juli 2023",
                  },
                  {
                    title: "Vaksinasi COVID-19",
                    date: "5 Juli 2023",
                    description: "Program vaksinasi booster akan dilaksanakan di balai desa pada 25-27 Juli 2023",
                  },
                ].map((announcement, index) => (
                  <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium">{announcement.title}</p>
                    <p className="text-xs text-gray-500 mb-1">{announcement.date}</p>
                    <p className="text-xs">{announcement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kontak Penting</CardTitle>
              <CardDescription>Kontak penting pemerintah desa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Kantor Kepala Desa",
                    contact: "0812-3456-7890",
                    email: "kepaladesa@example.com",
                  },
                  {
                    name: "Sekretaris Desa",
                    contact: "0812-3456-7891",
                    email: "sekretaris@example.com",
                  },
                  {
                    name: "Bendahara Desa",
                    contact: "0812-3456-7892",
                    email: "bendahara@example.com",
                  },
                  {
                    name: "Layanan Darurat",
                    contact: "0812-3456-7893",
                    email: "darurat@example.com",
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.contact}</p>
                      <p className="text-xs text-gray-500">{contact.email}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
