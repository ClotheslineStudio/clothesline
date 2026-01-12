import dotenv from 'dotenv';
dotenv.config({ override: true });

import { PrismaClient } from '../src/lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import {
  requirementsBySource,
  tasksByRequirement,
  unplannedRequirements,
  requirementsMissingEvidence
} from '../src/lib/server/queries/reporting';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString })
});

async function main() {
  const workspaceId = 'ws_demo';
  const sourceId = 'src_demo_1';

  // 1) Requirements derived from source
  const reqs = await requirementsBySource(prisma, { workspaceId, sourceId });
  console.log('requirementsBySource:', reqs.map((r: { id: string }) => r.id));

  // 2) Tasks implementing a requirement
  // Pick one that is implemented in your seed: req_demo_2 is implemented by tsk_demo_1
  const reqId = 'req_demo_2';
  const tasks = await tasksByRequirement(prisma, { workspaceId, requirementId: reqId });
  console.log(`tasksByRequirement(${reqId}):`, tasks.map((t: { id: string }) => t.id));

  // 3) Unplanned requirements: requirements with no IMPLEMENTS edges
  const unplanned = await unplannedRequirements(prisma, { workspaceId });
  console.log('unplannedRequirements:', unplanned.map((r: { id: string }) => r.id));

  // 4) Missing evidence: requirements with no PROVIDES_EVIDENCE_FOR edges
  const missingEv = await requirementsMissingEvidence(prisma, { workspaceId });
  console.log('requirementsMissingEvidence:', missingEv.map((r: { id: string }) => r.id));

  // Quick expectations based on your seed:
  // - requirementsBySource should be 5
  // - tasksByRequirement(req_demo_2) should include tsk_demo_1
  // - unplanned should include req_demo_3? (No, req_demo_3 is implemented by tsk_demo_2)
  //   implemented: req_demo_2, req_demo_3, req_demo_1 (based on seed)
  //   so unplanned should include req_demo_4 and req_demo_5
  // - missing evidence: you provided evidence for req_demo_2 and req_demo_3
  //   so missing should include req_demo_1, req_demo_4, req_demo_5
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
