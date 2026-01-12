import dotenv from 'dotenv';
dotenv.config({ override: true });

import { PrismaClient } from '../src/lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { createEdge } from '../src/lib/server/edges/createEdge';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString })
});

async function main() {
  // ---------------------------------------------------------------------------
  // 0) Workspace + user + membership (repeatable)
  // ---------------------------------------------------------------------------
  const workspace = await prisma.workspace.upsert({
    where: { id: 'ws_demo' },
    update: { name: 'Demo Workspace' },
    create: { id: 'ws_demo', name: 'Demo Workspace' }
  });

  const user = await prisma.user.upsert({
    where: { email: 'demo@gravity.local' },
    update: { name: 'Demo User' },
    create: { email: 'demo@gravity.local', name: 'Demo User' }
  });

  await prisma.membership.upsert({
    where: { id: 'm_demo' },
    update: { workspaceId: workspace.id, userId: user.id, role: 'OWNER' },
    create: { id: 'm_demo', workspaceId: workspace.id, userId: user.id, role: 'OWNER' }
  });

  // ---------------------------------------------------------------------------
  // 1) Source (1)
  // ---------------------------------------------------------------------------
  const source = await prisma.source.upsert({
    where: { id: 'src_demo_1' },
    update: {
      workspaceId: workspace.id,
      title: 'IDEA Part B: Annual Compliance Requirements (Demo)',
      type: 'URL',
      url: 'https://example.com/idea-part-b',
      notes: 'Demo source used for seed data.'
    },
    create: {
      id: 'src_demo_1',
      workspaceId: workspace.id,
      title: 'IDEA Part B: Annual Compliance Requirements (Demo)',
      type: 'URL',
      url: 'https://example.com/idea-part-b',
      notes: 'Demo source used for seed data.'
    }
  });

  // ---------------------------------------------------------------------------
  // 2) Requirements (5)
  // ---------------------------------------------------------------------------
  const requirementsData = [
    {
      id: 'req_demo_1',
      title: 'Publish annual IDEA Part B performance report',
      status: 'ACTIVE',
      priority: 'HIGH'
    },
    {
      id: 'req_demo_2',
      title: 'Collect district submissions for compliance indicators',
      status: 'ACTIVE',
      priority: 'MEDIUM'
    },
    {
      id: 'req_demo_3',
      title: 'Validate data quality for indicator calculations',
      status: 'ACTIVE',
      priority: 'HIGH'
    },
    {
      id: 'req_demo_4',
      title: 'Document methodology and evidence for indicators',
      status: 'DRAFT',
      priority: 'MEDIUM'
    },
    {
      id: 'req_demo_5',
      title: 'Archive evidence and approvals for audit readiness',
      status: 'DRAFT',
      priority: 'LOW'
    }
  ] as const;

  const requirements = [];
  for (const r of requirementsData) {
    const req = await prisma.requirement.upsert({
      where: { id: r.id },
      update: {
        workspaceId: workspace.id,
        title: r.title,
        status: r.status,
        priority: r.priority,
        ownerId: user.id
      },
      create: {
        id: r.id,
        workspaceId: workspace.id,
        title: r.title,
        status: r.status,
        priority: r.priority,
        ownerId: user.id
      }
    });
    requirements.push(req);
  }

  // ---------------------------------------------------------------------------
  // 3) Project (1) + Tasks (3)
  // ---------------------------------------------------------------------------
  const project = await prisma.project.upsert({
    where: { id: 'prj_demo_1' },
    update: {
      workspaceId: workspace.id,
      title: 'FY2026 IDEA Part B Reporting (Demo)',
      description: 'Demo project containing tasks that implement key requirements.'
    },
    create: {
      id: 'prj_demo_1',
      workspaceId: workspace.id,
      title: 'FY2026 IDEA Part B Reporting (Demo)',
      description: 'Demo project containing tasks that implement key requirements.'
    }
  });

  const tasksData = [
    { id: 'tsk_demo_1', title: 'Create data submission checklist', status: 'IN_PROGRESS' },
    { id: 'tsk_demo_2', title: 'Run validation rules + resolve errors', status: 'TODO' },
    { id: 'tsk_demo_3', title: 'Draft performance report narrative', status: 'TODO' }
  ] as const;

  const tasks = [];
  for (const t of tasksData) {
    const task = await prisma.task.upsert({
      where: { id: t.id },
      update: {
        workspaceId: workspace.id,
        title: t.title,
        status: t.status,
        assigneeId: user.id,
        projectId: project.id
      },
      create: {
        id: t.id,
        workspaceId: workspace.id,
        title: t.title,
        status: t.status,
        assigneeId: user.id,
        projectId: project.id
      }
    });
    tasks.push(task);
  }

  // ---------------------------------------------------------------------------
  // 4) Pages (2)
  // ---------------------------------------------------------------------------
  const page1 = await prisma.page.upsert({
    where: { id: 'pg_demo_1' },
    update: {
      workspaceId: workspace.id,
      title: 'IDEA Part B Requirement Notes (Demo)',
      body: '# Demo Notes\n\nThis page documents how we interpret the requirement.'
    },
    create: {
      id: 'pg_demo_1',
      workspaceId: workspace.id,
      title: 'IDEA Part B Requirement Notes (Demo)',
      body: '# Demo Notes\n\nThis page documents how we interpret the requirement.'
    }
  });

  const page2 = await prisma.page.upsert({
    where: { id: 'pg_demo_2' },
    update: {
      workspaceId: workspace.id,
      title: 'Reporting Methodology (Demo)',
      body: '# Methodology\n\nSteps, calculations, and references for the report.'
    },
    create: {
      id: 'pg_demo_2',
      workspaceId: workspace.id,
      title: 'Reporting Methodology (Demo)',
      body: '# Methodology\n\nSteps, calculations, and references for the report.'
    }
  });

  // ---------------------------------------------------------------------------
  // 5) Evidence (1–2)
  // ---------------------------------------------------------------------------
  const evidence1 = await prisma.evidence.upsert({
    where: { id: 'ev_demo_1' },
    update: {
      workspaceId: workspace.id,
      title: 'District Submissions Archive (Demo)',
      type: 'LINK',
      url: 'https://example.com/submissions-archive',
      notes: 'Demo evidence item.'
    },
    create: {
      id: 'ev_demo_1',
      workspaceId: workspace.id,
      title: 'District Submissions Archive (Demo)',
      type: 'LINK',
      url: 'https://example.com/submissions-archive',
      notes: 'Demo evidence item.'
    }
  });

  const evidence2 = await prisma.evidence.upsert({
    where: { id: 'ev_demo_2' },
    update: {
      workspaceId: workspace.id,
      title: 'Validation Output Log (Demo)',
      type: 'LINK',
      url: 'https://example.com/validation-log',
      notes: 'Demo evidence item.'
    },
    create: {
      id: 'ev_demo_2',
      workspaceId: workspace.id,
      title: 'Validation Output Log (Demo)',
      type: 'LINK',
      url: 'https://example.com/validation-log',
      notes: 'Demo evidence item.'
    }
  });

  // ---------------------------------------------------------------------------
  // 6) Tags (3–6) + TagAssignments
  // ---------------------------------------------------------------------------
  const tagsData = [
    { name: 'IDEA', color: '#2563eb' },
    { name: 'FY2026', color: '#16a34a' },
    { name: 'Monitoring', color: '#f59e0b' },
    { name: 'Audit', color: '#ef4444' }
  ] as const;

  const tags = [];
  for (const t of tagsData) {
    const tag = await prisma.tag.upsert({
      where: { workspaceId_name: { workspaceId: workspace.id, name: t.name } },
      update: { color: t.color },
      create: { workspaceId: workspace.id, name: t.name, color: t.color }
    });
    tags.push(tag);
  }

  // Assign a few tags to entities (repeatable via skipDuplicates)
  await prisma.tagAssignment.createMany({
    data: [
      // Source
      { workspaceId: workspace.id, tagId: tags[0].id, entityType: 'SOURCE', entityId: source.id }, // IDEA
      { workspaceId: workspace.id, tagId: tags[1].id, entityType: 'SOURCE', entityId: source.id }, // FY2026

      // Requirement
      { workspaceId: workspace.id, tagId: tags[2].id, entityType: 'REQUIREMENT', entityId: requirements[0].id }, // Monitoring
      { workspaceId: workspace.id, tagId: tags[3].id, entityType: 'REQUIREMENT', entityId: requirements[4].id }, // Audit

      // Task
      { workspaceId: workspace.id, tagId: tags[1].id, entityType: 'TASK', entityId: tasks[0].id } // FY2026
    ],
    skipDuplicates: true
  });

  // ---------------------------------------------------------------------------
  // 7) Edges (use Edge table + validator-backed createEdge)
  // ---------------------------------------------------------------------------
  // Requirement → Source (DERIVED_FROM): link all requirements to the same source
  for (const req of requirements) {
    await createEdge(prisma, {
      workspaceId: workspace.id,
      type: 'DERIVED_FROM',
      fromType: 'REQUIREMENT',
      fromId: req.id,
      toType: 'SOURCE',
      toId: source.id
    });
  }

  // Task → Requirement (IMPLEMENTS): map 3 tasks to 3 requirements
  await createEdge(prisma, {
    workspaceId: workspace.id,
    type: 'IMPLEMENTS',
    fromType: 'TASK',
    fromId: tasks[0].id,
    toType: 'REQUIREMENT',
    toId: requirements[1].id
  });

  await createEdge(prisma, {
    workspaceId: workspace.id,
    type: 'IMPLEMENTS',
    fromType: 'TASK',
    fromId: tasks[1].id,
    toType: 'REQUIREMENT',
    toId: requirements[2].id
  });

  await createEdge(prisma, {
    workspaceId: workspace.id,
    type: 'IMPLEMENTS',
    fromType: 'TASK',
    fromId: tasks[2].id,
    toType: 'REQUIREMENT',
    toId: requirements[0].id
  });

  // Page → Requirement (DOCUMENTS): 2 pages document 2 requirements
  await createEdge(prisma, {
    workspaceId: workspace.id,
    type: 'DOCUMENTS',
    fromType: 'PAGE',
    fromId: page1.id,
    toType: 'REQUIREMENT',
    toId: requirements[0].id
  });

  await createEdge(prisma, {
    workspaceId: workspace.id,
    type: 'DOCUMENTS',
    fromType: 'PAGE',
    fromId: page2.id,
    toType: 'REQUIREMENT',
    toId: requirements[3].id
  });

  // Evidence → Requirement (PROVIDES_EVIDENCE_FOR)
  await createEdge(prisma, {
    workspaceId: workspace.id,
    type: 'PROVIDES_EVIDENCE_FOR',
    fromType: 'EVIDENCE',
    fromId: evidence1.id,
    toType: 'REQUIREMENT',
    toId: requirements[1].id
  });

  await createEdge(prisma, {
    workspaceId: workspace.id,
    type: 'PROVIDES_EVIDENCE_FOR',
    fromType: 'EVIDENCE',
    fromId: evidence2.id,
    toType: 'REQUIREMENT',
    toId: requirements[2].id
  });

  // Task → Project (PART_OF): link all tasks into the project
  for (const task of tasks) {
    await createEdge(prisma, {
      workspaceId: workspace.id,
      type: 'PART_OF',
      fromType: 'TASK',
      fromId: task.id,
      toType: 'PROJECT',
      toId: project.id
    });
  }

  // ---------------------------------------------------------------------------
  // 8) Quick verify queries (counts + a couple lookups)
  // ---------------------------------------------------------------------------
  const [
    sourceCount,
    reqCount,
    taskCount,
    projCount,
    pageCount,
    evidenceCount,
    tagCount,
    tagAssignCount,
    edgeCount
  ] = await Promise.all([
    prisma.source.count({ where: { workspaceId: workspace.id } }),
    prisma.requirement.count({ where: { workspaceId: workspace.id } }),
    prisma.task.count({ where: { workspaceId: workspace.id } }),
    prisma.project.count({ where: { workspaceId: workspace.id } }),
    prisma.page.count({ where: { workspaceId: workspace.id } }),
    prisma.evidence.count({ where: { workspaceId: workspace.id } }),
    prisma.tag.count({ where: { workspaceId: workspace.id } }),
    prisma.tagAssignment.count({ where: { workspaceId: workspace.id } }),
    prisma.edge.count({ where: { workspaceId: workspace.id } })
  ]);

  // Example lookup: requirements derived from the source
  const derivedReqEdges = await prisma.edge.findMany({
    where: {
      workspaceId: workspace.id,
      type: 'DERIVED_FROM',
      toType: 'SOURCE',
      toId: source.id
    }
  });

  console.log('Demo seed OK', {
    workspaceId: workspace.id,
    counts: {
      sources: sourceCount,
      requirements: reqCount,
      tasks: taskCount,
      projects: projCount,
      pages: pageCount,
      evidence: evidenceCount,
      tags: tagCount,
      tagAssignments: tagAssignCount,
      edges: edgeCount
    },
    derivedRequirementsFromSource: derivedReqEdges.length
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


