export type DocTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type DocNavItem = {
  slug: string;
  title: string;
  section: string;
  sectionOrder: number;
  subsection?: string;
  order: number;
  icon: string;
  description?: string;
  lastUpdated?: string;
};

export type DocPage = DocNavItem & {
  html: string;
  toc: DocTocItem[];
};

type Frontmatter = {
  title?: string;
  section?: string;
  sectionOrder?: number;
  subsection?: string;
  order?: number;
  icon?: string;
  description?: string;
  lastUpdated?: string;
};

const rawDocs = import.meta.glob('/src/lib/content/docs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

const docsCache: DocPage[] = Object.entries(rawDocs)
  .map(([path, source]) => {
    const slug = path.split('/').pop()?.replace('.md', '') ?? '';
    const { frontmatter, body } = parseFrontmatter(source);
    const parsed = parseMarkdown(body, slug, frontmatter.title);

    return {
      slug,
      title: frontmatter.title ?? parsed.title,
      section: frontmatter.section ?? 'General',
      sectionOrder: frontmatter.sectionOrder ?? 999,
      subsection: frontmatter.subsection,
      order: frontmatter.order ?? 999,
      icon: frontmatter.icon ?? 'File',
      description: frontmatter.description,
      lastUpdated: frontmatter.lastUpdated,
      html: parsed.html,
      toc: parsed.toc
    };
  })
  .sort((a, b) => {
    if (a.sectionOrder !== b.sectionOrder) return a.sectionOrder - b.sectionOrder;
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

export function getDocsNav(): DocNavItem[] {
  return docsCache.map(({ slug, title, section, sectionOrder, subsection, order, icon, description, lastUpdated }) => ({
    slug,
    title,
    section,
    sectionOrder,
    subsection,
    order,
    icon,
    description,
    lastUpdated
  }));
}

export function getDocBySlug(slug: string): DocPage | null {
  return docsCache.find((doc) => doc.slug === slug) ?? null;
}

function parseFrontmatter(source: string): { frontmatter: Frontmatter; body: string } {
  const normalized = source.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { frontmatter: {}, body: normalized };
  }

  const end = normalized.indexOf('\n---\n', 4);
  if (end === -1) {
    return { frontmatter: {}, body: normalized };
  }

  const block = normalized.slice(4, end).split('\n');
  const frontmatter: Frontmatter = {};

  for (const line of block) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!match) continue;
    const key = match[1] as keyof Frontmatter;
    const rawValue = stripQuotes(match[2].trim());
    if (!rawValue) continue;

    if (key === 'order' || key === 'sectionOrder') {
      const parsed = Number(rawValue);
      if (Number.isFinite(parsed)) {
        frontmatter[key] = parsed as never;
      }
      continue;
    }

    frontmatter[key] = rawValue as never;
  }

  return {
    frontmatter,
    body: normalized.slice(end + 5)
  };
}

function stripQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1).trim();
  }
  return value;
}

function parseMarkdown(source: string, slug: string, initialTitle?: string) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  const toc: DocTocItem[] = [];
  const idCounts = new Map<string, number>();

  let title = initialTitle ?? humanizeSlug(slug);
  let inCodeBlock = false;
  let codeLang = '';
  let codeBuffer: string[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let inCallout = false;
  let calloutKind: 'info' | 'warning' | 'success' | 'note' = 'info';
  let calloutLines: string[] = [];
  let inDetails = false;
  let detailsTitle = '';
  let detailsLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    const text = paragraphBuffer.join(' ').trim();
    if (!text) {
      paragraphBuffer = [];
      return;
    }
    out.push(`<p>${inlineMarkdown(text)}</p>`);
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (listBuffer.length === 0) return;
    const items = listBuffer.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('');
    out.push(`<ul>${items}</ul>`);
    listBuffer = [];
  };

  const flushCodeBlock = () => {
    const className = codeLang ? ` class="language-${escapeHtmlAttr(codeLang)}"` : '';
    const code = escapeHtml(codeBuffer.join('\n'));
    out.push(`<pre><code${className}>${code}</code></pre>`);
    codeBuffer = [];
    codeLang = '';
  };

  const flushCallout = () => {
    if (!inCallout) return;
    const inner = renderBlockContent(calloutLines);
    out.push(`<div class="doc-callout doc-callout--${calloutKind}">${inner}</div>`);
    inCallout = false;
    calloutLines = [];
    calloutKind = 'info';
  };

  const flushDetails = () => {
    if (!inDetails) return;
    const inner = renderBlockContent(detailsLines);
    out.push(
      `<details class="doc-details"><summary>${inlineMarkdown(detailsTitle)}</summary><div class="doc-details__body">${inner}</div></details>`
    );
    inDetails = false;
    detailsTitle = '';
    detailsLines = [];
  };

  for (const line of lines) {
    if (inCodeBlock) {
      if (line.trim().startsWith('```')) {
        inCodeBlock = false;
        flushCodeBlock();
      } else {
        codeBuffer.push(line);
      }
      continue;
    }

    const trimmed = line.trim();

    if (inCallout) {
      if (trimmed === ':::') {
        flushCallout();
      } else {
        calloutLines.push(line);
      }
      continue;
    }

    if (inDetails) {
      if (trimmed === ':::') {
        flushDetails();
      } else {
        detailsLines.push(line);
      }
      continue;
    }

    if (trimmed.startsWith('```')) {
      flushParagraph();
      flushList();
      inCodeBlock = true;
      codeLang = trimmed.slice(3).trim().toLowerCase();
      continue;
    }

    const detailsMatch = trimmed.match(/^:::details\s+(.+)$/i);
    if (detailsMatch) {
      flushParagraph();
      flushList();
      inDetails = true;
      detailsTitle = detailsMatch[1].trim();
      detailsLines = [];
      continue;
    }

    const calloutMatch = trimmed.match(/^:::(info|warning|success|note)\s*$/i);
    if (calloutMatch) {
      flushParagraph();
      flushList();
      inCallout = true;
      calloutKind = calloutMatch[1].toLowerCase() as 'info' | 'warning' | 'success' | 'note';
      calloutLines = [];
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const plain = stripInlineMarkdown(text);
      const baseId = slugify(plain);
      const id = uniqueId(baseId, idCounts);

      if (level === 1 && !initialTitle) {
        title = plain;
      }

      if (level === 2 || level === 3) {
        toc.push({ id, text: plain, level });
      }

      out.push(`<h${level} id="${escapeHtmlAttr(id)}">${inlineMarkdown(text)}</h${level}>`);
      continue;
    }

    const listMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      listBuffer.push(listMatch[1].trim());
      continue;
    }

    if (trimmed.startsWith('>')) {
      flushParagraph();
      flushList();
      out.push(`<blockquote>${inlineMarkdown(trimmed.replace(/^>\s?/, ''))}</blockquote>`);
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushCallout();
  flushDetails();

  if (inCodeBlock) flushCodeBlock();

  return { title, html: out.join('\n'), toc };
}

function renderBlockContent(lines: string[]): string {
  const out: string[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    const text = paragraphBuffer.join(' ').trim();
    if (!text) {
      paragraphBuffer = [];
      return;
    }
    out.push(`<p>${inlineMarkdown(text)}</p>`);
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (listBuffer.length === 0) return;
    const items = listBuffer.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('');
    out.push(`<ul>${items}</ul>`);
    listBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const listMatch = line.match(/^[-*+]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      listBuffer.push(listMatch[1].trim());
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();
  return out.join('');
}

function inlineMarkdown(text: string): string {
  let rendered = escapeHtml(text);
  rendered = rendered.replace(/`([^`]+)`/g, '<code>$1</code>');
  rendered = rendered.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  rendered = rendered.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  rendered = rendered.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) => {
    const safeHref = sanitizeHref(href);
    return `<a href="${escapeHtmlAttr(safeHref)}" target="_blank" rel="noreferrer">${label}</a>`;
  });
  return rendered;
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1')
    .trim();
}

function sanitizeHref(href: string): string {
  if (href.startsWith('/') || href.startsWith('#')) return href;
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  return '#';
}

function uniqueId(base: string, idCounts: Map<string, number>): string {
  const safeBase = base || 'section';
  const count = idCounts.get(safeBase) ?? 0;
  idCounts.set(safeBase, count + 1);
  return count === 0 ? safeBase : `${safeBase}-${count + 1}`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeHtmlAttr(value: string): string {
  return escapeHtml(value).replace(/`/g, '&#96;');
}
