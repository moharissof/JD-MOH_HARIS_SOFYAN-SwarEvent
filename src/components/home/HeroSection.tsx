"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Beli Tiket Online",
      subtitle:
        "Beli tiket online lebih mudah, ga perlu khawatir kehabisan tiket atau repot datang ke tempat penjualan fisik.",
      backgroundImage: "https://plus.unsplash.com/premium_photo-1661315459644-18297c559777?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGV2ZW50fGVufDB8fDB8fHww",
      buttonText: "Cari event populer",
    },
    {
      title: "Platform Jual Tiket Tanpa Biaya",
      subtitle: "Platform tiketing tanpa biaya di Indonesia. Kelola eventmu dengan mudah dan profitable.",
      backgroundImage: "https://plus.unsplash.com/premium_photo-1661315459644-18297c559777?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGV2ZW50fGVufDB8fDB8fHww",
      buttonText: "Jual Tiket Sekarang",
    },
    {
      title: "Jangkauan Nasional",
      subtitle: "Jual tiket ke seluruh Indonesia dengan sistem pembayaran yang aman dan terpercaya.",
      backgroundImage: "https://plus.unsplash.com/premium_photo-1661315459644-18297c559777?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGV2ZW50fGVufDB8fDB8fHww",
      buttonText: "Mulai Sekarang",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[400px] overflow-hidden bg-gray-900 rounded-2xl shadow-lg">
          {/* Background Images */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl"
                style={{
                  backgroundImage: `url('${slide.backgroundImage}')`,
                }}
              />
              <div className="absolute inset-0 bg-opacity-50 rounded-2xl" />
            </div>
          ))}

          {/* Content */}
          <div className="relative z-10 flex items-center h-full">
            <div className="max-w-2xl mx-auto px-8 text-left text-white">
              <h1 className="text-3xl font-bold font-quicksand tracking-tight sm:text-4xl lg:text-5xl mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg sm:text-xl mb-8 font-quicksand leading-relaxed">{slides[currentSlide].subtitle}</p>
              <div className="flex justify-start">
                <Link
                  href="/events"
                  className="inline-flex items-center px-6 py-3 text-base font-semibold font-quicksand rounded-lg shadow-lg text-black bg-[#f2c14b] hover:bg-[#e6b143] transition-colors duration-200"
                >
                  {slides[currentSlide].buttonText}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? "bg-[#f2c14b]" : "bg-white bg-opacity-50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition-all duration-200"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition-all duration-200"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}