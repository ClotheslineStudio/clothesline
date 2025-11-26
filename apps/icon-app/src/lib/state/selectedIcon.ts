import { writable } from 'svelte/store';
import type { IconRecord } from '$lib/types/icon';

export const selectedIcon = writable<IconRecord | null>(null);

