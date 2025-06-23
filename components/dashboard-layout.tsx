"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  Menu,
  Home,
  Users,
  FileText,
  PieChart,
  MessageSquare,
  LogOut,
  BarChart,
  CheckSquare,
  Database,
  Upload,
  Settings,
  User,
  CreditCard,
  Landmark,
  ClipboardList,
  HelpCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: string
}

interface NavSection {
  title?: string
  items: NavItem[]
}

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "admin" | "village-head" | "secretary" | "treasurer" | "resident"
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Definisi navigasi untuk setiap peran dengan pengelompokan
  const navSections: Record<string, NavSection[]> = {
    admin: [
      {
        items: [{ title: "Dasbor", href: "/dashboard/admin", icon: Home }],
      },
      {
        title: "Data & Analisis",
        items: [
          { title: "Pengelolaan Data", href: "/dashboard/admin/data-management", icon: Database },
          { title: "Analisis Data", href: "/dashboard/admin/analysis", icon: BarChart },
          { title: "Unggah Data", href: "/dashboard/admin/upload", icon: Upload },
        ],
      },
      {
        title: "Administrasi",
        items: [
          { title: "Manajemen Pengguna", href: "/dashboard/admin/users", icon: Users },
          { title: "Pengaturan Sistem", href: "/dashboard/admin/settings", icon: Settings },
        ],
      },
    ],
    "village-head": [
      {
        items: [{ title: "Dasbor", href: "/dashboard/village-head", icon: Home }],
      },
      {
        title: "Program & Anggaran",
        items: [
          { title: "Persetujuan Program", href: "/dashboard/village-head/programs", icon: CheckSquare, badge: "4" },
          { title: "Ikhtisar Anggaran", href: "/dashboard/village-head/budget", icon: PieChart },
        ],
      },
      {
        title: "Laporan & Umpan Balik",
        items: [
          { title: "Laporan Analisis", href: "/dashboard/village-head/reports", icon: FileText },
          { title: "Umpan Balik Penduduk", href: "/dashboard/village-head/feedback", icon: MessageSquare, badge: "7" },
        ],
      },
    ],
    secretary: [
      {
        items: [{ title: "Dasbor", href: "/dashboard/secretary", icon: Home }],
      },
      {
        title: "Program & Analisis",
        items: [
          { title: "Manajemen Program", href: "/dashboard/secretary/programs", icon: FileText },
          { title: "Analisis", href: "/dashboard/secretary/analysis", icon: BarChart },
          { title: "Program Prioritas", href: "/dashboard/secretary/priority", icon: CheckSquare },
        ],
      },
      {
        title: "Dokumentasi",
        items: [{ title: "Dokumen Desa", href: "/dashboard/secretary/documents", icon: ClipboardList }],
      },
    ],
    treasurer: [
      {
        items: [{ title: "Dasbor", href: "/dashboard/treasurer", icon: Home }],
      },
      {
        title: "Keuangan",
        items: [
          { title: "Laporan Anggaran", href: "/dashboard/treasurer/reports", icon: PieChart },
          { title: "Alokasi Anggaran", href: "/dashboard/treasurer/allocation", icon: CreditCard },
          { title: "Transaksi", href: "/dashboard/treasurer/transactions", icon: Landmark },
        ],
      },
    ],
    resident: [
      {
        items: [{ title: "Dasbor", href: "/dashboard/resident", icon: Home }],
      },
      {
        title: "Layanan",
        items: [
          { title: "Ajukan Keluhan", href: "/dashboard/resident/complaint", icon: MessageSquare },
          { title: "Lihat Program", href: "/dashboard/resident/programs", icon: FileText },
          { title: "Bantuan", href: "/dashboard/resident/help", icon: HelpCircle },
        ],
      },
    ],
  }

  const roleTitle: Record<string, string> = {
    admin: "Administrator",
    "village-head": "Kepala Desa",
    secretary: "Sekretaris",
    treasurer: "Bendahara",
    resident: "Penduduk",
  }

  // Warna latar belakang sidebar berdasarkan peran
  const sidebarColors: Record<string, string> = {
    admin: "bg-slate-900 text-white",
    "village-head": "bg-green-900 text-white",
    secretary: "bg-blue-900 text-white",
    treasurer: "bg-amber-900 text-white",
    resident: "bg-purple-900 text-white",
  }

  // Warna hover berdasarkan peran
  const hoverColors: Record<string, string> = {
    admin: "hover:bg-slate-800",
    "village-head": "hover:bg-green-800",
    secretary: "hover:bg-blue-800",
    treasurer: "hover:bg-amber-800",
    resident: "hover:bg-purple-800",
  }

  // Warna aktif berdasarkan peran
  const activeColors: Record<string, string> = {
    admin: "bg-slate-800 text-white",
    "village-head": "bg-green-800 text-white",
    secretary: "bg-blue-800 text-white",
    treasurer: "bg-amber-800 text-white",
    resident: "bg-purple-800 text-white",
  }

  // Warna badge berdasarkan peran
  const badgeColors: Record<string, string> = {
    admin: "bg-slate-700",
    "village-head": "bg-green-700",
    secretary: "bg-blue-700",
    treasurer: "bg-amber-700",
    resident: "bg-purple-700",
  }

  // Ikon untuk setiap peran
  const roleIcons: Record<string, React.ElementType> = {
    admin: Settings,
    "village-head": Landmark,
    secretary: ClipboardList,
    treasurer: CreditCard,
    resident: User,
  }

  const RoleIcon = roleIcons[role]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar untuk layar yang lebih besar */}
      <aside className={`hidden md:flex flex-col w-64 ${sidebarColors[role]} border-r border-gray-200`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar className={`h-10 w-10 ${badgeColors[role]}`}>
              <AvatarFallback>
                <RoleIcon className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">Manajemen Desa</h2>
              <p className="text-sm opacity-75">{roleTitle[role]}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {navSections[role].map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-1">
              {section.title && (
                <h3 className="text-xs uppercase tracking-wider opacity-70 px-3 mb-2">{section.title}</h3>
              )}
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all",
                    pathname === item.href ? activeColors[role] : hoverColors[role],
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </div>
                  {item.badge && <Badge className={badgeColors[role]}>{item.badge}</Badge>}
                </Link>
              ))}
              {sectionIndex < navSections[role].length - 1 && <Separator className="my-2 opacity-20" />}
            </div>
          ))}
        </nav>
        <div className={`p-4 border-t border-gray-700`}>
          <Link href="/login">
            <Button
              variant="outline"
              className={`w-full justify-start gap-2 bg-transparent border-gray-700 text-white ${hoverColors[role]}`}
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </Link>
        </div>
      </aside>

      {/* Sidebar mobile */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className={`p-0 ${sidebarColors[role]}`}>
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <Avatar className={`h-10 w-10 ${badgeColors[role]}`}>
                <AvatarFallback>
                  <RoleIcon className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">Manajemen Desa</h2>
                <p className="text-sm opacity-75">{roleTitle[role]}</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            {navSections[role].map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-1">
                {section.title && (
                  <h3 className="text-xs uppercase tracking-wider opacity-70 px-3 mb-2">{section.title}</h3>
                )}
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all",
                      pathname === item.href ? activeColors[role] : hoverColors[role],
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </div>
                    {item.badge && <Badge className={badgeColors[role]}>{item.badge}</Badge>}
                  </Link>
                ))}
                {sectionIndex < navSections[role].length - 1 && <Separator className="my-2 opacity-20" />}
              </div>
            ))}
          </nav>
          <div className={`p-4 border-t border-gray-700`}>
            <Link href="/login">
              <Button
                variant="outline"
                className={`w-full justify-start gap-2 bg-transparent border-gray-700 text-white ${hoverColors[role]}`}
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-gray-500">Selamat datang, {roleTitle[role]}</span>
            <Avatar className="h-8 w-8">
              <AvatarFallback className={badgeColors[role]}>{roleTitle[role].charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
