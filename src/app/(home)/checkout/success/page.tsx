"use client"

import { CheckCircle, Download, Mail, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Pembayaran Berhasil!</CardTitle>
            <p className="text-gray-600">Terima kasih atas pembelian tiket Anda</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Nomor Pesanan</h3>
              <p className="text-lg font-mono text-[#f2c14b]">#TKE-{Date.now().toString().slice(-8)}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>E-tiket telah dikirim ke email Anda</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Simpan tiket untuk masuk ke event</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-[#f2c14b] hover:bg-[#e6b143] text-black">
                <Download className="w-4 h-4 mr-2" />
                Download E-Tiket
              </Button>
              <Link href="/tickets" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Beli Tiket Lainnya
                </Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="ghost" className="w-full">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>Butuh bantuan? Hubungi customer service kami</p>
              <p className="font-medium">+62 8123 8169 667</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
