/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Building2, MapPin, Calendar, User, ShoppingBag, Lock, CheckCircle, ArrowLeft, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navigation from "@/components/home/Navigation"

// Declare snap for TypeScript
declare global {
  interface Window {
    snap: any;
  }
}

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("midtrans")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

  // Load Midtrans Snap script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-your-client-key')
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const processPayment = async () => {
    try {
      // Generate order ID
      const orderId = `ORDER-${Date.now()}`
      
      // Prepare transaction data
      const transactionData = {
        transaction_details: {
          order_id: orderId,
          gross_amount: totalPrice
        },
        customer_details: {
          first_name: formData.fullName.split(' ')[0] || 'Customer',
          last_name: formData.fullName.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          billing_address: {
            first_name: formData.fullName.split(' ')[0] || 'Customer',
            last_name: formData.fullName.split(' ').slice(1).join(' ') || '',
            address: formData.address,
            city: formData.city,
            postal_code: formData.postalCode,
            country_code: 'IDN'
          }
        },
        item_details: items.map(item => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          name: item.title,
          category: item.category
        })),
        notes: formData.notes
      }

      // Call API to get snap token
      const response = await fetch('/api/midtrans/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData)
      })

      const { token } = await response.json()

      // Open Midtrans Snap
      window.snap.pay(token, {
        onSuccess: function(result: any) {
          console.log('Payment success:', result)
          clearCart()
          router.push(`http://localhost:3000/checkout/success`)
        },
        onPending: function(result: any) {
          console.log('Payment pending:', result)
          alert('Pembayaran pending, silakan selesaikan pembayaran Anda')
        },
        onError: function(result: any) {
          console.log('Payment error:', result)
          alert('Terjadi kesalahan dalam pembayaran')
          setIsProcessing(false)
        },
        onClose: function() {
          console.log('Payment popup closed')
          setIsProcessing(false)
        }
      })
    } catch (error) {
      console.error('Error processing payment:', error)
      alert('Terjadi kesalahan dalam memproses pembayaran')
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    if (paymentMethod === "midtrans") {
      await processPayment()
    } else {
      // Simulate other payment methods
      setTimeout(() => {
        clearCart()
        router.push("/checkout/success")
      }, 2000)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h1>
              <p className="text-gray-600 mb-6">Tidak ada tiket di keranjang Anda</p>
              <Link
                href="/tickets"
                className="inline-flex items-center px-6 py-3 bg-[#f2c14b] hover:bg-[#e6b143] text-black font-semibold rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Lihat Semua Tiket
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#f2c14b] to-[#e6b143] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-4">Checkout</h1>
            <p className="text-lg text-black/80 max-w-2xl mx-auto">
              Lengkapi informasi untuk menyelesaikan pembelian tiket Anda
            </p>
            
            {/* Progress Steps */}
            <div className="flex justify-center mt-8 max-w-md mx-auto">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-semibold">
                    ✓
                  </div>
                  <span className="ml-2 text-sm font-medium text-black">Pilih Tiket</span>
                </div>
                <div className="w-8 h-0.5 bg-white/60"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium text-black">Checkout</span>
                </div>
                <div className="w-8 h-0.5 bg-white/30"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/30 text-black/50 rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <span className="ml-2 text-sm font-medium text-black/60">Selesai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-xl">
                    <ShoppingBag className="w-6 h-6 mr-2 text-[#f2c14b]" />
                    Ringkasan Pesanan
                  </CardTitle>
                  <p className="text-sm text-gray-600">{totalItems} tiket dipilih</p>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 border border-gray-100 rounded-xl hover:border-[#f2c14b]/30 hover:bg-gray-50/50 transition-all">
                      <div className="flex space-x-4">
                        <div className="relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <Badge className="absolute -top-2 -right-2 bg-[#f2c14b] text-black text-xs">
                            {item.quantity}x
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2">{item.title}</h4>
                          <Badge variant="secondary" className="mb-2">
                            {item.category}
                          </Badge>
                          <div className="space-y-1">
                            <div className="flex items-center text-xs text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span className="line-clamp-1">{item.location}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{item.date}</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Subtotal</span>
                              <span className="font-bold text-[#f2c14b]">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Separator className="my-6" />

                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({totalItems} tiket)</span>
                      <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Biaya Admin</span>
                      <span className="font-medium text-green-600">Gratis</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pajak</span>
                      <span className="font-medium text-green-600">Sudah termasuk</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Pembayaran</span>
                      <span className="text-[#f2c14b]">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center text-sm text-green-800">
                      <Lock className="w-4 h-4 mr-2" />
                      <span>Transaksi aman dan terenkripsi</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-xl">
                    <User className="w-6 h-6 mr-2 text-blue-600" />
                    Informasi Kontak
                  </CardTitle>
                  <p className="text-sm text-gray-600">Data ini akan digunakan untuk pengiriman tiket</p>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="mt-1 focus:ring-[#f2c14b] focus:border-[#f2c14b]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Nomor WhatsApp *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+62 812 3456 7890"
                        className="mt-1 focus:ring-[#f2c14b] focus:border-[#f2c14b]"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Nama Lengkap *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Nama lengkap sesuai KTP"
                      className="mt-1 focus:ring-[#f2c14b] focus:border-[#f2c14b]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-xl">
                    <MapPin className="w-6 h-6 mr-2 text-green-600" />
                    Alamat Penagihan
                  </CardTitle>
                  <p className="text-sm text-gray-600">Alamat untuk keperluan administrasi</p>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">Alamat Lengkap *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Jl. Contoh No. 123, RT/RW 01/02, Kelurahan..."
                      rows={3}
                      className="mt-1 focus:ring-[#f2c14b] focus:border-[#f2c14b]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">Kota *</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Banyuwangi"
                        className="mt-1 focus:ring-[#f2c14b] focus:border-[#f2c14b]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">Kode Pos *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="68411"
                        className="mt-1 focus:ring-[#f2c14b] focus:border-[#f2c14b]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-xl">
                    <CreditCard className="w-6 h-6 mr-2 text-purple-600" />
                    Metode Pembayaran
                  </CardTitle>
                  <p className="text-sm text-gray-600">Pilih metode pembayaran yang Anda inginkan</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <label className="relative group cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="midtrans"
                        checked={paymentMethod === "midtrans"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`border-2 rounded-xl p-6 transition-all group-hover:shadow-md ${
                          paymentMethod === "midtrans" 
                            ? "border-[#f2c14b] bg-[#f2c14b]/10 shadow-md" 
                            : "border-gray-200 group-hover:border-gray-300"
                        }`}
                      >
                        <div className={`w-8 h-8 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                          paymentMethod === "midtrans" ? "bg-[#f2c14b]" : "bg-gray-400"
                        }`}>
                          <span className="text-white font-bold text-sm">MT</span>
                        </div>
                        <p className="text-sm font-semibold text-center mb-1">Midtrans</p>
                        <p className="text-xs text-gray-500 text-center">Semua metode pembayaran</p>
                        {paymentMethod === "midtrans" && (
                          <CheckCircle className="w-5 h-5 text-[#f2c14b] absolute top-2 right-2" />
                        )}
                      </div>
                    </label>

                    <label className="relative group cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={paymentMethod === "credit-card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`border-2 rounded-xl p-6 transition-all group-hover:shadow-md ${
                          paymentMethod === "credit-card" 
                            ? "border-[#f2c14b] bg-[#f2c14b]/10 shadow-md" 
                            : "border-gray-200 group-hover:border-gray-300"
                        }`}
                      >
                        <CreditCard className={`w-8 h-8 mx-auto mb-3 ${
                          paymentMethod === "credit-card" ? "text-[#f2c14b]" : "text-gray-400"
                        }`} />
                        <p className="text-sm font-semibold text-center mb-1">Kartu Kredit/Debit</p>
                        <p className="text-xs text-gray-500 text-center">Visa, Mastercard, dll</p>
                        {paymentMethod === "credit-card" && (
                          <CheckCircle className="w-5 h-5 text-[#f2c14b] absolute top-2 right-2" />
                        )}
                      </div>
                    </label>

                    <label className="relative group cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="qris"
                        checked={paymentMethod === "qris"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`border-2 rounded-xl p-6 transition-all group-hover:shadow-md ${
                          paymentMethod === "qris" 
                            ? "border-[#f2c14b] bg-[#f2c14b]/10 shadow-md" 
                            : "border-gray-200 group-hover:border-gray-300"
                        }`}
                      >
                        <Smartphone className={`w-8 h-8 mx-auto mb-3 ${
                          paymentMethod === "qris" ? "text-[#f2c14b]" : "text-gray-400"
                        }`} />
                        <p className="text-sm font-semibold text-center mb-1">QRIS</p>
                        <p className="text-xs text-gray-500 text-center">Scan & Pay</p>
                        {paymentMethod === "qris" && (
                          <CheckCircle className="w-5 h-5 text-[#f2c14b] absolute top-2 right-2" />
                        )}
                      </div>
                    </label>

                    <label className="relative group cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank-transfer"
                        checked={paymentMethod === "bank-transfer"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`border-2 rounded-xl p-6 transition-all group-hover:shadow-md ${
                          paymentMethod === "bank-transfer" 
                            ? "border-[#f2c14b] bg-[#f2c14b]/10 shadow-md" 
                            : "border-gray-200 group-hover:border-gray-300"
                        }`}
                      >
                        <Building2 className={`w-8 h-8 mx-auto mb-3 ${
                          paymentMethod === "bank-transfer" ? "text-[#f2c14b]" : "text-gray-400"
                        }`} />
                        <p className="text-sm font-semibold text-center mb-1">Transfer Bank</p>
                        <p className="text-xs text-gray-500 text-center">Manual Transfer</p>
                        {paymentMethod === "bank-transfer" && (
                          <CheckCircle className="w-5 h-5 text-[#f2c14b] absolute top-2 right-2" />
                        )}
                      </div>
                    </label>
                  </div>

                  {paymentMethod === "midtrans" && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center text-sm text-blue-800">
                        <CreditCard className="w-4 h-4 mr-2" />
                        <span>Midtrans mendukung: Kartu Kredit/Debit, Bank Transfer, E-wallet (GoPay, OVO, DANA), QRIS, dan Minimarket</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-xl">
                    <Clock className="w-6 h-6 mr-2 text-yellow-600" />
                    Catatan Tambahan
                  </CardTitle>
                  <p className="text-sm text-gray-600">Informasi khusus untuk pesanan Anda (opsional)</p>
                </CardHeader>
                <CardContent className="p-6">
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Contoh: Saya membutuhkan akses kursi roda, atau permintaan khusus lainnya..."
                    rows={4}
                    className="focus:ring-[#f2c14b] focus:border-[#f2c14b]"
                  />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="/tickets"
                    className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali Belanja
                  </Link>
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="px-8 py-4 bg-[#f2c14b] hover:bg-[#e6b143] text-black font-semibold text-lg rounded-lg transition-all transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                        Memproses Pembayaran...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Lock className="w-5 h-5 mr-2" />
                        Bayar Sekarang {formatPrice(totalPrice)}
                      </div>
                    )}
                  </Button>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Dengan melakukan pembayaran, Anda menyetujui{" "}
                    <a href="#" className="text-[#f2c14b] hover:underline">syarat dan ketentuan</a> kami
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}