"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart2, LineChartIcon, PieChartIcon } from "lucide-react"

export default function AnalysisPage() {
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const runAnalysis = () => {
    setIsRunningAnalysis(true)
    // Simulate analysis running
    setTimeout(() => {
      setIsRunningAnalysis(false)
      setAnalysisComplete(true)
    }, 2000)
  }

  return (
    <DashboardLayout role="secretary">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analisis Program</h1>
          <p className="text-gray-500">Jalankan analisis pada program desa untuk menentukan prioritas</p>
        </div>

        <Tabs defaultValue="feature-selection">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="feature-selection">Seleksi Fitur Chi-Square</TabsTrigger>
            <TabsTrigger value="classification">Klasifikasi Naive Bayes Hybrid</TabsTrigger>
          </TabsList>

          <TabsContent value="feature-selection" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Seleksi Fitur Chi-Square</CardTitle>
                <CardDescription>
                  Identifikasi fitur terpenting yang mempengaruhi keberhasilan dan prioritas program.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Sumber Data</label>
                      <Select defaultValue="all-programs">
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih sumber data" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-programs">Semua Program</SelectItem>
                          <SelectItem value="completed-programs">Program Selesai</SelectItem>
                          <SelectItem value="active-programs">Program Aktif</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Periode Waktu</label>
                      <Select defaultValue="last-year">
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih periode waktu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last-year">Tahun Terakhir</SelectItem>
                          <SelectItem value="last-6-months">6 Bulan Terakhir</SelectItem>
                          <SelectItem value="last-3-months">3 Bulan Terakhir</SelectItem>
                          <SelectItem value="all-time">Semua Waktu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Fitur Terpilih</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "Alokasi Anggaran",
                        "Jadwal Implementasi",
                        "Dampak Masyarakat",
                        "Kebutuhan Sumber Daya",
                        "Keberlanjutan",
                        "Keselarasan dengan Tujuan Desa",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input type="checkbox" id={`feature-${index}`} defaultChecked />
                          <label htmlFor={`feature-${index}`} className="text-sm">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {analysisComplete && (
                    <div className="mt-6 space-y-4">
                      <h3 className="font-medium">Hasil Kepentingan Fitur</h3>
                      <div className="space-y-2">
                        {[
                          { feature: "Dampak Masyarakat", score: 0.85 },
                          { feature: "Alokasi Anggaran", score: 0.72 },
                          { feature: "Keselarasan dengan Tujuan Desa", score: 0.68 },
                          { feature: "Keberlanjutan", score: 0.61 },
                          { feature: "Jadwal Implementasi", score: 0.45 },
                          { feature: "Kebutuhan Sumber Daya", score: 0.38 },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <span className="text-sm w-48">{item.feature}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${item.score * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{(item.score * 100).toFixed(0)}%</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Korelasi Fitur</CardTitle>
                          </CardHeader>
                          <CardContent className="flex justify-center py-4">
                            <BarChart2 className="h-40 w-40 text-gray-400" />
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Distribusi Fitur</CardTitle>
                          </CardHeader>
                          <CardContent className="flex justify-center py-4">
                            <PieChartIcon className="h-40 w-40 text-gray-400" />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={runAnalysis} disabled={isRunningAnalysis} className="w-full">
                  {isRunningAnalysis ? "Menjalankan Analisis..." : "Jalankan Analisis Chi-Square"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="classification" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Klasifikasi Naive Bayes Hybrid</CardTitle>
                <CardDescription>
                  Klasifikasikan program berdasarkan prioritas dan prediksi tingkat keberhasilan menggunakan data
                  historis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Data Pelatihan</label>
                      <Select defaultValue="historical">
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih data pelatihan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="historical">Program Historis</SelectItem>
                          <SelectItem value="completed">Program Selesai</SelectItem>
                          <SelectItem value="external">Dataset Eksternal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Target Klasifikasi</label>
                      <Select defaultValue="priority">
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih target klasifikasi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="priority">Prioritas Program</SelectItem>
                          <SelectItem value="success">Probabilitas Keberhasilan</SelectItem>
                          <SelectItem value="impact">Dampak Masyarakat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Parameter Model</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Alpha (Smoothing)</label>
                        <Select defaultValue="1.0">
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih nilai alpha" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.5">0.5</SelectItem>
                            <SelectItem value="1.0">1.0</SelectItem>
                            <SelectItem value="1.5">1.5</SelectItem>
                            <SelectItem value="2.0">2.0</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Fit Prior</label>
                        <Select defaultValue="true">
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih fit prior" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Ya</SelectItem>
                            <SelectItem value="false">Tidak</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {analysisComplete && (
                    <div className="mt-6 space-y-4">
                      <h3 className="font-medium">Hasil Klasifikasi</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Program
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Prioritas Prediksi
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kepercayaan
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {[
                              { program: "Kebun Komunitas", priority: "Sedang", confidence: 0.78 },
                              { program: "Pembangunan Pusat Pemuda", priority: "Tinggi", confidence: 0.92 },
                              { program: "Renovasi Perpustakaan Umum", priority: "Sedang", confidence: 0.65 },
                              { program: "Inisiatif Air Bersih", priority: "Tinggi", confidence: 0.88 },
                              { program: "Proyek Perbaikan Jalan", priority: "Rendah", confidence: 0.71 },
                            ].map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {item.program}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      item.priority === "Tinggi"
                                        ? "bg-red-100 text-red-800"
                                        : item.priority === "Sedang"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {item.priority}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {(item.confidence * 100).toFixed(0)}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Akurasi Klasifikasi</CardTitle>
                          </CardHeader>
                          <CardContent className="flex justify-center py-4">
                            <div className="relative h-40 w-40">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold">85%</span>
                              </div>
                              <PieChartIcon className="h-40 w-40 text-green-400" />
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Matriks Konfusi</CardTitle>
                          </CardHeader>
                          <CardContent className="flex justify-center py-4">
                            <LineChartIcon className="h-40 w-40 text-gray-400" />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={runAnalysis} disabled={isRunningAnalysis} className="w-full">
                  {isRunningAnalysis ? "Menjalankan Klasifikasi..." : "Jalankan Klasifikasi Naive Bayes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
