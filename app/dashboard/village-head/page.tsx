import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { FileText, PieChart, MessageSquare, CheckCircle, BarChart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VillageHeadDashboard() {
  return (
    <DashboardLayout role="village-head">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dasbor Kepala Desa</h1>
        <p className="text-gray-500">
          Selamat datang di sistem manajemen desa. Lihat informasi utama dan laporan desa.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              <CardTitle className="text-sm font-medium">Menunggu Persetujuan</CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-gray-500">+1 dari minggu lalu</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Penggunaan Anggaran</CardTitle>
              <PieChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-gray-500">+5% dari bulan lalu</p>
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

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Program Menunggu Persetujuan</CardTitle>
              <CardDescription>Program yang membutuhkan persetujuan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Proyek Perbaikan Jalan",
                    submittedBy: "Sekretaris",
                    date: "15 Juli 2023",
                    priority: "Tinggi",
                  },
                  {
                    name: "Kebun Komunitas",
                    submittedBy: "Sekretaris",
                    date: "10 Juli 2023",
                    priority: "Sedang",
                  },
                  {
                    name: "Renovasi Perpustakaan Umum",
                    submittedBy: "Sekretaris",
                    date: "5 Juli 2023",
                    priority: "Sedang",
                  },
                  {
                    name: "Pembangunan Pusat Pemuda",
                    submittedBy: "Sekretaris",
                    date: "1 Juli 2023",
                    priority: "Rendah",
                  },
                ].map((program, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{program.name}</p>
                      <p className="text-xs text-gray-500">
                        Diajukan oleh: {program.submittedBy} · {program.date}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          program.priority === "Tinggi"
                            ? "bg-red-100 text-red-800"
                            : program.priority === "Sedang"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {program.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/village-head/programs">
                  <Button variant="outline" className="w-full">
                    Lihat Semua Program
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Laporan Analisis Terbaru</CardTitle>
              <CardDescription>Hasil analisis program dan prioritas desa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Laporan Prioritas Program Q3 2023",
                    date: "15 Juli 2023",
                    type: "Analisis Chi-Square",
                  },
                  {
                    name: "Prediksi Keberhasilan Program",
                    date: "10 Juli 2023",
                    type: "Hybrid Naïve Bayes",
                  },
                  {
                    name: "Analisis Dampak Program Desa",
                    date: "5 Juli 2023",
                    type: "Analisis Chi-Square",
                  },
                  {
                    name: "Rekomendasi Alokasi Anggaran",
                    date: "1 Juli 2023",
                    type: "Hybrid Naïve Bayes",
                  },
                ].map((report, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{report.name}</p>
                      <p className="text-xs text-gray-500">
                        {report.date} · {report.type}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/village-head/reports">
                  <Button variant="outline" className="w-full">
                    Lihat Semua Laporan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Kinerja Program</CardTitle>
              <CardDescription>Ringkasan kinerja program desa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <BarChart className="h-full w-full text-gray-300" />
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Program Selesai</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Program Dalam Proses</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Program Tertunda</span>
                  <span className="text-sm font-medium">4</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Penggunaan Anggaran</CardTitle>
              <CardDescription>Ringkasan penggunaan anggaran desa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <PieChart className="h-full w-full text-gray-300" />
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Infrastruktur</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pendidikan</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Kesehatan</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lainnya</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keluhan Warga Terbaru</CardTitle>
              <CardDescription>Keluhan yang diajukan oleh warga desa</CardDescription>
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
                  {
                    title: "Jalan Rusak di Area Timur",
                    date: "1 Juli 2023",
                    status: "Dalam Proses",
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
                <Link href="/dashboard/village-head/complaints">
                  <Button variant="outline" className="w-full">
                    Lihat Semua Keluhan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
