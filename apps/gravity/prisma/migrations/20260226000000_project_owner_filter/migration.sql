-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN "ownerId" TEXT;

-- CreateIndex
CREATE INDEX "Project_workspaceId_ownerId_idx" ON "public"."Project"("workspaceId", "ownerId");

-- CreateIndex
CREATE INDEX "Project_workspaceId_dueDate_idx" ON "public"."Project"("workspaceId", "dueDate");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
