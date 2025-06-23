"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Database, LinkIcon, Check, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const simulateUpload = () => {
    setUploadStatus("uploading")
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("success")
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unggah Data</h1>
          <p className="text-gray-500">Unggah data dari berbagai sumber untuk dianalisis</p>
        </div>

        <Tabs defaultValue="file">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="file">Unggah File</TabsTrigger>
            <TabsTrigger value="api">Impor dari API</TabsTrigger>
            <TabsTrigger value="database">Koneksi Database</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Unggah File</CardTitle>
                <CardDescription>Unggah file data untuk diimpor ke sistem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-type">Jenis Data</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demografi">Data Demografi</SelectItem>
                      <SelectItem value="anggaran">Data Anggaran</SelectItem>
                      <SelectItem value="program">Data Program</SelectItem>
                      <SelectItem value="keluhan">Data Keluhan</SelectItem>
                      <SelectItem value="statistik">Data Statistik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">File</Label>
                  <div
                    className={`border-2 border-dashed rounded-md p-6 text-center ${
                      selectedFile ? "border-green-300 bg-green-50" : "border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      {selectedFile ? (
                        <>
                          <Check className="h-8 w-8 text-green-500 mb-2" />
                          <p className="text-sm font-medium text-green-600 mb-1">{selectedFile.name}</p>
                          <p className="text-xs text-gray-500">
                            {(selectedFile.size / 1024).toFixed(2)} KB · {selectedFile.type}
                          </p>
                        </>
                      ) : (
                        <>
                          <FileText className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-2">
                            Seret dan lepas file di sini, atau klik untuk memilih file
                          </p>
                          <p className="text-xs text-gray-400">Mendukung CSV, Excel, atau JSON</p>
                        </>
                      )}
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".csv,.xlsx,.json"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-name">Nama Dataset</Label>
                  <Input id="file-name" placeholder="Masukkan nama untuk dataset ini" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-description">Deskripsi</Label>
                  <Textarea id="file-description" placeholder="Masukkan deskripsi singkat tentang dataset ini" />
                </div>

                {uploadStatus === "uploading" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mengunggah...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {uploadStatus === "success" && (
                  <Alert className="bg-green-50 border-green-200">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Berhasil</AlertTitle>
                    <AlertDescription className="text-green-700">
                      File berhasil diunggah dan siap untuk diproses.
                    </AlertDescription>
                  </Alert>
                )}

                {uploadStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Terjadi kesalahan saat mengunggah file. Silakan coba lagi.</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={simulateUpload}
                  disabled={!selectedFile || uploadStatus === "uploading"}
                >
                  {uploadStatus === "uploading" ? "Mengunggah..." : "Unggah File"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Impor dari API</CardTitle>
                <CardDescription>Impor data dari API eksternal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-url">URL API</Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input id="api-url" placeholder="https://api.example.com/data" className="pl-8" />
                    </div>
                    <Button variant="outline">Tes Koneksi</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-auth">Autentikasi</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih metode autentikasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Tidak Ada</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="api-key">API Key</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" placeholder="Masukkan API key" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-data-type">Jenis Data</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demografi">Data Demografi</SelectItem>
                      <SelectItem value="anggaran">Data Anggaran</SelectItem>
                      <SelectItem value="program">Data Program</SelectItem>
                      <SelectItem value="keluhan">Data Keluhan</SelectItem>
                      <SelectItem value="statistik">Data Statistik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-dataset-name">Nama Dataset</Label>
                  <Input id="api-dataset-name" placeholder="Masukkan nama untuk dataset ini" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Impor Data</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Koneksi Database</CardTitle>
                <CardDescription>Hubungkan ke database eksternal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="db-type">Jenis Database</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis database" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="sqlserver">SQL Server</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="db-host">Host</Label>
                  <Input id="db-host" placeholder="localhost atau alamat IP" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-port">Port</Label>
                    <Input id="db-port" placeholder="3306" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-name">Nama Database</Label>
                    <Input id="db-name" placeholder="nama_database" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-username">Username</Label>
                    <Input id="db-username" placeholder="username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-password">Password</Label>
                    <Input id="db-password" type="password" placeholder="password" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="db-query">Query SQL</Label>
                  <Textarea id="db-query" placeholder="SELECT * FROM table_name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="db-dataset-name">Nama Dataset</Label>
                  <Input id="db-dataset-name" placeholder="Masukkan nama untuk dataset ini" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Hubungkan & Impor</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Unggahan</CardTitle>
              <CardDescription>Unggahan data terbaru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Data Demografi Desa 2023",
                    type: "CSV",
                    size: "2.4 MB",
                    date: "15 Juli 2023",
                    status: "Berhasil",
                  },
                  {
                    name: "Data Anggaran Desa 2023",
                    type: "Excel",
                    size: "1.8 MB",
                    date: "10 Juli 2023",
                    status: "Berhasil",
                  },
                  {
                    name: "Data Program Desa 2023",
                    type: "JSON",
                    size: "450 KB",
                    date: "5 Juli 2023",
                    status: "Berhasil",
                  },
                  {
                    name: "Data Keluhan Warga 2023",
                    type: "CSV",
                    size: "780 KB",
                    date: "1 Juli 2023",
                    status: "Berhasil",
                  },
                ].map((upload, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">{upload.name}</p>
                        <p className="text-xs text-gray-500">
                          {upload.type} · {upload.size}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{upload.date}</p>
                      <p className={`text-xs ${upload.status === "Berhasil" ? "text-green-600" : "text-red-600"}`}>
                        {upload.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Panduan Unggah</CardTitle>
              <CardDescription>Informasi tentang format dan struktur data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Format File yang Didukung</h3>
                  <ul className="text-sm text-gray-500 space-y-1 list-disc pl-5">
                    <li>CSV (Comma Separated Values)</li>
                    <li>Excel (.xlsx, .xls)</li>
                    <li>JSON (JavaScript Object Notation)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Struktur Data</h3>
                  <ul className="text-sm text-gray-500 space-y-1 list-disc pl-5">
                    <li>Pastikan baris pertama berisi nama kolom</li>
                    <li>Hindari sel yang digabung (merged cells)</li>
                    <li>Pastikan format tanggal konsisten (YYYY-MM-DD)</li>
                    <li>Gunakan titik (.) sebagai pemisah desimal</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Ukuran Maksimum</h3>
                  <p className="text-sm text-gray-500">Ukuran file maksimum adalah 10 MB</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Bantuan</h3>
                  <p className="text-sm text-gray-500">
                    Untuk bantuan lebih lanjut, silakan hubungi administrator sistem.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
