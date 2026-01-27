-- AlterTable
ALTER TABLE "Requirement" ADD COLUMN     "archivedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Requirement_archivedAt_idx" ON "Requirement"("archivedAt");
