"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real application, this would be an API call to authenticate
    // For demo purposes, we'll simulate different user roles based on requirements

    setTimeout(() => {
      setIsLoading(false)

      // Role-based redirection according to the 3 roles specified
      if (username.includes("admin")) {
        router.push("/dashboard/admin")
      } else if (username.includes("kepala") || username.includes("head")) {
        router.push("/dashboard/village-head")
      } else if (username.includes("penduduk") || username.includes("resident")) {
        router.push("/dashboard/resident")
      } else {
        // Default to admin for demo
        router.push("/dashboard/admin")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
      <Link href="/" className="absolute top-4 left-4 flex items-center text-green-800 hover:text-green-600">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Beranda
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Masuk Sistem</CardTitle>
          <CardDescription className="text-center">
            Sistem Manajemen Keluhan Desa dengan Machine Learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nama Pengguna</Label>
                <Input
                  id="username"
                  placeholder="Masukkan nama pengguna"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
              {isLoading ? "Sedang masuk..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <div className="text-sm text-center text-gray-500">
            <span>Akun demo: admin, kepala-desa, penduduk</span>
          </div>
          <div className="text-sm text-center">
            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
              <DialogTrigger asChild>
                <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                  Belum punya akun? Hubungi administrator anda
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">Kontak Administrator</DialogTitle>
                  <DialogDescription className="text-center">
                    Silahkan hubungi administrator untuk pembuatan akun baru
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Telepon</p>
                      <p className="text-sm text-gray-600">0812-3456-7890</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-600">admin@desa.go.id</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">WhatsApp</p>
                      <p className="text-sm text-gray-600">+62812-3456-7890</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm font-medium">Alamat Kantor</p>
                      <p className="text-sm text-gray-600">Kantor Desa, Jl. Merdeka No. 1</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">Jam Operasional</p>
                      <p className="text-sm text-gray-600">Senin-Jumat 08:00-16:00</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button onClick={() => setIsContactModalOpen(false)}>
                    Tutup
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
