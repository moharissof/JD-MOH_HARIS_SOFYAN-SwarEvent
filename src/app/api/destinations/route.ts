import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { v2 as cloudinary } from "cloudinary"

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: "794134348282357",
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      include: {
        tickets: true,
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(destinations)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Gagal mengambil data destinasi" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const openHours = formData.get("openHours") as string
    const organizerId = formData.get("organizerId") as string
    const thumbnailFile = formData.get("thumbnail") as File

    // Validasi input
    if (!name || !location || !organizerId) {
      return NextResponse.json({ error: "Name, location, dan organizer ID diperlukan" }, { status: 400 })
    }

    let thumbnailUrl = null

    // Upload thumbnail ke Cloudinary jika ada
    if (thumbnailFile && thumbnailFile.size > 0) {
      try {
        const buffer = Buffer.from(await thumbnailFile.arrayBuffer())
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "swar-event/destinations",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          ).end(buffer)
        })

        thumbnailUrl = (uploadResult as { secure_url: string }).secure_url
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError)
        return NextResponse.json({ error: "Gagal mengupload thumbnail" }, { status: 500 })
      }
    }

    const newDestination = await prisma.destination.create({
      data: {
        name,
        description,
        location,
        openHours,
        thumbnail: thumbnailUrl,
        organizerId,
      },
      include: {
        tickets: true,
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(newDestination, { status: 201 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Gagal menambahkan destinasi" }, { status: 500 })
  }
}
