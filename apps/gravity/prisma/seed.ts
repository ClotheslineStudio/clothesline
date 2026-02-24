import dotenv from 'dotenv';
dotenv.config({ override: true });

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/lib/generated/prisma/client';
import { createEdge } from '../src/lib/server/edges/createEdge';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const prisma = new PrismaClient({
	adapter: new PrismaPg({ connectionString })
});

async function main() {
	await prisma.workspace.deleteMany({ where: { id: 'ws_demo' } });

	const workspace = await prisma.workspace.create({
		data: { id: 'ws_demo', name: 'Demo Workspace' }
	});

	const user = await prisma.user.upsert({
		where: { email: 'demo@gravity.local' },
		update: { name: 'Demo User' },
		create: { email: 'demo@gravity.local', name: 'Demo User' }
	});

	await prisma.membership.create({
		data: { id: 'm_demo', workspaceId: workspace.id, userId: user.id, role: 'OWNER' }
	});

	const sourcesData = [
		{
			id: 'src_demo_1',
			title: 'IDEA Part B Annual Performance Report Guidance',
			type: 'URL' as const,
			url: 'https://example.com/idea-part-b-guidance',
			notes: 'Federal guidance for annual reporting requirements.'
		},
		{
			id: 'src_demo_2',
			title: 'State Monitoring Rubric 2026',
			type: 'URL' as const,
			url: 'https://example.com/state-monitoring-rubric-2026',
			notes: 'State rubric used in monitoring and corrective action planning.'
		},
		{
			id: 'src_demo_3',
			title: 'District Submission Calendar',
			type: 'URL' as const,
			url: 'https://example.com/district-submission-calendar',
			notes: 'Submission dates and required milestones.'
		}
	];

	const sources = [];
	for (const source of sourcesData) {
		sources.push(
			await prisma.source.create({
				data: {
					...source,
					workspaceId: workspace.id
				}
			})
		);
	}

	const requirementsData = [
		{
			id: 'req_demo_1',
			title: 'Publish annual IDEA Part B performance report',
			status: 'ACTIVE' as const,
			priority: 'CRITICAL' as const,
			dueDate: new Date('2026-09-30T12:00:00.000Z')
		},
		{
			id: 'req_demo_2',
			title: 'Collect district submissions for compliance indicators',
			status: 'ACTIVE' as const,
			priority: 'HIGH' as const,
			dueDate: new Date('2026-05-15T12:00:00.000Z')
		},
		{
			id: 'req_demo_3',
			title: 'Validate data quality for indicator calculations',
			status: 'BLOCKED' as const,
			priority: 'HIGH' as const,
			dueDate: new Date('2026-06-01T12:00:00.000Z')
		},
		{
			id: 'req_demo_4',
			title: 'Document methodology and evidence for indicators',
			status: 'DRAFT' as const,
			priority: 'MEDIUM' as const,
			dueDate: null
		},
		{
			id: 'req_demo_5',
			title: 'Archive evidence and approvals for audit readiness',
			status: 'DRAFT' as const,
			priority: 'LOW' as const,
			dueDate: null
		},
		{
			id: 'req_demo_6',
			title: 'Publish stakeholder-facing summary dashboard',
			status: 'DONE' as const,
			priority: 'MEDIUM' as const,
			dueDate: new Date('2026-02-15T12:00:00.000Z')
		},
		{
			id: 'req_demo_7',
			title: 'Run corrective action readiness review',
			status: 'ACTIVE' as const,
			priority: 'CRITICAL' as const,
			dueDate: new Date('2026-07-10T12:00:00.000Z')
		},
		{
			id: 'req_demo_8',
			title: 'Finalize district technical assistance packet',
			status: 'DONE' as const,
			priority: 'LOW' as const,
			dueDate: new Date('2026-01-20T12:00:00.000Z')
		}
	];

	for (const requirement of requirementsData) {
		await prisma.requirement.create({
			data: {
				...requirement,
				workspaceId: workspace.id,
				ownerId: user.id
			}
		});
	}

	const tasksData = [
		{
			id: 'tsk_demo_1',
			title: 'Build compliance submission checklist',
			status: 'IN_PROGRESS' as const
		},
		{
			id: 'tsk_demo_2',
			title: 'Execute validation pass and resolve errors',
			status: 'TODO' as const
		}
	];

	for (const task of tasksData) {
		await prisma.task.create({
			data: {
				...task,
				workspaceId: workspace.id,
				assigneeId: user.id
			}
		});
	}

	const projectsData = [
  {
    id: 'prj_demo_1',
    title: 'QA Project A',
    status: 'ACTIVE' as const,
    dueDate: new Date('2026-02-10T12:00:00.000Z'),
    ownerId: user.id,
    archivedAt: null
  },
  {
    id: 'prj_demo_2',
    title: 'QA Project B',
    status: 'DRAFT' as const,
    dueDate: new Date('2026-02-20T12:00:00.000Z'),
    ownerId: null,
    archivedAt: null
  },
  {
    id: 'prj_demo_3',
    title: 'QA Project C (Out of range)',
    status: 'ACTIVE' as const,
    dueDate: new Date('2026-03-05T12:00:00.000Z'),
    ownerId: user.id,
    archivedAt: null
  },
  {
    id: 'prj_demo_4',
    title: 'QA Project D (Archived)',
    status: 'DONE' as const,
    dueDate: new Date('2026-02-15T12:00:00.000Z'),
    ownerId: user.id,
    archivedAt: new Date()
  }
];

for (const project of projectsData) {
  await prisma.project.create({
    data: {
      ...project,
      workspaceId: workspace.id
    }
  });
}

	await createEdge(prisma, {
		workspaceId: workspace.id,
		type: 'DERIVED_FROM',
		fromType: 'REQUIREMENT',
		fromId: 'req_demo_1',
		toType: 'SOURCE',
		toId: 'src_demo_1'
	});

	await createEdge(prisma, {
		workspaceId: workspace.id,
		type: 'DERIVED_FROM',
		fromType: 'REQUIREMENT',
		fromId: 'req_demo_3',
		toType: 'SOURCE',
		toId: 'src_demo_2'
	});

	await createEdge(prisma, {
		workspaceId: workspace.id,
		type: 'DERIVED_FROM',
		fromType: 'REQUIREMENT',
		fromId: 'req_demo_7',
		toType: 'SOURCE',
		toId: 'src_demo_3'
	});

	await createEdge(prisma, {
		workspaceId: workspace.id,
		type: 'IMPLEMENTS',
		fromType: 'TASK',
		fromId: 'tsk_demo_1',
		toType: 'REQUIREMENT',
		toId: 'req_demo_2'
	});

	await createEdge(prisma, {
		workspaceId: workspace.id,
		type: 'IMPLEMENTS',
		fromType: 'TASK',
		fromId: 'tsk_demo_2',
		toType: 'REQUIREMENT',
		toId: 'req_demo_3'
	});

	const [requirementCount, sourceCount, taskCount, plannedCount, unplannedCount] =
		await Promise.all([
			prisma.requirement.count({ where: { workspaceId: workspace.id } }),
			prisma.source.count({ where: { workspaceId: workspace.id } }),
			prisma.task.count({ where: { workspaceId: workspace.id } }),
			prisma.edge.count({
				where: {
					workspaceId: workspace.id,
					type: 'IMPLEMENTS',
					fromType: 'TASK',
					toType: 'REQUIREMENT'
				}
			}),
			prisma.requirement.count({
				where: {
					workspaceId: workspace.id,
					id: {
						notIn: (
							await prisma.edge.findMany({
								where: {
									workspaceId: workspace.id,
									type: 'IMPLEMENTS',
									fromType: 'TASK',
									toType: 'REQUIREMENT'
								},
								select: { toId: true }
							})
						).map((edge) => edge.toId)
					}
				}
			})
		]);

	console.log('Demo requirements QA seed complete', {
		workspaceId: workspace.id,
		counts: {
			requirements: requirementCount,
			sources: sourceCount,
			tasks: taskCount,
			plannedRequirements: plannedCount,
			unplannedRequirements: unplannedCount
		}
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
