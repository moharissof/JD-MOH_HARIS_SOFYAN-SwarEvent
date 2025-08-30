import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { v2 as cloudinary } from "cloudinary"
import { EventCategory } from "@prisma/client"

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: "794134348282357",
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    const events = await prisma.event.findMany({
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

    return NextResponse.json(events)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Gagal mengambil data event" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as EventCategory
    const isPaid = formData.get("isPaid") === "true"
    const price = formData.get("price") ? Number(formData.get("price")) : null
    const date = formData.get("date") as string
    const location = formData.get("location") as string
    const linkMeet = formData.get("linkMeet") as string
    const webinarData = formData.get("webinarData") as string
    const detailEvent = formData.get("detailEvent") as string
    const organizerId = formData.get("organizerId") as string
    const thumbnailFile = formData.get("thumbnail") as File

    // Validasi input
    if (!title || !category || !date || !organizerId) {
      return NextResponse.json({ error: "Title, category, date, dan organizer ID diperlukan" }, { status: 400 })
    }

    // Validasi kategori
    if (!["ONLINE", "OFFLINE"].includes(category)) {
      return NextResponse.json({ error: "Category harus ONLINE atau OFFLINE" }, { status: 400 })
    }

    let thumbnailUrl = null

    // Upload thumbnail ke Cloudinary jika ada
    if (thumbnailFile && thumbnailFile.size > 0) {
      try {
        const buffer = Buffer.from(await thumbnailFile.arrayBuffer())
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "swar-event/events",
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

    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        category,
        isPaid: isPaid ?? true,
        price: isPaid ? price : null,
        date: new Date(date),
        location: category === "OFFLINE" ? location : null,
        linkMeet: category === "ONLINE" ? linkMeet : null,
        webinarData: category === "ONLINE" ? webinarData : null,
        detailEvent: category === "OFFLINE" ? detailEvent : null,
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

    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Gagal menambahkan event" }, { status: 500 })
  }
}
