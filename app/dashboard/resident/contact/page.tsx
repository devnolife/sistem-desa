"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Mail, MessageSquare, Phone, Send } from "lucide-react"

export default function ResidentContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({ title: "Pesan terkirim", description: "Kami akan menghubungi Anda segera." })
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <DashboardLayout role="penduduk">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kontak Administrator</h1>
          <p className="text-gray-500">Ajukan pertanyaan atau bantuan terkait sistem</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Kontak</CardTitle>
              <CardDescription>Hubungi kami melalui</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +62 812-3456-7890</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> admin@desa.go.id</div>
              <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Chat: Senin–Jumat 08.00–16.00</div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
              <CardDescription>Kami akan merespons secepatnya</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <Label>Nama</Label>
                    <Input required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>Pesan</Label>
                  <Textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div>
                  <Button type="submit" className="gap-2"><Send className="h-4 w-4" /> Kirim</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}


