/*
  Warnings:

  - Added the required column `organizerId` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Destination" ADD COLUMN     "organizerId" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "thumbnail" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Destination" ADD CONSTRAINT "Destination_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
