// User related types
export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  name: string
  phoneNumber?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'penduduk' | 'admin' | 'kepala_desa'

export interface ResidentProfile {
  id: string
  userId: string
  nik: string
  fullName: string
  phoneNumber?: string
  address: string
  ktpPhotoUrl: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

// Complaint related types
export interface Complaint {
  id: string
  residentId: string
  residentName: string
  nik: string
  title: string
  category: ComplaintCategory
  description: string
  evidencePhotoUrl: string
  urgencyLevel: UrgencyLevel
  location: string
  status: ComplaintStatus
  priority?: PriorityLevel
  confidence?: number
  submittedDate: Date
  reviewedBy?: string
  reviewedDate?: Date
  adminNotes?: string
  estimatedCost?: number
  allocatedBudget?: number
  completionDate?: Date
  rejectionReason?: string
}

export type ComplaintCategory =
  | 'fasilitas_kesehatan'
  | 'pendidikan'
  | 'ekonomi'
  | 'infrastruktur'
  | 'partisipasi_masyarakat'

export type UrgencyLevel = 'sangat_mendesak' | 'mendesak' | 'normal'

export type ComplaintStatus =
  | 'diajukan'
  | 'dalam_tinjauan'
  | 'disetujui'
  | 'ditolak'
  | 'dalam_proses'
  | 'selesai'

export type PriorityLevel = 'tinggi' | 'sedang' | 'rendah'

// Machine Learning related types
export interface ChiSquareFeature {
  name: string
  label: string
  enabled: boolean
  score?: number
  pValue?: number
}

export interface ChiSquareConfig {
  features: ChiSquareFeature[]
  significanceThreshold: number
  dataSource: string
}

export interface NaiveBayesConfig {
  bobotKesehatan: number
  bobotPendidikan: number
  bobotEkonomi: number
  bobotInfrastruktur: number
  bobotPartisipasi: number
}

export interface ClassificationResult {
  complaintId: string
  predictedPriority: PriorityLevel
  confidence: number
  features: Record<string, number>
}

export interface ModelMetrics {
  accuracy: number
  precision: Record<PriorityLevel, number>
  recall: Record<PriorityLevel, number>
  f1Score: Record<PriorityLevel, number>
  confusionMatrix: number[][]
  crossValidationScores: number[]
  trainingAccuracy: number
  validationAccuracy: number
}

// Budget related types
export interface BudgetCategory {
  id: string
  name: string
  category: ComplaintCategory
  totalBudget: number
  allocatedBudget: number
  remainingBudget: number
  year: number
}

export interface BudgetAllocation {
  id: string
  complaintId: string
  categoryId: string
  amount: number
  description: string
  allocatedDate: Date
  allocatedBy: string
}

// Analysis and Reporting types
export interface ProgramPriority {
  id: string
  name: string
  category: ComplaintCategory
  priority: PriorityLevel
  budgetAllocation: number
  status: 'aktif' | 'selesai' | 'ditunda'
  confidence: number
  relatedComplaints: string[]
}

export interface AnalysisReport {
  id: string
  title: string
  type: 'chi_square' | 'naive_bayes' | 'comprehensive'
  generatedDate: Date
  data: any
  summary: string
  recommendations: string[]
}

// Form validation types
export interface ComplaintFormData {
  title: string
  category: ComplaintCategory
  description: string
  evidencePhoto: File | null
  urgencyLevel: UrgencyLevel
  location: string
}

export interface ResidentRegistrationData {
  fullName: string
  nik: string
  phoneNumber?: string
  address: string
  ktpPhoto: File | null
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message: string
  errors?: Record<string, string[]>
}

// Dashboard Statistics types
export interface DashboardStats {
  totalComplaints: number
  pendingComplaints: number
  resolvedComplaints: number
  highPriorityComplaints: number
  budgetUtilization: number
  averageResolutionTime: number
}

// Notification types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isRead: boolean
  createdAt: Date
  relatedComplaintId?: string
}

// Constants
export const COMPLAINT_CATEGORIES = {
  fasilitas_kesehatan: 'Fasilitas Kesehatan',
  pendidikan: 'Pendidikan',
  ekonomi: 'Ekonomi dan Mata Pencaharian',
  infrastruktur: 'Infrastruktur',
  partisipasi_masyarakat: 'Partisipasi Masyarakat dalam Pembangunan'
} as const

export const URGENCY_LEVELS = {
  sangat_mendesak: 'Sangat Mendesak',
  mendesak: 'Mendesak',
  normal: 'Normal'
} as const

export const COMPLAINT_STATUSES = {
  diajukan: 'Diajukan',
  dalam_tinjauan: 'Dalam Tinjauan',
  disetujui: 'Disetujui',
  ditolak: 'Ditolak',
  dalam_proses: 'Dalam Proses',
  selesai: 'Selesai'
} as const

export const PRIORITY_LEVELS = {
  tinggi: 'Prioritas Tinggi',
  sedang: 'Prioritas Sedang',
  rendah: 'Prioritas Rendah'
} as const

export const USER_ROLES = {
  penduduk: 'Penduduk',
  admin: 'Administrator',
  kepala_desa: 'Kepala Desa'
} as const

export const CHI_SQUARE_FEATURES = [
  { name: 'community_need', label: 'Tingkat Kebutuhan Masyarakat', enabled: true },
  { name: 'welfare_impact', label: 'Dampak terhadap Kesejahteraan', enabled: true },
  { name: 'implementation_feasibility', label: 'Kelayakan Implementasi', enabled: true },
  { name: 'resource_availability', label: 'Ketersediaan Sumber Daya', enabled: true },
  { name: 'community_support', label: 'Dukungan Masyarakat', enabled: true },
  { name: 'village_vision_alignment', label: 'Kesesuaian dengan Visi Desa', enabled: true }
] as const

export const BUDGET_2025 = {
  fasilitas_kesehatan: 500000000,
  pendidikan: 300000000,
  ekonomi: 400000000,
  infrastruktur: 800000000,
  partisipasi_masyarakat: 200000000
} as const 
