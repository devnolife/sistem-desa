"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { sampleResidents } from "@/lib/data"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { CalendarDays, IdCard, MapPin, Phone } from "lucide-react"

export default function ResidentProfilePage() {
  // Simulasi user saat ini (ambil pertama)
  const current = sampleResidents[0]
  const [fullName, setFullName] = useState(current.fullName)
  const [phoneNumber, setPhoneNumber] = useState(current.phoneNumber ?? "")
  const [address, setAddress] = useState(current.address)
  const { toast } = useToast()

  const handleSave = () => {
    toast({ title: "Profil diperbarui", description: "Perubahan profil Anda telah disimpan." })
  }

  return (
    <DashboardLayout role="penduduk">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profil Saya</h1>
          <p className="text-gray-500">Kelola data pribadi Anda</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan</CardTitle>
              <CardDescription>Identitas dan status verifikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold leading-tight">{fullName}</div>
                  <div className="text-sm text-gray-600">User ID: {current.userId}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <IdCard className="h-4 w-4" /> NIK: {current.nik}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CalendarDays className="h-4 w-4" /> Terdaftar: {current.createdAt.toLocaleDateString("id-ID")}
              </div>
              <div className="pt-2">
                <Badge className={current.isVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {current.isVerified ? "Terverifikasi" : "Belum Verifikasi"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Ubah Profil</CardTitle>
              <CardDescription>Perbarui informasi Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Nama Lengkap</Label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                  <Label>No. Telepon</Label>
                  <div className="relative">
                    <Phone className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input className="pl-8" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label>Alamat</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input className="pl-8" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={handleSave} className="w-full md:w-auto">Simpan Perubahan</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}


