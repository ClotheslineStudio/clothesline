import { MAX_SOURCE_FILE_BYTES } from '$lib/constants/uploads';

export type PdfValidationFailCode = 'UNSUPPORTED_MEDIA' | 'PAYLOAD_TOO_LARGE';

export function validatePdfFile(file: File) {
  const name = file.name ?? '';
  const isPdf =
    file.type === 'application/pdf' || name.toLowerCase().endsWith('.pdf');

  if (!isPdf) {
    return {
      ok: false as const,
      code: 'UNSUPPORTED_MEDIA' as const,
      message: 'PDF only. Please choose a .pdf file.'
    };
  }

  if (file.size > MAX_SOURCE_FILE_BYTES) {
    return {
      ok: false as const,
      code: 'PAYLOAD_TOO_LARGE' as const,
      message: `File too large. Max size is ${formatBytes(MAX_SOURCE_FILE_BYTES)}.`
    };
  }

  return { ok: true as const };
}

export function validateHttpUrl(raw: string) {
  const value = raw.trim();
  if (!value) return { ok: false as const, message: 'URL is required.' };

  try {
    const u = new URL(value);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
      return { ok: false as const, message: 'URL must start with http:// or https://.' };
    }
    return { ok: true as const, normalized: u.href };
  } catch {
    return { ok: false as const, message: 'Invalid URL format. Include https:// (or http://).' };
  }
}

export function formatBytes(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let v = bytes;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

