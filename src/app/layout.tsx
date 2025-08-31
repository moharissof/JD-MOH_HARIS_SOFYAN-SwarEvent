import type React from "react";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

import { Suspense } from "react";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title:
    "SwarEvent | Platform Tiketing Event Khusus Banyuwangi & Gratis Tiket Gelang",
  description:
    "Platform tiketing khusus Banyuwangi. Kelola eventmu dengan mudah dan profitable di kota Banyuwangi.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`font-sans ${quicksand.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </CartProvider>
        </AuthProvider>

        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}