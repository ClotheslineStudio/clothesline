import { writable } from 'svelte/store';

export type ToastVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number; // ms; 0 = sticky
}

function createToasts() {
  const { subscribe, update } = writable<ToastItem[]>([]);

  function push(t: Omit<ToastItem, 'id'>) {
    const item: ToastItem = {
      id: Math.random().toString(36).slice(2),
      variant: 'neutral',
      duration: 3500,
      ...t
    };
    update(list => [item, ...list]);
    if (item.duration && item.duration > 0) {
      setTimeout(() => dismiss(item.id), item.duration);
    }
    return item.id;
  }

  function dismiss(id: string) {
    update(list => list.filter(t => t.id !== id));
  }

  return { subscribe, push, dismiss };
}

export const toasts = createToasts();

