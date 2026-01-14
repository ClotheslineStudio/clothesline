// src/lib/server/storage/sources.ts
import { createReadStream } from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { Readable } from 'node:stream';

export type StoredSourceFile = {
  storageKey: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
};

export type SourceFileHandle = {
  path: string;
  stream: Readable;
};

const DEFAULT_STORAGE_DIR = path.resolve(process.cwd(), 'storage');
const SOURCES_DIR = path.join(DEFAULT_STORAGE_DIR, 'sources');

/**
 * Ensure the storage directory exists.
 */
async function ensureSourcesDir(): Promise<void> {
  await fs.mkdir(SOURCES_DIR, { recursive: true });
}

/**
 * Basic path traversal hardening: storageKey must be a plain filename.
 */
function assertSafeStorageKey(storageKey: string): void {
  if (!storageKey || typeof storageKey !== 'string') {
    throw new Error('Invalid storageKey');
  }

  // No subpaths allowed
  if (storageKey !== path.basename(storageKey)) {
    throw new Error('Invalid storageKey (path traversal)');
  }

  // Optional: tighten further to a known-safe charset
  if (!/^[a-zA-Z0-9._-]+$/.test(storageKey)) {
    throw new Error('Invalid storageKey (unsupported characters)');
  }
}

function pickExtension(originalName: string, mimeType: string): string {
  const extFromName = path.extname(originalName || '').toLowerCase();
  if (extFromName) return extFromName;

  // Minimal mapping; extend as needed
  if (mimeType === 'application/pdf') return '.pdf';

  return '';
}

async function writeFileNoCollisions(absPath: string, buffer: Buffer): Promise<void> {
  // 'wx' => fail if already exists (no overwrite)
  await fs.writeFile(absPath, buffer, { flag: 'wx' });
}

/**
 * Save a Source upload to local dev storage.
 * Intended input: File from request.formData() in SvelteKit.
 */
export async function saveSourceFile(file: File): Promise<StoredSourceFile> {
  await ensureSourcesDir();

  const originalName = file.name || 'upload';
  const mimeType = file.type || 'application/octet-stream';

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const sizeBytes = buffer.byteLength;

  const ext = pickExtension(originalName, mimeType);

  // Extremely low collision risk, but we still guarantee “no collisions” via 'wx' + retry.
  for (let attempt = 1; attempt <= 3; attempt++) {
    const storageKey = `${crypto.randomUUID()}${ext}`;
    const absPath = path.join(SOURCES_DIR, storageKey);

    try {
      await writeFileNoCollisions(absPath, buffer);

      return {
        storageKey,
        originalName,
        mimeType,
        sizeBytes
      };
    } catch (err: unknown) {
      // Narrow error type for property access
      const errorObj = typeof err === 'object' && err !== null ? err as { code?: string; message?: string } : {};
      if (errorObj.code === 'EEXIST' && attempt < 3) continue;

      // Dev-friendly logging
      console.error('[storage.saveSourceFile] failed', {
        originalName,
        mimeType,
        sizeBytes,
        attempt,
        err: { message: errorObj.message, code: errorObj.code }
      });

      throw err;
    }
  }

  // Should never hit due to return/throw above
  throw new Error('Failed to persist file after retries');
}

/**
 * Retrieve a stored file by storageKey.
 * Returns both the absolute path and a readable stream.
 */
export async function getSourceFile(storageKey: string): Promise<SourceFileHandle> {
  assertSafeStorageKey(storageKey);

  const absPath = path.join(SOURCES_DIR, storageKey);

  try {
    await fs.stat(absPath);
  } catch (err: unknown) {
    const errorObj = typeof err === 'object' && err !== null ? err as { code?: string; message?: string } : {};
    console.error('[storage.getSourceFile] missing', {
      storageKey,
      err: { message: errorObj.message, code: errorObj.code }
    });
    throw err;
  }

  return {
    path: absPath,
    stream: createReadStream(absPath)
  };
}
