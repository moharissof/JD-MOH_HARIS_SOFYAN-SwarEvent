"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, User, Building2, Mail, Phone, Lock, MapPin, FileText, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const { toast } = useToast()
  const [userType, setUserType] = useState<"user" | "partner">("user")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Form data untuk user biasa
  const [userFormData, setUserFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  // Form data untuk mitra
  const [partnerFormData, setPartnerFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyAddress: "",
    companyType: "",
    businessLicense: "",
    bankAccount: "",
    bankName: "",
    accountHolder: "",
    description: "",
  })

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePartnerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPartnerFormData({
      ...partnerFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = userType === "user" ? userFormData : partnerFormData

      // Basic validation
      if (!formData.fullName || !formData.email || !formData.password) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
          duration: 3000,
        })
        return
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match. Please try again.",
          variant: "destructive",
          duration: 3000,
        })
        return
      }

      if (formData.password.length < 6) {
        toast({
          title: "Weak Password",
          description: "Password must be at least 6 characters long",
          variant: "destructive",
          duration: 3000,
        })
        return
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          userType: userType,
          phone: formData.phone,
          // Organizer data (akan diabaikan jika userType === "user")
          ...(userType === "partner" && {
            companyName: partnerFormData.companyName,
            companyAddress: partnerFormData.companyAddress,
            companyType: partnerFormData.companyType,
            businessLicense: partnerFormData.businessLicense,
            bankAccount: partnerFormData.bankAccount,
            bankName: partnerFormData.bankName,
            accountHolder: partnerFormData.accountHolder,
            description: partnerFormData.description,
          })
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Registration successful
      console.log("Registration successful:", data)
      toast({
        title: "Registration Successful!",
        description: "Please check your email to verify your account.",
        duration: 5000,
      })

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "/login"
      }, 1500)
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=1000&fit=crop&crop=center&q=80"
          alt="Event Registration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Bergabung dengan SwarEvent</h2>
          <p className="text-lg opacity-90">
            {userType === "user"
              ? "Dapatkan akses ke ribuan event terbaik di Banyuwangi dan sekitarnya"
              : "Mulai menjual tiket event Anda dan jangkau lebih banyak audience"}
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <Link href="/" className="inline-block mb-6">
              <Image src="/images/Logo.png" alt="SwarEvent" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Daftar Akun Baru</h1>
            <p className="text-gray-600">Pilih jenis akun yang ingin Anda buat</p>
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setUserType("user")}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                userType === "user"
                  ? "border-[#f2c14b] bg-[#f2c14b]/10 text-black"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              <User className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium text-sm">Pembeli Tiket</p>
              <p className="text-xs opacity-75">User biasa</p>
            </button>
            <button
              type="button"
              onClick={() => setUserType("partner")}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                userType === "partner"
                  ? "border-[#f2c14b] bg-[#f2c14b]/10 text-black"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              <Building2 className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium text-sm">Mitra Penjual</p>
              <p className="text-xs opacity-75">Event Organizer</p>
            </button>
          </div>

          {/* Registration Form */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {userType === "user" ? (
                  // User Registration Form
                  <>
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                        Nama Lengkap *
                      </Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          value={userFormData.fullName}
                          onChange={handleUserInputChange}
                          placeholder="Masukkan nama lengkap"
                          className="pl-10 h-12 border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email *
                      </Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={userFormData.email}
                          onChange={handleUserInputChange}
                          placeholder="nama@email.com"
                          className="pl-10 h-12 border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Nomor HP *
                      </Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={userFormData.phone}
                          onChange={handleUserInputChange}
                          placeholder="+62 812 3456 7890"
                          className="pl-10 h-12 border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password *
                      </Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={userFormData.password}
                          onChange={handleUserInputChange}
                          placeholder="Masukkan password"
                          className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                        Konfirmasi Password *
                      </Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={userFormData.confirmPassword}
                          onChange={handleUserInputChange}
                          placeholder="Konfirmasi password"
                          className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  // Partner Registration Form
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {/* Personal Information */}
                    <div className="border-b pb-4">
                      <h3 className="font-medium text-gray-900 mb-3">Informasi Pribadi</h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="partnerFullName" className="text-sm font-medium text-gray-700">
                            Nama Lengkap *
                          </Label>
                          <div className="relative mt-1">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="partnerFullName"
                              name="fullName"
                              type="text"
                              required
                              value={partnerFormData.fullName}
                              onChange={handlePartnerInputChange}
                              placeholder="Masukkan nama lengkap"
                              className="pl-10 h-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="partnerEmail" className="text-sm font-medium text-gray-700">
                              Email *
                            </Label>
                            <div className="relative mt-1">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input
                                id="partnerEmail"
                                name="email"
                                type="email"
                                required
                                value={partnerFormData.email}
                                onChange={handlePartnerInputChange}
                                placeholder="nama@email.com"
                                className="pl-10 h-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="partnerPhone" className="text-sm font-medium text-gray-700">
                              Nomor HP *
                            </Label>
                            <div className="relative mt-1">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input
                                id="partnerPhone"
                                name="phone"
                                type="tel"
                                required
                                value={partnerFormData.phone}
                                onChange={handlePartnerInputChange}
                                placeholder="+62 812 3456 7890"
                                className="pl-10 h-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="partnerPassword" className="text-sm font-medium text-gray-700">
                              Password *
                            </Label>
                            <div className="relative mt-1">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input
                                id="partnerPassword"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={partnerFormData.password}
                                onChange={handlePartnerInputChange}
                                placeholder="Password"
                                className="pl-10 pr-10 h-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="partnerConfirmPassword" className="text-sm font-medium text-gray-700">
                              Konfirmasi Password *
                            </Label>
                            <div className="relative mt-1">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input
                                id="partnerConfirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={partnerFormData.confirmPassword}
                                onChange={handlePartnerInputChange}
                                placeholder="Konfirmasi password"
                                className="pl-10 pr-10 h-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showConfirmPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Company Information */}
                    <div className="border-b pb-4">
                      <h3 className="font-medium text-gray-900 mb-3">Informasi Perusahaan</h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                            Nama Perusahaan/Organisasi *
                          </Label>
                          <div className="relative mt-1">
                            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="companyName"
                              name="companyName"
                              type="text"
                              required
                              value={partnerFormData.companyName}
                              onChange={handlePartnerInputChange}
                              placeholder="PT. Event Organizer Indonesia"
                              className="pl-10 h-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="companyAddress" className="text-sm font-medium text-gray-700">
                            Alamat Perusahaan *
                          </Label>
                          <div className="relative mt-1">
                            <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            <Textarea
                              id="companyAddress"
                              name="companyAddress"
                              required
                              value={partnerFormData.companyAddress}
                              onChange={handlePartnerInputChange}
                              placeholder="Alamat lengkap perusahaan"
                              className="pl-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b] min-h-[60px]"
                              rows={2}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="companyType" className="text-sm font-medium text-gray-700">
                              Jenis Usaha *
                            </Label>
                            <Input
                              id="companyType"
                              name="companyType"
                              type="text"
                              required
                              value={partnerFormData.companyType}
                              onChange={handlePartnerInputChange}
                              placeholder="Event Organizer, Komunitas, dll"
                              className="h-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                            />
                          </div>

                          <div>
                            <Label htmlFor="businessLicense" className="text-sm font-medium text-gray-700">
                              Nomor Izin Usaha
                            </Label>
                            <div className="relative mt-1">
                              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input
                                id="businessLicense"
                                name="businessLicense"
                                type="text"
                                value={partnerFormData.businessLicense}
                                onChange={handlePartnerInputChange}
                                placeholder="NIB/SIUP (opsional)"
                                className="pl-10 h-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bank Information */}
                    <div className="border-b pb-4">
                      <h3 className="font-medium text-gray-900 mb-3">Informasi Bank</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="bankName" className="text-sm font-medium text-gray-700">
                              Nama Bank *
                            </Label>
                            <Input
                              id="bankName"
                              name="bankName"
                              type="text"
                              required
                              value={partnerFormData.bankName}
                              onChange={handlePartnerInputChange}
                              placeholder="Bank BCA, Bank Mandiri, dll"
                              className="h-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                            />
                          </div>

                          <div>
                            <Label htmlFor="bankAccount" className="text-sm font-medium text-gray-700">
                              Nomor Rekening *
                            </Label>
                            <div className="relative mt-1">
                              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input
                                id="bankAccount"
                                name="bankAccount"
                                type="text"
                                required
                                value={partnerFormData.bankAccount}
                                onChange={handlePartnerInputChange}
                                placeholder="1234567890"
                                className="pl-10 h-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="accountHolder" className="text-sm font-medium text-gray-700">
                            Nama Pemegang Rekening *
                          </Label>
                          <Input
                            id="accountHolder"
                            name="accountHolder"
                            type="text"
                            required
                            value={partnerFormData.accountHolder}
                            onChange={handlePartnerInputChange}
                            placeholder="Nama sesuai buku tabungan"
                            className="h-10 text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                        Deskripsi Singkat
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={partnerFormData.description}
                        onChange={handlePartnerInputChange}
                        placeholder="Ceritakan tentang perusahaan/organisasi Anda (opsional)"
                        className="text-sm border-gray-200 focus:border-[#f2c14b] focus:ring-[#f2c14b] min-h-[60px]"
                        rows={2}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#f2c14b] hover:bg-[#e6b143] text-black font-semibold text-base rounded-lg transition-colors duration-200"
                >
                  {isLoading 
                    ? "Creating Account..." 
                    : `Daftar sebagai ${userType === 'user' ? 'Pembeli' : 'Organizer'}`
                  }
                </Button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  Dengan mendaftar, Anda menyetujui{" "}
                  <Link href="/terms" className="text-[#f2c14b] hover:underline">
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link href="/privacy" className="text-[#f2c14b] hover:underline">
                    Kebijakan Privasi
                  </Link>{" "}
                  SwarEvent
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-medium text-[#f2c14b] hover:text-[#e6b143] transition-colors">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
