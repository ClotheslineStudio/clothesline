import { browser } from '$app/environment';
import { writable } from 'svelte/store';

import { defaultThemeDraft } from '$lib/theme/defaults';
import { BUILTIN_ROLES, type OklchSeed, type Role, type ThemeDraft } from '$lib/theme/types';

const STORAGE_KEY = 'clothesline.theme-generator.draft.v1';
const SAVE_DELAY_MS = 300;

const baseDraft: ThemeDraft = structuredClone(defaultThemeDraft);

export const themeDraft = writable<ThemeDraft>(baseDraft);
export const selectedRole = writable<Role>('primary');
export const saveToastTick = writable(0);

function sanitizeRoleName(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/--+/g, '-');
}

function normalizeDraft(raw: unknown): ThemeDraft {
  if (!raw || typeof raw !== 'object') return structuredClone(defaultThemeDraft);

  const candidate = raw as Partial<ThemeDraft>;
  const mergedSeeds: Record<string, OklchSeed> = {
    ...structuredClone(defaultThemeDraft).seeds,
    ...(candidate.seeds ?? {})
  };
  const seedKeys = Object.keys(mergedSeeds);
  const candidateOrder = Array.isArray(candidate.roleOrder)
    ? candidate.roleOrder.map((role) => sanitizeRoleName(String(role))).filter(Boolean)
    : [];
  const roleOrder = [...candidateOrder, ...seedKeys].filter(
    (role, idx, arr) => arr.indexOf(role) === idx && Boolean(mergedSeeds[role])
  );

  return {
    ...structuredClone(defaultThemeDraft),
    ...candidate,
    seeds: mergedSeeds,
    roleOrder: roleOrder.length ? roleOrder : [...BUILTIN_ROLES],
    rampSteps: Array.isArray(candidate.rampSteps) ? candidate.rampSteps.map((step) => Number(step)) : [...defaultThemeDraft.rampSteps]
  };
}

if (browser) {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      themeDraft.set(normalizeDraft(JSON.parse(stored)));
    } catch {
      themeDraft.set(structuredClone(defaultThemeDraft));
    }
  }

  let hydrated = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  themeDraft.subscribe((value) => {
    if (!hydrated) {
      hydrated = true;
      return;
    }

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      saveToastTick.update((count) => count + 1);
    }, SAVE_DELAY_MS);
  });
}

export function updateThemeName(name: string): void {
  themeDraft.update((draft) => ({ ...draft, name }));
}

export function updateRoleSeed(role: Role, patch: Partial<OklchSeed>): void {
  themeDraft.update((draft) => ({
    ...draft,
    seeds: {
      ...draft.seeds,
      [role]: {
        ...draft.seeds[role],
        ...patch
      }
    }
  }));
}

export function randomizeRoleSeed(role: Role): void {
  const seed: OklchSeed = {
    l: Number((0.52 + Math.random() * 0.26).toFixed(3)),
    c: Number((0.06 + Math.random() * 0.2).toFixed(3)),
    h: Number((Math.random() * 360).toFixed(1))
  };
  updateRoleSeed(role, seed);
}

export function addSeedRole(roleName: string, seed?: Partial<OklchSeed>): Role | null {
  const normalized = sanitizeRoleName(roleName);
  if (!normalized) return null;

  let added: Role | null = null;

  themeDraft.update((draft) => {
    if (draft.seeds[normalized]) return draft;

    added = normalized;
    const nextSeed: OklchSeed = {
      l: seed?.l ?? Number((0.52 + Math.random() * 0.26).toFixed(3)),
      c: seed?.c ?? Number((0.06 + Math.random() * 0.2).toFixed(3)),
      h: seed?.h ?? Number((Math.random() * 360).toFixed(1))
    };

    return {
      ...draft,
      seeds: {
        ...draft.seeds,
        [normalized]: nextSeed
      },
      roleOrder: [...draft.roleOrder, normalized]
    };
  });

  if (added) selectedRole.set(added);
  return added;
}

export function removeSeedRole(role: Role): boolean {
  const normalized = sanitizeRoleName(role);
  if (!normalized || BUILTIN_ROLES.includes(normalized as (typeof BUILTIN_ROLES)[number])) {
    return false;
  }

  let removed = false;
  let nextSelected: Role = 'primary';

  themeDraft.update((draft) => {
    if (!draft.seeds[normalized]) return draft;
    removed = true;

    const nextSeeds = { ...draft.seeds };
    delete nextSeeds[normalized];

    const nextRoleOrder = draft.roleOrder.filter((r) => r !== normalized);
    nextSelected = nextRoleOrder[0] ?? 'primary';

    const nextBackgrounds = { ...draft.backgrounds };
    if ((nextBackgrounds.lightContrast ?? '').startsWith(`${normalized}-`)) {
      nextBackgrounds.lightContrast = `${nextSelected}-50`;
    }
    if ((nextBackgrounds.darkContrast ?? '').startsWith(`${normalized}-`)) {
      nextBackgrounds.darkContrast = `${nextSelected}-950`;
    }

    return {
      ...draft,
      seeds: nextSeeds,
      roleOrder: nextRoleOrder,
      backgrounds: nextBackgrounds
    };
  });

  if (removed) selectedRole.set(nextSelected);
  return removed;
}

export function resetThemeDraft(): void {
  const next = structuredClone(defaultThemeDraft);
  themeDraft.set(next);
  selectedRole.set(next.roleOrder[0] ?? 'primary');
}

export function updateThemeSection(
  section: 'backgrounds' | 'spacing' | 'edges' | 'typography',
  key: string,
  value: string
): void {
  themeDraft.update((draft) => ({
    ...draft,
    [section]: {
      ...draft[section],
      [key]: value
    }
  }));
}
