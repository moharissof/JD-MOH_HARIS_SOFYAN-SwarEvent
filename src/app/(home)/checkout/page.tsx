"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, Building2, MapPin, Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      router.push("/checkout/success")
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Kosong</h1>
          <p className="text-gray-600 mb-6">Tidak ada tiket di keranjang Anda</p>
          <Link
            href="/tickets"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-[#f2c14b] hover:bg-[#e6b143]"
          >
            Lihat Semua Tiket
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Lengkapi informasi untuk menyelesaikan pembelian</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-2">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] leading-tight">{item.title}</h4>
                      <p className="text-sm text-gray-500 font-medium">{item.category}</p>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="line-clamp-1">{item.location}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <span className="text-sm text-gray-600 font-medium">Qty: {item.quantity}</span>
                        <span className="text-sm font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({totalItems} tiket)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Biaya Admin</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pajak</span>
                    <span>Sudah termasuk</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Informasi Kontak
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+62 812 3456 7890"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="fullName">Nama Lengkap *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Nama lengkap sesuai KTP"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Alamat Penagihan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Alamat *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Alamat lengkap"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Kota *</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Jakarta"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Kode Pos *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Metode Pembayaran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={paymentMethod === "credit-card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === "credit-card" ? "border-[#f2c14b] bg-[#f2c14b]/10" : "border-gray-200"
                        }`}
                      >
                        <CreditCard className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-medium text-center">Kartu Kredit/Debit</p>
                      </div>
                    </label>

                    <label className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="qris"
                        checked={paymentMethod === "qris"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === "qris" ? "border-[#f2c14b] bg-[#f2c14b]/10" : "border-gray-200"
                        }`}
                      >
                        <Smartphone className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-medium text-center">QRIS</p>
                      </div>
                    </label>

                    <label className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank-transfer"
                        checked={paymentMethod === "bank-transfer"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === "bank-transfer" ? "border-[#f2c14b] bg-[#f2c14b]/10" : "border-gray-200"
                        }`}
                      >
                        <Building2 className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-medium text-center">Transfer Bank</p>
                      </div>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Catatan Tambahan</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Catatan khusus untuk pesanan (opsional)"
                    rows={3}
                  />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Link
                  href="/tickets"
                  className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Kembali Belanja
                </Link>
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3 bg-[#f2c14b] hover:bg-[#e6b143] text-black font-medium"
                >
                  {isProcessing ? "Memproses..." : `Bayar ${formatPrice(totalPrice)}`}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
