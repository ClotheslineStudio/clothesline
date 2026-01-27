import { json } from '@sveltejs/kit';
import type { AppError } from '$lib/validation/appError';

export function ok<T extends Record<string, unknown>>(data: T, status = 200) {
  return json({ ok: true, ...data }, { status });
}

export function badRequest(error: AppError, status = 400) {
  return json({ error }, { status });
}
