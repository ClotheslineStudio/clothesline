/*
  Warnings:

  - You are about to drop the column `filePath` on the `Source` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Source" DROP COLUMN "filePath",
ADD COLUMN     "fileMimeType" TEXT,
ADD COLUMN     "fileOriginalName" TEXT,
ADD COLUMN     "fileSizeBytes" INTEGER,
ADD COLUMN     "fileStorageKey" TEXT;
