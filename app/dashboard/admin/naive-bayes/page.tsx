"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Target,
  Play,
  Download,
  FileText,
  Brain,
  AlertCircle,
  CheckCircle,
  BarChart,
  Settings,
  Info,
  TrendingUp,
  PieChart,
  Activity,
  Zap
} from "lucide-react"

interface ModelMetrics {
  accuracy: number
  precision: Record<string, number>
  recall: Record<string, number>
  f1Score: Record<string, number>
  confusionMatrix: number[][]
  crossValidationScores: number[]
  trainingAccuracy: number
  validationAccuracy: number
  confidenceScores: number[]
}

interface ClassificationResult {
  complaintId: string
  title: string
  category: string
  originalPriority?: string
  predictedPriority: string
  confidence: number
}

export default function NaiveBayesClassificationPage() {
  const [weights, setWeights] = useState({
    bobotKesehatan: 0.8,
    bobotPendidikan: 0.7,
    bobotEkonomi: 0.6,
    bobotInfrastruktur: 0.9,
    bobotPartisipasi: 0.5
  })
  const [isTraining, setIsTraining] = useState(false)
  const [hasResults, setHasResults] = useState(false)
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null)
  const [results, setResults] = useState<ClassificationResult[]>([])
  const { toast } = useToast()

  const handleWeightChange = (parameter: string, value: number[]) => {
    setWeights(prev => ({
      ...prev,
      [parameter]: value[0]
    }))
  }

  const trainNaiveBayesModel = async () => {
    setIsTraining(true)

    try {
      // Simulate model training
      await new Promise(resolve => setTimeout(resolve, 4000))

      // Generate simulated comprehensive metrics
      const mockMetrics: ModelMetrics = {
        accuracy: 0.85 + Math.random() * 0.1, // 85-95%
        precision: {
          tinggi: 0.82 + Math.random() * 0.15,
          sedang: 0.78 + Math.random() * 0.15,
          rendah: 0.88 + Math.random() * 0.1
        },
        recall: {
          tinggi: 0.79 + Math.random() * 0.15,
          sedang: 0.76 + Math.random() * 0.15,
          rendah: 0.91 + Math.random() * 0.08
        },
        f1Score: {
          tinggi: 0.80 + Math.random() * 0.15,
          sedang: 0.77 + Math.random() * 0.15,
          rendah: 0.89 + Math.random() * 0.09
        },
        confusionMatrix: [
          [85, 12, 3],   // True High, predicted as High/Med/Low
          [8, 76, 16],   // True Med, predicted as High/Med/Low  
          [2, 5, 93]     // True Low, predicted as High/Med/Low
        ],
        crossValidationScores: [0.84, 0.87, 0.82, 0.89, 0.86],
        trainingAccuracy: 0.92 + Math.random() * 0.05,
        validationAccuracy: 0.86 + Math.random() * 0.08,
        confidenceScores: Array.from({ length: 50 }, () => 0.6 + Math.random() * 0.4)
      }

      // Generate classification results
      const mockResults: ClassificationResult[] = [
        {
          complaintId: "1",
          title: "Jalan Rusak Parah di Jl. Merdeka",
          category: "Infrastruktur",
          originalPriority: "tinggi",
          predictedPriority: "tinggi",
          confidence: 0.92
        },
        {
          complaintId: "2",
          title: "Lampu Penerangan Jalan Mati",
          category: "Infrastruktur",
          predictedPriority: "tinggi",
          confidence: 0.88
        },
        {
          complaintId: "3",
          title: "Posyandu Kekurangan Obat-obatan",
          category: "Fasilitas Kesehatan",
          predictedPriority: "tinggi",
          confidence: 0.85
        },
        {
          complaintId: "4",
          title: "Gedung Sekolah Bocor",
          category: "Pendidikan",
          originalPriority: "sedang",
          predictedPriority: "sedang",
          confidence: 0.75
        },
        {
          complaintId: "5",
          title: "Pasar Desa Kotor",
          category: "Ekonomi",
          predictedPriority: "sedang",
          confidence: 0.68
        }
      ]

      setMetrics(mockMetrics)
      setResults(mockResults)
      setHasResults(true)

      toast({
        title: "Model Berhasil Dilatih!",
        description: `Akurasi model: ${(mockMetrics.accuracy * 100).toFixed(1)}%`,
      })

    } catch (error) {
      toast({
        title: "Training Gagal",
        description: "Terjadi kesalahan saat melatih model Naive Bayes",
        variant: "destructive"
      })
    } finally {
      setIsTraining(false)
    }
  }

  const exportResults = (format: 'csv' | 'pdf' | 'excel') => {
    toast({
      title: "Export Berhasil",
      description: `Hasil klasifikasi telah diekspor ke format ${format.toUpperCase()}`,
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'tinggi':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'sedang':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rendah':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'tinggi':
        return 'Prioritas Tinggi'
      case 'sedang':
        return 'Prioritas Sedang'
      case 'rendah':
        return 'Prioritas Rendah'
      default:
        return priority
    }
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Klasifikasi Naive Bayes</h1>
          <p className="text-gray-500">
            Konfigurasi dan pelatihan model Naive Bayes untuk klasifikasi prioritas keluhan desa
          </p>
        </div>

        {/* Information Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Naive Bayes Classification:</strong> Algoritma machine learning yang menggunakan teorema Bayes
            untuk mengklasifikasikan keluhan berdasarkan fitur-fitur yang telah dipilih dari analisis Chi-Square.
            Model ini akan memprediksi prioritas keluhan: Tinggi, Sedang, atau Rendah.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Konfigurasi Bobot Model
                </CardTitle>
                <CardDescription>
                  Sesuaikan bobot kriteria untuk klasifikasi prioritas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Weight Sliders */}
                <div>
                  <Label className="text-base font-semibold">Bobot Kriteria Kesehatan</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Nilai: {weights.bobotKesehatan.toFixed(1)}
                  </p>
                  <Slider
                    value={[weights.bobotKesehatan]}
                    onValueChange={(value) => handleWeightChange('bobotKesehatan', value)}
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold">Bobot Kriteria Pendidikan</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Nilai: {weights.bobotPendidikan.toFixed(1)}
                  </p>
                  <Slider
                    value={[weights.bobotPendidikan]}
                    onValueChange={(value) => handleWeightChange('bobotPendidikan', value)}
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold">Bobot Kriteria Ekonomi</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Nilai: {weights.bobotEkonomi.toFixed(1)}
                  </p>
                  <Slider
                    value={[weights.bobotEkonomi]}
                    onValueChange={(value) => handleWeightChange('bobotEkonomi', value)}
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold">Bobot Kriteria Infrastruktur</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Nilai: {weights.bobotInfrastruktur.toFixed(1)}
                  </p>
                  <Slider
                    value={[weights.bobotInfrastruktur]}
                    onValueChange={(value) => handleWeightChange('bobotInfrastruktur', value)}
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold">Bobot Partisipasi Masyarakat</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Nilai: {weights.bobotPartisipasi.toFixed(1)}
                  </p>
                  <Slider
                    value={[weights.bobotPartisipasi]}
                    onValueChange={(value) => handleWeightChange('bobotPartisipasi', value)}
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Training Button */}
                <Button
                  onClick={trainNaiveBayesModel}
                  disabled={isTraining}
                  className="w-full"
                  size="lg"
                >
                  {isTraining ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Melatih Model...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Latih Model Naive Bayes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {isTraining && (
              <Card className="border-2 border-blue-200">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="animate-pulse">
                      <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    </div>
                    <h3 className="text-lg font-semibold">Sedang Melatih Model...</h3>
                    <p className="text-gray-600">
                      Training Naive Bayes classifier dengan bobot yang dikonfigurasi
                    </p>
                    <Progress value={66} className="w-full" />
                    <p className="text-sm text-gray-500">
                      Estimasi waktu: 3-4 menit
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {hasResults && !isTraining && metrics && (
              <>
                {/* Model Performance Summary */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Performa Model
                    </CardTitle>
                    <CardDescription>
                      Metrik komprehensif dari model Naive Bayes yang telah dilatih
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {(metrics.accuracy * 100).toFixed(1)}%
                        </div>
                        <p className="text-sm text-gray-500">Overall Accuracy</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {(metrics.trainingAccuracy * 100).toFixed(1)}%
                        </div>
                        <p className="text-sm text-gray-500">Training Accuracy</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">
                          {(metrics.validationAccuracy * 100).toFixed(1)}%
                        </div>
                        <p className="text-sm text-gray-500">Validation Accuracy</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">
                          {(metrics.crossValidationScores.reduce((a, b) => a + b) / metrics.crossValidationScores.length * 100).toFixed(1)}%
                        </div>
                        <p className="text-sm text-gray-500">Cross-Validation</p>
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
                        CSV
                      </Button>
                      <Button
                        onClick={() => exportResults('excel')}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                      <Button
                        onClick={() => exportResults('pdf')}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5" />
                      Metrik Detail per Kelas
                    </CardTitle>
                    <CardDescription>
                      Precision, Recall, dan F1-Score untuk setiap tingkat prioritas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {['tinggi', 'sedang', 'rendah'].map((priority) => (
                        <div key={priority} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-lg">{getPriorityLabel(priority)}</h4>
                            <Badge className={getPriorityColor(priority)}>
                              {priority.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Precision</span>
                                <span className="text-sm font-bold">
                                  {(metrics.precision[priority] * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress value={metrics.precision[priority] * 100} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Recall</span>
                                <span className="text-sm font-bold">
                                  {(metrics.recall[priority] * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress value={metrics.recall[priority] * 100} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">F1-Score</span>
                                <span className="text-sm font-bold">
                                  {(metrics.f1Score[priority] * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress value={metrics.f1Score[priority] * 100} className="h-2" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Confusion Matrix */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Confusion Matrix
                    </CardTitle>
                    <CardDescription>
                      Visualisasi akurasi prediksi untuk setiap kelas prioritas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="border p-2 bg-gray-50">Actual \ Predicted</th>
                            <th className="border p-2 bg-red-50">Tinggi</th>
                            <th className="border p-2 bg-yellow-50">Sedang</th>
                            <th className="border p-2 bg-green-50">Rendah</th>
                          </tr>
                        </thead>
                        <tbody>
                          {metrics.confusionMatrix.map((row, i) => (
                            <tr key={i}>
                              <td className="border p-2 bg-gray-50 font-medium">
                                {['Tinggi', 'Sedang', 'Rendah'][i]}
                              </td>
                              {row.map((value, j) => (
                                <td
                                  key={j}
                                  className={`border p-2 text-center font-medium ${i === j ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-600'
                                    }`}
                                >
                                  {value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Cross-Validation Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Hasil Cross-Validation (5-Fold)
                    </CardTitle>
                    <CardDescription>
                      Validasi robustness model dengan 5-fold cross-validation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {metrics.crossValidationScores.map((score, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">Fold {index + 1}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={score * 100} className="w-32" />
                            <span className="text-sm font-bold w-12">
                              {(score * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between font-semibold">
                          <span>Mean CV Score</span>
                          <span className="text-lg text-green-600">
                            {(metrics.crossValidationScores.reduce((a, b) => a + b) / metrics.crossValidationScores.length * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Classification Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Hasil Klasifikasi Keluhan
                    </CardTitle>
                    <CardDescription>
                      Prediksi prioritas untuk keluhan dengan tingkat confidence
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.map((result) => (
                        <div
                          key={result.complaintId}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold">{result.title}</h4>
                              <p className="text-sm text-gray-500">{result.category}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getPriorityColor(result.predictedPriority)}>
                                {getPriorityLabel(result.predictedPriority)}
                              </Badge>
                              <div className="text-right">
                                <div className="text-sm font-bold">
                                  {(result.confidence * 100).toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-500">Confidence</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <Progress value={result.confidence * 100} className="h-2" />
                            </div>
                            {result.originalPriority && (
                              <div className="flex items-center gap-2 text-sm">
                                {result.originalPriority === result.predictedPriority ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-green-600">Correct</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                    <span className="text-red-600">
                                      Was: {getPriorityLabel(result.originalPriority)}
                                    </span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {!hasResults && !isTraining && (
              <Card className="border-2 border-gray-200">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Target className="h-12 w-12 text-gray-400 mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-600">
                      Siap untuk Training Model
                    </h3>
                    <p className="text-gray-500">
                      Sesuaikan bobot kriteria, kemudian klik "Latih Model" untuk memulai training Naive Bayes
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Model Information */}
        {hasResults && (
          <Card className="border border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800">Interpretasi Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-purple-700">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 mt-1 text-purple-600" />
                  <p>
                    <strong>Overall Accuracy:</strong> Persentase prediksi yang benar dari seluruh data test.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 mt-1 text-purple-600" />
                  <p>
                    <strong>Precision:</strong> Dari semua prediksi kelas tertentu, berapa persen yang benar.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 mt-1 text-purple-600" />
                  <p>
                    <strong>Recall:</strong> Dari semua data kelas tertentu, berapa persen yang berhasil diprediksi.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 mt-1 text-purple-600" />
                  <p>
                    <strong>F1-Score:</strong> Harmonic mean dari precision dan recall, menunjukkan keseimbangan performa.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
} 
