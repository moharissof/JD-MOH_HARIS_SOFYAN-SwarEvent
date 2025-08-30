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

type Params = Promise<{ id: string }>

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params

    const event = await prisma.event.findUnique({
      where: { id },
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

    if (!event) {
      return NextResponse.json({ error: "Event tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Gagal mengambil data event" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params
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
    const thumbnailFile = formData.get("thumbnail") as File

    // Ambil data event lama untuk mendapatkan URL thumbnail lama
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    })

    if (!existingEvent) {
      return NextResponse.json({ error: "Event tidak ditemukan" }, { status: 404 })
    }

    let thumbnailUrl = existingEvent.thumbnail

    // Upload thumbnail baru ke Cloudinary jika ada file baru
    if (thumbnailFile && thumbnailFile.size > 0) {
      try {
        // Hapus thumbnail lama dari Cloudinary jika ada
        if (existingEvent.thumbnail) {
          const publicId = existingEvent.thumbnail.split('/').pop()?.split('.')[0]
          if (publicId) {
            await cloudinary.uploader.destroy(`swar-event/events/${publicId}`)
          }
        }

        // Upload thumbnail baru
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

    // Validasi kategori
    if (category && !["ONLINE", "OFFLINE"].includes(category)) {
      return NextResponse.json({ error: "Category harus ONLINE atau OFFLINE" }, { status: 400 })
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(isPaid !== null && { isPaid }),
        ...(price !== null && { price }),
        ...(date && { date: new Date(date) }),
        ...(category === "OFFLINE" && location && { location }),
        ...(category === "ONLINE" && linkMeet && { linkMeet }),
        ...(category === "ONLINE" && webinarData && { webinarData }),
        ...(category === "OFFLINE" && detailEvent && { detailEvent }),
        thumbnail: thumbnailUrl,
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

    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Gagal memperbarui event" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params

    // Ambil data event untuk mendapatkan URL thumbnail
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    })

    if (!existingEvent) {
      return NextResponse.json({ error: "Event tidak ditemukan" }, { status: 404 })
    }

    // Hapus thumbnail dari Cloudinary jika ada
    if (existingEvent.thumbnail) {
      try {
        const publicId = existingEvent.thumbnail.split('/').pop()?.split('.')[0]
        if (publicId) {
          await cloudinary.uploader.destroy(`swar-event/events/${publicId}`)
        }
      } catch (cloudinaryError) {
        console.error("Cloudinary delete error:", cloudinaryError)
        // Lanjutkan hapus dari database meskipun gagal hapus dari Cloudinary
      }
    }

    await prisma.event.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Event berhasil dihapus" }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Gagal menghapus event" }, { status: 500 })
  }
}
