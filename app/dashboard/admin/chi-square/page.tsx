"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Brain,
  Play,
  Download,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BarChart,
  Settings,
  Info,
  Zap
} from "lucide-react"
import { CHI_SQUARE_FEATURES } from "@/lib/types"

interface ChiSquareResult {
  feature: string
  score: number
  pValue: number
  isSignificant: boolean
}

export default function ChiSquareAnalysisPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    CHI_SQUARE_FEATURES.filter(f => f.enabled).map(f => f.name)
  )
  const [significanceThreshold, setSignificanceThreshold] = useState([0.05])
  const [dataSource, setDataSource] = useState("complaint_history")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<ChiSquareResult[]>([])
  const [hasResults, setHasResults] = useState(false)
  const { toast } = useToast()

  const handleFeatureToggle = (featureName: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, featureName])
    } else {
      setSelectedFeatures(selectedFeatures.filter(f => f !== featureName))
    }
  }

  const runChiSquareAnalysis = async () => {
    if (selectedFeatures.length === 0) {
      toast({
        title: "Error",
        description: "Pilih minimal satu fitur untuk dianalisis",
        variant: "destructive"
      })
      return
    }

    setIsAnalyzing(true)

    try {
      // Simulate Chi-Square analysis
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Generate simulated results
      const mockResults: ChiSquareResult[] = CHI_SQUARE_FEATURES
        .filter(f => selectedFeatures.includes(f.name))
        .map(feature => ({
          feature: feature.label,
          score: Math.random() * 50 + 10, // Random score between 10-60
          pValue: Math.random() * 0.1, // Random p-value between 0-0.1
          isSignificant: Math.random() > 0.3 // 70% chance of being significant
        }))
        .sort((a, b) => b.score - a.score) // Sort by score descending

      setResults(mockResults)
      setHasResults(true)

      toast({
        title: "Analisis Selesai!",
        description: `Chi-Square analysis berhasil dilakukan untuk ${selectedFeatures.length} fitur`,
      })

    } catch (error) {
      toast({
        title: "Analisis Gagal",
        description: "Terjadi kesalahan saat melakukan analisis Chi-Square",
        variant: "destructive"
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const exportResults = (format: 'csv' | 'pdf') => {
    toast({
      title: "Export Berhasil",
      description: `Hasil analisis telah diekspor ke format ${format.toUpperCase()}`,
    })
  }

  const getSignificanceColor = (pValue: number) => {
    if (pValue < 0.01) return "bg-green-100 text-green-800 border-green-200"
    if (pValue < 0.05) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  const getSignificanceLabel = (pValue: number) => {
    if (pValue < 0.01) return "Sangat Signifikan"
    if (pValue < 0.05) return "Signifikan"
    return "Tidak Signifikan"
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analisis Chi-Square</h1>
          <p className="text-gray-500">
            Seleksi fitur menggunakan uji Chi-Square untuk mengidentifikasi fitur terpenting dalam klasifikasi keluhan
          </p>
        </div>

        {/* Information Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Chi-Square Feature Selection:</strong> Teknik statistik untuk mengukur tingkat ketergantungan antara fitur dan target klasifikasi.
            Fitur dengan nilai Chi-Square tinggi dan p-value rendah menunjukkan hubungan yang kuat dengan prioritas keluhan.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Konfigurasi Analisis
                </CardTitle>
                <CardDescription>
                  Pilih fitur dan parameter untuk analisis Chi-Square
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Feature Selection */}
                <div>
                  <Label className="text-base font-semibold">Pilih Fitur untuk Dianalisis</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Pilih fitur yang akan dievaluasi dalam konteks desa
                  </p>
                  <div className="space-y-3">
                    {CHI_SQUARE_FEATURES.map((feature) => (
                      <div key={feature.name} className="flex items-center space-x-3">
                        <Checkbox
                          id={feature.name}
                          checked={selectedFeatures.includes(feature.name)}
                          onCheckedChange={(checked) =>
                            handleFeatureToggle(feature.name, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={feature.name}
                          className="text-sm font-medium cursor-pointer flex-1"
                        >
                          {feature.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Significance Threshold */}
                <div>
                  <Label className="text-base font-semibold">
                    Ambang Batas Signifikansi Statistik
                  </Label>
                  <p className="text-sm text-gray-500 mb-3">
                    p-value threshold: {significanceThreshold[0]}
                  </p>
                  <Slider
                    value={significanceThreshold}
                    onValueChange={setSignificanceThreshold}
                    min={0.01}
                    max={0.1}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.01 (Ketat)</span>
                    <span>0.1 (Longgar)</span>
                  </div>
                </div>

                {/* Data Source */}
                <div>
                  <Label className="text-base font-semibold">Sumber Data</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Pilih dataset untuk analisis
                  </p>
                  <Select value={dataSource} onValueChange={setDataSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih sumber data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="complaint_history">
                        Riwayat Keluhan (2025)
                      </SelectItem>
                      <SelectItem value="village_data">
                        Data Desa Terintegrasi
                      </SelectItem>
                      <SelectItem value="combined_dataset">
                        Dataset Kombinasi
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Analysis Button */}
                <Button
                  onClick={runChiSquareAnalysis}
                  disabled={isAnalyzing || selectedFeatures.length === 0}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Menganalisis...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Jalankan Analisis Chi-Square
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {isAnalyzing && (
              <Card className="border-2 border-blue-200">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="animate-pulse">
                      <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    </div>
                    <h3 className="text-lg font-semibold">Sedang Menganalisis...</h3>
                    <p className="text-gray-600">
                      Menjalankan uji Chi-Square untuk {selectedFeatures.length} fitur terpilih
                    </p>
                    <Progress value={33} className="w-full" />
                    <p className="text-sm text-gray-500">
                      Estimasi waktu: 2-3 menit
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {hasResults && !isAnalyzing && (
              <>
                {/* Results Summary */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Hasil Analisis Chi-Square
                    </CardTitle>
                    <CardDescription>
                      Analisis selesai untuk {results.length} fitur dengan threshold p-value {significanceThreshold[0]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {results.filter(r => r.isSignificant).length}
                        </div>
                        <p className="text-sm text-gray-500">Fitur Signifikan</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.max(...results.map(r => r.score)).toFixed(2)}
                        </div>
                        <p className="text-sm text-gray-500">Skor Tertinggi</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {Math.min(...results.map(r => r.pValue)).toFixed(4)}
                        </div>
                        <p className="text-sm text-gray-500">p-value Terendah</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => exportResults('csv')}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
                      <Button
                        onClick={() => exportResults('pdf')}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5" />
                      Hasil Detail per Fitur
                    </CardTitle>
                    <CardDescription>
                      Ranking fitur berdasarkan nilai Chi-Square dan signifikansi statistik
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.map((result, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="bg-slate-100 rounded-full p-2">
                                <span className="text-sm font-bold text-slate-600">
                                  #{index + 1}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-semibold">{result.feature}</h4>
                                <p className="text-sm text-gray-500">
                                  Chi-Square Score: {result.score.toFixed(3)}
                                </p>
                              </div>
                            </div>
                            <Badge className={getSignificanceColor(result.pValue)}>
                              {getSignificanceLabel(result.pValue)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Chi-Square Score</span>
                                <span className="text-sm font-bold">{result.score.toFixed(3)}</span>
                              </div>
                              <Progress
                                value={(result.score / Math.max(...results.map(r => r.score))) * 100}
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">p-value</span>
                                <span className="text-sm font-bold">{result.pValue.toFixed(4)}</span>
                              </div>
                              <Progress
                                value={100 - (result.pValue / 0.1) * 100}
                                className="h-2"
                              />
                            </div>
                          </div>

                          {result.isSignificant && (
                            <div className="mt-3 flex items-center gap-2 text-green-600">
                              <Zap className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                Fitur ini memiliki hubungan kuat dengan prioritas keluhan
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Interpretation Guide */}
                <Card className="border border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-blue-800">Interpretasi Hasil</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-blue-700">
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-200 rounded-full p-1 mt-1">
                          <span className="text-xs font-bold text-blue-800">1</span>
                        </div>
                        <p>
                          <strong>Chi-Square Score Tinggi:</strong> Menunjukkan fitur memiliki hubungan kuat dengan klasifikasi prioritas keluhan.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-200 rounded-full p-1 mt-1">
                          <span className="text-xs font-bold text-blue-800">2</span>
                        </div>
                        <p>
                          <strong>p-value Rendah (&lt; 0.05):</strong> Menunjukkan hasil statistik yang signifikan dan dapat diandalkan.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-200 rounded-full p-1 mt-1">
                          <span className="text-xs font-bold text-blue-800">3</span>
                        </div>
                        <p>
                          <strong>Ranking Fitur:</strong> Fitur dengan ranking tinggi sebaiknya diprioritaskan dalam model klasifikasi Naive Bayes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {!hasResults && !isAnalyzing && (
              <Card className="border-2 border-gray-200">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-600">
                      Siap untuk Analisis Chi-Square
                    </h3>
                    <p className="text-gray-500">
                      Pilih fitur dan konfigurasi analisis, kemudian klik "Jalankan Analisis" untuk memulai
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 
