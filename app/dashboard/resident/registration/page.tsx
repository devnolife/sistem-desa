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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Upload, CheckCircle, AlertCircle, User, CreditCard, Phone, MapPin, Camera } from "lucide-react"

// Validation schema according to specifications
const registrationSchema = z.object({
  fullName: z.string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter"),
  nik: z.string()
    .length(16, "NIK harus tepat 16 digit")
    .regex(/^\d{16}$/, "NIK hanya boleh berisi angka"),
  phoneNumber: z.string()
    .optional()
    .refine((val) => !val || /^(\+62|0)[0-9]{8,13}$/.test(val), {
      message: "Format nomor telepon tidak valid",
    }),
  address: z.string()
    .min(10, "Alamat minimal 10 karakter")
    .max(200, "Alamat maksimal 200 karakter"),
  ktpPhoto: z.any()
    .refine((file) => file && file.length > 0, "Foto KTP wajib diunggah")
    .refine((file) => {
      if (!file || file.length === 0) return false
      return file[0]?.size <= 5000000 // 5MB
    }, "Ukuran file maksimal 5MB")
    .refine((file) => {
      if (!file || file.length === 0) return false
      return ['image/jpeg', 'image/jpg', 'image/png'].includes(file[0]?.type)
    }, "Format file harus JPG, JPEG, atau PNG")
})

type RegistrationFormData = z.infer<typeof registrationSchema>

export default function ResidentRegistrationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema)
  })

  const watchedPhoto = watch("ktpPhoto")

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue("ktpPhoto", e.target.files)
    }
  }

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true)

    try {
      // Simulate API call - In real app, this would upload to server
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Check for duplicate NIK (simulated)
      if (data.nik === "3201012501850001") {
        toast({
          title: "NIK Sudah Terdaftar",
          description: "NIK yang Anda masukkan sudah terdaftar dalam sistem.",
          variant: "destructive"
        })
        setIsLoading(false)
        return
      }

      // Success simulation
      setIsRegistered(true)
      toast({
        title: "Registrasi Berhasil!",
        description: "Data Anda telah berhasil didaftarkan dan menunggu verifikasi admin.",
      })

    } catch (error) {
      toast({
        title: "Registrasi Gagal",
        description: "Terjadi kesalahan saat mendaftarkan data. Silakan coba lagi.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewRegistration = () => {
    setIsRegistered(false)
    reset()
  }

  if (isRegistered) {
    return (
      <DashboardLayout role="penduduk">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="border-2 border-green-200">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">Registrasi Berhasil!</CardTitle>
              <CardDescription>
                Data Anda telah berhasil didaftarkan dalam sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Langkah Selanjutnya:</strong>
                  <br />
                  1. Admin akan memverifikasi data Anda dalam 1-2 hari kerja
                  <br />
                  2. Anda akan menerima notifikasi setelah verifikasi selesai
                  <br />
                  3. Setelah terverifikasi, Anda dapat mulai mengajukan keluhan
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Status:</strong> Menunggu Verifikasi
                </div>
                <div>
                  <strong>Waktu Registrasi:</strong> {new Date().toLocaleString('id-ID')}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleNewRegistration} variant="outline" className="flex-1">
                  Daftar Lagi
                </Button>
                <Button asChild className="flex-1">
                  <a href="/dashboard/resident">Ke Dashboard</a>
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
          <h1 className="text-3xl font-bold tracking-tight">Registrasi Penduduk</h1>
          <p className="text-gray-500 mt-2">
            Lengkapi data diri Anda sebelum dapat mengajukan keluhan
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Informasi Penting:</strong> Registrasi diperlukan sebelum Anda dapat mengajukan keluhan.
            Semua data akan diverifikasi oleh administrator untuk memastikan keakuratan.
          </AlertDescription>
        </Alert>

        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Form Registrasi Penduduk
            </CardTitle>
            <CardDescription>
              Isi semua field yang diperlukan dengan data yang akurat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nama Lengkap */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nama Lengkap *
                </Label>
                <Input
                  id="fullName"
                  placeholder="Masukkan nama lengkap sesuai KTP"
                  {...register("fullName")}
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              {/* NIK */}
              <div className="space-y-2">
                <Label htmlFor="nik" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  NIK (Nomor Induk Kependudukan) *
                </Label>
                <Input
                  id="nik"
                  placeholder="Masukkan 16 digit NIK"
                  maxLength={16}
                  {...register("nik")}
                  className={errors.nik ? "border-red-500" : ""}
                />
                {errors.nik && (
                  <p className="text-sm text-red-500">{errors.nik.message}</p>
                )}
                <p className="text-xs text-gray-500">
                  NIK harus tepat 16 digit sesuai dengan KTP
                </p>
              </div>

              {/* Nomor Telepon */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Nomor Telepon (Opsional)
                </Label>
                <Input
                  id="phoneNumber"
                  placeholder="Contoh: 0812-3456-7890 atau +6281234567890"
                  {...register("phoneNumber")}
                  className={errors.phoneNumber ? "border-red-500" : ""}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Alamat */}
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Alamat Lengkap *
                </Label>
                <Textarea
                  id="address"
                  placeholder="Masukkan alamat lengkap termasuk RT/RW"
                  rows={3}
                  {...register("address")}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>

              {/* Upload Foto KTP */}
              <div className="space-y-2">
                <Label htmlFor="ktpPhoto" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Foto KTP *
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Input
                    id="ktpPhoto"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <Label htmlFor="ktpPhoto" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {watchedPhoto && watchedPhoto.length > 0
                        ? `File terpilih: ${watchedPhoto[0]?.name}`
                        : "Klik untuk mengunggah foto KTP"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Format: JPG, JPEG, PNG. Maksimal 5MB
                    </p>
                  </Label>
                </div>
                {errors.ktpPhoto && (
                  <p className="text-sm text-red-500">{errors.ktpPhoto.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? "Sedang Mendaftar..." : "Daftar Sekarang"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-800 mb-2">Informasi Verifikasi</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Data akan diverifikasi dalam 1-2 hari kerja</li>
              <li>• Pastikan foto KTP jelas dan terbaca</li>
              <li>• NIK akan dicek dengan database kependudukan</li>
              <li>• Anda akan mendapat notifikasi setelah verifikasi selesai</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 
