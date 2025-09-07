export type IconPathsDef = { viewBox?: string; paths: string[] };
export type IconDef = IconPathsDef | any; // Svelte component also allowed

export const ICON_REGISTRY_KEY = 'cl:icon-registry' as const;
