import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { v2 as cloudinary } from "cloudinary"

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

    const destination = await prisma.destination.findUnique({
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

    if (!destination) {
      return NextResponse.json({ error: "Destinasi tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json(destination)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Gagal mengambil data destinasi" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params
    const formData = await request.formData()

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const openHours = formData.get("openHours") as string
    const thumbnailFile = formData.get("thumbnail") as File

    // Ambil data destinasi lama untuk mendapatkan URL thumbnail lama
    const existingDestination = await prisma.destination.findUnique({
      where: { id },
    })

    if (!existingDestination) {
      return NextResponse.json({ error: "Destinasi tidak ditemukan" }, { status: 404 })
    }

    let thumbnailUrl = existingDestination.thumbnail

    // Upload thumbnail baru ke Cloudinary jika ada file baru
    if (thumbnailFile && thumbnailFile.size > 0) {
      try {
        // Hapus thumbnail lama dari Cloudinary jika ada
        if (existingDestination.thumbnail) {
          const publicId = existingDestination.thumbnail.split('/').pop()?.split('.')[0]
          if (publicId) {
            await cloudinary.uploader.destroy(`swar-event/destinations/${publicId}`)
          }
        }

        // Upload thumbnail baru
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

    const updatedDestination = await prisma.destination.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(location && { location }),
        ...(openHours && { openHours }),
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

    return NextResponse.json(updatedDestination)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Gagal memperbarui destinasi" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params

    // Ambil data destinasi untuk mendapatkan URL thumbnail
    const existingDestination = await prisma.destination.findUnique({
      where: { id },
    })

    if (!existingDestination) {
      return NextResponse.json({ error: "Destinasi tidak ditemukan" }, { status: 404 })
    }

    // Hapus thumbnail dari Cloudinary jika ada
    if (existingDestination.thumbnail) {
      try {
        const publicId = existingDestination.thumbnail.split('/').pop()?.split('.')[0]
        if (publicId) {
          await cloudinary.uploader.destroy(`swar-event/destinations/${publicId}`)
        }
      } catch (cloudinaryError) {
        console.error("Cloudinary delete error:", cloudinaryError)
        // Lanjutkan hapus dari database meskipun gagal hapus dari Cloudinary
      }
    }

    await prisma.destination.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Destinasi berhasil dihapus" }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Gagal menghapus destinasi" }, { status: 500 })
  }
}
