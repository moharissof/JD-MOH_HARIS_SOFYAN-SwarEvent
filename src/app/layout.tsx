import type React from "react"
import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/context/CartContext"

import { Suspense } from "react"
import "./globals.css"

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
})

export const metadata: Metadata = {
  title: "Tokoevent | Platform Tiketing Event Tanpa Biaya & Gratis Tiket Gelang",
  description: "Platform tiketing tanpa biaya di Indonesia. Kelola eventmu dengan mudah dan profitable.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`font-sans ${quicksand.variable} antialiased`}>
        
                <CartProvider><Suspense fallback={null}>{children}</Suspense></CartProvider>

        <Analytics />
      </body>
    </html>
  )
}
