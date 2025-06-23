import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { Users, FileText, PieChart, MessageSquare, Database, Upload, BarChart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dasbor Admin / Petugas Lapangan</h1>
        <p className="text-gray-500">Selamat datang di sistem manajemen desa. Kelola data dan analisis program desa.</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-gray-500">+2 dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Program Aktif</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">+3 dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Dataset Tersedia</CardTitle>
              <Database className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-500">+2 dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Keluhan Tertunda</CardTitle>
              <MessageSquare className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-gray-500">-2 dari bulan lalu</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Pengelolaan Data</CardTitle>
              <CardDescription>Kelola data desa dan input dari sumber eksternal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-full p-2">
                  <Database className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Data Demografi</p>
                  <p className="text-xs text-gray-500">Terakhir diperbarui: 3 hari yang lalu</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-full p-2">
                  <Database className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Data Statistik Desa</p>
                  <p className="text-xs text-gray-500">Terakhir diperbarui: 1 minggu yang lalu</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-full p-2">
                  <Database className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Data Anggaran</p>
                  <p className="text-xs text-gray-500">Terakhir diperbarui: 2 minggu yang lalu</p>
                </div>
              </div>
              <Link href="/dashboard/admin/data-management">
                <Button className="w-full">Kelola Data</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analisis Data</CardTitle>
              <CardDescription>Proses data menggunakan metode analisis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <BarChart className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Hybrid Naïve Bayes</p>
                  <p className="text-xs text-gray-500">Analisis klasifikasi program</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <PieChart className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Seleksi Fitur Chi-Square</p>
                  <p className="text-xs text-gray-500">Identifikasi fitur penting</p>
                </div>
              </div>
              <Link href="/dashboard/admin/analysis">
                <Button className="w-full">Jalankan Analisis</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Unggah Data</CardTitle>
              <CardDescription>Unggah data dari sumber eksternal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 rounded-full p-2">
                  <Upload className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Unggah Dataset Baru</p>
                  <p className="text-xs text-gray-500">CSV, Excel, atau JSON</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 rounded-full p-2">
                  <Upload className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Impor Data Eksternal</p>
                  <p className="text-xs text-gray-500">Dari API atau layanan lain</p>
                </div>
              </div>
              <Link href="/dashboard/admin/upload">
                <Button className="w-full">Unggah Data</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Aktivitas terbaru dalam sistem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "Admin", action: "Mengunggah data demografi baru", time: "2 jam yang lalu" },
                  { user: "Petugas Lapangan", action: "Menjalankan analisis Chi-Square", time: "5 jam yang lalu" },
                  { user: "Admin", action: "Memperbarui data statistik desa", time: "1 hari yang lalu" },
                  { user: "Petugas Lapangan", action: "Membuat laporan prioritas program", time: "2 hari yang lalu" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-green-100 rounded-full p-2">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-sm text-gray-500">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Laporan Terbaru</CardTitle>
              <CardDescription>Laporan dan rekomendasi yang telah dibuat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Laporan Prioritas Program Q3 2023", date: "15 Juli 2023" },
                  { name: "Analisis Demografi Desa 2023", date: "10 Juli 2023" },
                  { name: "Rekomendasi Alokasi Anggaran", date: "5 Juli 2023" },
                  { name: "Laporan Kinerja Program Desa", date: "1 Juli 2023" },
                ].map((report, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <p className="text-sm font-medium">{report.name}</p>
                    </div>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/admin/reports">
                <Button className="w-full mt-4">Lihat Semua Laporan</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
