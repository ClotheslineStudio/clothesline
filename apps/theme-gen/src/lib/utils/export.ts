
export function cssFromVars(vars: Record<string, string | number>, selector = ':root') {
  const body = Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${String(v)};`)
    .join('\n');
  return `${selector} {\n${body}\n}\n`;
}

export function jsonFromVars(vars: Record<string, string | number>) {
  return JSON.stringify(vars, null, 2);
}

export async function copyText(text: string) {
  // browser-only, guard for SSR
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  return false;
}

export function downloadText(filename: string, text: string, type = 'text/plain') {
  if (typeof document === 'undefined') return;
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
