-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EdgeType" ADD VALUE 'PROVIDES_EVIDENCE_FOR';
ALTER TYPE "EdgeType" ADD VALUE 'ATTACHED_TO';
ALTER TYPE "EdgeType" ADD VALUE 'DEPENDS_ON';
ALTER TYPE "EdgeType" ADD VALUE 'CITES';
