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
  Brain,
  Target,
  DollarSign,
  Activity
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
  role: "admin" | "kepala_desa" | "penduduk"
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Navigation sections for the 3 roles according to specifications
  const navSections: Record<string, NavSection[]> = {
    // ADMIN - Slate Theme (Combined Secretary + Treasurer functions)
    admin: [
      {
        items: [{ title: "Dasbor", href: "/dashboard/admin", icon: Home }],
      },
      {
        title: "Manajemen Data",
        items: [
          { title: "Manajemen Pengguna", href: "/dashboard/admin/users", icon: Users },
          { title: "Pengelolaan Data", href: "/dashboard/admin/data-management", icon: Database },
          { title: "Unggah Data", href: "/dashboard/admin/upload", icon: Upload },
        ],
      },
      {
        title: "Analisis Machine Learning",
        items: [
          { title: "Chi-Square Analysis", href: "/dashboard/admin/chi-square", icon: Brain },
          { title: "Naive Bayes Classification", href: "/dashboard/admin/naive-bayes", icon: Target },
          { title: "Laporan Analisis", href: "/dashboard/admin/analysis", icon: BarChart },
        ],
      },
      {
        title: "Anggaran 2025",
        items: [
          { title: "Alokasi Anggaran", href: "/dashboard/admin/budget", icon: DollarSign },
          { title: "Laporan Keuangan", href: "/dashboard/admin/financial-reports", icon: PieChart },
        ],
      },
      {
        title: "Sistem",
        items: [
          { title: "Pengaturan Sistem", href: "/dashboard/admin/settings", icon: Settings },
        ],
      },
    ],

    // KEPALA DESA - Green Theme
    kepala_desa: [
      {
        items: [{ title: "Dasbor", href: "/dashboard/village-head", icon: Home }],
      },
      {
        title: "Manajemen Keluhan",
        items: [
          { title: "Review Keluhan", href: "/dashboard/village-head/complaints", icon: MessageSquare, badge: "12" },
          { title: "Persetujuan Keluhan", href: "/dashboard/village-head/approval", icon: CheckSquare, badge: "5" },
        ],
      },
      {
        title: "Hasil Program Prioritas",
        items: [
          { title: "Klasifikasi ML", href: "/dashboard/village-head/classification", icon: Brain },
          { title: "Program Prioritas", href: "/dashboard/village-head/programs", icon: Target },
          { title: "Analisis Keputusan", href: "/dashboard/village-head/decisions", icon: Activity },
        ],
      },
      {
        title: "Laporan",
        items: [
          { title: "Laporan Komprehensif", href: "/dashboard/village-head/reports", icon: FileText },
          { title: "Dashboard Analytics", href: "/dashboard/village-head/analytics", icon: BarChart },
        ],
      },
    ],

    // PENDUDUK - Purple Theme
    penduduk: [
      {
        items: [{ title: "Dasbor", href: "/dashboard/resident", icon: Home }],
      },
      {
        title: "Registrasi & Profil",
        items: [
          { title: "Registrasi Penduduk", href: "/dashboard/resident/registration", icon: User },
          { title: "Profil Saya", href: "/dashboard/resident/profile", icon: ClipboardList },
        ],
      },
      {
        title: "Keluhan",
        items: [
          { title: "Ajukan Keluhan", href: "/dashboard/resident/complaint", icon: MessageSquare },
          { title: "Status Keluhan", href: "/dashboard/resident/complaint-status", icon: Activity },
          { title: "Riwayat Keluhan", href: "/dashboard/resident/complaint-history", icon: FileText },
        ],
      },
      {
        title: "Bantuan",
        items: [
          { title: "Kontak Administrator", href: "/dashboard/resident/contact", icon: HelpCircle },
        ],
      },
    ],
  }

  const roleTitle: Record<string, string> = {
    admin: "Administrator",
    kepala_desa: "Kepala Desa",
    penduduk: "Penduduk",
  }

  // Color schemes based on role according to specifications
  const sidebarColors: Record<string, string> = {
    admin: "bg-slate-900 text-white",        // Slate theme for admin
    kepala_desa: "bg-green-900 text-white",  // Green theme for village head
    penduduk: "bg-purple-900 text-white",    // Purple theme for residents
  }

  const hoverColors: Record<string, string> = {
    admin: "hover:bg-slate-800",
    kepala_desa: "hover:bg-green-800",
    penduduk: "hover:bg-purple-800",
  }

  const activeColors: Record<string, string> = {
    admin: "bg-slate-800 text-white",
    kepala_desa: "bg-green-800 text-white",
    penduduk: "bg-purple-800 text-white",
  }

  const badgeColors: Record<string, string> = {
    admin: "bg-slate-700",
    kepala_desa: "bg-green-700",
    penduduk: "bg-purple-700",
  }

  // Role icons
  const roleIcons: Record<string, React.ElementType> = {
    admin: Settings,
    kepala_desa: Landmark,
    penduduk: User,
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
              <h2 className="text-xl font-bold">Sistem Keluhan Desa</h2>
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
                <h2 className="text-xl font-bold">Sistem Keluhan Desa</h2>
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
