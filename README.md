# SwarEvent - Platform Tiket Event & Webinar

<div align="center">
  <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="SwarEvent Banner" width="800"/>
  
  <p align="center">
    Platform terpercaya untuk membeli tiket event, konser, workshop, dan webinar terbaik di Indonesia
  </p>

  <p align="center">
    <a href="#demo">Demo</a> •
    <a href="#fitur">Fitur</a> •
    <a href="#instalasi">Instalasi</a> •
    <a href="#teknologi">Teknologi</a> •
    <a href="#kontribusi">Kontribusi</a>
  </p>
</div>

## 📋 Deskripsi

SwarEvent adalah platform modern untuk jual beli tiket event yang terinspirasi dari TokoEvent. Platform ini menyediakan solusi lengkap untuk:

- **Pembeli**: Mencari dan membeli tiket event dengan mudah dan aman
- **Penyelenggara**: Menjual tiket tanpa biaya dengan jangkauan nasional
- **Event Organizer**: Mengelola event dengan sistem yang mudah dan profitable

## ✨ Fitur

### 🎫 Untuk Pembeli Tiket
- **Pencarian Event**: Temukan event berdasarkan kategori, lokasi, dan tanggal
- **Pembayaran Aman**: Sistem pembayaran terintegrasi dengan multiple payment gateway
- **Tiket Digital**: E-ticket yang dapat diunduh langsung setelah pembayaran
- **Notifikasi Real-time**: Update status event dan reminder

### 🏢 Untuk Penyelenggara Event
- **Platform Tanpa Biaya**: Jual tiket tanpa biaya platform
- **Dashboard Analytics**: Laporan penjualan dan analisis pengunjung
- **Manajemen Event**: Kelola event, tiket, dan peserta dengan mudah
- **Marketing Tools**: Tools promosi dan marketing terintegrasi

### 🌟 Fitur Unggulan
- **Jangkauan Nasional**: Jual tiket ke seluruh Indonesia
- **Multi-kategori**: Musik, teknologi, bisnis, edukasi, gaming, dan lainnya
- **Responsive Design**: Optimal di desktop, tablet, dan mobile
- **SEO Optimized**: Mudah ditemukan di mesin pencari

## 🚀 Demo

Kunjungi demo live: [SwarEvent Demo](https://swar-event.vercel.app) *(Coming Soon)*

### Screenshots

<div align="center">
  <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" alt="Homepage" width="300"/>
  <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80" alt="Event List" width="300"/>
  <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80" alt="Event Detail" width="300"/>
</div>

## 🛠️ Teknologi

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) dengan App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Images**: [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)

### Backend (Planning)
- **API**: Next.js API Routes
- **Database**: PostgreSQL / MongoDB
- **Authentication**: NextAuth.js
- **Payment**: Midtrans / Xendit
- **File Storage**: Cloudinary / AWS S3

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Version Control**: Git

## 📦 Instalasi

### Prerequisites
- Node.js (v18 atau lebih baru)
- npm atau yarn
- Git

### Langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/moharissof/JD-MOH_HARIS_SOFYAN-SwarEvent.git
   cd JD-MOH_HARIS_SOFYAN-SwarEvent
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` dengan konfigurasi yang sesuai:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Jalankan Development Server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

5. **Buka Browser**
   Kunjungi [http://localhost:3000](http://localhost:3000)

### Build untuk Production

```bash
npm run build
npm start
```

## 📁 Struktur Proyek

```
swar-event/
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventCategory.tsx
│   │   │   ├── BenefitSection.tsx
│   │   │   └── Navigation.tsx
│   │   └── ui/
│   │       └── [shadcn components]
│   ├── hooks/
│   ├── lib/
│   └── styles/
├── components.json
├── next.config.ts
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Kustomisasi

### Tema Warna
Proyek ini menggunakan skema warna biru toska (teal) sebagai warna primary. Untuk mengubah tema:

```css
/* src/app/globals.css */
:root {
  --primary: oklch(0.57 0.125 180); /* Teal */
  --secondary: oklch(0.7 0.15 85); /* Amber */
}
```

### Menambah Komponen UI
```bash
npx shadcn-ui@latest add [component-name]
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository di [Vercel](https://vercel.com)
3. Deploy otomatis setiap push ke main branch

### Manual Deployment
```bash
npm run build
npm run export
```

## 📋 Roadmap

### Phase 1 - MVP (Current)
- [x] Landing page design
- [x] Event listing
- [x] Category filtering
- [x] Responsive design
- [ ] Event detail page
- [ ] User registration

### Phase 2 - Core Features
- [ ] User authentication
- [ ] Event creation dashboard
- [ ] Payment integration
- [ ] Ticket generation
- [ ] Email notifications

### Phase 3 - Advanced Features
- [ ] Event analytics
- [ ] Review system
- [ ] Social sharing
- [ ] Mobile app
- [ ] API for third-party integration

## 🤝 Kontribusi

Kontribusi selalu welcome! Berikut cara berkontribusi:

1. **Fork** repository ini
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

### Development Guidelines
- Gunakan TypeScript untuk type safety
- Follow Tailwind CSS conventions
- Pastikan responsive design
- Tulis kode yang clean dan terdokumentasi
- Test di berbagai browser

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Mohammad Haris Sofyan**
- GitHub: [@moharissof](https://github.com/moharissof)
- Email: [your-email@example.com]

## 🙏 Acknowledgments

- [TokoEvent](https://tokoevent.com) untuk inspirasi design
- [Shadcn/UI](https://ui.shadcn.com/) untuk komponen UI
- [Unsplash](https://unsplash.com) untuk gambar berkualitas tinggi
- [Lucide](https://lucide.dev/) untuk icon set

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:
- 📧 Email: support@swarevent.com
- 💬 Discussion: [GitHub Discussions](https://github.com/moharissof/JD-MOH_HARIS_SOFYAN-SwarEvent/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/moharissof/JD-MOH_HARIS_SOFYAN-SwarEvent/issues)

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk komunitas event Indonesia</p>
</div>
