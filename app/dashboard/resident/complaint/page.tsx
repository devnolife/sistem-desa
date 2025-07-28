"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Upload, CheckCircle, AlertCircle, MessageSquare, Camera, MapPin, AlertTriangle } from "lucide-react"
import { COMPLAINT_CATEGORIES, URGENCY_LEVELS } from "@/lib/types"

// Validation schema according to specifications
const complaintSchema = z.object({
  title: z.string()
    .min(5, "Judul keluhan minimal 5 karakter")
    .max(100, "Judul keluhan maksimal 100 karakter"),
  category: z.enum(['fasilitas_kesehatan', 'pendidikan', 'ekonomi', 'infrastruktur', 'partisipasi_masyarakat'], {
    required_error: "Kategori keluhan harus dipilih"
  }),
  description: z.string()
    .min(20, "Deskripsi minimal 20 karakter")
    .max(1000, "Deskripsi maksimal 1000 karakter"),
  evidencePhoto: z.any()
    .refine((file) => file && file.length > 0, "Foto bukti wajib diunggah")
    .refine((file) => {
      if (!file || file.length === 0) return false
      return file[0]?.size <= 10000000 // 10MB
    }, "Ukuran file maksimal 10MB")
    .refine((file) => {
      if (!file || file.length === 0) return false
      return ['image/jpeg', 'image/jpg', 'image/png'].includes(file[0]?.type)
    }, "Format file harus JPG, JPEG, atau PNG"),
  urgencyLevel: z.enum(['sangat_mendesak', 'mendesak', 'normal'], {
    required_error: "Tingkat urgensi harus dipilih"
  }),
  location: z.string()
    .min(5, "Lokasi keluhan minimal 5 karakter")
    .max(200, "Lokasi keluhan maksimal 200 karakter")
})

type ComplaintFormData = z.infer<typeof complaintSchema>

export default function ComplaintSubmissionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedComplaint, setSubmittedComplaint] = useState<any>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema)
  })

  const watchedPhoto = watch("evidencePhoto")
  const watchedCategory = watch("category")
  const watchedUrgency = watch("urgencyLevel")

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue("evidencePhoto", e.target.files)
    }
  }

  const onSubmit = async (data: ComplaintFormData) => {
    setIsLoading(true)

    try {
      // Simulate API call - In real app, this would upload to server
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate successful submission
      const newComplaint = {
        id: `COMPLAINT-${Date.now()}`,
        title: data.title,
        category: data.category,
        urgencyLevel: data.urgencyLevel,
        submittedDate: new Date(),
        status: 'diajukan'
      }

      setSubmittedComplaint(newComplaint)
      setIsSubmitted(true)

      toast({
        title: "Keluhan Berhasil Diajukan!",
        description: "Keluhan Anda telah berhasil diajukan dan akan ditinjau oleh Kepala Desa.",
      })

    } catch (error) {
      toast({
        title: "Pengajuan Gagal",
        description: "Terjadi kesalahan saat mengajukan keluhan. Silakan coba lagi.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewComplaint = () => {
    setIsSubmitted(false)
    setSubmittedComplaint(null)
    reset()
  }

  // Check if user needs to register first (simulated)
  const needsRegistration = false // In real app, check if user has completed registration

  if (needsRegistration) {
    return (
      <DashboardLayout role="penduduk">
        <div className="max-w-2xl mx-auto space-y-6">
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Registrasi Diperlukan:</strong> Anda harus melengkapi registrasi penduduk terlebih dahulu sebelum dapat mengajukan keluhan.
            </AlertDescription>
          </Alert>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Registrasi Diperlukan</CardTitle>
              <CardDescription>
                Silakan lengkapi data diri Anda terlebih dahulu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/dashboard/resident/registration">Lengkapi Registrasi</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  if (isSubmitted) {
    return (
      <DashboardLayout role="penduduk">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="border-2 border-green-200">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">Keluhan Berhasil Diajukan!</CardTitle>
              <CardDescription>
                Keluhan Anda telah berhasil diajukan ke sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Langkah Selanjutnya:</strong>
                  <br />
                  1. Keluhan akan ditinjau oleh Kepala Desa dalam 1-3 hari kerja
                  <br />
                  2. Anda akan menerima notifikasi setelah ada keputusan
                  <br />
                  3. Status keluhan dapat dipantau di menu "Status Keluhan"
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>ID Keluhan:</strong> {submittedComplaint?.id}
                  </div>
                  <div>
                    <strong>Status:</strong> Diajukan
                  </div>
                  <div>
                    <strong>Kategori:</strong> {COMPLAINT_CATEGORIES[submittedComplaint?.category]}
                  </div>
                  <div>
                    <strong>Urgensi:</strong> {URGENCY_LEVELS[submittedComplaint?.urgencyLevel]}
                  </div>
                </div>
                <div>
                  <strong>Waktu Pengajuan:</strong> {submittedComplaint?.submittedDate?.toLocaleString('id-ID')}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleNewComplaint} variant="outline" className="flex-1">
                  Ajukan Keluhan Lain
                </Button>
                <Button asChild className="flex-1">
                  <a href="/dashboard/resident/complaint-status">Cek Status Keluhan</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="penduduk">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ajukan Keluhan</h1>
          <p className="text-gray-500 mt-2">
            Sampaikan keluhan Anda untuk ditinjau dan ditindaklanjuti oleh pemerintah desa
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Panduan Pengajuan:</strong> Pastikan keluhan disampaikan dengan jelas dan lengkap dengan bukti foto.
            Keluhan akan ditinjau dan diprioritaskan berdasarkan urgensi dan kategori.
          </AlertDescription>
        </Alert>

        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Form Pengajuan Keluhan
            </CardTitle>
            <CardDescription>
              Isi semua field dengan informasi yang akurat dan lengkap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Judul Keluhan */}
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Judul Keluhan *
                </Label>
                <Input
                  id="title"
                  placeholder="Contoh: Jalan Rusak di RT 02/RW 05"
                  {...register("title")}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Kategori Keluhan */}
              <div className="space-y-2">
                <Label htmlFor="category">Kategori Keluhan *</Label>
                <Select onValueChange={(value) => setValue("category", value as any)}>
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Pilih kategori keluhan" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(COMPLAINT_CATEGORIES).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>

              {/* Deskripsi Detail */}
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Detail *</Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan keluhan Anda dengan detail. Minimal 20 karakter."
                  rows={4}
                  {...register("description")}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
                <p className="text-xs text-gray-500">
                  Jelaskan keluhan dengan detail untuk memudahkan proses penanganan
                </p>
              </div>

              {/* Upload Foto Bukti */}
              <div className="space-y-2">
                <Label htmlFor="evidencePhoto" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Foto Bukti *
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Input
                    id="evidencePhoto"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <Label htmlFor="evidencePhoto" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {watchedPhoto && watchedPhoto.length > 0
                        ? `File terpilih: ${watchedPhoto[0]?.name}`
                        : "Klik untuk mengunggah foto bukti keluhan"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Format: JPG, JPEG, PNG. Maksimal 10MB
                    </p>
                  </Label>
                </div>
                {errors.evidencePhoto && (
                  <p className="text-sm text-red-500">{errors.evidencePhoto.message}</p>
                )}
              </div>

              {/* Lokasi Keluhan */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Lokasi Keluhan *
                </Label>
                <Input
                  id="location"
                  placeholder="Contoh: Jl. Merdeka RT 02/RW 05 atau nama tempat spesifik"
                  {...register("location")}
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>

              {/* Tingkat Urgensi */}
              <div className="space-y-2">
                <Label htmlFor="urgencyLevel" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Tingkat Urgensi *
                </Label>
                <Select onValueChange={(value) => setValue("urgencyLevel", value as any)}>
                  <SelectTrigger className={errors.urgencyLevel ? "border-red-500" : ""}>
                    <SelectValue placeholder="Pilih tingkat urgensi" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(URGENCY_LEVELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        <span className={
                          key === 'sangat_mendesak' ? 'text-red-600 font-semibold' :
                            key === 'mendesak' ? 'text-orange-600 font-medium' :
                              'text-green-600'
                        }>
                          {label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.urgencyLevel && (
                  <p className="text-sm text-red-500">{errors.urgencyLevel.message}</p>
                )}
              </div>

              {/* Preview Information */}
              {(watchedCategory || watchedUrgency) && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Ringkasan Keluhan</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      {watchedCategory && (
                        <p><strong>Kategori:</strong> {COMPLAINT_CATEGORIES[watchedCategory]}</p>
                      )}
                      {watchedUrgency && (
                        <p><strong>Tingkat Urgensi:</strong> {URGENCY_LEVELS[watchedUrgency]}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? "Sedang Mengajukan..." : "Ajukan Keluhan"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-orange-800 mb-2">Informasi Penting</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Keluhan akan ditinjau dalam 1-3 hari kerja</li>
              <li>• Foto bukti sangat membantu proses penanganan</li>
              <li>• Keluhan mendesak akan diprioritaskan</li>
              <li>• Anda akan mendapat notifikasi untuk setiap perkembangan</li>
              <li>• Status keluhan dapat dipantau kapan saja</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
