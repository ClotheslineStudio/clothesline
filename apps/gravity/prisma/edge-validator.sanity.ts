import { validateEdge } from '../src/lib/server/edges/validateEdge';

type Case = {
  name: string;
  input: Parameters<typeof validateEdge>[0];
  expectOk: boolean;
};

const cases: Case[] = [
  {
    name: 'Requirement DERIVED_FROM Source OK',
    input: { type: 'DERIVED_FROM', fromType: 'REQUIREMENT', toType: 'SOURCE' },
    expectOk: true
  },
  {
    name: 'Task IMPLEMENTS Requirement OK',
    input: { type: 'IMPLEMENTS', fromType: 'TASK', toType: 'REQUIREMENT' },
    expectOk: true
  },
  {
    name: 'Page DOCUMENTS Requirement OK',
    input: { type: 'DOCUMENTS', fromType: 'PAGE', toType: 'REQUIREMENT' },
    expectOk: true
  },
  {
    name: 'Evidence PROVIDES_EVIDENCE_FOR Requirement OK',
    input: { type: 'PROVIDES_EVIDENCE_FOR', fromType: 'EVIDENCE', toType: 'REQUIREMENT' },
    expectOk: true
  },
  {
    name: 'Evidence ATTACHED_TO Task OK',
    input: { type: 'ATTACHED_TO', fromType: 'EVIDENCE', toType: 'TASK' },
    expectOk: true
  },
  {
    name: 'Evidence ATTACHED_TO Page OK',
    input: { type: 'ATTACHED_TO', fromType: 'EVIDENCE', toType: 'PAGE' },
    expectOk: true
  },
  {
    name: 'Task PART_OF Project OK',
    input: { type: 'PART_OF', fromType: 'TASK', toType: 'PROJECT' },
    expectOk: true
  },
  {
    name: 'Task DEPENDS_ON Task OK',
    input: { type: 'DEPENDS_ON', fromType: 'TASK', toType: 'TASK' },
    expectOk: true
  },
  {
    name: 'Page CITES Source OK (optional)',
    input: { type: 'CITES', fromType: 'PAGE', toType: 'SOURCE' },
    expectOk: true
  },
  {
    name: 'Invalid: Task DERIVED_FROM Source (reject)',
    input: { type: 'DERIVED_FROM', fromType: 'TASK', toType: 'SOURCE' },
    expectOk: false
  }
];

let failed = 0;

for (const c of cases) {
  const res = validateEdge(c.input);
  const ok = res.ok === c.expectOk;

  if (!ok) {
    failed++;
    console.error(`FAIL: ${c.name}`);
    console.error(res);
  } else {
    console.log(`OK: ${c.name}`);
  }
}

if (failed > 0) process.exit(1);
console.log('Edge validator sanity checks passed.');
