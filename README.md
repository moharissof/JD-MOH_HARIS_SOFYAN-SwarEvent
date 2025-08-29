# SwarEvent - Platform Tiket Event & Webinar

<div align="center">
  <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="SwarEvent Banner" width="800"/>
  
  <p align="center">
    Platform terpercaya untuk membeli tiket event, konser, workshop, dan webinar terbaik di Banyuwangi
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

SwarEvent adalah platform modern untuk jual beli tiket event yang terinspirasi dari TokoEvent. Platform ini dikhususkan untuk melayani event-event di Banyuwangi dan sekitarnya, menyediakan solusi lengkap untuk:

- **Pembeli**: Mencari dan membeli tiket event lokal Banyuwangi dengan mudah dan aman
- **Penyelenggara**: Menjual tiket event di Banyuwangi tanpa biaya dengan jangkauan lokal yang optimal
- **Event Organizer**: Mengelola event di wilayah Banyuwangi dengan sistem yang mudah dan profitable

### 🌟 Fokus Banyuwangi
- **Event Lokal**: Mendukung event budaya, wisata, dan komunitas Banyuwangi
- **Wisata Event**: Festival Ijen, Gandrung Sewu, dan event wisata lainnya
- **Komunitas Lokal**: Mendukung UMKM dan komunitas kreatif Banyuwangi
- **Budaya Daerah**: Melestarikan dan mempromosikan budaya Using dan Osing

## 🎭 Event Khas Banyuwangi

### Festival & Budaya
- **Festival Ijen** - Event wisata gunung berapi terkenal
- **Gandrung Sewu** - Festival tarian tradisional Gandrung
- **Festival Kuwung** - Perayaan budaya Using
- **Barong Ider Bumi** - Ritual tradisional keliling Banyuwangi

### Wisata & Alam
- **Ijen Crater Tour** - Tur kawah Ijen dan blue fire
- **Sukamade Turtle Tour** - Wisata penyu di pantai Sukamade
- **Baluran Safari** - Event wisata di Taman Nasional Baluran
- **Pulau Merah Surfing** - Kompetisi dan kelas surfing

### Kuliner & UMKM
- **Festival Rujak Soto** - Festival kuliner khas Banyuwangi
- **Pasar Rakyat** - Event promosi UMKM lokal
- **Coffee Festival** - Promosi kopi robusta Banyuwangi

## ✨ Fitur

### 🎫 Untuk Pembeli Tiket
- **Pencarian Event**: Temukan event di Banyuwangi berdasarkan kategori, lokasi, dan tanggal
- **Event Lokal**: Akses mudah ke event budaya, wisata, dan hiburan Banyuwangi
- **Pembayaran Aman**: Sistem pembayaran terintegrasi yang familiar untuk masyarakat lokal
- **Tiket Digital**: E-ticket yang dapat diunduh langsung setelah pembayaran
- **Info Wisata**: Terintegrasi dengan informasi wisata dan akomodasi Banyuwangi

### 🏢 Untuk Penyelenggara Event
- **Platform Tanpa Biaya**: Jual tiket event Banyuwangi tanpa biaya platform
- **Promosi Lokal**: Tools marketing yang efektif untuk audiens Banyuwangi
- **Manajemen Event**: Kelola event, tiket, dan peserta dengan mudah
- **Dukungan UMKM**: Mendukung pelaku usaha dan event organizer lokal

### 🌟 Fitur Unggulan
- **Fokus Banyuwangi**: Khusus melayani event-event di Banyuwangi dan sekitarnya
- **Multi-kategori**: Wisata, budaya, musik, teknologi, bisnis, edukasi, dan komunitas
- **Terintegrasi Wisata**: Koneksi dengan destinasi wisata Banyuwangi (Ijen, Pantai, dll)
- **Responsive Design**: Optimal di desktop, tablet, dan mobile
- **Dukungan Lokal**: Mendukung ekonomi kreatif dan UMKM Banyuwangi

## 🚀 Demo

Kunjungi demo live: [SwarEvent Demo](https://swar-event.vercel.app) *(Coming Soon)*

### Screenshots

<div align="center">
  <img src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&q=80" alt="Ijen Crater" width="300"/>
  <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80" alt="Event Banyuwangi" width="300"/>
  <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80" alt="Festival Budaya" width="300"/>
</div>

## 🛠️ Teknologi

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) dengan App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Images**: [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)

### Backend (Planning)
- **API**: Next.js API Routes
- **Database**: PostgreSQL / MongoDB
- **Authentication**: NextAuth.js
- **Payment**: Midtrans / Dana / OVO / GoPay (sesuai preferensi lokal)
- **File Storage**: Cloudinary / AWS S3
- **Maps**: Google Maps (untuk lokasi event di Banyuwangi)

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

### Phase 1 - MVP Banyuwangi (Current)
- [x] Landing page design
- [x] Event listing untuk Banyuwangi
- [x] Category filtering (wisata, budaya, musik, dll)
- [x] Responsive design
- [ ] Event detail page
- [ ] User registration untuk warga Banyuwangi

### Phase 2 - Core Features Lokal
- [ ] User authentication
- [ ] Event creation dashboard untuk organizer lokal
- [ ] Payment integration (support payment lokal)
- [ ] Ticket generation
- [ ] Email/WhatsApp notifications

### Phase 3 - Ekspansi Regional
- [ ] Event analytics untuk organizer Banyuwangi
- [ ] Review system
- [ ] Integrasi dengan Dinas Pariwisata Banyuwangi
- [ ] Mobile app
- [ ] Ekspansi ke kabupaten tetangga (Jember, Situbondo)

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
- Dinas Pariwisata Banyuwangi untuk dukungan promosi wisata
- Komunitas kreatif Banyuwangi untuk inspirasi fitur lokal

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:
- 📧 Email: support@swarevent.com
- � WhatsApp: +62-xxx-xxxx-xxxx (Customer Service Banyuwangi)
- �💬 Discussion: [GitHub Discussions](https://github.com/moharissof/JD-MOH_HARIS_SOFYAN-SwarEvent/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/moharissof/JD-MOH_HARIS_SOFYAN-SwarEvent/issues)
- 🏢 Kantor: Jl. [Alamat di Banyuwangi]

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk komunitas event Banyuwangi</p>
  <p>🌋 Dari Banyuwangi untuk Banyuwangi 🌋</p>
</div>
