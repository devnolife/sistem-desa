import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { FileText, PieChart, BarChart, CheckCircle, XCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SecretaryDashboard() {
  return (
    <DashboardLayout role="secretary">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dasbor Sekretaris Desa</h1>
        <p className="text-gray-500">Selamat datang di sistem manajemen desa. Kelola data dan program desa.</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Program</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-gray-500">+3 dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Program Aktif</CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">+2 dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Program Selesai</CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-500">+1 dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Program Tertunda</CardTitle>
              <XCircle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-gray-500">-1 dari bulan lalu</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Program Prioritas</CardTitle>
              <CardDescription>Program dengan prioritas tinggi berdasarkan analisis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Proyek Perbaikan Jalan",
                    priority: "Tinggi",
                    score: 0.92,
                    status: "Dalam Proses",
                  },
                  {
                    name: "Inisiatif Air Bersih",
                    priority: "Tinggi",
                    score: 0.88,
                    status: "Dalam Proses",
                  },
                  {
                    name: "Renovasi Perpustakaan Umum",
                    priority: "Sedang",
                    score: 0.78,
                    status: "Tertunda",
                  },
                  {
                    name: "Kebun Komunitas",
                    priority: "Sedang",
                    score: 0.75,
                    status: "Tertunda",
                  },
                ].map((program, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{program.name}</p>
                      <p className="text-xs text-gray-500">
                        Skor: {program.score.toFixed(2)} · {program.status}
                      </p>
                    </div>
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
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/secretary/priority">
                  <Button variant="outline" className="w-full">
                    Lihat Semua Program Prioritas
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hasil Analisis Terbaru</CardTitle>
              <CardDescription>Hasil analisis program menggunakan metode Chi-Square dan Naïve Bayes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Analisis Prioritas Program",
                    date: "15 Juli 2023",
                    method: "Chi-Square",
                  },
                  {
                    name: "Prediksi Keberhasilan Program",
                    date: "10 Juli 2023",
                    method: "Hybrid Naïve Bayes",
                  },
                  {
                    name: "Analisis Dampak Program",
                    date: "5 Juli 2023",
                    method: "Chi-Square",
                  },
                  {
                    name: "Rekomendasi Alokasi Anggaran",
                    date: "1 Juli 2023",
                    method: "Hybrid Naïve Bayes",
                  },
                ].map((analysis, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{analysis.name}</p>
                      <p className="text-xs text-gray-500">
                        {analysis.date} · {analysis.method}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/secretary/analysis">
                  <Button variant="outline" className="w-full">
                    Jalankan Analisis Baru
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Status Program</CardTitle>
              <CardDescription>Distribusi status program desa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <PieChart className="h-full w-full text-gray-300" />
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Disetujui</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tertunda</span>
                  <span className="text-sm font-medium">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dalam Proses</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Selesai</span>
                  <span className="text-sm font-medium">8</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prioritas Program</CardTitle>
              <CardDescription>Distribusi prioritas program desa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <BarChart className="h-full w-full text-gray-300" />
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tinggi</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sedang</span>
                  <span className="text-sm font-medium">10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rendah</span>
                  <span className="text-sm font-medium">6</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Program Terbaru</CardTitle>
              <CardDescription>Program yang baru ditambahkan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Proyek Perbaikan Jalan",
                    date: "15 Juli 2023",
                    status: "Tertunda",
                  },
                  {
                    name: "Kebun Komunitas",
                    date: "10 Juli 2023",
                    status: "Tertunda",
                  },
                  {
                    name: "Renovasi Perpustakaan Umum",
                    date: "5 Juli 2023",
                    status: "Tertunda",
                  },
                  {
                    name: "Pembangunan Pusat Pemuda",
                    date: "1 Juli 2023",
                    status: "Tertunda",
                  },
                ].map((program, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{program.name}</p>
                      <p className="text-xs text-gray-500">{program.date}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        program.status === "Tertunda"
                          ? "bg-yellow-100 text-yellow-800"
                          : program.status === "Dalam Proses"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {program.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/secretary/programs">
                  <Button variant="outline" className="w-full">
                    Kelola Program
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
