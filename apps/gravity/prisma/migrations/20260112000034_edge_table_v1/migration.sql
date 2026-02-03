-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('SOURCE', 'REQUIREMENT', 'TASK', 'PROJECT', 'PAGE', 'EVIDENCE');

-- CreateEnum
CREATE TYPE "EdgeType" AS ENUM ('DERIVED_FROM', 'IMPLEMENTS', 'DOCUMENTS', 'EVIDENCE_FOR', 'PART_OF', 'RELATED_TO');

-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "type" "EdgeType" NOT NULL,
    "fromType" "EntityType" NOT NULL,
    "fromId" TEXT NOT NULL,
    "toType" "EntityType" NOT NULL,
    "toId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Edge_workspaceId_type_idx" ON "Edge"("workspaceId", "type");

-- CreateIndex
CREATE INDEX "Edge_workspaceId_fromType_fromId_idx" ON "Edge"("workspaceId", "fromType", "fromId");

-- CreateIndex
CREATE INDEX "Edge_workspaceId_toType_toId_idx" ON "Edge"("workspaceId", "toType", "toId");

-- CreateIndex
CREATE UNIQUE INDEX "Edge_workspaceId_type_fromType_fromId_toType_toId_key" ON "Edge"("workspaceId", "type", "fromType", "fromId", "toType", "toId");

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
