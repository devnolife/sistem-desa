import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { CreditCard, PieChart, BarChart, ArrowUp, ArrowDown, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TreasurerDashboard() {
  return (
    <DashboardLayout role="treasurer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dasbor Bendahara Desa</h1>
        <p className="text-gray-500">Selamat datang di sistem manajemen desa. Kelola anggaran dan keuangan desa.</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Anggaran</CardTitle>
              <CreditCard className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp250.000.000</div>
              <p className="text-xs text-gray-500">Tahun Anggaran 2023</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Anggaran Terpakai</CardTitle>
              <ArrowDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp170.000.000</div>
              <p className="text-xs text-gray-500">68% dari total anggaran</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sisa Anggaran</CardTitle>
              <ArrowUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp80.000.000</div>
              <p className="text-xs text-gray-500">32% dari total anggaran</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Program Didanai</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">+3 dari kuartal sebelumnya</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Alokasi Anggaran</CardTitle>
              <CardDescription>Distribusi anggaran berdasarkan kategori</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <PieChart className="h-full w-full text-gray-300" />
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Infrastruktur</span>
                  <span className="text-sm font-medium">Rp112.500.000 (45%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pendidikan</span>
                  <span className="text-sm font-medium">Rp62.500.000 (25%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Kesehatan</span>
                  <span className="text-sm font-medium">Rp50.000.000 (20%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lainnya</span>
                  <span className="text-sm font-medium">Rp25.000.000 (10%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Penggunaan Anggaran</CardTitle>
              <CardDescription>Anggaran terpakai vs tersisa berdasarkan kategori</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <BarChart className="h-full w-full text-gray-300" />
              </div>
              <div className="space-y-2 mt-4">
                {[
                  { name: "Infrastruktur", allocated: 112500000, spent: 82500000 },
                  { name: "Pendidikan", allocated: 62500000, spent: 45000000 },
                  { name: "Kesehatan", allocated: 50000000, spent: 35000000 },
                  { name: "Lainnya", allocated: 25000000, spent: 7500000 },
                ].map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{category.name}</span>
                      <span className="text-sm text-gray-500">
                        Rp{category.spent.toLocaleString()} / Rp{category.allocated.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-amber-600 h-2.5 rounded-full"
                        style={{ width: `${(category.spent / category.allocated) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Transaksi Terbaru</CardTitle>
              <CardDescription>Transaksi keuangan terbaru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    description: "Material Perbaikan Jalan",
                    amount: 15000000,
                    type: "expense",
                    date: "15 Juli 2023",
                  },
                  {
                    description: "Hibah Pemerintah",
                    amount: 50000000,
                    type: "income",
                    date: "10 Juli 2023",
                  },
                  {
                    description: "Buku Perpustakaan",
                    amount: 5000000,
                    type: "expense",
                    date: "5 Juli 2023",
                  },
                  {
                    description: "Sistem Filter Air",
                    amount: 12000000,
                    type: "expense",
                    date: "1 Juli 2023",
                  },
                ].map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        transaction.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}Rp{transaction.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/treasurer/transactions">
                  <Button variant="outline" className="w-full">
                    Lihat Semua Transaksi
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Program Berdasarkan Anggaran</CardTitle>
              <CardDescription>Program dengan alokasi anggaran terbesar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Proyek Perbaikan Jalan", budget: 50000000, spent: 35000000 },
                  { name: "Pembangunan Pusat Pemuda", budget: 75000000, spent: 5000000 },
                  { name: "Renovasi Perpustakaan Umum", budget: 35000000, spent: 20000000 },
                  { name: "Inisiatif Air Bersih", budget: 25000000, spent: 22000000 },
                ].map((program, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{program.name}</span>
                      <span className="text-sm text-gray-500">
                        {((program.spent / program.budget) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-amber-600 h-2.5 rounded-full"
                        style={{ width: `${(program.spent / program.budget) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Rp{program.spent.toLocaleString()} / Rp{program.budget.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Laporan Keuangan</CardTitle>
              <CardDescription>Laporan keuangan terbaru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Laporan Anggaran Q2 2023",
                    date: "30 Juni 2023",
                    type: "Kuartalan",
                  },
                  {
                    name: "Laporan Pengeluaran Juni 2023",
                    date: "30 Juni 2023",
                    type: "Bulanan",
                  },
                  {
                    name: "Laporan Alokasi Anggaran",
                    date: "15 Juni 2023",
                    type: "Khusus",
                  },
                  {
                    name: "Laporan Pengeluaran Mei 2023",
                    date: "31 Mei 2023",
                    type: "Bulanan",
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
                <Link href="/dashboard/treasurer/reports">
                  <Button variant="outline" className="w-full">
                    Lihat Semua Laporan
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
