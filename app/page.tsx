import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Users, FileText, PieChart, MessageSquare } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">Sistem Manajemen Desa</h1>
          <Link href="/login">
            <Button>Masuk</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-green-900 mb-4">Manajemen Program & Anggaran Desa yang Efisien</h2>
          <p className="text-xl text-gray-600 mb-8">
            Platform komprehensif bagi perangkat desa untuk mengelola program, anggaran, dan umpan balik penduduk.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Mulai <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </section>

        <section id="features" className="py-12">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Fitur Utama</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>Manajemen Pengguna</CardTitle>
                <CardDescription>
                  Kelola perangkat desa dan penduduk dengan kontrol akses berbasis peran
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>Manajemen Program</CardTitle>
                <CardDescription>Buat, lacak, dan kelola program pembangunan desa</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <PieChart className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>Alokasi Anggaran</CardTitle>
                <CardDescription>Lacak dan kelola alokasi dan pengeluaran anggaran desa</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>Umpan Balik Penduduk</CardTitle>
                <CardDescription>Kumpulkan dan tanggapi keluhan dan saran dari penduduk</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Peran Pengguna</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Mengelola akun pengguna</li>
                  <li>Menambahkan pengguna baru</li>
                  <li>Mengedit informasi pengguna</li>
                  <li>Menghapus pengguna tidak aktif</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kepala Desa</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Menyetujui program yang diusulkan</li>
                  <li>Menolak program yang tidak sesuai</li>
                  <li>Melihat gambaran umum aktivitas desa</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sekretaris</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Mengelola program</li>
                  <li>Menjalankan fitur analisis</li>
                  <li>Melihat program prioritas</li>
                  <li>Melacak status implementasi</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bendahara</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Melihat laporan anggaran</li>
                  <li>Memperbarui data anggaran</li>
                  <li>Menambahkan alokasi anggaran</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Penduduk</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Mengajukan keluhan</li>
                  <li>Melacak status keluhan</li>
                  <li>Melihat informasi program publik</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg font-semibold mb-4 md:mb-0">Sistem Manajemen Desa</p>
            <div className="flex gap-8">
              <Link href="/about" className="hover:underline">
                Tentang
              </Link>
              <Link href="/contact" className="hover:underline">
                Kontak
              </Link>
              <Link href="/privacy" className="hover:underline">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-green-200">
            © {new Date().getFullYear()} Sistem Manajemen Desa. Seluruh hak cipta dilindungi.
          </div>
        </div>
      </footer>
    </div>
  )
}
