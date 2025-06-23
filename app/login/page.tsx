"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real application, this would be an API call to authenticate
    // For demo purposes, we'll simulate different user roles

    setTimeout(() => {
      setIsLoading(false)

      // Simple role-based redirection
      if (username.includes("admin")) {
        router.push("/dashboard/admin")
      } else if (username.includes("head") || username.includes("kepala")) {
        router.push("/dashboard/village-head")
      } else if (username.includes("secretary") || username.includes("sekretaris")) {
        router.push("/dashboard/secretary")
      } else if (username.includes("treasurer") || username.includes("bendahara")) {
        router.push("/dashboard/treasurer")
      } else if (username.includes("resident") || username.includes("penduduk")) {
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
          <CardTitle className="text-2xl font-bold text-center">Masuk</CardTitle>
          <CardDescription className="text-center">Masukkan kredensial Anda untuk mengakses akun</CardDescription>
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
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            <span>Akun demo: admin, kepala-desa, sekretaris, bendahara, penduduk</span>
          </div>
          <div className="text-sm text-center text-gray-500">
            <span>Belum punya akun? Hubungi administrator Anda</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
