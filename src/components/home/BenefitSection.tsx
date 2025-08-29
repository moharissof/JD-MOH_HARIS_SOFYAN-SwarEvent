import Link from "next/link"

export default function BenefitsSection() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Partner Tiketing Lancar & Profitable</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Dengan services yang menjanjikan dari kami, eventmu akan berjalan lancar dan pastinya profitable.
          </p>
          <Link
            href="/partnership"
            className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#f2c14b] hover:bg-[#e6b143]"
          >
            Lihat Keuntungan
          </Link>
        </div>

      </div>
    </div>
  )
}
