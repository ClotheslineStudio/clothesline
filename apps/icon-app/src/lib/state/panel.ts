import { writable } from 'svelte/store';

export const showPanel = writable(false);

export function openPanel() {
  showPanel.set(true);
}

export function closePanel() {
  showPanel.set(false);
}
