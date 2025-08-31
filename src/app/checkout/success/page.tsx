"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Download, Mail, Calendar, ArrowRight, Gift, Star, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/home/Navigation"
import { motion, type Variants } from "framer-motion"

export default function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    // Generate order number
    setOrderNumber(`TKE-${Date.now().toString().slice(-8)}`)
    
    // Set current time
    const now = new Date()
    setCurrentTime(now.toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric", 
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }))

    // Show confetti animation
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.6, -0.05, 0.01, 0.99] 
      }
    }
  }

  const checkmarkVariants: Variants = {
    hidden: { 
      scale: 0, 
      rotate: 0 
    },
    visible: {
      scale: 1,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    }
  }

  const confettiVariants: Variants = {
    hidden: {
      opacity: 1,
      scale: 0.5,
      y: -10
    },
    visible: {
      opacity: 0,
      rotate: 360,
      transition: {
        duration: 3,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2c14b]/10 to-green-50 relative overflow-hidden">
      <Navigation />

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#f2c14b] rounded-full"
              style={{
                left: Math.random() * 100 + '%',
                top: -10
              }}
              variants={confettiVariants}
              initial="hidden"
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 10 : 800,
                x: Math.random() * 200 - 100,
                rotate: 360,
                opacity: 0,
                transition: {
                  duration: Math.random() * 2 + 3,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#f2c14b]/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-green-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-purple-200/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          className="max-w-2xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Success Card */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center bg-gradient-to-br from-green-50 to-emerald-50 relative p-6 sm:p-8">
                {/* Success Icon with Animation */}
                <motion.div
                  className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg"
                  variants={checkmarkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    🎉 Pembayaran Berhasil!
                  </CardTitle>
                  <p className="text-base sm:text-lg text-gray-600 px-2">
                    Terima kasih atas pembelian tiket event di Banyuwangi
                  </p>
                  <Badge className="mt-3 bg-[#f2c14b] text-black px-4 py-1">
                    Transaksi Selesai
                  </Badge>
                </motion.div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                {/* Order Details */}
                <motion.div variants={itemVariants}>
                  <div className="bg-gradient-to-r from-[#f2c14b]/10 to-yellow-50 rounded-xl p-4 sm:p-6 border border-[#f2c14b]/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">📋 Detail Pesanan</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Nomor Pesanan</p>
                        <p className="text-lg sm:text-xl font-mono text-[#f2c14b] font-bold break-all">#{orderNumber}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">🕒 Waktu Transaksi</h3>
                        <p className="text-xs sm:text-sm text-gray-800 break-words">{currentTime}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Status Information */}
                <motion.div variants={itemVariants}>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-blue-900 text-sm sm:text-base">E-tiket Terkirim</p>
                        <p className="text-xs sm:text-sm text-blue-700">Cek email Anda untuk e-tiket dan detail event</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-green-900 text-sm sm:text-base">Siap Digunakan</p>
                        <p className="text-xs sm:text-sm text-green-700">Simpan e-tiket untuk akses masuk event</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Gift className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-purple-900 text-sm sm:text-base">Bonus Poin</p>
                        <p className="text-xs sm:text-sm text-purple-700">Anda mendapat 100 poin reward SwarEvent</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-gradient-to-r from-[#f2c14b] to-[#e6b143] hover:from-[#e6b143] hover:to-[#d4a139] text-black font-semibold py-3 sm:py-4 text-base sm:text-lg shadow-lg">
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Download E-Tiket Sekarang
                    </Button>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link href="/tickets" className="block">
                        <Button variant="outline" className="w-full border-[#f2c14b] text-[#f2c14b] hover:bg-[#f2c14b]/10 py-2 sm:py-3 text-sm sm:text-base">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Beli Tiket Lainnya
                        </Button>
                      </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" className="w-full py-2 sm:py-3 text-sm sm:text-base">
                        <Share2 className="w-4 h-4 mr-2" />
                        Bagikan ke Teman
                      </Button>
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/" className="block">
                      <Button variant="ghost" className="w-full hover:bg-gray-100 py-2 sm:py-3 text-sm sm:text-base">
                        Kembali ke Beranda
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Rating Request */}
                <motion.div variants={itemVariants}>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 sm:p-6 border border-orange-200 text-center">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Bagaimana pengalaman Anda?</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 px-2">
                      Berikan rating dan review untuk membantu pengguna lain
                    </p>
                    <Button size="sm" className="bg-[#f2c14b] hover:bg-[#e6b143] text-black text-xs sm:text-sm">
                      Berikan Rating
                    </Button>
                  </div>
                </motion.div>

                {/* Support Info */}
                <motion.div variants={itemVariants}>
                  <div className="text-center text-xs sm:text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <p className="mb-2">💬 Butuh bantuan? Tim customer service kami siap membantu</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-4 px-2">
                      <p className="font-medium text-[#f2c14b] break-all">📞 +62 812 3816 9667</p>
                      <p className="font-medium text-[#f2c14b] break-all">✉️ support@swarevent.com</p>
                    </div>
                    <p className="mt-2 text-xs px-2">Layanan 24/7 untuk memastikan pengalaman terbaik Anda</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Tips Card */}
          <motion.div variants={itemVariants} className="mt-4 sm:mt-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  💡 Tips untuk Event Anda
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#f2c14b] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Datang 30 menit sebelum event dimulai</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#f2c14b] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Siapkan e-tiket dalam bentuk screenshot</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#f2c14b] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Bawa identitas diri yang valid</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#f2c14b] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Follow @swarevent untuk update event</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}