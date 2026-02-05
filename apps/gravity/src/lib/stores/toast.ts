import { writable } from 'svelte/store';

export type ToastKind = 'success' | 'error' | 'info';
export type Toast = {
  id: string;
  kind: ToastKind;
  message: string;
  timeoutMs: number;
};

const store = writable<Toast[]>([]);

function makeId() {
  // crypto.randomUUID is ideal, fallback is fine
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function push(kind: ToastKind, message: string, opts?: { timeoutMs?: number }) {
  const id = makeId();
  const timeoutMs = opts?.timeoutMs ?? 2200;

  store.update((list) => [{ id, kind, message, timeoutMs }, ...list].slice(0, 5));

  if (timeoutMs > 0) setTimeout(() => remove(id), timeoutMs);

  return id;
}

function remove(id: string) {
  store.update((list) => list.filter((t) => t.id !== id));
}

function clear() {
  store.set([]);
}

export const toasts = { subscribe: store.subscribe };

export const toast = {
  success: (m: string, o?: { timeoutMs?: number }) => push('success', m, o),
  error: (m: string, o?: { timeoutMs?: number }) => push('error', m, o),
  info: (m: string, o?: { timeoutMs?: number }) => push('info', m, o),
  remove,
  clear
};
