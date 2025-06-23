"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart2, PieChart, Download, FileText, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

// Sample budget data
const budgetData = {
  totalBudget: 250000,
  allocated: 185000,
  remaining: 65000,
  categories: [
    { name: "Infrastruktur", allocated: 85000, spent: 62000 },
    { name: "Pendidikan", allocated: 45000, spent: 30000 },
    { name: "Kesehatan", allocated: 35000, spent: 28000 },
    { name: "Pertanian", allocated: 20000, spent: 15000 },
  ],
  programs: [
    { name: "Proyek Perbaikan Jalan", budget: 50000, spent: 35000, category: "Infrastruktur" },
    { name: "Kebun Komunitas", budget: 15000, spent: 12000, category: "Pertanian" },
    { name: "Renovasi Perpustakaan Umum", budget: 35000, spent: 20000, category: "Pendidikan" },
    { name: "Inisiatif Air Bersih", budget: 25000, spent: 22000, category: "Kesehatan" },
    { name: "Pembangunan Pusat Pemuda", budget: 75000, spent: 5000, category: "Infrastruktur" },
  ],
  transactions: [
    {
      date: "2023-07-15",
      description: "Material Perbaikan Jalan",
      amount: 15000,
      type: "expense",
      category: "Infrastruktur",
    },
    { date: "2023-07-10", description: "Hibah Pemerintah", amount: 50000, type: "income", category: "Umum" },
    { date: "2023-07-05", description: "Buku Perpustakaan", amount: 5000, type: "expense", category: "Pendidikan" },
    { date: "2023-07-01", description: "Sistem Filter Air", amount: 12000, type: "expense", category: "Kesehatan" },
    { date: "2023-06-25", description: "Donasi Masyarakat", amount: 8000, type: "income", category: "Umum" },
    { date: "2023-06-20", description: "Perlengkapan Kebun", amount: 3000, type: "expense", category: "Pertanian" },
    {
      date: "2023-06-15",
      description: "Tenaga Kerja Konstruksi Jalan",
      amount: 20000,
      type: "expense",
      category: "Infrastruktur",
    },
    { date: "2023-06-10", description: "Dana Tahunan Desa", amount: 100000, type: "income", category: "Umum" },
  ],
}

export default function BudgetReports() {
  const [selectedYear, setSelectedYear] = useState("2023")
  const [selectedQuarter, setSelectedQuarter] = useState("Q3")

  // Calculate percentages
  const allocatedPercentage = (budgetData.allocated / budgetData.totalBudget) * 100
  const remainingPercentage = (budgetData.remaining / budgetData.totalBudget) * 100

  return (
    <DashboardLayout role="treasurer">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laporan Anggaran</h1>
          <p className="text-gray-500">Lihat dan analisis alokasi dan pengeluaran anggaran desa</p>
        </div>

        <div className="flex items-center gap-4">
          <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Pilih tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue={selectedQuarter} onValueChange={setSelectedQuarter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Pilih kuartal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Q1">Q1</SelectItem>
              <SelectItem value="Q2">Q2</SelectItem>
              <SelectItem value="Q3">Q3</SelectItem>
              <SelectItem value="Q4">Q4</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="ml-auto gap-2">
            <Download className="h-4 w-4" />
            Ekspor Laporan
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Anggaran</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp{budgetData.totalBudget.toLocaleString()}</div>
              <p className="text-xs text-gray-500">Untuk tahun fiskal {selectedYear}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Anggaran Teralokasi</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp{budgetData.allocated.toLocaleString()}</div>
              <div className="flex items-center text-xs text-gray-500">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${allocatedPercentage}%` }}></div>
                </div>
                <span>{allocatedPercentage.toFixed(0)}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sisa Anggaran</CardTitle>
              <TrendingDown className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp{budgetData.remaining.toLocaleString()}</div>
              <div className="flex items-center text-xs text-gray-500">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${remainingPercentage}%` }}></div>
                </div>
                <span>{remainingPercentage.toFixed(0)}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Program Aktif</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{budgetData.programs.length}</div>
              <p className="text-xs text-gray-500">Dalam {budgetData.categories.length} kategori</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
            <TabsTrigger value="categories">Kategori</TabsTrigger>
            <TabsTrigger value="programs">Program</TabsTrigger>
            <TabsTrigger value="transactions">Transaksi</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Alokasi Anggaran</CardTitle>
                  <CardDescription>
                    Alokasi anggaran berdasarkan kategori untuk {selectedYear} {selectedQuarter}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  <div className="h-80 w-80 flex items-center justify-center">
                    <PieChart className="h-full w-full text-gray-300" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Penggunaan Anggaran</CardTitle>
                  <CardDescription>Anggaran teralokasi vs terpakai berdasarkan kategori</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  <div className="h-80 w-80 flex items-center justify-center">
                    <BarChart2 className="h-full w-full text-gray-300" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Anggaran</CardTitle>
                <CardDescription>Ikhtisar alokasi dan penggunaan anggaran</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetData.categories.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-gray-500">
                          Rp{category.spent.toLocaleString()} / Rp{category.allocated.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${(category.spent / category.allocated) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kategori Anggaran</CardTitle>
                <CardDescription>Rincian detail anggaran berdasarkan kategori</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Anggaran Teralokasi</TableHead>
                      <TableHead>Terpakai</TableHead>
                      <TableHead>Sisa</TableHead>
                      <TableHead>Penggunaan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetData.categories.map((category, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>Rp{category.allocated.toLocaleString()}</TableCell>
                        <TableCell>Rp{category.spent.toLocaleString()}</TableCell>
                        <TableCell>Rp{(category.allocated - category.spent).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full max-w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                              <div
                                className="bg-green-600 h-2.5 rounded-full"
                                style={{ width: `${(category.spent / category.allocated) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{((category.spent / category.allocated) * 100).toFixed(0)}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Anggaran Program</CardTitle>
                <CardDescription>Alokasi dan penggunaan anggaran berdasarkan program</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Anggaran</TableHead>
                      <TableHead>Terpakai</TableHead>
                      <TableHead>Sisa</TableHead>
                      <TableHead>Penggunaan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetData.programs.map((program, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{program.name}</TableCell>
                        <TableCell>{program.category}</TableCell>
                        <TableCell>Rp{program.budget.toLocaleString()}</TableCell>
                        <TableCell>Rp{program.spent.toLocaleString()}</TableCell>
                        <TableCell>Rp{(program.budget - program.spent).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full max-w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                              <div
                                className="bg-green-600 h-2.5 rounded-full"
                                style={{ width: `${(program.spent / program.budget) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{((program.spent / program.budget) * 100).toFixed(0)}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaksi Terbaru</CardTitle>
                <CardDescription>
                  Pemasukan dan pengeluaran untuk {selectedYear} {selectedQuarter}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead className="text-right">Jumlah</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetData.transactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.type === "income" ? "Pemasukan" : "Pengeluaran"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                            {transaction.type === "income" ? "+" : "-"}Rp{transaction.amount.toLocaleString()}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
