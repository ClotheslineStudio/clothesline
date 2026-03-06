#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const uiSrc = path.join(repoRoot, 'packages', 'ui', 'src');
const docsDir = path.join(repoRoot, 'docs', 'component-library');

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function read(p) {
  return fs.readFileSync(p, 'utf8');
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    if (entry.isFile()) out.push(full);
  }
  return out;
}

function resolveModule(fromFile, spec) {
  const base = spec.replace(/\.js$/u, '.ts');
  const abs = path.resolve(path.dirname(fromFile), base);
  const candidates = [
    abs,
    `${abs}.ts`,
    `${abs}.svelte`,
    path.join(abs, 'index.ts'),
    path.join(abs, 'index.svelte')
  ];
  for (const c of candidates) {
    if (isFile(c)) return c;
  }
  return null;
}

const visited = new Set();
const publicExports = [];

function parseExports(file) {
  if (!file || visited.has(file) || !exists(file)) return;
  visited.add(file);

  const src = read(file);
  const lines = src.split(/\r?\n/u);
  const localValues = new Set();

  for (const line of lines) {
    const importMatch = line.match(/^\s*import\s+(\w+)\s+from\s+['"](.+?)['"]/u);
    if (importMatch) localValues.add(importMatch[1]);
  }

  for (const line of lines) {
    const star = line.match(/^\s*export\s+\*\s+from\s+['"](.+?)['"]/u);
    if (star) {
      const resolved = resolveModule(file, star[1]);
      parseExports(resolved);
      continue;
    }

    const namedFrom = line.match(/^\s*export\s+(type\s+)?\{([^}]+)\}\s+from\s+['"](.+?)['"]/u);
    if (namedFrom) {
      const kind = namedFrom[1] ? 'type' : 'value';
      const resolved = resolveModule(file, namedFrom[3]);
      const relSource = resolved ? toPosix(path.relative(uiSrc, resolved)) : namedFrom[3];
      const specs = namedFrom[2].split(',').map((s) => s.trim()).filter(Boolean);
      for (const spec of specs) {
        const alias = spec.match(/^(\w+)\s+as\s+(\w+)$/u);
        if (alias) {
          const exportName = alias[2];
          publicExports.push({ exportName, kind, via: toPosix(path.relative(uiSrc, file)), source: relSource });
        } else if (/^default\s+as\s+/u.test(spec)) {
          const exportName = spec.replace(/^default\s+as\s+/u, '').trim();
          publicExports.push({ exportName, kind: 'component', via: toPosix(path.relative(uiSrc, file)), source: relSource });
        } else if (spec !== 'default') {
          publicExports.push({ exportName: spec, kind, via: toPosix(path.relative(uiSrc, file)), source: relSource });
        }
      }
      continue;
    }

    const namedLocal = line.match(/^\s*export\s+\{([^}]+)\}\s*;?\s*$/u);
    if (namedLocal) {
      const specs = namedLocal[1].split(',').map((s) => s.trim()).filter(Boolean);
      for (const spec of specs) {
        const alias = spec.match(/^(\w+)\s+as\s+(\w+)$/u);
        const local = alias ? alias[1] : spec;
        const exportName = alias ? alias[2] : spec;
        if (localValues.has(local)) {
          publicExports.push({ exportName, kind: 'value', via: toPosix(path.relative(uiSrc, file)), source: toPosix(path.relative(uiSrc, file)) });
        }
      }
      continue;
    }

    const defaultLocal = line.match(/^\s*export\s+default\s+(\w+)\s*;\s*$/u);
    if (defaultLocal) {
      publicExports.push({ exportName: 'default', kind: 'value', via: toPosix(path.relative(uiSrc, file)), source: toPosix(path.relative(uiSrc, file)) });
    }
  }
}

parseExports(path.join(uiSrc, 'index.ts'));

const componentFiles = walk(path.join(uiSrc, 'components')).filter((f) => f.endsWith('.svelte'));
const allSrcFiles = walk(uiSrc).filter((f) => f.endsWith('.ts') || f.endsWith('.d.ts'));

const exportNameByComponent = new Map();
for (const exp of publicExports) {
  const source = exp.source;
  if (source.endsWith('.svelte')) {
    const key = source;
    const existing = exportNameByComponent.get(key) || [];
    existing.push(exp.exportName);
    exportNameByComponent.set(key, existing);
  }
}

function extractPropsSlots(file) {
  const src = read(file);
  const props = [...src.matchAll(/^\s*export\s+let\s+(\w+)/gmu)].map((m) => m[1]);
  const slots = [];
  for (const m of src.matchAll(/<slot(?:\s+name=["']([^"']+)["'])?\s*\/?\s*>/gmu)) {
    slots.push(m[1] || 'default');
  }
  return { props, slots: [...new Set(slots)] };
}

function purposeFrom(category, name) {
  return `${name} component for ${category} UI patterns.`;
}

function statusFor(isExported, dir) {
  if (!isExported) return 'WIP';
  const hasDocs = exists(path.join(dir, 'README.md')) || fs.readdirSync(dir).some((f) => /\.(test|spec)\.(ts|js)$/u.test(f));
  return hasDocs ? 'stable' : 'missing docs';
}

const componentRows = componentFiles
  .map((file) => {
    const rel = toPosix(path.relative(uiSrc, file));
    const parts = rel.split('/');
    const category = parts[1] || 'misc';
    const name = path.basename(file, '.svelte');
    const { props, slots } = extractPropsSlots(file);
    const exportedAs = exportNameByComponent.get(rel) || [];
    const status = statusFor(exportedAs.length > 0, path.dirname(file));
    const propSummary = props.length ? `props: ${props.slice(0, 8).join(', ')}${props.length > 8 ? ', ...' : ''}` : 'props: none detected';
    const slotSummary = slots.length ? `slots: ${slots.join(', ')}` : 'slots: none detected';

    return {
      name,
      category,
      path: rel,
      exportName: exportedAs.length ? exportedAs.join(', ') : 'not exported',
      purpose: purposeFrom(category, name),
      summary: `${propSummary}; ${slotSummary}`,
      status
    };
  })
  .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

const supportFiles = allSrcFiles
  .map((file) => {
    const rel = toPosix(path.relative(uiSrc, file));
    const isPublic = publicExports.some((e) => e.source === rel || e.via === rel);
    const kind = rel.includes('/store') || rel.endsWith('toast.store.ts') ? 'store' : rel.endsWith('.d.ts') ? 'type' : 'utility/type';
    return { rel, kind, isPublic };
  })
  .filter((f) => !f.rel.endsWith('index.ts'))
  .sort((a, b) => a.rel.localeCompare(b.rel));

const uniquePublic = Array.from(
  new Map(publicExports.map((e) => [`${e.exportName}:${e.kind}:${e.source}:${e.via}`, e])).values()
).sort((a, b) => a.exportName.localeCompare(b.exportName));

const exportedComponentCount = componentRows.filter((r) => r.exportName !== 'not exported').length;
const wipComponentCount = componentRows.filter((r) => r.status === 'WIP').length;

let inventory = '';
inventory += '# UI Kit Inventory\n\n';
inventory += `Generated: ${new Date().toISOString()}\n\n`;
inventory += `- Package: \`@clothesline/ui\`\n`;
inventory += `- Component files detected: ${componentRows.length}\n`;
inventory += `- Publicly exported components (via \`src/index.ts\`): ${exportedComponentCount}\n`;
inventory += `- Components present but not publicly exported: ${wipComponentCount}\n\n`;
inventory += '## Components\n\n';
inventory += '| Name | Category | Path | Export Name | Purpose | Props/Slots Summary | Status |\n';
inventory += '|---|---|---|---|---|---|---|\n';
for (const row of componentRows) {
  inventory += `| ${row.name} | ${row.category} | \`${row.path}\` | \`${row.exportName}\` | ${row.purpose} | ${row.summary} | ${row.status} |\n`;
}

inventory += '\n## Utilities, Stores, and Types\n\n';
inventory += '| Path | Kind | Publicly Exported |\n';
inventory += '|---|---|---|\n';
for (const f of supportFiles) {
  inventory += `| \`${f.rel}\` | ${f.kind} | ${f.isPublic ? 'yes' : 'no'} |\n`;
}

inventory += '\n## Notes\n\n';
inventory += '- Status criteria: `stable` = exported and has local README/test, `missing docs` = exported without local README/test, `WIP` = component file exists but is not exported from public root index.\n';
inventory += '- Props/slots are best-effort regex extraction from component source and may miss advanced patterns.\n';

let exportMap = '';
exportMap += '# UI Kit Export Map\n\n';
exportMap += `Generated: ${new Date().toISOString()}\n\n`;
exportMap += '## Public Exports\n\n';
exportMap += 'All imports should come from `@clothesline/ui`.\n\n';
exportMap += '| Export | Kind | Import Example | Source | Via |\n';
exportMap += '|---|---|---|---|---|\n';
for (const exp of uniquePublic) {
  if (exp.exportName === 'default') continue;
  const importExample = exp.kind === 'type'
    ? `import type { ${exp.exportName} } from '@clothesline/ui';`
    : `import { ${exp.exportName} } from '@clothesline/ui';`;
  exportMap += `| ${exp.exportName} | ${exp.kind} | \`${importExample}\` | \`${exp.source}\` | \`${exp.via}\` |\n`;
}

const notExported = componentRows.filter((r) => r.exportName === 'not exported');
exportMap += '\n## Component Files Not Publicly Exported\n\n';
exportMap += '| Component | Path |\n';
exportMap += '|---|---|\n';
for (const row of notExported) {
  exportMap += `| ${row.name} | \`${row.path}\` |\n`;
}

fs.mkdirSync(docsDir, { recursive: true });
fs.writeFileSync(path.join(docsDir, 'UI_KIT_INVENTORY.md'), inventory, 'utf8');
fs.writeFileSync(path.join(docsDir, 'UI_KIT_EXPORT_MAP.md'), exportMap, 'utf8');

console.log(`Wrote ${path.join('docs', 'component-library', 'UI_KIT_INVENTORY.md')}`);
console.log(`Wrote ${path.join('docs', 'component-library', 'UI_KIT_EXPORT_MAP.md')}`);
