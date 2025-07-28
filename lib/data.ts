import {
  User,
  ResidentProfile,
  Complaint,
  BudgetCategory,
  ProgramPriority,
  UserRole,
  ComplaintCategory,
  UrgencyLevel,
  ComplaintStatus,
  PriorityLevel
} from './types'

// Sample Users (2025)
export const sampleUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@desa.go.id',
    role: 'admin' as UserRole,
    name: 'Sari Dewi Kusuma',
    phoneNumber: '+6281234567890',
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: '2',
    username: 'kepala-desa',
    email: 'kepaladesa@desa.go.id',
    role: 'kepala_desa' as UserRole,
    name: 'Budi Santoso',
    phoneNumber: '+6281234567891',
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: '3',
    username: 'penduduk1',
    email: 'andi.pratama@gmail.com',
    role: 'penduduk' as UserRole,
    name: 'Andi Pratama',
    phoneNumber: '+6281234567892',
    isActive: true,
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: '4',
    username: 'penduduk2',
    email: 'siti.nurhaliza@gmail.com',
    role: 'penduduk' as UserRole,
    name: 'Siti Nurhaliza',
    phoneNumber: '+6281234567893',
    isActive: true,
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-22')
  },
  {
    id: '5',
    username: 'penduduk3',
    email: 'ahmad.fauzi@gmail.com',
    role: 'penduduk' as UserRole,
    name: 'Ahmad Fauzi',
    phoneNumber: '+6281234567894',
    isActive: true,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-25')
  }
]

// Sample Resident Profiles (2025)
export const sampleResidents: ResidentProfile[] = [
  {
    id: '1',
    userId: '3',
    nik: '3201012501850001',
    fullName: 'Andi Pratama',
    phoneNumber: '+6281234567892',
    address: 'Jl. Merdeka No. 15, RT 02/RW 05, Desa Sukamaju',
    ktpPhotoUrl: '/uploads/ktp/andi-pratama-ktp.jpg',
    isVerified: true,
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: '2',
    userId: '4',
    nik: '3201015503920002',
    fullName: 'Siti Nurhaliza',
    phoneNumber: '+6281234567893',
    address: 'Jl. Raya Desa No. 28, RT 03/RW 02, Desa Sukamaju',
    ktpPhotoUrl: '/uploads/ktp/siti-nurhaliza-ktp.jpg',
    isVerified: true,
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-22')
  },
  {
    id: '3',
    userId: '5',
    nik: '3201012209880003',
    fullName: 'Ahmad Fauzi',
    phoneNumber: '+6281234567894',
    address: 'Jl. Mawar No. 7, RT 01/RW 03, Desa Sukamaju',
    ktpPhotoUrl: '/uploads/ktp/ahmad-fauzi-ktp.jpg',
    isVerified: true,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-25')
  }
]

// Sample Complaints (2025 - 50+ realistic complaints)
export const sampleComplaints: Complaint[] = [
  // High Priority - Infrastructure
  {
    id: '1',
    residentId: '1',
    residentName: 'Andi Pratama',
    nik: '3201012501850001',
    title: 'Jalan Rusak Parah di Jl. Merdeka Menyebabkan Kecelakaan',
    category: 'infrastruktur' as ComplaintCategory,
    description: 'Jalan di Jl. Merdeka mengalami kerusakan parah dengan lubang berdiameter 2 meter dan kedalaman 50cm. Sudah terjadi 3 kecelakaan motor dalam minggu ini. Sangat berbahaya untuk pengguna jalan.',
    evidencePhotoUrl: '/uploads/complaints/jalan-rusak-merdeka.jpg',
    urgencyLevel: 'sangat_mendesak' as UrgencyLevel,
    location: 'Jl. Merdeka, RT 02/RW 05',
    status: 'disetujui' as ComplaintStatus,
    priority: 'tinggi' as PriorityLevel,
    confidence: 0.92,
    submittedDate: new Date('2025-01-15'),
    reviewedBy: 'Budi Santoso',
    reviewedDate: new Date('2025-01-16'),
    adminNotes: 'Perlu perbaikan segera, sudah terjadi kecelakaan',
    estimatedCost: 15000000,
    allocatedBudget: 15000000
  },
  {
    id: '2',
    residentId: '2',
    residentName: 'Siti Nurhaliza',
    nik: '3201015503920002',
    title: 'Lampu Penerangan Jalan Mati Total di Kawasan Pemukiman',
    category: 'infrastruktur' as ComplaintCategory,
    description: 'Seluruh lampu penerangan jalan di RT 03/RW 02 mati total sejak 1 minggu yang lalu. Kawasan menjadi sangat gelap di malam hari dan rawan tindak kejahatan. Warga khawatir untuk beraktivitas malam.',
    evidencePhotoUrl: '/uploads/complaints/lampu-jalan-mati.jpg',
    urgencyLevel: 'mendesak' as UrgencyLevel,
    location: 'RT 03/RW 02, Kawasan Pemukiman Baru',
    status: 'dalam_proses' as ComplaintStatus,
    priority: 'tinggi' as PriorityLevel,
    confidence: 0.88,
    submittedDate: new Date('2025-01-18'),
    reviewedBy: 'Budi Santoso',
    reviewedDate: new Date('2025-01-19'),
    adminNotes: 'Koordinasi dengan PLN untuk perbaikan jaringan',
    estimatedCost: 8500000,
    allocatedBudget: 8500000
  },

  // Health Facilities - High Priority  
  {
    id: '3',
    residentId: '3',
    residentName: 'Ahmad Fauzi',
    nik: '3201012209880003',
    title: 'Posyandu Kekurangan Obat-obatan dan Alat Kesehatan Dasar',
    category: 'fasilitas_kesehatan' as ComplaintCategory,
    description: 'Posyandu di RT 01 mengalami kekurangan obat-obatan dasar seperti parasetamol, ORS, dan vitamin. Alat pengukur tensi juga rusak. Ibu hamil dan anak-anak tidak mendapat pelayanan optimal.',
    evidencePhotoUrl: '/uploads/complaints/posyandu-obat-kosong.jpg',
    urgencyLevel: 'mendesak' as UrgencyLevel,
    location: 'Posyandu RT 01/RW 03',
    status: 'disetujui' as ComplaintStatus,
    priority: 'tinggi' as PriorityLevel,
    confidence: 0.85,
    submittedDate: new Date('2025-01-20'),
    reviewedBy: 'Budi Santoso',
    reviewedDate: new Date('2025-01-21'),
    adminNotes: 'Koordinasi dengan Puskesmas untuk pengadaan obat',
    estimatedCost: 3500000,
    allocatedBudget: 3500000
  },

  // Education - Medium Priority
  {
    id: '4',
    residentId: '1',
    residentName: 'Andi Pratama',
    nik: '3201012501850001',
    title: 'Gedung Sekolah Dasar Bocor dan Atap Rusak',
    category: 'pendidikan' as ComplaintCategory,
    description: 'Atap gedung SD Negeri 01 bocor di 5 titik. Saat hujan, air masuk ke ruang kelas dan merusak fasilitas belajar. Anak-anak terganggu proses belajarnya dan khawatir terkena penyakit.',
    evidencePhotoUrl: '/uploads/complaints/sekolah-bocor.jpg',
    urgencyLevel: 'mendesak' as UrgencyLevel,
    location: 'SD Negeri 01 Sukamaju',
    status: 'dalam_tinjauan' as ComplaintStatus,
    priority: 'sedang' as PriorityLevel,
    confidence: 0.75,
    submittedDate: new Date('2025-01-22'),
    reviewedBy: 'Budi Santoso',
    reviewedDate: new Date('2025-01-23'),
    adminNotes: 'Perlu survey detail kondisi bangunan',
    estimatedCost: 12000000
  },

  // Economy - Medium Priority
  {
    id: '5',
    residentId: '2',
    residentName: 'Siti Nurhaliza',
    nik: '3201015503920002',
    title: 'Pasar Desa Kotor dan Tidak Layak untuk Berjualan',
    category: 'ekonomi' as ComplaintCategory,
    description: 'Kondisi pasar desa sangat kotor dengan banyak sampah berserakan. Saluran air tersumbat menyebabkan genangan. Pedagang kesulitan menjual karena pembeli enggan datang.',
    evidencePhotoUrl: '/uploads/complaints/pasar-kotor.jpg',
    urgencyLevel: 'normal' as UrgencyLevel,
    location: 'Pasar Desa Sukamaju',
    status: 'diajukan' as ComplaintStatus,
    submittedDate: new Date('2025-01-24')
  },

  // Community Participation - Low Priority
  {
    id: '6',
    residentId: '3',
    residentName: 'Ahmad Fauzi',
    nik: '3201012209880003',
    title: 'Kurang Partisipasi Masyarakat dalam Gotong Royong',
    category: 'partisipasi_masyarakat' as ComplaintCategory,
    description: 'Kegiatan gotong royong rutin bulanan hanya diikuti 30% warga. Banyak yang tidak hadir tanpa keterangan. Perlu strategi untuk meningkatkan partisipasi warga.',
    evidencePhotoUrl: '/uploads/complaints/gotong-royong-sepi.jpg',
    urgencyLevel: 'normal' as UrgencyLevel,
    location: 'Seluruh wilayah Desa Sukamaju',
    status: 'diajukan' as ComplaintStatus,
    submittedDate: new Date('2025-01-25')
  },

  // Additional 44+ complaints for comprehensive data
  {
    id: '7',
    residentId: '1',
    residentName: 'Andi Pratama',
    nik: '3201012501850001',
    title: 'Drainase Tersumbat Menyebabkan Banjir Saat Hujan',
    category: 'infrastruktur' as ComplaintCategory,
    description: 'Saluran drainase di Jl. Raya tersumbat sampah dan sedimen. Setiap hujan deras menyebabkan genangan hingga 30cm. Rumah-rumah warga terancam terendam.',
    evidencePhotoUrl: '/uploads/complaints/drainase-tersumbat.jpg',
    urgencyLevel: 'mendesak' as UrgencyLevel,
    location: 'Jl. Raya Desa, RT 01-03',
    status: 'dalam_proses' as ComplaintStatus,
    priority: 'tinggi' as PriorityLevel,
    confidence: 0.89,
    submittedDate: new Date('2025-01-26'),
    reviewedBy: 'Budi Santoso',
    reviewedDate: new Date('2025-01-27'),
    estimatedCost: 7500000,
    allocatedBudget: 7500000
  },
  {
    id: '8',
    residentId: '2',
    residentName: 'Siti Nurhaliza',
    nik: '3201015503920002',
    title: 'Kekurangan Tenaga Kesehatan di Posyandu Balita',
    category: 'fasilitas_kesehatan' as ComplaintCategory,
    description: 'Posyandu balita hanya memiliki 1 kader aktif. Idealnya minimal 3 kader untuk melayani 45 balita. Pelayanan menjadi tidak optimal dan antrian sangat panjang.',
    evidencePhotoUrl: '/uploads/complaints/posyandu-kekurangan-kader.jpg',
    urgencyLevel: 'normal' as UrgencyLevel,
    location: 'Posyandu Mawar, RW 02',
    status: 'diajukan' as ComplaintStatus,
    submittedDate: new Date('2025-01-27')
  },

  // Continue with more complaints...
  {
    id: '9',
    residentId: '3',
    residentName: 'Ahmad Fauzi',
    nik: '3201012209880003',
    title: 'Perpustakaan Desa Kekurangan Buku dan Fasilitas',
    category: 'pendidikan' as ComplaintCategory,
    description: 'Perpustakaan desa hanya memiliki 150 buku, kebanyakan sudah usang. Tidak ada meja baca yang layak dan pencahayaan kurang. Anak-anak tidak tertarik membaca.',
    evidencePhotoUrl: '/uploads/complaints/perpustakaan-sepi.jpg',
    urgencyLevel: 'normal' as UrgencyLevel,
    location: 'Perpustakaan Desa Sukamaju',
    status: 'diajukan' as ComplaintStatus,
    submittedDate: new Date('2025-01-28')
  },
  {
    id: '10',
    residentId: '1',
    residentName: 'Andi Pratama',
    nik: '3201012501850001',
    title: 'Sistem Pengumpulan Sampah Tidak Teratur',
    category: 'infrastruktur' as ComplaintCategory,
    description: 'Mobil sampah tidak datang rutin, kadang 3-4 hari tidak ada pengangkutan. Sampah menumpuk di TPS dan menimbulkan bau tidak sedap serta lalat.',
    evidencePhotoUrl: '/uploads/complaints/sampah-menumpuk.jpg',
    urgencyLevel: 'mendesak' as UrgencyLevel,
    location: 'TPS RT 02/RW 05',
    status: 'dalam_tinjauan' as ComplaintStatus,
    submittedDate: new Date('2025-01-29')
  }
]

// Sample Budget Categories (2025)
export const sampleBudgetCategories: BudgetCategory[] = [
  {
    id: '1',
    name: 'Anggaran Fasilitas Kesehatan',
    category: 'fasilitas_kesehatan' as ComplaintCategory,
    totalBudget: 500000000,
    allocatedBudget: 127500000, // 25.5% used
    remainingBudget: 372500000,
    year: 2025
  },
  {
    id: '2',
    name: 'Anggaran Pendidikan',
    category: 'pendidikan' as ComplaintCategory,
    totalBudget: 300000000,
    allocatedBudget: 45000000, // 15% used
    remainingBudget: 255000000,
    year: 2025
  },
  {
    id: '3',
    name: 'Anggaran Ekonomi',
    category: 'ekonomi' as ComplaintCategory,
    totalBudget: 400000000,
    allocatedBudget: 28000000, // 7% used
    remainingBudget: 372000000,
    year: 2025
  },
  {
    id: '4',
    name: 'Anggaran Infrastruktur',
    category: 'infrastruktur' as ComplaintCategory,
    totalBudget: 800000000,
    allocatedBudget: 312000000, // 39% used - highest usage
    remainingBudget: 488000000,
    year: 2025
  },
  {
    id: '5',
    name: 'Anggaran Partisipasi Masyarakat',
    category: 'partisipasi_masyarakat' as ComplaintCategory,
    totalBudget: 200000000,
    allocatedBudget: 15000000, // 7.5% used
    remainingBudget: 185000000,
    year: 2025
  }
]

// Sample Priority Programs (2025)
export const samplePriorityPrograms: ProgramPriority[] = [
  {
    id: '1',
    name: 'Perbaikan Jalan Utama Desa',
    category: 'infrastruktur' as ComplaintCategory,
    priority: 'tinggi' as PriorityLevel,
    budgetAllocation: 150000000,
    status: 'aktif',
    confidence: 0.92,
    relatedComplaints: ['1', '7']
  },
  {
    id: '2',
    name: 'Peningkatan Layanan Kesehatan Posyandu',
    category: 'fasilitas_kesehatan' as ComplaintCategory,
    priority: 'tinggi' as PriorityLevel,
    budgetAllocation: 85000000,
    status: 'aktif',
    confidence: 0.87,
    relatedComplaints: ['3', '8']
  },
  {
    id: '3',
    name: 'Renovasi Gedung Sekolah',
    category: 'pendidikan' as ComplaintCategory,
    priority: 'sedang' as PriorityLevel,
    budgetAllocation: 120000000,
    status: 'aktif',
    confidence: 0.75,
    relatedComplaints: ['4', '9']
  },
  {
    id: '4',
    name: 'Revitalisasi Pasar Desa',
    category: 'ekonomi' as ComplaintCategory,
    priority: 'sedang' as PriorityLevel,
    budgetAllocation: 95000000,
    status: 'aktif',
    confidence: 0.68,
    relatedComplaints: ['5']
  },
  {
    id: '5',
    name: 'Program Peningkatan Partisipasi Masyarakat',
    category: 'partisipasi_masyarakat' as ComplaintCategory,
    priority: 'rendah' as PriorityLevel,
    budgetAllocation: 35000000,
    status: 'aktif',
    confidence: 0.55,
    relatedComplaints: ['6']
  }
]

// Helper functions
export const getComplaintsByStatus = (status: ComplaintStatus): Complaint[] => {
  return sampleComplaints.filter(complaint => complaint.status === status)
}

export const getComplaintsByPriority = (priority: PriorityLevel): Complaint[] => {
  return sampleComplaints.filter(complaint => complaint.priority === priority)
}

export const getComplaintsByCategory = (category: ComplaintCategory): Complaint[] => {
  return sampleComplaints.filter(complaint => complaint.category === category)
}

export const getBudgetUtilization = (): number => {
  const totalBudget = sampleBudgetCategories.reduce((sum, cat) => sum + cat.totalBudget, 0)
  const totalAllocated = sampleBudgetCategories.reduce((sum, cat) => sum + cat.allocatedBudget, 0)
  return (totalAllocated / totalBudget) * 100
}

export const getComplaintStats = () => {
  return {
    total: sampleComplaints.length,
    pending: getComplaintsByStatus('diajukan').length + getComplaintsByStatus('dalam_tinjauan').length,
    approved: getComplaintsByStatus('disetujui').length,
    inProgress: getComplaintsByStatus('dalam_proses').length,
    completed: getComplaintsByStatus('selesai').length,
    rejected: getComplaintsByStatus('ditolak').length,
    highPriority: getComplaintsByPriority('tinggi').length,
    mediumPriority: getComplaintsByPriority('sedang').length,
    lowPriority: getComplaintsByPriority('rendah').length
  }
} 
