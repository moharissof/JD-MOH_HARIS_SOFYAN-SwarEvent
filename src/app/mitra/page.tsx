/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import {
  CheckCircle,
  Users,
  TrendingUp,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Handshake,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/home/Navigation"
import Image from "next/image"

const benefits = [
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: "Eksposur Brand",
    description: "Tingkatkan visibilitas brand Anda melalui event-event berkualitas tinggi dengan ribuan peserta.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Networking Luas",
    description: "Bangun koneksi dengan pelaku bisnis, komunitas, dan stakeholder terkemuka di Banyuwangi.",
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "Kredibilitas",
    description: "Tingkatkan reputasi perusahaan dengan berpartisipasi dalam event-event prestisius.",
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "Jangkauan Pasar",
    description: "Akses ke target market yang tepat dan perluas jangkauan bisnis Anda.",
  },
]

const requirements = [
  "Perusahaan atau organisasi yang terdaftar secara legal",
  "Memiliki visi yang sejalan dengan nilai-nilai SWAR Event",
  "Komitmen untuk mendukung event minimal 6 bulan",
  "Menyediakan kontribusi sesuai dengan paket kemitraan yang dipilih",
  "Bersedia mengikuti guidelines dan standar kualitas SWAR Event",
]

const partnershipPackages = [
  {
    name: "Silver Partner",
    price: "Rp 5.000.000",
    period: "per event",
    features: [
      "Logo di materi promosi",
      "Booth 3x3 meter",
      "2 tiket VIP",
      "Mention di media sosial",
      "Sertifikat kemitraan",
    ],
    popular: false,
  },
  {
    name: "Gold Partner",
    price: "Rp 10.000.000",
    period: "per event",
    features: [
      "Logo prominan di semua materi",
      "Booth 6x6 meter",
      "5 tiket VIP",
      "Speaking opportunity",
      "Press release bersama",
      "Dedicated social media post",
    ],
    popular: true,
  },
  {
    name: "Platinum Partner",
    price: "Rp 20.000.000",
    period: "per event",
    features: [
      "Title sponsor opportunity",
      "Booth premium 10x10 meter",
      "10 tiket VIP",
      "Keynote speaking slot",
      "Co-branding materials",
      "Exclusive networking session",
      "Media interview opportunity",
    ],
    popular: false,
  },
]

const applicationSteps = [
  {
    step: 1,
    title: "Pengajuan Aplikasi",
    description: "Isi formulir aplikasi kemitraan dengan lengkap dan kirimkan proposal kemitraan.",
  },
  {
    step: 2,
    title: "Review & Evaluasi",
    description: "Tim kami akan mengevaluasi aplikasi Anda dalam waktu 5-7 hari kerja.",
  },
  {
    step: 3,
    title: "Presentasi & Diskusi",
    description: "Sesi presentasi dan diskusi detail mengenai bentuk kemitraan yang diinginkan.",
  },
  {
    step: 4,
    title: "Penandatanganan MOU",
    description: "Finalisasi kesepakatan dan penandatanganan Memorandum of Understanding.",
  },
]

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    companyType: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Terima kasih! Aplikasi kemitraan Anda telah dikirim. Tim kami akan menghubungi Anda dalam 2-3 hari kerja.")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground hover:bg-primary/20">
              Partnership Program
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Bergabunglah Sebagai <span className="text-primary">Mitra SWAR Event</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Wujudkan kolaborasi strategis yang menguntungkan dan bangun koneksi bisnis yang kuat melalui event-event
              berkualitas tinggi di Banyuwangi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Daftar Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline">
                Download Proposal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mengapa Menjadi Mitra SWAR Event?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dapatkan berbagai keuntungan strategis yang akan membantu mengembangkan bisnis Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{benefit.icon}</div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Persyaratan Kemitraan</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Untuk memastikan kualitas dan keselarasan visi, berikut adalah persyaratan yang harus dipenuhi:
              </p>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/business-partnership-meeting.png"
                alt="Partnership Meeting"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Proses Aplikasi Kemitraan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ikuti langkah-langkah sederhana berikut untuk menjadi mitra SWAR Event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto">
                    {step.step}
                  </div>
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-y-0.5"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Siap Bermitra dengan Kami?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Isi formulir di samping atau hubungi kami langsung untuk memulai diskusi kemitraan.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground">partnership@swarevent.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Telepon</h4>
                    <p className="text-muted-foreground">+62 333 123 4567</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Alamat</h4>
                    <p className="text-muted-foreground">Jl. Raya Banyuwangi No. 123, Banyuwangi, Jawa Timur</p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Formulir Aplikasi Kemitraan</CardTitle>
                <CardDescription>
                  Isi data perusahaan Anda dengan lengkap untuk memulai proses kemitraan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
                      Nama Perusahaan *
                    </label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="PT. Contoh Perusahaan"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-foreground mb-2">
                      Nama Kontak Person *
                    </label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Nomor Telepon *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+62 812 3456 7890"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="companyType" className="block text-sm font-medium text-foreground mb-2">
                      Jenis Perusahaan *
                    </label>
                    <select
                      id="companyType"
                      name="companyType"
                      value={formData.companyType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                      required
                    >
                      <option value="">Pilih jenis perusahaan</option>
                      <option value="startup">Startup</option>
                      <option value="sme">UKM</option>
                      <option value="corporate">Korporasi</option>
                      <option value="government">Pemerintah</option>
                      <option value="ngo">NGO/Yayasan</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Pesan & Proposal Kemitraan
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Ceritakan tentang perusahaan Anda dan bentuk kemitraan yang diinginkan..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <Handshake className="w-5 h-5 mr-2" />
                    Kirim Aplikasi Kemitraan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
